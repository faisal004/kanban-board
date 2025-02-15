import Navbar from "@/components/navbar";
import Columns from "./_components/columns";

export default function Home() {
  return (
    <>
         <div className='mx-auto w-full container h-screen  flex items-center justify-center '>
          <div className="bg-zinc-800  rounded-xl w-full px-3 py-2 ">
          <Navbar/>
          <Columns />
          </div>
         
      </div>
    </>
  );
}
