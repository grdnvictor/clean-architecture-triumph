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

export default function ConcessionsPage() {
    // const authChecked = useRequireAuth();
    //
    // if (!authChecked) {
    //     return null;
    // }
    const [concessions, setConcessions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/concessions")
            .then((response) => response.json())
            .then((data) => setConcessions(data))
            .catch((error) =>
                console.error("Erreur lors de la récupération des concessions :", error)
            );
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/concessions/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de la concession");
            }
            setConcessions((prevConcessions) =>
                prevConcessions.filter((concession) => concession.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Liste des Concessions</h1>
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Adresse</TableHead>
                            <TableHead>Siret</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Créé le</TableHead>
                            <TableHead>Mis à jour le</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {concessions.map((concession) => (
                            <TableRow key={concession.id}>
                                <TableCell>{concession.id}</TableCell>
                                <TableCell>{concession.name}</TableCell>
                                <TableCell>{concession.address}</TableCell>
                                <TableCell>{concession.siret}</TableCell>
                                <TableCell>{concession.phonenumber}</TableCell>
                                <TableCell>
                                    {new Date(concession.createdat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(concession.updatedat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Trash
                                        onClick={() => handleDelete(concession.id)}
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
                    <Link href="/concessions/create">Ajouter une concession</Link>
                </Button>
            </div>
        </div>
    );
}
