import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/User";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/users";

export function useUsers() {
  return useQuery<User[]>({ queryKey: ["users"], queryFn: fetchUsers });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<User, "id" | "createdAt" | "updatedAt" | "car">;
    }) => updateUser(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
