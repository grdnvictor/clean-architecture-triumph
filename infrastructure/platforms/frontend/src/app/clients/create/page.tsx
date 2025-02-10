"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateClientPage() {
    // const authChecked = useRequireAuth();
    //
    // if (!authChecked) {
    //     return null;
    // }
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        concessionId: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création du client");
            }

            router.push("/clients");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 grid place-items-center h-full w-full">
            <Card className={"mx-auto w-[400px]"}>
                <CardHeader>
                    <CardTitle>Créer un Client</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <Label htmlFor="phone">Numéro de téléphone</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <Label htmlFor="concessionId">ID Concession</Label>
                            <Input id="concessionId" name="concessionId" value={formData.concessionId}
                                   onChange={handleChange} required/>
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Ajout en cours..." : "Ajouter"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
