"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Wallet, TrendingUp, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function Wrapper() {

    
    const router = useRouter()
    console.log(router)

    const { connectAsync } = useConnect()

    const { isConnected } = useAccount()
    
    async function Login() {
        if (!isConnected) {
            await connectAsync({ connector: injected() })
            
            router.push("/fleet")
            
        }
        if (isConnected) {
            router.push("/fleet")
        }
    }
   
    

    return (
        <div className="flex flex-col items-center justify-between min-h-screen p-8 space-y-12">
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
                <div className="relative w-48 h-48 mb-12">
                    <Image
                        src="/icons/logo.png"
                        alt="3WB Logo"
                        fill
                        className="rounded-3xl"
                        priority
                    />
                </div>
                
                <h1 className="text-6xl max-sm:text-3xl font-bold mb-6 text-center">Welcome to 3WB Fleet Finance</h1>
                <p className="text-2xl max-sm:text-lg mb-16 text-center max-w-3xl">
                    {"Invest in Africa's three-wheeler future"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-16">
                    <div className="flex flex-col items-center p-8 rounded-2xl border">
                        <TrendingUp className="w-16 h-16 mb-6" />
                        <h3 className="text-lg text-center font-semibold mb-4">High Returns</h3>
                        <p className="text-center text-sm">Earn up to 2x returns on fleet investments</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-8 rounded-2xl border">
                        <ShieldCheck className="w-16 h-16 mb-6" />
                        <h3 className="text-lg text-center font-semibold mb-4">Secure Investment</h3>
                        <p className="text-center text-sm">Asset-backed by real three-wheeler fleets</p>
                    </div>

                    <div className="flex flex-col items-center p-8 rounded-2xl border">
                        <Wallet className="w-16 h-16 mb-6" />
                        <h3 className="text-lg text-center font-semibold mb-4">Passive Income</h3>
                        <p className="text-center text-sm">Regular returns from fleet operations</p>
                    </div>
                </div>

                <Button 
                    onClick={Login} 
                    //disabled={isConnected}
                    className="w-64 h-16 text-base font-semibold rounded-3xl"
                >
                    <p>START EARNING</p>
                </Button>
                
            </div>

            <footer className="w-full text-center py-4 text-sm">
                {"© 2025 3WB LABS INC. <> 3WB GHANA LTD. All rights reserved."}
            </footer>
        </div>
    );
}