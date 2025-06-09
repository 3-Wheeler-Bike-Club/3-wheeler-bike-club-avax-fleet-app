"use client"

import { useRouter } from "next/navigation";
import { useBlockNumber, useReadContract, useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChartPie, Ellipsis, Minus, Plus, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { fleetOrderToken, fleetOrderBook } from "@/utils/constants/addresses";
import { fleetOrderBookAbi } from "@/utils/abis/fleetOrderBook";
import { encodeFunctionData, erc20Abi, formatUnits, maxUint256, parseUnits } from "viem";
import { avalanche } from "viem/chains";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useSendTransaction } from "wagmi";
import { publicClient } from "@/utils/client";
import { fleetOrderTokenAbi } from "@/utils/abis/fleetOrderToken";




export function Wrapper() {

    const { address, chainId } = useAccount()
    const { switchChainAsync } = useSwitchChain()
    
    const [amount, setAmount] = useState(1)
    const [fractions, setFractions] = useState(1)
    const [loadingUSD, setLoadingUSD] = useState(false)
    const [isFractionsMode, setIsFractionsMode] = useState(true)

    const router = useRouter()
    

    const fleetFractionPriceQueryClient = useQueryClient()
    const allowanceDollarQueryClient = useQueryClient()
    const testTokenBalanceQueryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true }) 

    const { writeContractAsync } = useWriteContract();
    const { sendTransactionAsync } = useSendTransaction();



    //increase and decrease amount...
    const increase = () => setAmount((prev) => prev + 1);
    const decrease = () => setAmount((prev) => (prev > 1 ? prev - 1 : 1));
    //..and fractions
    const increaseFractions = () => {
        setFractions((prev) => {
            const newValue = prev + 1;
            if (newValue >= 50) {
                setIsFractionsMode(false);
                return 50;
            }
            return newValue;
        });
    };
    const decreaseFractions = () => setFractions((prev) => (prev > 1 ? prev - 1 : 1));

    
   
    const { data: fleetFractionPrice, queryKey: fleetFractionPriceQueryKey } = useReadContract({
        abi: fleetOrderBookAbi,
        address: fleetOrderBook,
        functionName: "fleetFractionPrice",
    })
    useEffect(() => { 
        fleetFractionPriceQueryClient.invalidateQueries({ queryKey: fleetFractionPriceQueryKey }) 
    }, [blockNumber, fleetFractionPriceQueryClient, fleetFractionPriceQueryKey]) 



    const { data: allowanceUSD, isLoading: allowanceDollarLoading, queryKey: allowanceDollarQueryKey } = useReadContract({
        abi: erc20Abi,
        address: fleetOrderToken/*cUSD*/,
        functionName: "allowance",
        args: [address!, fleetOrderBook],
    })
    useEffect(() => { 
        allowanceDollarQueryClient.invalidateQueries({ queryKey: allowanceDollarQueryKey }) 
    }, [blockNumber, allowanceDollarQueryClient, allowanceDollarQueryKey])
    console.log(allowanceUSD)


    const { data: testTokenBalance, queryKey: testTokenBalanceQueryKey } = useReadContract({
        abi: erc20Abi,
        address: fleetOrderToken,
        functionName: "balanceOf",
        chainId: avalanche.id,
        args: [address!],

    })
    useEffect(() => { 
        testTokenBalanceQueryClient.invalidateQueries({ queryKey: testTokenBalanceQueryKey }) 
    }, [blockNumber, testTokenBalanceQueryClient, testTokenBalanceQueryKey]) 
    console.log(testTokenBalance!)

    async function getTestTokens() {
        try {
            setLoadingUSD(true)
            if (chainId !== avalanche.id) {
                await switchChainAsync({ chainId: avalanche.id })
            }
            const hash = await sendTransactionAsync({
                to: fleetOrderToken,
                data: encodeFunctionData({
                    abi: fleetOrderTokenAbi,
                    functionName: "dripPayeeFromPSP",
                    args: [address!, parseUnits("1500000", 18)],
                }),
                chainId: avalanche.id,
            })
            const transaction = await publicClient.waitForTransactionReceipt({
                confirmations: 1,
                hash: hash
            })

            if (transaction) {
                toast.success("Test Tokens Received", {
                    description: `You can now make orders to your fleet with test tokens`,
                })
                setLoadingUSD(false)
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Transaction failed", {
                description: `Something went wrong, please try again`,
            })
            setLoadingUSD(false)
        }
    }

    // approve USD (unlimited)
    async function approveUSD() {
        try {
            setLoadingUSD(true)
            if (chainId !== avalanche.id) {
                await switchChainAsync({ chainId: avalanche.id })
            }
            await writeContractAsync({
                abi: erc20Abi,
                address: fleetOrderToken/*USDT*/,
                functionName: "approve",
                args: [fleetOrderBook, (maxUint256) ],
            },{
                onSuccess() {
                    //approval toast
                    toast.info("Approval successful", {
                        description: `You can now purchase the ${amount > 1 ? "3-Wheelers" : " 3-Wheeler"}`,
                    })
                    setLoadingUSD(false)
                },
                onError(error) {
                    console.log(error)
                    toast.error("Approval failed", {
                        description: `Something went wrong, please try again`,
                    })
                    setLoadingUSD(false)
                }
            });
        } catch (error) {
            console.log(error)
            setLoadingUSD(false)
        }
    }


    // order multiple fleet with celoUSD
    async function orderFleetWithCeloUSD() { 
        try {
            setLoadingUSD(true)
            if (chainId !== avalanche.id) {
                await switchChainAsync({ chainId: avalanche.id })
            }
            const hash = await sendTransactionAsync({
                to: fleetOrderBook,
                data: encodeFunctionData({
                    abi: fleetOrderBookAbi,
                    functionName: "orderFleet",
                    args: [BigInt(amount), fleetOrderToken/*cUSD*/],
                }),
                chainId: avalanche.id,
            })
            const transaction = await publicClient.waitForTransactionReceipt({
                confirmations: 1,
                hash: hash
            })
              
            if (transaction) {
                //success toast
                toast.success("Purchase successful", {
                    description: `You can now view your ${amount > 1 ? "3-Wheelers" : " 3-Wheeler"} in your fleet`,
                })
                setLoadingUSD(false)
                router.push("/fleet")
            }
        } catch (error) {
            console.log(error)
            toast.error("Purchase failed", {
                description: `Something went wrong, please try again`,
            })
            setLoadingUSD(false)
        }
    }


    // order fleet fractions & single 3-Wheeler with celoUSD
    async function orderFleetFractionsWithCeloUSD( shares: number ) {    
        try {
            setLoadingUSD(true)
            if (chainId !== avalanche.id) {
                await switchChainAsync({ chainId: avalanche.id })
            }
            const hash = await sendTransactionAsync({
                to: fleetOrderBook,
                data: encodeFunctionData({
                    abi: fleetOrderBookAbi,
                    functionName: "orderFleetFraction",
                    args: [BigInt(shares), fleetOrderToken/*cUSD*/],
                }),
                chainId: avalanche.id,
            })
            const transaction = await publicClient.waitForTransactionReceipt({
                confirmations: 1,
                hash: hash
            })

            if (transaction) {
                //success toast
                toast.success("Purchase successful", {
                    description: `You can now view your 3-Wheeler ${shares == 50 ? "" : `${shares > 1 ? "fractions" : "fraction"}`} in your fleet`,
                })

                setLoadingUSD(false)
                router.push("/fleet")
            }
        } catch (error) {
            console.log(error)
            toast.error("Purchase failed", {
                description: `Something went wrong, please try again`,
            })
            setLoadingUSD(false)
        }
    }

    return (
        <div className="flex flex-col w-full h-full items-center gap-8 p-24 max-md:p-6">
            <Drawer open={true}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm pb-6">
                        <DrawerHeader className="max-md:gap-[0.1rem]">
                            <DrawerTitle>
                                {isFractionsMode ? "Purchase 3-Wheeler Fractions" : "Purchase a 3-Wheeler"}
                            </DrawerTitle>
                            <DrawerDescription className="text-xs">Choose the amount of {isFractionsMode ? "fractions" : "3-Wheelers"} to purchase.</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 p-4 pb-0">
                            
                            <div className="flex items-center justify-center space-x-2">
                                <div>
                                    <Image className="max-md:w-[80px] max-md:h-[80px]" src="/images/kekeHero.svg" alt="3-Wheeler" width={100} height={100} />
                                </div>
                                <div className="text-xl font-bold">
                                    ~
                                </div>
                                <div className="text-xl font-bold">
                                    {isFractionsMode ? Math.ceil(fractions * ( Number(fleetFractionPrice) )) : Math.ceil(amount * (Number(fleetFractionPrice) * 50))} <span className="text-muted-foreground">USD</span>
                                </div>
                            </div>  


                        <div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={isFractionsMode ? decreaseFractions : decrease}
                                        disabled={isFractionsMode ? fractions <= 1 : amount <= 1}

                                    >
                                        <Minus />
                                        <span className="sr-only">Decrease</span>
                                    </Button>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="flex-1 text-center">
                                            
                                            <div className="text-7xl max-md:text-5xl font-bold tracking-tighter">
                                            {isFractionsMode ? fractions : amount}
                                            </div>
                                            <div className="text-[0.70rem] max-md:text-[0.6rem] uppercase text-muted-foreground">
                                                No. of {isFractionsMode ? "Fractions" : "3-Wheelers"}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={isFractionsMode ? increaseFractions : increase}
                                        disabled={isFractionsMode ? fractions >= 50 : amount >= 10}
                                    >
                                        <Plus />
                                        <span className="sr-only">Increase</span>

                                    </Button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 py-14 px-4 pb-6">
                                <div className="flex w-full justify-between">
                                    
                                    {/**pay with celoUSD */}
                                    <Button 
                                        className={` ${allowanceUSD && allowanceUSD > 0 ? "w-full hover:bg-yellow-600" : "w-full bg-yellow-300 hover:bg-yellow-400"}` }
                                        disabled={loadingUSD} 
                                        onClick={() => {
                                            if (allowanceUSD && allowanceUSD > 0) {
                                                if (isFractionsMode) {
                                                    orderFleetFractionsWithCeloUSD(fractions)
                                                } else {
                                                    orderFleetWithCeloUSD()
                                                }
                                            } else {

                                                if ( (Number(formatUnits(testTokenBalance!, 18))) <= 2000 ) {
                                                    getTestTokens()
                                                } else {
                                                    if ((Number(formatUnits(allowanceUSD!, 18))) === 0) {
                                                        approveUSD()
                                                    } else {
                                                        toast.error("Already approved!", {
                                                            description: "You are have already approved & registered to a provider",
                                                        })
                                                    }
                                                }
                                                
                                            }
                                        }}
                                    >
                                        {
                                            loadingUSD
                                            ? (
                                                <>
                                                    <motion.div
                                                        initial={{ rotate: 0 }}
                                                        animate={{ rotate: 360 }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                        }}
                                                    >
                                                        <Ellipsis/>
                                                    </motion.div>
                                                </>
                                            )
                                            : (
                                                <>
                                                <>
                                                    {
                                                        allowanceDollarLoading ? (
                                                        <></>
                                                        )  
                                                        : (
                                                            <>
                                                                {
                                                                    allowanceUSD && allowanceUSD > 0 ? "Pay with USD" : `${( (Number(formatUnits(testTokenBalance!, 18))) <= 2000 ) ? "Get Test USD" : "Approve USD"}`
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                                    
                                                </>
                                            )
                                        }
                                    </Button>
                                </div>
                                <DrawerClose asChild>
                                    <Button className="w-full" variant="outline" onClick={() => router.push("/fleet")}>Cancel</Button>
                                </DrawerClose>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="fractions-mode">
                                        {isFractionsMode ? <ChartPie className="h-7 w-7 text-yellow-600"/> : <ChartPie className="h-6 w-6 text-muted-foreground"/>}
                                    </Label>
                                    <Switch checked={!isFractionsMode} onCheckedChange={() => {
                                        setIsFractionsMode(!isFractionsMode);
                                        setFractions(1);
                                        setAmount(1);
                                    }} id="fractions-mode" />
                                    <Label htmlFor="single-mode">
                                        {isFractionsMode ? <RefreshCw className="h-6 w-6 text-muted-foreground"/> : <RefreshCw className="h-7 w-7 text-yellow-600"/>}
                                    </Label>
                                </div>
                                <div className="text-xs text-muted-foreground max-md:text-[11px] text-center">
                                    <p>Toggle between buying fractions or a single 3-Wheeler</p>
                                </div>
                            </div>
                        <DrawerFooter>
                            
                        </DrawerFooter>
                    </div>

                </DrawerContent>
            </Drawer>
        </div>
    );
}