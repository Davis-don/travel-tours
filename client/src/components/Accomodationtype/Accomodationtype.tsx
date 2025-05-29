import './accomodationtype.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = import.meta.env.VITE_travel;

interface AccommodationType {
  id: string;
  name: string;
}

function AccommodationTypeComponent() {
  const [accommodationTypeName, setAccommodationTypeName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch accommodation types
  const {
    data: accommodationTypes,
    isLoading,
    error,
    refetch,
  } = useQuery<AccommodationType[]>({
    queryKey: ['accommodationTypes'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/accomodation-type/accommodation-types`);
      if (!res.ok) throw new Error('Failed to fetch accommodation types');
      return res.json();
    },
  });

  // Add accommodation type
  const addMutation = useMutation({
    mutationFn: async (newType: { name: string }) => {
      const res = await fetch(`${apiUrl}/accomodation-type/add-accommodation-type`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newType),
      });
      if (!res.ok) throw new Error('Failed to add accommodation type');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Accommodation type added!');
      setAccommodationTypeName('');
      refetch();
    },
    onError: () => toast.error('Error adding accommodation type'),
  });

  // Delete accommodation type
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${apiUrl}/accomodation-type/delete-accommodation-type?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete accommodation type');
      return res.json();
    },
    onMutate: (id: string) => setDeletingId(id),
    onSuccess: () => {
      toast.success('Accommodation type deleted!');
      refetch();
    },
    onError: () => toast.error('Error deleting accommodation type'),
    onSettled: () => setDeletingId(null),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accommodationTypeName.trim()) {
      toast.error('Accommodation type name is required');
      return;
    }
    addMutation.mutate({ name: accommodationTypeName });
  };

  return (
    <div className='accommodation-type-container'>
      <Toaster richColors position="top-center" />

      <div className='accommodation-type-header'>
        <h1>Accommodation Type Management</h1>
        <p>Create, view, update, and delete accommodation types</p>
      </div>

      <div className='accommodation-type-content'>
        {/* Form Section */}
        <div className='accommodation-type-form'>
          <h2>Add New Accommodation Type</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='accommodationTypeName'>Accommodation Type</label>
              <input
                type='text'
                id='accommodationTypeName'
                placeholder='e.g., Hotel, Hostel, Resort'
                value={accommodationTypeName}
                onChange={(e) => setAccommodationTypeName(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='submit-btn' disabled={addMutation.isPending}>
              {addMutation.isPending ? 'Saving...' : 'Save Accommodation Type'}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className='accommodation-type-table'>
          <h2>Existing Accommodation Types</h2>
          {isLoading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading accommodation types...</span>
              </div>
            </div>
          ) : error ? (
            <div className="error-message">Error fetching accommodation types</div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accommodationTypes?.map((type) => (
                    <tr key={type.id}>
                      <td>{type.id}</td>
                      <td>{type.name}</td>
                      <td>
                        {deletingId === type.id ? (
                          <div className="spinner-border spinner-border-sm text-danger" role="status">
                            <span className="visually-hidden">Deleting...</span>
                          </div>
                        ) : (
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => deleteMutation.mutate(type.id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccommodationTypeComponent;

