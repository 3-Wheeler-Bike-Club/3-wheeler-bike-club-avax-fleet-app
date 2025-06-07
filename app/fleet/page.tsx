import { Wrapper } from "@/components/fleet/wrapper";

export default function Fleet() {

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full bg-yellow-500 text-black py-1 text-center font-bold z-50">
        <p>⚠️ Test Mode: Do not use real funds. Contact us at <a href="https://t.me/threeWB" className="text-blue-500">https://t.me/threeWB</a> for test tokens.</p>
      </div>
      <Wrapper/>
    </div>
  );
}