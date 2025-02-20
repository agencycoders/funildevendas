import React from 'react';

export function Customers() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Clientes</h2>
        <p className="mt-1 text-sm text-gray-600">Gerencie seus clientes e suas informações</p>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar clientes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Adicionar Cliente
            </button>
          </div>
          
          <div className="border-t border-gray-200 mt-4">
            <p className="text-center text-gray-500 py-8">
              Nenhum cliente cadastrado ainda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 