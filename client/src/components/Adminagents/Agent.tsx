import React, { useState } from 'react';
import AddAgentModal from '../Addagentform/Addagent';
import './agent.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FaTrash, FaUserPlus, FaSpinner } from 'react-icons/fa';


interface Employee {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
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
  [key: string]: any;
}

const Agents: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const apiUrl = import.meta.env.VITE_travel;

  const { data: employees, isLoading, isError } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const response = await axios.get<Employee[]>(`${apiUrl}/employee/fetch-all`);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.error(axiosError.response?.data?.message || 'Failed to fetch employees');
        throw error;
      }
    },
    refetchInterval: 2000,
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      await axios.delete<ApiResponse>(`${apiUrl}/employee/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: AxiosError<ApiResponse>) => {
      console.error(error.response?.data?.message || 'Failed to delete employee');
    },
    onSettled: () => {
      setDeletingId(null);
      setDeleteConfirmId(null);
    }
  });

  const handleAddAgent = async (newAgent: NewAgent) => {
    try {
      await axios.post<ApiResponse>(`${apiUrl}/employee/add-employee`, newAgent);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setShowModal(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(axiosError.response?.data?.message || 'Failed to add agent');
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
          {employees?.length === 0 ? (
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
                  {(employees ?? []).map((employee) => (
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