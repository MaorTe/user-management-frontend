import React, { useState } from "react";
import { useUsers, useDeleteUser } from "../../hooks/useUsers";
import type { User } from "../../types/User";
import UserForm from "./UserForm";
import "./user.scss";

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, error } = useUsers();
  const deleteMutation = useDeleteUser();

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = (userId: number) => {
    deleteMutation.mutate(userId, {
      onError: (err: unknown) => {
        if (typeof err === "object" && err !== null && "response" in err) {
          const axiosErr = err as Error & { response?: { status: number; data?: { Message?: string } } };
          if (axiosErr.response?.data) {
            alert(axiosErr.response.data.Message || "Cannot delete user.");
            return;
          }
        }
        alert("Error deleting user.");
        console.error(err);
      },
      onSuccess: () => {
        if (editingUser?.id === userId) {
          setEditingUser(null);
        }
      },
    });
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users: {(error as Error).message}</p>;

  return (
    <div>
      <UserForm initialData={editingUser ?? undefined} onFinish={() => setEditingUser(null)} />

      <table className="user-table table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Car</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users!.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.car ? `${user.car.company} ${user.car.model}` : "—"}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>{new Date(user.updatedAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => setEditingUser(user)}
                  disabled={deleteMutation.isPending}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
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

export default UserList;
