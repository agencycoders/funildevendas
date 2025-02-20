export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface OrderBump {
  id: string;
  product: Product;
  discount: number;
  position: 'pre-payment' | 'post-payment';
}

export interface CheckoutTemplate {
  id: string;
  name: string;
  layout: CheckoutLayout;
  theme: CheckoutTheme;
  steps: CheckoutStep[];
  orderBumps: OrderBump[];
  url: string;
  createdAt: string;
  status: 'active' | 'draft' | 'archived';
}

export interface CheckoutLayout {
  header: LayoutComponent[];
  sidebar: LayoutComponent[];
  main: LayoutComponent[];
  footer: LayoutComponent[];
}

export interface CheckoutTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export type CheckoutStep = 'customer-info' | 'shipping' | 'payment';

export interface LayoutComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
}