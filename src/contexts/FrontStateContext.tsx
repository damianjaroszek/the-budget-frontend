import React, {createContext} from 'react';

interface FrontSTateContextType {
    activeMenu: boolean;
    setActiveMenu: (state: boolean) => void;
}

// export const FrontStateContext = createContext<FrontSTateContextType>({
//     isActive: true,
//     setIsActive: (state: boolean)=>{},
// })
export const FrontStateContext = createContext<FrontSTateContextType | null>(null);
