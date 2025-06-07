import './clientsettings.css';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast,Toaster } from 'sonner';
import { useAuthStore } from '../../Store/useauthstore';

interface ClientSettings {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdateResponse {
  message: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
  };
}

function Clientsettings() {
  const token = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const setAuth = useAuthStore((state) => state.setAuth); // updated to single setter

  const [settings, setSettings] = useState<ClientSettings>({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    contact: currentUser?.contact || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const apiUrl = import.meta.env.VITE_travel;

  const updateClientMutation = useMutation<UpdateResponse, Error, Partial<ClientSettings>>({
    mutationFn: async (updateData) => {
      const response = await fetch(`${apiUrl}/client/update-client`, {
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
      // Update the entire auth store user part with new data, preserving token and role
      setAuth(token!, {
        id: data.client.id,
        firstName: data.client.firstName,
        lastName: data.client.lastName,
        email: data.client.email,
        contact: data.client.contact,
      }, role);

      toast.success(data.message || 'Settings updated successfully!');

      // Clear password fields if update was successful
      if (settings.newPassword) {
        setSettings((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
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

    const updateData: Partial<ClientSettings> = {
      firstName: settings.firstName,
      lastName: settings.lastName,
      email: settings.email,
      contact: settings.contact,
      ...(settings.newPassword && {
        currentPassword: settings.currentPassword,
        newPassword: settings.newPassword,
      }),
    };

    updateClientMutation.mutate(updateData);
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
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={settings.contact}
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
          disabled={updateClientMutation.isPending}
        >
          {updateClientMutation.isPending ? (
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

export default Clientsettings;
