import { useRouter } from "next/navigation"
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger 
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { useDisconnect } from "wagmi"

export function Logout () {
    
    const { disconnect } = useDisconnect()
    const router = useRouter()

    
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2" variant="outline">
                    <LogOut className="text-yellow-600"/>
                    <span className="max-md:hidden">Logout</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will log you out of your 3-Wheeler Fleet. You can no longer view your balances & earnings
                    unless you login again!.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button
                        onClick={async ()=>{
                            disconnect()
                            router.push("/")
                        }}
                        className="gap-2"
                    >
                        <LogOut/>
                        Continue
                    </Button>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}