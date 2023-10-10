import Image from "next/image";
import Makelogo from "./components/Makelogo";
import Slider from "./components/Slider";
import CTAsection from "./components/CTAsection";
import Search from "./components/Search";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full">
      <div className="grid p-0 grid-cols-1 md:grid-cols-6 gap-2 w-full md:p-1">
        <div className=" md:col-span-2  flex flex-col justify-center items-center">
          <Search/>
        </div>
        <div
          className=" md:col-span-4  bg-slate-400 min-h-full flex flex-col justify-center py-7"
        >
           <Makelogo/>
           <CTAsection />
        </div>
      </div>
    </main>
  );
}
