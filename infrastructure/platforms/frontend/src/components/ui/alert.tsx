'use client';
import React from "react";

interface AlertProps {
    variant?: "destructive" | "success";
    children: React.ReactNode;
}

export function Alert({ variant = "success", children }: AlertProps) {
    const bgColor = variant === "destructive" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";
    return <div className={`p-4 rounded-lg ${bgColor}`}>{children}</div>;
}

interface AlertTitleProps {
    children: React.ReactNode;
}

export function AlertTitle({ children }: AlertTitleProps) {
    return <h3 className="font-bold">{children}</h3>;
}

interface AlertDescriptionProps {
    children: React.ReactNode;
}

export function AlertDescription({ children }: AlertDescriptionProps) {
    return <p className="text-sm">{children}</p>;
}
