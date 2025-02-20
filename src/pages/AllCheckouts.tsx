import React from 'react';
import { useCheckoutStore } from '../store/checkoutStore';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export function AllCheckouts() {
  const checkouts = useCheckoutStore((state) => state.checkouts);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Todos os Checkouts</h2>
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