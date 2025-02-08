"use client";
import { useState } from "react";

export default function AddMotorcycle() {
    const [formData, setFormData] = useState({
        vin: "",
        modelId: "",
        concessionId: "",
        currentMileage: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/motorcycles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Motorcycle added successfully");
                setFormData({ vin: "", modelId: "", concessionId: "", currentMileage: "" });
            } else {
                alert("Error adding motorcycle");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <h1>Add Motorcycle</h1>
            <form onSubmit={handleSubmit}>
                <label>VIN:</label>
                <input type="text" name="vin" value={formData.vin} onChange={handleChange} required />
                <br />

                <label>Model ID:</label>
                <input type="text" name="modelId" value={formData.modelId} onChange={handleChange} required />
         c       <br />

                <label>Concession ID:</label>
                <input type="text" name="concessionId" value={formData.concessionId} onChange={handleChange} required />
                <br />

                <label>Current Mileage:</label>
                <input type="number" name="currentMileage" value={formData.currentMileage} onChange={handleChange} required />
                <br />

                <button type="submit">Add Motorcycle</button>
            </form>
        </div>
    );
}