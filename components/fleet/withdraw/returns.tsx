"use client"


import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../../ui/button";
import { BanknoteArrowUp } from "lucide-react";
import { useAccount } from "wagmi";




export function Returns() {
    
    const { address } = useAccount()



    return (
        <>
        <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="max-w-fit h-12 rounded-2xl">
                        <BanknoteArrowUp className="text-yellow-600" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full">
                <div className="mx-auto w-full max-w-sm pb-6">
                    <DrawerHeader>
                        <DrawerTitle>
                            Withdraw ROI
                        </DrawerTitle>
                        <DrawerDescription className="max-md:text-[0.9rem]">View your fleet earnings & withdraw.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 p-4 pb-0">
                    

                    </div>
                </div>
                </DrawerContent>
        </Drawer>
        </>
    );
}