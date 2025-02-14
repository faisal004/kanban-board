import DarkLightModeButton from "./dark-light-button";

const Navbar = () => {
    return (<div className="flex items-center justify-center w-full mx-auto" >
        <div className="flex items-center justify-between w-full p-3 container ">
            <h1 className="text-2xl font-bold ">Tender Tasks</h1>

            <DarkLightModeButton />

        </div>

    </div>);
}

export default Navbar;