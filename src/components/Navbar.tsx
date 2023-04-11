import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {setActiveMenu, setScreenSize} from "../features/frontend-state-slice";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {AiOutlineMenu} from 'react-icons/ai';
import avatar from "../data/avatar.jpg"


export const Navbar = () => {
    const dispatch = useDispatch();
    const {activeMenu, screenSize} = useSelector((store: RootState) => store.frontendComponentsState);
    const showRightMarginOfNavbar = "flex justify-between p-2 md:ml-6 md:mr-6 relative md:pr-72";
    const hideRightMarginOfNavbar = "flex justify-between p-2 md:ml-6 md:mr-6 relative md:pr-0";

    const handleActiveChange = (value: boolean) => {
        dispatch(setActiveMenu(value));
    }

    useEffect(() => {
        const handleResizeWindow = () => dispatch(setScreenSize(window.innerWidth));
        window.addEventListener('resize', handleResizeWindow);
        handleResizeWindow();
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        }
    }, []);

    useEffect(() => {
        if (screenSize && screenSize <= 900) {
            handleActiveChange(false);
        } else {
            handleActiveChange(true);
        }
    }, [screenSize]);

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
                />
                {icon}
            </button>
        </TooltipComponent>
    )

    return (

        <div className={activeMenu ? showRightMarginOfNavbar : hideRightMarginOfNavbar}>
            <NavbarButton
                title="Menu"
                func={() => {
                    handleActiveChange(true)
                }}
                icon=<AiOutlineMenu/>
                color="blue"
            />

            <div className="flex">

                <TooltipComponent
                    content="UserInfo"
                    position="BottomCenter"
                >


                    <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                        <img
                            alt="avatar"
                            className="rounded-full w-8 h-8"
                            src={avatar}
                        />
                        <p>
                            <span className="text-gray-400 text-14">Hi,</span> {''}
                            <span className="text-gray-400 font-bold ml-1 text-14">nice to see you!</span>
                        </p>

                    </div>


                </TooltipComponent>
            </div>
        </div>
    );
};
