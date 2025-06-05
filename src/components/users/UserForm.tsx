import React, { useState, useEffect } from "react";
import type { User } from "../../types/User";
import { useCars } from "../../hooks/useCars";
import { useCreateUser, useUpdateUser } from "../../hooks/useUsers";

type UserFormProps = {
  initialData?: User;
  onFinish: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ initialData, onFinish }) => {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    carId: number | "";
  }>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    carId: initialData?.carId ?? "",
  });

  const { data: cars, isLoading: carsLoading } = useCars();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  useEffect(() => {
    setForm({
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      carId: initialData?.carId ?? "",
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "carId" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      carId: form.carId === "" ? undefined : form.carId,
    };

    if (isEdit && initialData) {
      updateMutation.mutate(
        { id: initialData.id, payload },
        {
          onSuccess: () => {
            onFinish();
          },
          onError: (err: unknown) => {
            if (typeof err === "object" && err !== null && "response" in err) {
              const axiosErr = err as Error & { response?: { data?: { Message?: string } } };
              if (axiosErr.response?.data) {
                alert(axiosErr.response.data.Message || "Error updating user.");
                return;
              }
            }
            alert("Error updating user.");
            console.error(err);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setForm({ name: "", email: "", password: "", carId: "" });
          onFinish();
        },
        onError: (err: unknown) => {
          if (typeof err === "object" && err !== null && "response" in err) {
            const axiosErr = err as Error & { response?: { data?: { Message?: string } } };
            if (axiosErr.response?.data) {
              alert(axiosErr.response.data.Message || "Error creating user.");
              return;
            }
          }
          alert("Error creating user.");
          console.error(err);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required={!isEdit}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Car (optional)</label>
          <select
            className="form-select"
            name="carId"
            value={form.carId}
            onChange={handleChange}
            disabled={carsLoading}
          >
            <option value="">None</option>
            {cars?.map((car) => (
              <option key={car.id} value={car.id}>
                {car.company} {car.model}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            className={`btn ${isEdit ? "btn-warning" : "btn-success"} w-100`}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEdit
              ? updateMutation.isPending
                ? "Updating…"
                : "Update User"
              : createMutation.isPending
              ? "Creating…"
              : "Create User"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
