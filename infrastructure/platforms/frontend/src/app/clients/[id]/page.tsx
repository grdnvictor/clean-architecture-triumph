"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EditClientPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({ firstName: "", lastName: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            console.log("Fetching data for client:", id);
            fetch(`http://localhost:8000/clients/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Données reçues:", data);

                    setFormData({
                        firstName: data.firstName || data.firstname || "",
                        lastName: data.lastName || data.lastname || ""
                    });
                })
                .catch(() => setError("Erreur lors de la récupération du client"));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:8000/clients/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du client");
            }

            router.push("/clients");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <Card className={"mx-auto w-[400px]"}>
                <CardHeader>
                    <CardTitle>Modifier le Client</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Mise à jour..." : "Mettre à jour"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
