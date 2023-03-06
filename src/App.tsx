import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from "@syncfusion/ej2-react-popups";

import './App.css';

function App() {
    // const foobar: TestInterface = {
    //     x: 123,
    // };
    const activeMenu = true;

    return (
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                    <TooltipComponent content="Settings" position="TopCenter">
                        <button type="button"
                                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                                style={{
                                    background: 'blue',
                                    borderRadius: '50%'
                                }}>
                            <FiSettings/>
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                        Sidebar
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        Sidebar
                    </div>
                )}
                <div className={
                    `dark:bg:main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
                }>
                    <div className="fixed md: static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        Navbar
                    </div>
                </div>

                <div>
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element="ECommerce"/>
                        <Route path="/ecommerce" element="ECommerce"/>

                        {/* Pages */}
                        <Route path="/orders" element="Orders"/>
                        <Route path="/employees" element="Employees"/>
                        <Route path="/customers" element="Customers"/>

                        {/* Charts */}
                        <Route path="/line" element="Line"/>
                        <Route path="/pie" element="Pie"/>
                        <Route path="/customers" element="Customers"/>
                    </Routes>
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
