import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
    description: "Estelle, Alexandre, Victor",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className="flex flex-col min-h-screen">
        <header className="flex w-full bg-black h-[30px] items-center justify-center">
            <Image
                src="https://www.triumphmotorcycles.fr/media-library/misc/misc-images/logo.svg"
                alt="Logo Triumph"
                width={100}
                height={30}
            />
        </header>

        <div className="flex-grow">
            <AuthProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="relative">
                        <SidebarTrigger className="z-[999] absolute bg-white" />
                        <div className="container mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </AuthProvider>
        </div>

        <footer className="flex w-full bg-black h-[300px] items-center justify-center">
            salut
        </footer>
        </body>
        </html>
    );
}
