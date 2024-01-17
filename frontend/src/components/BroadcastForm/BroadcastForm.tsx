import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import api from "@/lib/api";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DialogClose } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

type BroadcastFromProps = {
    platforms : string[],
    currentPlatform : string,
    check : () => void,
}

const baseSchema = z.object({
    youtubeTitle: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    youtubeDescription: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    youtubePolicy: z.enum(['Private', 'Public']),
    twitchTitle: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    facebookTitle: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    })
}).partial();

function BroadcastForm({ platforms , currentPlatform, check } : BroadcastFromProps) {

    const navigate = useNavigate();
    const { toast } = useToast();

    const requiredObj = useMemo(() => {
        let obj = {};
        if(platforms.includes("Youtube")){
            obj = {
                ...obj,
                youtubeTitle : true,
                youtubeDescription : true,
                youtubePolicy : true,
            }
        }
        if(platforms.includes("Twitch")){
            obj = {
                ...obj,
                twitchTitle : true,
            }
        }
        if(platforms.includes("Facebook")) {
            obj = {
                ...obj,
                facebookTitle : true,
            }
        }
        return obj;
    }, [platforms]);

    
    console.log("Required Obj : ",requiredObj);
    console.log("CurrentPlatform : ",currentPlatform);
    
    const formSchema = baseSchema.required(requiredObj);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            youtubeTitle : undefined,
            youtubeDescription : undefined,
            youtubePolicy : undefined,
            twitchTitle : undefined,
            facebookTitle : undefined
        },
    });
    
    useEffect(() => {
        if (!platforms.includes("Youtube")) {
            form.resetField("youtubeTitle");
            form.resetField("youtubeDescription");
            form.resetField("youtubePolicy");
        }
        if (!platforms.includes("Twitch")) {
            form.resetField("twitchTitle");
        }
        if (!platforms.includes("Facebook")) {
            form.resetField("facebookTitle");
        }
        check();
    }, [platforms]);
    

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { youtubeTitle , youtubeDescription , youtubePolicy , twitchTitle , facebookTitle } = values;
        console.log(values);
        try {
            const payload = {
                yt_title : !platforms.includes("Youtube") || youtubeTitle == undefined ? null : youtubeTitle,
                yt_description : !platforms.includes("Youtube") || youtubeDescription == undefined ? null : youtubeDescription,
                yt_policy : !platforms.includes("Youtube") || youtubePolicy == undefined ? null : youtubePolicy,
                twitch_title : !platforms.includes("Twitch") || twitchTitle == undefined ? null :twitchTitle,
                fb_title : !platforms.includes("Facebook") || facebookTitle == undefined ? null : facebookTitle
            }
            const response = await api.post('/broadcast/', payload);
            console.log(response.data);
            toast({
                title : "Broadcast Added Successfully !"
            })
            navigate('/broadcast');
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <div>
            {platforms.length == 0 && <p className="my-2 text-muted-foreground">Please select a destination to broadcast</p>}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    { currentPlatform == "Youtube" && platforms.includes(currentPlatform) &&
                    (<>
                        <FormField
                            control={form.control}
                            name="youtubeTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Youtube Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your title here. " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtubeDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Youtube Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your description here." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtubePolicy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Youtube Privacy Policy</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a policy for broadcast" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Public">Public</SelectItem>
                                            <SelectItem value="Private">Private</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                    )}
                    { currentPlatform == "Twitch" && platforms.includes(currentPlatform) && <FormField
                        control={form.control}
                        name="twitchTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitch Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your title here. " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                    { currentPlatform == "Facebook" && platforms.includes(currentPlatform) && <FormField
                        control={form.control}
                        name="facebookTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facebook Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your title here. " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                    <DialogClose asChild>
                        <Button className="w-full" type="submit" disabled={platforms.length == 0}>
                            Create Broadcast
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default BroadcastForm