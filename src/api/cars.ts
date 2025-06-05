import api from "./client";
import type { Car } from "../types/Car";

export const fetchCars = async (): Promise<Car[]> => {
  const { data } = await api.get<Car[]>("/cars");
  return data;
};

export const fetchCarById = async (carId: number): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${carId}`);
  return data;
};

export const createCar = async (newCar: Omit<Car, "id" | "createdAt" | "updatedAt">): Promise<Car> => {
  const { data } = await api.post<Car>("/cars", newCar);
  return data;
};

export const updateCar = async (
  carId: number,
  updatedCar: Omit<Car, "id" | "createdAt" | "updatedAt">
): Promise<void> => {
  await api.put(`/cars/${carId}`, updatedCar);
};

export const deleteCar = async (carId: number): Promise<void> => {
  await api.delete(`/cars/${carId}`);
};
