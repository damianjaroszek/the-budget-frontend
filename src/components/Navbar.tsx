import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {setActiveMenu} from "../features/frontend-state-slice";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {AiOutlineMenu} from 'react-icons/ai';
import avatar from "../data/avatar.jpg"


export const Navbar = () => {
    const dispatch = useDispatch();
    const {activeMenu} = useSelector((store: RootState) => store.frontendComponentsState);

    const handleActiveChange = () => {
        dispatch(setActiveMenu(!activeMenu));
    }

    interface NavbarButtonInterface {
        title: string;
        icon: JSX.Element;
        color: string;
        dotColor?: string;

        func(): void;
    }

    const NavbarButton = ({title, func, icon, color, dotColor}: NavbarButtonInterface) => (
        <TooltipComponent content={title} position="BottomCenter">
            <button
                type="button"
                onClick={func}
                style={{color}}
                className="relative text-xl rounded-full p-3 hover:bg-light-gray"
            >
                <span
                    style={{background: dotColor}}
                    className="absolute inline-flex rounded-full h2 w-2 right-2 top-2"
                >
                    {icon}
                </span>
            </button>
        </TooltipComponent>
    )

    return (
        <div className="flex justify-between p-2 md:mx-6 relative">
            <NavbarButton
                title="Menu"
                func={handleActiveChange}
                icon=<AiOutlineMenu/>
                color="blue"
            />

            <div className="flex">
                <NavbarButton
                    title="Cart"
                    func={() => {
                    }}
                    icon=<AiOutlineMenu/>
                    color="blue"
                    dotColor="red"
                />
                <NavbarButton
                    title="Menu"
                    func={handleActiveChange}
                    icon=<AiOutlineMenu/>
                    color="blue"
                    dotColor="red"
                />
                <NavbarButton
                    title="Menu"
                    func={handleActiveChange}
                    icon=<AiOutlineMenu/>
                    color="blue"
                    dotColor="red"
                />
                <TooltipComponent
                    content="UserInfo"
                    position="BottomCenter"
                >

                    <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                        <img
                            alt="avatar"
                            className="rounded-full w-8 h-8"
                            src={avatar}/>
                    </div>


                </TooltipComponent>
            </div>
        </div>
    )
}
