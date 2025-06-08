import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';
import { useAuthStore } from '../../Store/useauthstore';

interface EmployeeSettings {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdateResponse {
  message: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

function Agentsettings() {
  const token = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [settings, setSettings] = useState<EmployeeSettings>({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.contact || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const apiUrl = import.meta.env.VITE_travel;

  const updateEmployeeMutation = useMutation<UpdateResponse, Error, Partial<EmployeeSettings>>({
    mutationFn: async (updateData) => {
      const response = await fetch(`${apiUrl}/employee/update-agent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update settings');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.employee) {
        setAuth(token!, {
          id: data.employee.id,
          firstName: data.employee.firstName,
          lastName: data.employee.lastName,
          email: data.employee.email,
          contact: data.employee.phoneNumber,
        }, role);
        
        toast.success(data.message || 'Settings updated successfully!');
        
        if (settings.newPassword) {
          setSettings((prev) => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }));
        }
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    const updateData: Partial<EmployeeSettings> = {
      firstName: settings.firstName,
      lastName: settings.lastName,
      email: settings.email,
      phoneNumber: settings.phoneNumber,
      ...(settings.newPassword && {
        currentPassword: settings.currentPassword,
        newPassword: settings.newPassword,
      }),
    };

    updateEmployeeMutation.mutate(updateData);
  };

  return (
    <div className="settings-section">
      <Toaster richColors position="top-center" />
      <h2 className="section-title">
        <i className="fas fa-user-cog"></i> Account Settings
      </h2>

      <form onSubmit={handleSaveSettings} className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={settings.firstName}
              onChange={handleSettingsChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={settings.lastName}
              onChange={handleSettingsChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleSettingsChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={settings.phoneNumber}
            onChange={handleSettingsChange}
          />
        </div>

        <h3 className="password-title">
          <i className="fas fa-lock"></i> Change Password
        </h3>

        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={settings.currentPassword}
            onChange={handleSettingsChange}
            placeholder="Enter current password to change"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={settings.newPassword}
              onChange={handleSettingsChange}
              placeholder="Leave blank to keep current"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={settings.confirmPassword}
              onChange={handleSettingsChange}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="save-btn"
          disabled={updateEmployeeMutation.isPending}
        >
          {updateEmployeeMutation.isPending ? (
            'Saving...'
          ) : (
            <>
              <i className="fas fa-save"></i> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Agentsettings;