'use client';

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="relative">
            <div
                className="w-[100vw]  h-[100vh] -z-[100] bg-cover bg-center flex flex-col items-center justify-center gap-2"
                style={{
                    backgroundImage: `url("https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/offers/tiger-1200_all-family_my22_hero-latestoffers-l.jpg")`,
                }}
            >
                <h1 className={"text-[32px] text-white font-semibold text-center"}>INTERFACE DE GESTION TRIUMPH</h1>
                <p className={"text-[24px] text-white text-center"}>Triumph et vous, ensemble au service de vos clients</p>
                <div className="relative z-50 pointer-events-auto flex items-center justify-center gap-6">
                    <Button className="p-6 rounded-none bg-white text-black hover:text-white cursor-pointer">
                        Clients
                    </Button>
                    <Button className="p-6 rounded-none bg-white text-black hover:text-white cursor-pointer">
                        Motos
                    </Button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
