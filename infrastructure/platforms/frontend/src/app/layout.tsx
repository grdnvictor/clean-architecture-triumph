import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/hooks/useAuth";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triumph Management",
  description: "Triumph Management website made by Victor G, Estelle N, Alexandre A",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body>
        <header className="flex w-full bg-black h-[30px] items-center justify-center gap-4 text-white">
            TRIUMPH
        </header>
        <div>
            <AuthProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        <div className={"container mx-auto p-6 w-full"}>
                        {children}
                        </div>
                    </main>
                </SidebarProvider>
            </AuthProvider>
        </div>
        </body>
        </html>
    );
}
