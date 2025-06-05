export interface Car {
  id: number;
  company: string;
  model: string;
  createdAt: string;
  updatedAt: string;
}

export type CarCreateDto = Omit<Car, "id" | "createdAt" | "updatedAt">;
