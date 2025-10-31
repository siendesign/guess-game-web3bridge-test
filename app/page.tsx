import GuessGame from "@/components/GuessGame";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <GuessGame/>
    </div>
  );
}
