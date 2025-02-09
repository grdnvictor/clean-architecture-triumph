"use client";

import { useState } from "react";
import { z, ZodError } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        submit?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            setErrors({});
            const validatedData = signInSchema.parse(formData);

            const response = await signIn(validatedData.email, validatedData.password);

            if (response.ok) {
                localStorage.setItem("loggedIn", "true");
                console.log("Signed in!");
                router.push("/");
            } else {
                throw new Error("Failed to sign in");
            }
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        formattedErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(formattedErrors);
            } else {
                console.error(error);
                setErrors({ submit: "Failed to sign in. Please try again." });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="container mx-auto p-6 grid place-items-center h-full w-full">
            <Card className="mx-auto w-[400px]">
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
