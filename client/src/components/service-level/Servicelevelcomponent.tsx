import './servicelevelcomponent.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = import.meta.env.VITE_travel;

interface ServiceLevel {
  id: string;
  name: string;
}

function Servicelevelcomponent() {
  const [serviceLevelName, setServiceLevelName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null); // ✅ Track currently deleting row

  // Fetch service levels
  const {
    data: serviceLevels,
    isLoading,
    error,
    refetch,
  } = useQuery<ServiceLevel[]>({
    queryKey: ['serviceLevels'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/service-level/fetch-all-service-levels`);
      if (!res.ok) throw new Error('Failed to fetch service levels');
      return res.json();
    },
  });

  // Add service level
  const addMutation = useMutation({
    mutationFn: async (newLevel: { name: string }) => {
      const res = await fetch(`${apiUrl}/service-level/add-service-level`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLevel),
      });
      if (!res.ok) throw new Error('Failed to add service level');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Service level added!');
      setServiceLevelName('');
      refetch();
    },
    onError: () => toast.error('Error adding service level'),
  });

  // Delete service level
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${apiUrl}/service-level/delete-service-level?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete service level');
      return res.json();
    },
    onMutate: (id: string) => {
      setDeletingId(id); // ✅ Set ID before delete
    },
    onSuccess: () => {
      toast.success('Service level deleted!');
      refetch();
    },
    onError: () => {
      toast.error('Error deleting service level');
    },
    onSettled: () => {
      setDeletingId(null); // ✅ Reset after done
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceLevelName.trim()) {
      toast.error('Service level name is required');
      return;
    }
    addMutation.mutate({ name: serviceLevelName });
  };

  return (
    <div className='service-level-container'>
      <Toaster richColors position="top-center" />

      <div className='service-level-header'>
        <h1>Service Level Management</h1>
        <p>Create, view, update, and delete service levels for accommodations</p>
      </div>

      <div className='service-level-content'>
        <div className='service-level-form'>
          <h2>Add New Service Level</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='serviceLevelName'>Service Level Name</label>
              <input
                type='text'
                id='serviceLevelName'
                placeholder='e.g., Full-Service, Limited-Service'
                value={serviceLevelName}
                onChange={(e) => setServiceLevelName(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='submit-btn' disabled={addMutation.isPending}>
              {addMutation.isPending ? 'Saving...' : 'Save Service Level'}
            </button>
          </form>
        </div>

        <div className='service-level-table'>
          <h2>Existing Service Levels</h2>
          {isLoading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading service levels...</span>
              </div>
            </div>
          ) : error ? (
            <div className="error-message">Error fetching service levels</div>
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
                  {serviceLevels?.map((level) => (
                    <tr key={level.id}>
                      <td>{level.id}</td>
                      <td>{level.name}</td>
                      <td>
                        {deletingId === level.id ? (
                          <div className="spinner-border spinner-border-sm text-danger" role="status">
                            <span className="visually-hidden">Deleting...</span>
                          </div>
                        ) : (
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => deleteMutation.mutate(level.id)}
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

export default Servicelevelcomponent;
