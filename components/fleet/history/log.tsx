import { TableCell, TableRow } from "@/components/ui/table";
import { useGetBlockTime } from "@/hooks/useGetBlockTime";
import { shortenTxt } from "@/utils/shorten";
import { ChartPie, Circle, RefreshCw } from "lucide-react";

interface LogProps{
    log: any
}


export function Log({ log }: LogProps) {

    
   const { blockTime } = useGetBlockTime(log.blockNumber);


    return (
        <>
            <TableRow className="flex w-full items-center h-12">
                <TableCell className="w-1/4">{log.eventName === "FleetOrdered" ? log.args.ids.join(",") : log.eventName === "FleetFractionOrdered" ? log.args.id : log.args.ids.join(",")}</TableCell>
                <TableCell className="w-1/4">
                    {   
                        log.eventName === "FleetOrdered" 
                        ? <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-yellow-600"/> <p>{log.args.ids.length}</p></div> 
                        : log.eventName === "FleetFractionOrdered" 
                            ? <><div className="flex items-center gap-2"><ChartPie className="h-4 w-4 text-yellow-600"/> <p className="text-xs">{log.args.fractions} / 50</p></div></> 
                            : <><div className="flex items-center gap-2"><div className="flex flex-col items-center relative"><Circle className="h-3.5 w-3.5 text-yellow-600 absolute opacity-70"/> <Circle className="h-3.5 w-3.5 text-yellow-600 translate-y-1.5 opacity-70"/> </div> <p className="text-xs">{log.args.fractions[0]} /  {log.args.fractions[1]}</p></div></> 
                    }
                </TableCell>
                <TableCell className="w-1/4">
                    <a 
                        href={`https://celoscan.io/tx/${log.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-600 cursor-pointer underline decoration-yellow-600"
                    >
                        {shortenTxt(log.transactionHash)}
                    </a>
                </TableCell>
                <TableCell className="w-1/4">{new Date(Number(blockTime) * 1000).toLocaleDateString()}</TableCell>
            </TableRow>
        </>
    )
}
