
import { CarouselItem } from "../ui/carousel"
import { CardContent } from "../ui/card"
import { Card } from "../ui/card"
import Image from "next/image"
import { useBlockNumber, useReadContract, useAccount } from "wagmi"
import { fleetOrderBookAbi } from "@/utils/abis/fleetOrderBook"
import { fleetOrderBook } from "@/utils/constants/addresses"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"



interface IdProps {
    fleet: BigInt
}

export function Id( {fleet}: IdProps ) {    

    const { address } = useAccount()

    const isfleetFractionedQueryClient = useQueryClient()
    const fleetSharesQueryClient = useQueryClient()
    const totalFractionsQueryClient = useQueryClient()
    const fleetOrderStatusQueryClient = useQueryClient()
    const fleetFractionPriceQueryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true }) 

    const { data: isfleetFractioned, queryKey: isfleetFractionedQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "fleetFractioned",
        args: [BigInt(Number(fleet))],
    })
    useEffect(() => { 
        isfleetFractionedQueryClient.invalidateQueries({ queryKey: isfleetFractionedQueryKey }) 
    }, [blockNumber, isfleetFractionedQueryClient, isfleetFractionedQueryKey]) 


    const { data: fleetShares, queryKey: fleetSharesQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "balanceOf",
        args: [address as `0x${string}`, BigInt(Number(fleet))],
    })
    useEffect(() => { 
        fleetSharesQueryClient.invalidateQueries({ queryKey: fleetSharesQueryKey }) 
    }, [blockNumber, fleetSharesQueryClient, fleetSharesQueryKey]) 


    const { data: totalFractions, queryKey: totalFractionsQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "totalFractions",
        args: [BigInt(Number(fleet))],
    })
    useEffect(() => { 
        totalFractionsQueryClient.invalidateQueries({ queryKey: totalFractionsQueryKey }) 
    }, [blockNumber, totalFractionsQueryClient, totalFractionsQueryKey]) 


    const { data: fleetOrderStatus, queryKey: fleetOrderStatusQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "getFleetOrderStatus",
        args: [BigInt(Number(fleet))],
    })
    useEffect(() => { 
        fleetOrderStatusQueryClient.invalidateQueries({ queryKey: fleetOrderStatusQueryKey }) 
    }, [blockNumber, fleetOrderStatusQueryClient, fleetOrderStatusQueryKey]) 


    
   
    const { data: fleetFractionPrice, queryKey: fleetFractionPriceQueryKey } = useReadContract({
        abi: fleetOrderBookAbi,
        address: fleetOrderBook,
        functionName: "fleetFractionPrice",
    })
    useEffect(() => { 
        fleetFractionPriceQueryClient.invalidateQueries({ queryKey: fleetFractionPriceQueryKey }) 
    }, [blockNumber, fleetFractionPriceQueryClient, fleetFractionPriceQueryKey]) 


    
    return (
        <>
            <CarouselItem key={Number(fleet)}>
                <div className="p-1">
                    <Card className="bg-[url('/images/dodo.svg')] bg-center bg-cover">
                        <CardContent className="flex items-center justify-center p-6">
                        <Image src="/images/kekeHero.svg" alt={""} width={500} height={500} />
                        </CardContent>
                    </Card>
                    <div className="flex flex-col gap-1 mt-2 text-base">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Fleet ID:</span>
                            <span className="text-right">{Number(fleet)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Fleet Status:</span>
                            <span className="text-right">{fleetOrderStatus}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Ownership:</span>
                            <span className="text-right">{isfleetFractioned ? "Fractioned" : "Full"}</span>
                        </div>
                        {
                            isfleetFractioned && (
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Shares:</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-right font-bold">{fleetShares}</span>
                                        <span className="text-muted-foreground"> / </span>
                                        <span className="text-right font-semibold italic">{totalFractions}</span>
                                        <span className="text-muted-foreground"> / </span>
                                        <span className="text-muted-foreground italic">50</span>
                                    </div>
                                </div>
                            )
                        }
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Capital:</span>
                            <span className="text-right"><span className="font-bold text-muted-foreground">$ </span>{isfleetFractioned ? `${fleetFractionPrice! * fleetShares!}` : `${50 * Number(fleetFractionPrice!)}`}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Yield Period:</span>
                            <span className="text-right">60 weeks ~ 1 year</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Start Date:</span>
                            <span className="text-right italic">pending assignment...</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Weekly ROI:</span>
                            <span className="text-right"><span className="font-bold text-muted-foreground" >$</span> {isfleetFractioned ? `${((( Number(fleetFractionPrice!) * Number(fleetShares!) ) * 1.75) / 60).toFixed(4)}` : `${(( (50 * Number(fleetFractionPrice!)) * 1.75 ) / 60).toFixed(4)}`}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total ROI <span className="text-muted-foreground italic text-yellow-800">(75%)</span>:</span>
                            <span className="text-right"><span className="font-bold text-muted-foreground" >$</span> {isfleetFractioned ? `${ (( Number(fleetFractionPrice!) * Number(fleetShares!) ) * 1.75).toFixed(2) }` : `${ (( 50 * Number(fleetFractionPrice!) ) * 1.75).toFixed(2) }`}</span>
                        </div>
                    </div>
                </div>
            </CarouselItem>
        </>
    )
}
