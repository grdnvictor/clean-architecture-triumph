"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash } from "lucide-react";
import {useRequireAuth} from "@/hooks/useRequireAuth";

export default function MotorcyclesPage() {
    const authChecked = useRequireAuth();

    if (!authChecked) {
        return null;
    }

    const [motorcycles, setMotorcycles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/motorcycles")
            .then((response) => response.json())
            .then((data) => setMotorcycles(data))
            .catch((error) =>
                console.error("Erreur lors de la récupération des motos :", error)
            );
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/motorcycles/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du client");
            }
            setMotorcycles((prevMotorcycles) =>
                prevMotorcycles.filter((motorcycle) => motorcycle.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Liste des Motos</h1>

            {/* Wrapper pour le tableau en full width avec scroll horizontal si nécessaire */}
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>VIN</TableHead>
                            <TableHead>Model ID</TableHead>
                            <TableHead>Concession ID</TableHead>
                            <TableHead>Kilométrage</TableHead>
                            <TableHead>Créé le</TableHead>
                            <TableHead>Mis à jour le</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {motorcycles.map((moto) => (
                            <TableRow key={moto.id}>
                                <TableCell>{moto.id}</TableCell>
                                <TableCell>{moto.vin}</TableCell>
                                <TableCell>{moto.modelid}</TableCell>
                                <TableCell>{moto.concessionid}</TableCell>
                                <TableCell>{moto.currentmileage}</TableCell>
                                <TableCell>
                                    {new Date(moto.createdat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(moto.updatedat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Trash
                                        onClick={() => handleDelete(moto.id)}
                                        className="text-red-500 w-4 h-4 cursor-pointer"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-8">
                <Button>
                    <Link href="/motorcycles/create">Ajouter une moto</Link>

                    </Button>
            </div>
        </div>
    );
}
