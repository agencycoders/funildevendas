import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rkesipuoljjeqptlsuxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZXNpcHVvbGpqZXFwdGxzdXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNDQ4MjAsImV4cCI6MjA1NTYyMDgyMH0.V66xPE7PngQ_pkPDforZs_pGHRzY5BPfsNNkpivwQGM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas do Supabase
export interface Database {
  public: {
    Tables: {
      checkouts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          product: {
            name: string;
            price: number;
            description: string;
            image?: string;
          };
          payment_methods: {
            type: 'credit_card' | 'pix' | 'boleto';
            installments?: number;
            enabled: boolean;
          }[];
          selected_gateway?: string;
          order_bumps: {
            id: string;
            product: {
              name: string;
              price: number;
              description: string;
              image?: string;
            };
            discount: number;
            enabled: boolean;
          }[];
          status: 'draft' | 'active';
          user_id: string;
        };
        Insert: Omit<Database['public']['Tables']['checkouts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['checkouts']['Row']>;
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string;
          avatar_url?: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Row']>;
      };
      payment_gateways: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          type: 'stripe';
          credentials: {
            public_key?: string;
            secret_key?: string;
          };
          is_active: boolean;
          user_id: string;
        };
        Insert: Omit<Database['public']['Tables']['payment_gateways']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['payment_gateways']['Row']>;
      };
    };
  };
} 