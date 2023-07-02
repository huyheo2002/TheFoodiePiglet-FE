import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { BellIcon, MessageIcon, UserIcon, MemuAltLeftIcon, MemuIcon } from "../../../../components/Icons";
import { handleCloseSidebar, handleOpenSidebar } from "../../../../redux/actions/adminAction";

function Header() {
    const dispatch = useDispatch();
    const toggleSidebar = useSelector(states => states.admin.toggleSidebar)
    // console.log("toggleSidebar", toggleSidebar)

    const handleToggleSidebar = () => {
        if(toggleSidebar === true) {
            dispatch(handleCloseSidebar())
        } else {
            dispatch(handleOpenSidebar())
        }
    }
    return (  
        <div className={clsx("bg-white h-16 mx-3 mt-2 px-4 py-2 fixed z-50 w-[calc(100%-300px-1.5rem)] flex justify-between items-center rounded-lg shadow-black-rb-0.35", {
            "!w-[calc(100%-1.5rem)]": toggleSidebar === false
        })}>
            <div className="flex items-center">
                <span className="group px-2 py-2 inline-block relative rounded-full hover:bg-[#e6f2fe] transition-all duration-300 cursor-pointer"
                    onClick={() => handleToggleSidebar()}
                >
                    {/* <MemuAltLeftIcon className="!w-10 !h-8 visible group-hover:invisible group-hover:opacity-0 transition-all duration-1000 absolute inset-0" /> */}
                    <MemuIcon className="!w-8 !h-8 transition-all duration-300 group-hover:text-[#548be6]" />
                </span>
            </div>
            <div className="flex items-center">
                <MessageIcon className="!w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300"/>
                <BellIcon className="!w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300"/>
                <UserIcon className="!w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300"/>
            </div>
        </div>
    );
}

export default Header;