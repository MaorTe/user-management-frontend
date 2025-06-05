import React, { useState, useEffect } from 'react';
import type { Car } from '../../types/Car';
import { useCreateCar, useUpdateCar } from '../../hooks/useCars';

type CarFormProps = {
  initialData?: Car;
  onFinish: () => void;
};

const CarForm: React.FC<CarFormProps> = ({ initialData, onFinish }) => {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState<{ company: string; model: string }>({
    company: initialData?.company || '',
    model: initialData?.model || '',
  });

  const createMutation = useCreateCar();
  const updateMutation = useUpdateCar();

  useEffect(() => {
    setForm({
      company: initialData?.company || '',
      model: initialData?.model || '',
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialData) {
      updateMutation.mutate(
        { id: initialData.id, payload: { company: form.company, model: form.model } },
        {
          onSuccess: () => {
            onFinish(); 
          },
          onError: err => {
            if (err instanceof Error) alert(err.message);
          },
        }
      );
    } else {
      createMutation.mutate(
        { company: form.company, model: form.model },
        {
          onSuccess: () => {
            setForm({ company: '', model: '' });
            onFinish();
          },
          onError: err => {
            if (err instanceof Error) alert(err.message);
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Model</label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className={`btn ${isEdit ? 'btn-warning' : 'btn-success'} w-100`}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEdit
              ? updateMutation.isPending
                ? 'Updating…'
                : 'Update Car'
              : createMutation.isPending
              ? 'Creating…'
              : 'Create Car'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CarForm;