"use client"

import { Caravan, HandCoins, OctagonMinus, Warehouse } from "lucide-react";
import { Menu } from "../top/menu"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

import { useBlockNumber, useReadContract, useAccount } from 'wagmi'
import { useRouter } from "next/navigation";
import { fleetOrderBook } from "@/utils/constants/addresses";
import { fleetOrderBookAbi } from "@/utils/abis/fleetOrderBook";
import { Logs } from "./history/logs";
import { CarouselApi, CarouselContent, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Carousel } from "../ui/carousel";
import { Id } from "./id";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Returns } from "./withdraw/returns";


export function Wrapper() {

    const router = useRouter();

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    const [progress, setProgress] = useState<number | null>(null)

    useEffect(() => {
        if (!api) {
          return
        }
     
        setCurrent(api.selectedScrollSnap() + 1)
     
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    
    const { address, isConnected } = useAccount()



    const fleetOwnedQueryClient = useQueryClient() 
    const maxFleetOrderQueryClient = useQueryClient() 
    const totalFleetQueryClient = useQueryClient()
    const lastFleetFractionQuerClient = useQueryClient()
    const totalFractionsQueryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true }) 

    // read balance of fleet owned
    const { data: fleetOwned, queryKey: fleetOwnedQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "getFleetOwned",
        args: [ address! ],
    });
    useEffect(() => { 
        fleetOwnedQueryClient.invalidateQueries({ queryKey: fleetOwnedQueryKey }) 
    }, [blockNumber, fleetOwnedQueryClient, fleetOwnedQueryKey]) 

    // read balance of max fleet order
    const { data: maxFleetOrder, queryKey: maxFleetOrderQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "maxFleetOrder",
    });
    useEffect(() => { 
        maxFleetOrderQueryClient.invalidateQueries({ queryKey: maxFleetOrderQueryKey }) 
    }, [blockNumber, maxFleetOrderQueryClient, maxFleetOrderQueryKey]) 


    // read balance of total fleet ordered
    const { data: totalFleet, queryKey: totalFleetQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "totalFleet",
    });
    useEffect(() => { 
        totalFleetQueryClient.invalidateQueries({ queryKey: totalFleetQueryKey }) 
    }, [blockNumber, totalFleetQueryClient, totalFleetQueryKey]) 

    // read last fleet fraction 
    const { data: lastFleetFractionID, queryKey: lastFleetFractionQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "lastFleetFractionID",
    });
    useEffect(() => { 
        lastFleetFractionQuerClient.invalidateQueries({ queryKey: lastFleetFractionQueryKey }) 
    }, [blockNumber, lastFleetFractionQuerClient, lastFleetFractionQueryKey]) 
    
    // read balance of total fraction
    const { data: totalFractions, queryKey: totalFractionsQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "totalFractions",
        args: [lastFleetFractionID!]
    });
    useEffect(() => { 
        totalFractionsQueryClient.invalidateQueries({ queryKey: totalFractionsQueryKey }) 
    }, [blockNumber, totalFractionsQueryClient, totalFractionsQueryKey]) 

    
    useEffect(() => {
        if (totalFractions) {
            const totalFractionsSold = Number(totalFractions) + ((Number(totalFleet) - 1) * 50)

            const totalFractionsAvailable = Number(maxFleetOrder) * 50

            const value = (totalFractionsSold / totalFractionsAvailable) * 100
            setProgress(value)
        }
    }, [totalFractions, totalFleet, maxFleetOrder])
    
    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
            <Menu/>

            <div className="flex w-full justify-center">
                <Alert className="w-full max-w-[66rem]">
                    <Caravan className="h-4 w-4" />
                    <AlertTitle className="font-bold"> Manage Fleet!</AlertTitle>
                    <AlertDescription className="text-xs italic">
                        <p className="max-md:text-[11px]">Pre-order 3-Wheelers & track the returns</p>
                        <div className="flex w-full flex-col gap-2 mt-2">
                            
                            <Progress value={progress} className="w-full h-2" />
                            <div className="flex justify-between text-[0.7rem] text-[9px] text-muted-foreground">
                                <span>{(progress?.toFixed(2))}% complete</span>
                                <span>{Number(maxFleetOrder) - Number(totalFleet)} units, {50 - Number(totalFractions)} fractions left</span>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>
            </div>

            <div className="flex w-full items-center justify-center">
                <div className="flex w-full max-w-[66rem] gap-4">
                    <div className="flex w-full gap-2 justify-between">
                        <div/>
                        <div className="flex gap-2">
                            <Button 
                                disabled={!isConnected}
                                className="max-w-fit h-12 rounded-xl"
                                onClick={() => router.push("/fleet/buy")}
                            >
                                <HandCoins />
                                <p>Buy 3-Wheeler</p>
                            </Button>
                            {
                                fleetOwned && fleetOwned.length >= 1 && (
                                    <div className="flex gap-2">
                                        <Logs/>
                                        <Returns/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full h-full justify-center">
                {
                    !fleetOwned && (
                        <div className="flex w-full max-w-[66rem] gap-4">
                            <div className="flex w-full justify-center">
                                <p>loading...</p>
                            </div>
                        </div>
                    )
                }
                {fleetOwned && fleetOwned.length < 1 && (
                    <div className="flex w-full h-full max-w-[66rem] gap-4">
                        <div className="flex flex-col w-full h-full items-center pt-36 max-md:pt-18 gap-4">
                            <OctagonMinus className="h-40 w-40 max-md:h-30 max-md:w-30 text-yellow-500" />
                            <p className="text-2xl max-md:text-xl text-center font-bold">Your fleet is empty.</p>
                            <p className="text-sm max-md:text-xs text-center text-muted-foreground">Get fractional or full ownership of a 3-wheeler to start earning.</p>
                        </div>
                    </div>
                    )
                }
                { fleetOwned && fleetOwned.length >= 1 && (
                    <div className="max-w-[66rem] w-full flex flex-col gap-6">
                        <Carousel className="w-full max-md:mb-10" setApi={setApi}>
                            <div className="flex flex-col w-full mt-6 mb-2 px-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Total Fleet</span>            
                                </div>
                                <div className="flex items-center gap-1">
                                    <Warehouse className="h-6 w-6 text-primary"/>~
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">{current} /</span>
                                        <span className="text-2xl font-bold">{fleetOwned.length}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <CarouselContent>
                                {Array.from(fleetOwned).map((fleet) => (
                                <Id key={fleet} fleet={fleet} />
                                ))}
                            </CarouselContent>
                            <div className="flex absolute top-14 right-14">
                                <CarouselPrevious variant="default"/>
                                <CarouselNext variant="default" />
                            </div>
                        </Carousel>
                    </div>
                )}
                
            </div>
        </div>
    );
}