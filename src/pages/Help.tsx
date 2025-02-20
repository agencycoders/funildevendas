import React from 'react';

export function Help() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Ajuda</h2>
        <p className="mt-1 text-sm text-gray-600">Encontre respostas para suas dúvidas</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="max-w-3xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Perguntas Frequentes</h3>
                <div className="mt-4 space-y-4">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Como criar um novo checkout?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" width="24">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 mt-1">
                      Para criar um novo checkout, clique no botão "Novo Checkout" no menu lateral
                      ou na página de checkouts. Preencha as informações necessárias e siga os
                      passos indicados.
                    </div>
                  </details>

                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Como gerenciar clientes?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" width="24">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 mt-1">
                      Acesse a seção "Clientes" no menu lateral para visualizar, adicionar,
                      editar ou remover clientes do sistema.
                    </div>
                  </details>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Precisa de mais ajuda?</h3>
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Contatar Suporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 