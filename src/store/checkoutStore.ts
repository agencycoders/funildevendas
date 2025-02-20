import { create } from 'zustand';
import { CheckoutTemplate, Product } from '../types/checkout';

interface CheckoutState {
  currentStep: number;
  template: CheckoutTemplate | null;
  selectedProducts: Product[];
  checkouts: CheckoutTemplate[];
  setStep: (step: number) => void;
  setTemplate: (template: CheckoutTemplate) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addCheckout: (checkout: CheckoutTemplate) => void;
  removeCheckout: (checkoutId: string) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  currentStep: 0,
  template: null,
  selectedProducts: [],
  checkouts: [
    {
      id: '1',
      name: 'Basic Product Checkout',
      url: '/checkout/basic-product',
      createdAt: '2024-03-15',
      status: 'active',
      layout: { header: [], sidebar: [], main: [], footer: [] },
      theme: {
        colors: {
          primary: '#3B82F6',
          secondary: '#1D4ED8',
          accent: '#60A5FA',
          background: '#F3F4F6',
          text: '#111827',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
        },
      },
      steps: ['customer-info', 'shipping', 'payment'],
      orderBumps: [],
    },
    {
      id: '2',
      name: 'Premium Service Checkout',
      url: '/checkout/premium-service',
      createdAt: '2024-03-16',
      status: 'active',
      layout: { header: [], sidebar: [], main: [], footer: [] },
      theme: {
        colors: {
          primary: '#3B82F6',
          secondary: '#1D4ED8',
          accent: '#60A5FA',
          background: '#F3F4F6',
          text: '#111827',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
        },
      },
      steps: ['customer-info', 'shipping', 'payment'],
      orderBumps: [],
    },
  ],
  setStep: (step) => set({ currentStep: step }),
  setTemplate: (template) => set({ template }),
  addProduct: (product) =>
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    })),
  removeProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter((p) => p.id !== productId),
    })),
  addCheckout: (checkout) =>
    set((state) => ({
      checkouts: [...state.checkouts, checkout],
    })),
  removeCheckout: (checkoutId) =>
    set((state) => ({
      checkouts: state.checkouts.filter((c) => c.id !== checkoutId),
    })),
}));