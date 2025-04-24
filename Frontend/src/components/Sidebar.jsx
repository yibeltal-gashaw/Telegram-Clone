import { User } from "lucide-react";
import { Users } from "../constants/user";

const SideBar = () =>{
    return(
        <div className="h-full w-20 lg:w-72 border-r flex flex-col border-base-300">
           <div className="border-b p-5 border-base-300 w-full">
            <div className="flex items-center gap-2">
                <User className="size-6"/>
                <span className="font-medium hidden lg:block">Contacts</span>
            </div>
           </div>
            <div className="">
                {
                    Users.map((user) =>(
                        <button
                            className="flex w-full items-center gap-2 p-3
                            hover:bg-base-300 transition-colors">
                                <div className="relative mx-auto lg:mx-0">
                                    <img className="size-12 rounded-full" src={user.profile} alt="" />
                                    <span className="absolute bottom-0 right-0 size-3 bg-green-500
                                    rounded-full ring-2 ring-zinc-900"></span>
                                </div>
                                <div className="hidden lg:block text-left min-w-0">
                                    <div className="font-medium truncate">{user.name}</div>
                                    <div className="font-sm text-zinc-100">{user.isActive}</div>
                                </div>
                            </button>
                    ))
                }
            </div>
        </div>
    )

}

export default SideBar;