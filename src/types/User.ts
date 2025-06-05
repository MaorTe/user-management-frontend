import type { Car } from "./Car";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string; 
  carId?: number | null;
  car?: Car | null;
}
