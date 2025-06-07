import { Wrapper } from "@/components/landing/wrapper";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full">
        <div
          className="
            absolute inset-0
            bg-[url('/images/dodo.svg')]
            bg-center bg-cover
            opacity-23      /* adjust to taste */
            -z-10
          "
        />
        
        <div className="w-full bg-yellow-500 text-black py-1 text-center font-bold z-50">
          <p>⚠️ Test Mode: Do not use real funds. Contact us at <a href="https://t.me/threeWB" className="text-blue-500">https://t.me/threeWB</a> for test tokens.</p>
        </div>
        <Wrapper/>
    </div>
  );
}
