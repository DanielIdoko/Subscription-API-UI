import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { authStore } from '../store/authStore';
import userAPI from '../services/api/user.api';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = authStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError('');

    try {
      await userAPI.deleteAccount();
      logout();
      navigate('/auth/login');
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || 'Failed to delete account');
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout title="Settings" greeting={false}>
      <div className="max-w-2xl space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Get notified about upcoming renewals</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600">Use dark theme for the dashboard</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="secondary" size="sm" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Session Timeout</p>
                <p className="text-sm text-gray-600">Auto logout after 30 minutes of inactivity</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Data & Storage */}
        <Card>
          <CardHeader>
            <CardTitle>Data & Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="py-3">
              <p className="font-medium text-gray-900 mb-2">Export Data</p>
              <p className="text-sm text-gray-600 mb-4">Download all your subscription data as CSV</p>
              <Button variant="secondary">Export Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-3">
              <p className="font-medium text-red-900 mb-2">Delete Account</p>
              <p className="text-sm text-red-700 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                variant="danger"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>

          {deleteError && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-sm text-red-800">
              {deleteError}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDeleteAccount}
              isLoading={isDeleting}
              className="flex-1"
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default SettingsPage;
