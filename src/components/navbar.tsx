// import DarkLightModeButton from "./dark-light-button";

import AddColumns from "@/app/_components/add-column";

const Navbar = () => {
    return (<div className="flex items-center justify-center w-full mx-auto px-4  " >
        <div className="flex items-center justify-between w-full py-3  border-b-2 border-zinc-600  ">
            <h1 className="text-2xl font-bold ">Tender Tasks</h1>
            {/* 
            <DarkLightModeButton /> */}
            <AddColumns />
        </div>

    </div>);
}

export default Navbar;