import React, { useState } from 'react';

interface GatewayConfig {
  id: string;
  name: string;
  type: 'stripe';
  isActive: boolean;
  credentials: {
    publicKey?: string;
    secretKey?: string;
    [key: string]: string | undefined;
  };
}

export function PaymentGateways() {
  const [gateways, setGateways] = useState<GatewayConfig[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      type: 'stripe',
      isActive: false,
      credentials: {
        publicKey: '',
        secretKey: '',
      },
    },
  ]);

  const [selectedGateway, setSelectedGateway] = useState<GatewayConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<GatewayConfig['credentials']>({});

  const handleEdit = (gateway: GatewayConfig) => {
    setSelectedGateway(gateway);
    setFormData(gateway.credentials);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedGateway) return;

    setGateways(gateways.map(gateway =>
      gateway.id === selectedGateway.id
        ? { ...gateway, credentials: formData, isActive: true }
        : gateway
    ));
    setIsEditing(false);
    setSelectedGateway(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedGateway(null);
    setFormData({});
  };

  const handleToggleActive = (gatewayId: string) => {
    setGateways(gateways.map(gateway =>
      gateway.id === gatewayId
        ? { ...gateway, isActive: !gateway.isActive }
        : gateway
    ));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Gateways de Pagamento</h2>
          <p className="mt-1 text-sm text-gray-600">
            Configure os gateways de pagamento que deseja utilizar na sua plataforma
          </p>
        </div>

        {/* Lista de Gateways */}
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {gateways.map(gateway => (
            <div key={gateway.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {gateway.type === 'stripe' && (
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.831 3.47 1.426 3.47 2.338 0 .914-.796 1.431-2.126 1.431-1.72 0-4.516-.858-6.384-1.991l-.89 5.52c1.898 1.048 4.843 1.72 8.1 1.72 2.585 0 4.727-.654 6.212-1.898 1.544-1.275 2.347-3.12 2.347-5.346 0-4.039-2.466-5.76-6.475-7.219l-.51-.183z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{gateway.name}</h3>
                    <p className="text-sm text-gray-500">
                      {gateway.isActive ? 'Configurado' : 'Não configurado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(gateway)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Configurar
                  </button>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleToggleActive(gateway.id)}
                      type="button"
                      className={`${
                        gateway.isActive ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          gateway.isActive ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Configuração */}
        {isEditing && selectedGateway && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Configurar {selectedGateway.name}
              </h3>
              
              <div className="space-y-4">
                {selectedGateway.type === 'stripe' && (
                  <>
                    <div>
                      <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700">
                        Chave Pública (Publishable Key)
                      </label>
                      <input
                        type="text"
                        id="publicKey"
                        value={formData.publicKey || ''}
                        onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div>
                      <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
                        Chave Secreta (Secret Key)
                      </label>
                      <input
                        type="password"
                        id="secretKey"
                        value={formData.secretKey || ''}
                        onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="sk_test_..."
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 