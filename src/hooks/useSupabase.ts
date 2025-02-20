import { useState } from 'react';
import { supabase, Database } from '../lib/supabase';

// Hook para gerenciar checkouts
export function useCheckouts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os checkouts do usuário
  const fetchCheckouts = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('checkouts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar checkouts');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Criar novo checkout
  const createCheckout = async (checkout: Database['public']['Tables']['checkouts']['Insert']) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('checkouts')
        .insert([checkout])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar checkout');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar checkout existente
  const updateCheckout = async (
    id: string,
    updates: Database['public']['Tables']['checkouts']['Update']
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('checkouts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar checkout');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Deletar checkout
  const deleteCheckout = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('checkouts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar checkout');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchCheckouts,
    createCheckout,
    updateCheckout,
    deleteCheckout,
  };
}

// Hook para gerenciar gateways de pagamento
export function usePaymentGateways() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os gateways do usuário
  const fetchGateways = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('payment_gateways')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar gateways');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Criar novo gateway
  const createGateway = async (gateway: Database['public']['Tables']['payment_gateways']['Insert']) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('payment_gateways')
        .insert([gateway])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar gateway');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar gateway existente
  const updateGateway = async (
    id: string,
    updates: Database['public']['Tables']['payment_gateways']['Update']
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('payment_gateways')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar gateway');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchGateways,
    createGateway,
    updateGateway,
  };
}

// Hook para gerenciar usuários
export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar usuário por ID
  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar usuário');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar usuário
  const updateUser = async (
    id: string,
    updates: Database['public']['Tables']['users']['Update']
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar usuário');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchUser,
    updateUser,
  };
} 