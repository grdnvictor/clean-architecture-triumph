"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EditConcessionPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        siret: "",
        phoneNumber: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            console.log("Récupération des données de la concession:", id);
            fetch(`http://localhost:8000/concessions/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Données reçues:", data);
                    setFormData({
                        name: data.name || "",
                        siret: data.siret || "",
                        // Certains endpoints renvoient "phoneNumber", d'autres "phonenumber"
                        phoneNumber: data.phoneNumber || data.phonenumber || "",
                        address: data.address || ""
                    });
                })
                .catch(() => setError("Erreur lors de la récupération de la concession"));
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
            const response = await fetch(`http://localhost:8000/concessions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la concession");
            }

            router.push("/concessions");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <Card className="mx-auto w-[400px]">
                <CardHeader>
                    <CardTitle>Modifier la Concession</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="siret">Siret</Label>
                            <Input
                                id="siret"
                                name="siret"
                                value={formData.siret}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber">Téléphone</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="address">Adresse</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
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
