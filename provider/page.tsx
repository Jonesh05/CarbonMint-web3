"use client";

import React from "react";

const ProviderDashboard = () => {
    return (
        <div className="py-10 px-5">
            <h2 className="text-2xl font-bold mb-4">Gestión de Embalajes</h2>
            <p className="text-lg mb-6">Aquí puedes ver tus productos y administrar inventarios.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Añadir Nuevo Producto
            </button>
        </div>
    );
};

export default ProviderDashboard;
