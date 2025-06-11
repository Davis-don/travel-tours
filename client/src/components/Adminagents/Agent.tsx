import React, { useState } from 'react';
import AddAgentModal from '../Addagentform/Addagent';
import './agent.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FaTrash, FaUserPlus, FaSpinner } from 'react-icons/fa';
import { useAuthStore } from '../../Store/useauthstore';
import { toast, Toaster } from 'sonner';

interface Employee {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  createdAt: string;
}

interface NewAgent {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  nationalId: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: 'agent' | 'senior-agent' | 'team-lead' | 'admin';
}

interface ApiResponse {
  message: string;
  success: boolean;
  data?: Employee[];
  error?: string;
}

const Agents: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const apiUrl = import.meta.env.VITE_travel;

  const { data: employees = [], isLoading, isError } = useQuery<Employee[], AxiosError<ApiResponse>>({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const response = await axios.get<ApiResponse>(`${apiUrl}/employee/fetch-all`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.data.success && response.data.data) {
          return response.data.data;
        }
        throw new Error(response.data.message || 'Failed to fetch employees');
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data?.message || axiosError.message;
        toast.error(errorMessage);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime in v5)
    refetchInterval: 2000,
  });

  const deleteEmployeeMutation = useMutation<ApiResponse, AxiosError<ApiResponse>, string>({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const response = await axios.delete<ApiResponse>(`${apiUrl}/employee/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(data.message || 'Employee deleted successfully');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage || 'Failed to delete employee');
    },
    onSettled: () => {
      setDeletingId(null);
      setDeleteConfirmId(null);
    }
  });

 const handleAddAgent = async (newAgent: NewAgent): Promise<void> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${apiUrl}/employee/add-employee`,
      newAgent,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    if (response.data.success) {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setShowModal(false);
      toast.success(response.data.message || 'Employee added successfully');
    } else {
      throw new Error(response.data.message || 'Failed to add employee');
    }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage = axiosError.response?.data?.message || axiosError.message;
    toast.error(errorMessage || 'Failed to add employee');
  }
};


  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = (id: string) => {
    deleteEmployeeMutation.mutate(id);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        Error fetching employee data. Please try again later.
      </div>
    );
  }

  return (
    <div className="agents">
      <Toaster richColors position="top-center" />
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">Travel Agents</h3>
          <button 
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowModal(true)}
          >
            <FaUserPlus className="me-2" />
            Add New Agent
          </button>
        </div>

        <div className="card-body">
          {employees.length === 0 ? (
            <div className="text-center py-4">
              <h5>No employees found</h5>
              <p>Click the button above to add a new employee</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee: Employee) => (
                    <tr key={employee.id}>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>{employee.email}</td>
                      <td>
                        <span className={`badge ${
                          employee.role === 'admin' ? 'bg-danger' :
                          employee.role === 'team-lead' ? 'bg-warning text-dark' :
                          employee.role === 'senior-agent' ? 'bg-info' : 'bg-primary'
                        }`}>
                          {employee.role}
                        </span>
                      </td>
                      <td>
                        {deleteConfirmId === employee.id ? (
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => confirmDelete(employee.id)}
                              disabled={deletingId === employee.id}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={cancelDelete}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center"
                            onClick={() => handleDelete(employee.id)}
                            disabled={deletingId === employee.id}
                          >
                            {deletingId === employee.id ? (
                              <>
                                <FaSpinner className="me-1 fa-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <FaTrash className="me-1" />
                                Delete
                              </>
                            )}
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

      {showModal && (
        <AddAgentModal 
          onClose={() => setShowModal(false)} 
          onSave={handleAddAgent} 
        />
      )}
    </div>
  );
};

export default Agents;