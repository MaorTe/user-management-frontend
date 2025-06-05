import api from "./client";
import type { User } from "../types/User";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${userId}`);
  return data;
};

export const createUser = async (
  newUser: Omit<User, "id" | "createdAt" | "updatedAt" | "car">
): Promise<User> => {
  const { data } = await api.post<User>("/users", newUser);
  return data;
};

export const updateUser = async (
  userId: number,
  updatedUser: Omit<User, "id" | "createdAt" | "updatedAt" | "car">
): Promise<void> => {
  await api.put(`/users/${userId}`, updatedUser);
};

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/users/${userId}`);
};
