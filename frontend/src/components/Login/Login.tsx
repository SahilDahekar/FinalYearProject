import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

function Login() {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const email = values.email;
        const password = values.password;
        try {
          toast.loading("Signing In", { id: "login" });
          await auth?.login(email, password);
          setIsLoading(false);
          toast.success("Signed In Successfully", { id: "login" });
          navigate("/broadcast");
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          toast.error("Signing In Failed", { id: "login" });
        }
    }
    useEffect(()=>{
      if(auth?.user){
        navigate("/broadcast")
      }
    },[auth])

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-[350px] space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}{" "}
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Login;
