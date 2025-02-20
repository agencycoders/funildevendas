import React from 'react';

export function Analytics() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Análises</h2>
        <p className="mt-1 text-sm text-gray-600">Visualize métricas e estatísticas do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Vendas</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">R$ 0,00</p>
          <div className="mt-2 text-sm text-green-600">+0% desde o último mês</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Checkouts Realizados</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
          <div className="mt-2 text-sm text-green-600">+0% desde o último mês</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Clientes Ativos</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
          <div className="mt-2 text-sm text-green-600">+0% desde o último mês</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Taxa de Conversão</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">0%</p>
          <div className="mt-2 text-sm text-green-600">+0% desde o último mês</div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Gráficos em breve</h3>
          <p className="mt-2 text-gray-600">
            Os gráficos e análises detalhadas estarão disponíveis em breve.
          </p>
        </div>
      </div>
    </div>
  );
} 