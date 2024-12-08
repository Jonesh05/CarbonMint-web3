import React, { FC } from "react";

// Layout para las páginas dentro de /provider
const ProviderLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            
            <header className="bg-blue-500 p-4">
                <h1 className="text-center text-xl font-bold text-white">Provider Dashboard</h1>
            </header>

            <div className="flex-grow">
                {children} 
            </div>
        </div>
    );
};

export default ProviderLayout;
