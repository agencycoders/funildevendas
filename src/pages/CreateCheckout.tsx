import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../store/checkoutStore';
import { CheckoutTemplate } from '../types/checkout';

interface Product {
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface OrderBump {
  id: string;
  product: Product;
  discount: number;
  enabled: boolean;
}

interface PaymentMethod {
  type: 'credit_card' | 'pix' | 'boleto';
  installments?: number;
  enabled: boolean;
}

interface Gateway {
  id: string;
  name: string;
  type: 'stripe';
  isActive: boolean;
}

interface CheckoutConfig {
  product: Product;
  paymentMethods: PaymentMethod[];
  checkoutName: string;
  selectedGateway?: string;
  orderBumps: OrderBump[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface ProductConfigStepProps {
  onNext: () => void;
  config: CheckoutConfig;
  setConfig: (config: CheckoutConfig) => void;
}

interface PaymentConfigStepProps {
  onNext: () => void;
  onBack: () => void;
  config: CheckoutConfig;
  setConfig: (config: CheckoutConfig) => void;
}

interface SuccessStepProps {
  config: CheckoutConfig;
  onReset: () => void;
}

// Step 1: Configuração do Produto
function ProductConfigStep({ onNext, config, setConfig }: ProductConfigStepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setConfig({
          ...config,
          product: { ...config.product, image: base64String }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setConfig({
      ...config,
      product: { ...config.product, image: undefined }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="checkoutName" className="block text-sm font-medium text-gray-700">
          Nome do Checkout
        </label>
        <input
          type="text"
          id="checkoutName"
          value={config.checkoutName}
          onChange={(e) => setConfig({ ...config, checkoutName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ex: Curso de Marketing Digital"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Produto</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
              Imagem do Produto
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="productImage"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload imagem</span>
                        <input
                          id="productImage"
                          name="productImage"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              type="text"
              id="productName"
              value={config.product.name}
              onChange={(e) => setConfig({
                ...config,
                product: { ...config.product, name: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input
                type="number"
                id="productPrice"
                value={config.product.price}
                onChange={(e) => setConfig({
                  ...config,
                  product: { ...config.product, price: parseFloat(e.target.value) }
                })}
                className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="productDescription"
              value={config.product.description}
              onChange={(e) => setConfig({
                ...config,
                product: { ...config.product, description: e.target.value }
              })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <OrderBumpSection config={config} setConfig={setConfig} />
      </div>

      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
      >
        Próximo: Métodos de Pagamento
      </button>
    </div>
  );
}

// Step 2: Configuração dos Métodos de Pagamento
function PaymentConfigStep({ onNext, onBack, config, setConfig }: PaymentConfigStepProps) {
  // Simular gateways disponíveis (isso viria do seu estado global ou API)
  const availableGateways: Gateway[] = [
    { id: 'stripe', name: 'Stripe', type: 'stripe', isActive: true },
    // Adicione mais gateways conforme necessário
  ];

  const togglePaymentMethod = (type: PaymentMethod['type']) => {
    const updatedMethods = config.paymentMethods.map(method =>
      method.type === type ? { ...method, enabled: !method.enabled } : method
    );
    setConfig({ ...config, paymentMethods: updatedMethods });
  };

  const updateInstallments = (type: PaymentMethod['type'], value: string) => {
    const updatedMethods = config.paymentMethods.map(method =>
      method.type === type ? { ...method, installments: parseInt(value) } : method
    );
    setConfig({ ...config, paymentMethods: updatedMethods });
  };

  const handleGatewaySelect = (gatewayId: string) => {
    setConfig({ ...config, selectedGateway: gatewayId });
  };

  return (
    <div className="space-y-6">
      {/* Seleção de Gateway */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gateway de Pagamento</h3>
        <div className="space-y-4">
          {availableGateways.map(gateway => (
            <div
              key={gateway.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                config.selectedGateway === gateway.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-200'
              }`}
              onClick={() => handleGatewaySelect(gateway.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {gateway.type === 'stripe' && (
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.831 3.47 1.426 3.47 2.338 0 .914-.796 1.431-2.126 1.431-1.72 0-4.516-.858-6.384-1.991l-.89 5.52c1.898 1.048 4.843 1.72 8.1 1.72 2.585 0 4.727-.654 6.212-1.898 1.544-1.275 2.347-3.12 2.347-5.346 0-4.039-2.466-5.76-6.475-7.219l-.51-.183z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{gateway.name}</h4>
                    <p className="text-sm text-gray-500">
                      {gateway.isActive ? 'Configurado' : 'Não configurado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      config.selectedGateway === gateway.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {config.selectedGateway === gateway.id && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métodos de Pagamento */}
      {config.selectedGateway && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Métodos de Pagamento</h3>
          <div className="space-y-4">
            {/* Cartão de Crédito */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="credit_card"
                  checked={config.paymentMethods.find(m => m.type === 'credit_card')?.enabled}
                  onChange={() => togglePaymentMethod('credit_card')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="credit_card" className="ml-3 text-sm font-medium text-gray-700">
                  Cartão de Crédito
                </label>
              </div>
              {config.paymentMethods.find(m => m.type === 'credit_card')?.enabled && (
                <div className="flex items-center">
                  <label htmlFor="installments" className="mr-2 text-sm text-gray-600">
                    Parcelas:
                  </label>
                  <select
                    id="installments"
                    value={config.paymentMethods.find(m => m.type === 'credit_card')?.installments}
                    onChange={(e) => updateInstallments('credit_card', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                      <option key={n} value={n}>{n}x</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* PIX */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <input
                type="checkbox"
                id="pix"
                checked={config.paymentMethods.find(m => m.type === 'pix')?.enabled}
                onChange={() => togglePaymentMethod('pix')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="pix" className="ml-3 text-sm font-medium text-gray-700">
                PIX
              </label>
            </div>

            {/* Boleto */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <input
                type="checkbox"
                id="boleto"
                checked={config.paymentMethods.find(m => m.type === 'boleto')?.enabled}
                onChange={() => togglePaymentMethod('boleto')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="boleto" className="ml-3 text-sm font-medium text-gray-700">
                Boleto Bancário
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!config.selectedGateway}
          className={`w-full rounded-lg px-4 py-2 ${
            config.selectedGateway
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Criar Checkout
        </button>
      </div>
    </div>
  );
}

// Step 3: Confirmação e Link
function SuccessStep({ config, onReset }: SuccessStepProps) {
  const checkoutUrl = `${window.location.origin}/checkout/${crypto.randomUUID()}`;

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">Checkout Criado com Sucesso!</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <h4 className="font-medium text-gray-900 mb-2">Detalhes do Checkout</h4>
        <p className="text-sm text-gray-600">Nome: {config.checkoutName}</p>
        <p className="text-sm text-gray-600">Produto: {config.product.name}</p>
        <p className="text-sm text-gray-600">Preço: R$ {config.product.price.toFixed(2)}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Link do Checkout:</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={checkoutUrl}
            className="flex-1 rounded-md border-gray-300 bg-gray-100"
          />
          <button
            onClick={() => navigator.clipboard.writeText(checkoutUrl)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copiar
          </button>
        </div>
      </div>

      <button
        onClick={onReset}
        className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
      >
        Voltar aos Checkouts
      </button>
    </div>
  );
}

// Novo componente para Order Bumps
function OrderBumpSection({ config, setConfig }: { config: CheckoutConfig; setConfig: (config: CheckoutConfig) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newBump, setNewBump] = useState<Omit<OrderBump, 'id'>>({
    product: {
      name: '',
      price: 0,
      description: '',
      image: undefined,
    },
    discount: 0,
    enabled: true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setNewBump({
          ...newBump,
          product: { ...newBump.product, image: base64String }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setNewBump({
      ...newBump,
      product: { ...newBump.product, image: undefined }
    });
  };

  const handleAddBump = () => {
    const newOrderBump: OrderBump = {
      id: crypto.randomUUID(),
      ...newBump,
    };

    setConfig({
      ...config,
      orderBumps: [...config.orderBumps, newOrderBump],
    });

    setIsAdding(false);
    setNewBump({
      product: {
        name: '',
        price: 0,
        description: '',
        image: undefined,
      },
      discount: 0,
      enabled: true,
    });
    setPreviewImage(null);
  };

  const handleRemoveBump = (id: string) => {
    setConfig({
      ...config,
      orderBumps: config.orderBumps.filter(bump => bump.id !== id),
    });
  };

  const toggleBumpEnabled = (id: string) => {
    setConfig({
      ...config,
      orderBumps: config.orderBumps.map(bump =>
        bump.id === id ? { ...bump, enabled: !bump.enabled } : bump
      ),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Order Bumps</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Adicionar Order Bump
        </button>
      </div>

      {/* Lista de Order Bumps */}
      <div className="space-y-4">
        {config.orderBumps.map(bump => (
          <div
            key={bump.id}
            className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {bump.product.image && (
                  <img
                    src={bump.product.image}
                    alt={bump.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">{bump.product.name}</h4>
                  <p className="text-sm text-gray-500">{bump.product.description}</p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-900">
                      Preço: R$ {bump.product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600">
                      Desconto: {bump.discount}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBumpEnabled(bump.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    bump.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      bump.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <button
                  onClick={() => handleRemoveBump(bump.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Adição de Order Bump */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Adicionar Order Bump
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagem do Produto
                </label>
                <div className="mt-1">
                  {previewImage ? (
                    <div className="relative inline-block">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload imagem</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={newBump.product.name}
                  onChange={(e) => setNewBump({
                    ...newBump,
                    product: { ...newBump.product, name: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  value={newBump.product.description}
                  onChange={(e) => setNewBump({
                    ...newBump,
                    product: { ...newBump.product, description: e.target.value }
                  })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    value={newBump.product.price}
                    onChange={(e) => setNewBump({
                      ...newBump,
                      product: { ...newBump.product, price: parseFloat(e.target.value) }
                    })}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    value={newBump.discount}
                    onChange={(e) => setNewBump({
                      ...newBump,
                      discount: parseFloat(e.target.value)
                    })}
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setPreviewImage(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddBump}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function CreateCheckout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<CheckoutConfig>({
    checkoutName: '',
    product: {
      name: '',
      price: 0,
      description: '',
    },
    paymentMethods: [
      { type: 'credit_card', installments: 1, enabled: true },
      { type: 'pix', enabled: false },
      { type: 'boleto', enabled: false },
    ],
    selectedGateway: undefined,
    orderBumps: [],
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    navigate('/checkouts');
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 w-24 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Produto</span>
            <span className="text-sm text-gray-600">Pagamento</span>
            <span className="text-sm text-gray-600">Confirmação</span>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {currentStep === 1 && (
            <ProductConfigStep
              onNext={handleNext}
              config={config}
              setConfig={setConfig}
            />
          )}
          {currentStep === 2 && (
            <PaymentConfigStep
              onNext={handleNext}
              onBack={handleBack}
              config={config}
              setConfig={setConfig}
            />
          )}
          {currentStep === 3 && (
            <SuccessStep
              config={config}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}