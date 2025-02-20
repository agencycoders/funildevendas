import React from 'react';
import { useCheckoutStore } from '../store/checkoutStore';
import { Link2, Users, ShoppingBag, ArrowUpRight, TrendingUp, DollarSign, Clock } from 'lucide-react';

export function Dashboard() {
  const checkouts = useCheckoutStore((state) => state.checkouts);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Checkouts</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{checkouts.length}</h3>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12,5% desde o mês passado
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <ShoppingBag className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Checkouts Ativos</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {checkouts.filter((c) => c.status === 'active').length}
              </h3>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {formatCurrency(12875)} em receitas
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <Users className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Checkouts em Rascunho</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {checkouts.filter((c) => c.status === 'draft').length}
              </h3>
              <p className="text-sm text-orange-600 mt-1 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                2 pendentes de revisão
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
              <Link2 className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Checkouts Recentes</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Ver todos
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {checkouts.map((checkout) => (
            <div
              key={checkout.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{checkout.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Criado em {formatDate(checkout.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    checkout.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {checkout.status === 'active' ? 'Ativo' : 'Rascunho'}
                </span>
                <a
                  href={checkout.url}
                  className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir checkout"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}