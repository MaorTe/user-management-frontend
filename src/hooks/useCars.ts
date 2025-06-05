import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Car, CarCreateDto } from "../types/Car";
import { fetchCars, createCar, updateCar, deleteCar } from "../api/cars";

export function useCars() {
  return useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation<Car, unknown, CarCreateDto>({
    mutationFn: (newCar: CarCreateDto) => createCar(newCar),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Car, "id" | "createdAt" | "updatedAt">;
    }) => updateCar(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });
}
