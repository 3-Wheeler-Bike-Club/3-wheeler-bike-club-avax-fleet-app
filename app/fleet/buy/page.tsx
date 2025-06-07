import { Wrapper } from "@/components/fleet/buy/wrapper";                   

export default async function Buy() {
    return (

        <main className="flex flex-col w-screen h-screen bg-[url('/images/dodo.svg')] bg-center bg-cover">
            <div className="w-full bg-yellow-500 text-black py-1 text-center font-bold z-50">
                <p>⚠️ Test Mode: Do not use real funds. Contact us at <a href="https://t.me/threeWB" className="text-blue-500">https://t.me/threeWB</a> for test tokens.</p>
            </div>
            <Wrapper/>
        </main>
    )
}


