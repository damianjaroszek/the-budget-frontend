import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from "./components/Navbar";
import {Sidebar} from "./components/Sidebar";
//import {TestInterface} from 'types';
import './App.css';
import {Budget} from "./pages/Budget";
import {History} from "./pages/History";
import {Receipt} from "./pages/Receipt";
import {useSelector} from "react-redux";
import {RootState} from "./store";


export const App = () => {
    // const foobar: TestInterface = {
    //     x: 123,
    // };
    //const activeMenu = true;


    const {activeMenu} = useSelector((store: RootState) => store.frontendComponentsState);

    return (

        <BrowserRouter> {/* added Router*/}
            <div className="flex relative dark:bg-main-dark-bg"> {/* div works as container of app*/}
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                        <Sidebar/> {/*if activeMenu is true then show a column on the left side with included a Sidebar component */}
                    </div>
                ) : (
                    <div
                        className="w-0 dark:bg-secondary-dark-bg"> {/*if activeMenu is false then hide a column on the left side with included a Sidebar component */}
                        <Sidebar/>
                    </div>
                )}
                <div className={
                    `dark:bg:main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
                }> {/*if activeMenu is true then set margin left 72 (18 rem) otherwise set width of element to flex 2 */}
                    <div className="fixed md: static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Navbar/>{/*added Navbar component*/}
                    </div>
                </div>

                <div>
                    <Routes> {/*added Routes for elements of Sidebar*/}
                        {/* Dashboard */}
                        <Route path="/" element={<Budget/>}/>
                        <Route path="/budget" element={<Budget/>}/>

                        {/* Data */}
                        <Route path="/history" element={<History/>}/>

                        {/* Action */}
                        <Route path="/receipt" element={<Receipt/>}/>
                    </Routes>
                </div>

            </div>
        </BrowserRouter>
    );
}
