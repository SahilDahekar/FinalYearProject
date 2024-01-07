import { useState,useEffect } from "react";
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
import {toast} from 'react-hot-toast';
// import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type User = {
    name: string;
    email: string;
};
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

function Register() {
    // const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const name = values.name;
        const email = values.email;
        const password = values.password;
        try {
          toast.loading("Signing Up", { id: "signup" });
          await api.post("/user/signup",{
          name,email,password })
          toast.success("Signed Up Successfully", { id: "signup" });
        } catch (error) {
          console.log(error);
          toast.error("Signing Up Failed", { id: "signup" });
        }
        // try {
        //     toast.loading("Signing Up", { id: "signup" });
        //     signup(name, email, password);
        //     toast.success("Signed Up Successfully", { id: "signup" });
        //     setIsLoading(false);
        //   } catch (error) {
        //     console.log(error);
        //     toast.error("Signing Up Failed", { id: "signup" });
        //     setIsLoading(false);
        //   }
    };

    // useEffect(()=>{
    //   if(auth?.user){
    //     return navigate("/dashboard")
    //   }
    // },[auth])



    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-[350px] space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Register;
