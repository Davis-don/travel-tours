import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import './addagent.css';

interface AddAgentModalProps {
  onClose: () => void;
  onSave?: (data: AgentFormData) => Promise<void> | void;
}

interface AgentFormData {
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

const AddAgentModal: React.FC<AddAgentModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<AgentFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    nationalId: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'agent',
  });

  const [errors, setErrors] = useState<Partial<AgentFormData>>({});
  const apiUrl = import.meta.env.VITE_travel;

  const createAgentMutation = useMutation({
    mutationFn: async (agentData: AgentFormData) => {
      const response = await fetch(`${apiUrl}/employee/add-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create agent');
      }

      return responseData; // { message: string, employee: object }
    },
    onSuccess: async (data) => {
      toast.success(data.message || 'Agent created successfully');

      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        nationalId: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'agent',
      });

      if (onSave) {
        try {
          await onSave(data.employee);
        } catch (error) {
          console.error('Error in onSave:', error);
        }
      }

      setTimeout(onClose, 1000);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create agent');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof AgentFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AgentFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.nationalId.trim()) newErrors.nationalId = 'National ID is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    createAgentMutation.mutate(formData);
  };

  return (
    <div className="modal-overlay">
      <Toaster richColors position="top-center" />
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add New Agent</h3>
          <button 
            className="close-btn" 
            onClick={onClose} 
            disabled={createAgentMutation.isPending}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label>National ID</label>
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
            />
            {errors.nationalId && <span className="error-message">{errors.nationalId}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="agent">Agent</option>
              <option value="senior-agent">Senior Agent</option>
              <option value="team-lead">Team Lead</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose} 
              disabled={createAgentMutation.isPending}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={createAgentMutation.isPending}
            >
              {createAgentMutation.isPending ? 'Creating...' : 'Save Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgentModal;
