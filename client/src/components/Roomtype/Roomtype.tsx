import './roomtype.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = import.meta.env.VITE_travel;

interface RoomType {
  id: string;
  name: string;
  capacity: number;
}

function Roomtype() {
  const [roomTypeName, setRoomTypeName] = useState('');
  const [roomTypeCapacity, setRoomTypeCapacity] = useState<number>(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch room types
  const {
    data: roomTypes,
    isLoading,
    error,
    refetch,
  } = useQuery<RoomType[]>({
    queryKey: ['roomTypes'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/room-type/fetch-all-room-types`);
      if (!res.ok) throw new Error('Failed to fetch room types');
      return res.json();
    },
  });

  // Add room type
  const addMutation = useMutation({
    mutationFn: async (newRoom: { name: string; capacity: number }) => {
      const res = await fetch(`${apiUrl}/room-type/add-room-type`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoom),
      });
      if (!res.ok) throw new Error('Failed to add room type');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Room type added!');
      setRoomTypeName('');
      setRoomTypeCapacity(1);
      refetch();
    },
    onError: () => toast.error('Error adding room type'),
  });

  // Delete room type
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${apiUrl}/room-type/delete-room-type-by-id?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete room type');
      return res.json();
    },
    onMutate: (id: string) => setDeletingId(id),
    onSuccess: () => {
      toast.success('Room type deleted!');
      refetch();
    },
    onError: () => toast.error('Error deleting room type'),
    onSettled: () => setDeletingId(null),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTypeName.trim()) {
      toast.error('Room type name is required');
      return;
    }
    if (roomTypeCapacity < 1) {
      toast.error('Capacity must be at least 1');
      return;
    }
    addMutation.mutate({ name: roomTypeName, capacity: roomTypeCapacity });
  };

  return (
    <div className='room-type-container'>
      <Toaster richColors position="top-center" />

      <div className='room-type-header'>
        <h1>Room Type Management</h1>
        <p>Create, view, update, and delete room types with capacity information</p>
      </div>

      <div className='room-type-content'>
        {/* Form Section */}
        <div className='room-type-form'>
          <h2>Add New Room Type</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='roomTypeName'>Room Type Name</label>
              <input
                type='text'
                id='roomTypeName'
                placeholder='e.g., Single Room, Double Room, Suite'
                value={roomTypeName}
                onChange={(e) => setRoomTypeName(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='roomTypeCapacity'>Maximum Capacity</label>
              <input
                type='number'
                id='roomTypeCapacity'
                min='1'
                max='10'
                value={roomTypeCapacity}
                onChange={(e) => setRoomTypeCapacity(parseInt(e.target.value))}
                required
              />
            </div>
            <button type='submit' className='submit-btn' disabled={addMutation.isPending}>
              {addMutation.isPending ? 'Saving...' : 'Save Room Type'}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className='room-type-table'>
          <h2>Existing Room Types</h2>
          {isLoading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading room types...</span>
              </div>
            </div>
          ) : error ? (
            <div className="error-message">Error fetching room types</div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomTypes?.map((room) => (
                    <tr key={room.id}>
                      <td>{room.id}</td>
                      <td>{room.name}</td>
                      <td>{room.capacity}</td>
                      <td>
                        {deletingId === room.id ? (
                          <div className="spinner-border spinner-border-sm text-danger" role="status">
                            <span className="visually-hidden">Deleting...</span>
                          </div>
                        ) : (
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => deleteMutation.mutate(room.id)}
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

export default Roomtype;
