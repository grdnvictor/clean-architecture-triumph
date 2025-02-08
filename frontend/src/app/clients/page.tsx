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

export default function ClientsPage() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/clients")
            .then((response) => response.json())
            .then((data) => setClients(data))
            .catch((error) =>
                console.error("Erreur lors de la récupération des clients :", error)
            );
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Liste des Clients</h1>
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Créé le</TableHead>
                            <TableHead>Mis à jour le</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.id}</TableCell>
                                <TableCell>{client.firstname}</TableCell>
                                <TableCell>{client.lastname}</TableCell>
                                <TableCell>{client.userid}</TableCell>
                                <TableCell>
                                    {new Date(client.createdat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(client.updatedat).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-8">
                <Button>Ajouter un client</Button>
            </div>
        </div>
    );
}
