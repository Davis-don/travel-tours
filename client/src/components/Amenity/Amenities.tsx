import './amenities.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = import.meta.env.VITE_travel_api;

interface Amenity {
  id: string;
  name: string;
}

function Amenities() {
  const [amenityName, setAmenityName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch amenities
  const {
    data: amenities,
    isLoading,
    error,
    refetch,
  } = useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/amenity/fetch-all-amenities`);
      if (!res.ok) throw new Error('Failed to fetch amenities');
      return res.json();
    },
  });

  // Add amenity
  const addMutation = useMutation({
    mutationFn: async (newAmenity: { name: string }) => {
      const res = await fetch(`${apiUrl}/amenity/add-amenity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAmenity),
      });
      if (!res.ok) throw new Error('Failed to add amenity');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Amenity added!');
      setAmenityName('');
      refetch();
    },
    onError: () => toast.error('Error adding amenity'),
  });

  // Delete amenity
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${apiUrl}/amenity/delete-amenity-by-id?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete amenity');
      return res.json();
    },
    onMutate: (id: string) => setDeletingId(id),
    onSuccess: () => {
      toast.success('Amenity deleted!');
      refetch();
    },
    onError: () => toast.error('Error deleting amenity'),
    onSettled: () => setDeletingId(null),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amenityName.trim()) {
      toast.error('Amenity name is required');
      return;
    }
    addMutation.mutate({ name: amenityName });
  };

  return (
    <div className='amenities-container'>
      <Toaster richColors position='top-center' />

      <div className='amenities-header'>
        <h1>Amenities Management</h1>
        <p>Create, view, update, and delete amenities</p>
      </div>

      <div className='amenities-content'>
        {/* Form Section */}
        <div className='amenities-form'>
          <h2>Add New Amenity</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='amenityName'>Amenity Name</label>
              <input
                type='text'
                id='amenityName'
                placeholder='e.g., WiFi, Parking, Spa, Pool'
                value={amenityName}
                onChange={(e) => setAmenityName(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='submit-btn' disabled={addMutation.isPending}>
              {addMutation.isPending ? 'Saving...' : 'Save Amenity'}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className='amenities-table'>
          <h2>Existing Amenities</h2>
          {isLoading ? (
            <div className='text-center my-4'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading amenities...</span>
              </div>
            </div>
          ) : error ? (
            <div className='error-message'>Error fetching amenities</div>
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
                  {amenities?.map((amenity) => (
                    <tr key={amenity.id}>
                      <td>{amenity.id}</td>
                      <td>{amenity.name}</td>
                      <td>
                        {deletingId === amenity.id ? (
                          <div className='spinner-border spinner-border-sm text-danger' role='status'>
                            <span className='visually-hidden'>Deleting...</span>
                          </div>
                        ) : (
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => deleteMutation.mutate(amenity.id)}
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

export default Amenities;
