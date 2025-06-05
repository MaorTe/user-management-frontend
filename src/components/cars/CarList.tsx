import React, { useState } from "react";
import { useCars, useDeleteCar } from "../../hooks/useCars";
import type { Car } from "../../types/Car";
import CarForm from "./CarForm";
import "./car.scss";

const CarList: React.FC = () => {
  const { data: cars, isLoading, isError, error } = useCars();
  const deleteMutation = useDeleteCar();
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const handleDelete = (carId: number) => {
    deleteMutation.mutate(carId, {
      onError: (err) => {
        const axiosErr = err as Error & { response?: { status: number; data?: { Message?: string } } };
        if (axiosErr.response?.status === 400) {
          const msg = axiosErr.response.data?.Message || "Cannot delete this car.";
          alert(msg);
        } else {
          alert("Error deleting car.");
          console.error(err);
        }
      },
      onSuccess: () => {
        if (editingCar?.id === carId) {
          setEditingCar(null);
        }
      },
    });
  };

  if (isLoading) return <p>Loading cars...</p>;
  if (isError) return <p>Error loading cars: {(error as Error).message}</p>;

  return (
    <div>
      <CarForm initialData={editingCar ?? undefined} onFinish={() => setEditingCar(null)} />

      <table className="car-table table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Model</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars!.map((car: Car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.company}</td>
              <td>{car.model}</td>
              <td>{new Date(car.createdAt).toLocaleString()}</td>
              <td>{new Date(car.updatedAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => setEditingCar(car)}
                  disabled={deleteMutation.isPending}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(car.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
