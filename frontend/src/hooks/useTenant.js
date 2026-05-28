import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";

export const useRegisterTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tenantData) => {
      // Menembak rute POST tenant ke backend Express
      const response = await api.post('/tenants/add', tenantData, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate cache biar list data penghuni/dashboard langsung terupdate otomatis
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    }
  });
};