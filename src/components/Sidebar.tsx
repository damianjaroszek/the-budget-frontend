import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {MdOutlineCancel} from "react-icons/md";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {links} from '../data/navbar-links';
import {GiReceiveMoney} from "react-icons/gi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {setActiveMenu} from "../features/frontend-state-slice";

// @todo Add documentation!
export const Sidebar = () => {
    const dispatch = useDispatch();
    const {activeMenu, screenSize} = useSelector((store: RootState) => store.frontendComponentsState);

    const handleActiveChange = () => {
        dispatch(setActiveMenu(!activeMenu));
    }

    const handleCloseSideBar = () => {

        if (screenSize) {
            if (activeMenu && screenSize <= 900) {
                setActiveMenu(false);
                console.log(activeMenu, screenSize)
            }
        }
    }

    //const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-900 text-md m-2 font-bold';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';


    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link to="/" onClick={handleCloseSideBar}
                              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                            <GiReceiveMoney/> <span>The Budget</span>
                        </Link>
                        <TooltipComponent content="Menu" position="BottomCenter">
                            <button type="button" onClick={handleActiveChange}
                                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                                <MdOutlineCancel/>
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className="mt-10">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={`/${link.name}`}
                                        key={link.name}
                                        onClick={handleCloseSideBar}
                                        className={({isActive}) =>
                                            isActive ? activeLink : normalLink
                                        }
                                    >
                                        {link.icon}
                                        <span className="capitalize ">
                                            {link.name}
                                        </span>

                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
