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
  dateOfBirth: string;
  nationalId: string;
  createdAt: string;
}

interface NewAgent {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'agent' | 'senior-agent' | 'team-lead' | 'admin';
  dateOfBirth: string;
  nationalId: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
  data?: Employee[];
  token?: string;
  user?: any;
}

const Agents: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const [showModal, setShowModal] = useState(false);
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 2000,
    enabled: !!token,
  });

  const deleteEmployeeMutation = useMutation<ApiResponse, AxiosError<ApiResponse>, string>({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const response = await axios.delete<ApiResponse>(`${apiUrl}/employee/${id}`, {
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
      toast.error(response.data.message || 'Failed to add employee');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage || 'Failed to add employee');
    } else {
      toast.error('Failed to add employee');
    }

    // Don't throw again — just handle it here
    // throw error; <-- REMOVE THIS LINE
  }
};


  const handleDelete = (id: string) => setDeleteConfirmId(id);
  const confirmDelete = (id: string) => deleteEmployeeMutation.mutate(id);
  const cancelDelete = () => setDeleteConfirmId(null);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <FaSpinner className="spinner-icon" />
        <span>Loading employees...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-message">
        Failed to load employees. Please try again.
      </div>
    );
  }

  return (
    <div className="agents-container">
      <Toaster richColors position="top-center" />
      <div className="agents-header">
        <h2>Employee Management</h2>
        <button 
          className="add-employee-btn"
          onClick={() => setShowModal(true)}
        >
          <FaUserPlus /> Add Employee
        </button>
      </div>

      <div className="employees-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName} {employee.middleName ? `${employee.middleName} ` : ''}{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <span className={`role-badge ${employee.role.toLowerCase()}`}>
                    {employee.role}
                  </span>
                </td>
                <td>
                  {deleteConfirmId === employee.id ? (
                    <div className="action-buttons">
                      <button
                        className="confirm-btn"
                        onClick={() => confirmDelete(employee.id)}
                        disabled={deletingId === employee.id}
                      >
                        Confirm
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={cancelDelete}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(employee.id)}
                      disabled={deletingId === employee.id}
                    >
                      {deletingId === employee.id ? (
                        <FaSpinner className="spinner" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
