import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { authStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import userAPI from "../services/api/user.api";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaCopy,
  FaClock,
} from "react-icons/fa";
import { FiShield } from "react-icons/fi";

export const ProfilePage: React.FC = () => {
  const { user, fetchCurrentUser } = authStore();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.data?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const emailVerified = user?.data?.emailVerified || false;

  useEffect(() => {
    if (user == null) fetchCurrentUser();
  }, [user, fetchCurrentUser]);

  useEffect(() => {
    if (user?.data?.name) {
      setName(user.data.name);
    }
  }, [user]);

  // Handler for updating profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { data } = await userAPI.updateProfile({ name });

      // Update local store user information after successful update
      const prevUser = authStore.getState().user;
      if (prevUser) {
        authStore.setState({
          user: {
            ...prevUser,
            data: {
              ...prevUser.data,
              name: data.name,
            },
          },
        });
      }

      setSuccess(true);
      showToast("Profile updated successfully!", "success", 3000);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMsg);
      showToast(errorMsg, "error", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`${field} copied to clipboard!`, "success", 2000);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const createdDate = user?.data.createdAt
    ? new Date(user.data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <DashboardLayout title="Profile" greeting={false}>
      <div className="max-w-4xl space-y-6">
        {/* Email Verification Banner */}
        {!emailVerified && (
          <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <FaEnvelope className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-inter text-orange-900 dark:text-orange-100 mb-1">
                Verify Your Email
              </h3>
              <p className="text-sm font-sans text-orange-800 dark:text-orange-200">
                We've sent a verification link to your email address. Please
                check your inbox and verify your email to unlock all features.
              </p>
            </div>
          </div>
        )}

        {/* Profile Header Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  emailVerified
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {emailVerified ? (
                  <>
                    <FaCheckCircle size={14} />
                    Email Verified
                  </>
                ) : (
                  <>
                    <FaTimesCircle size={14} />
                    Unverified
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-3xl shadow-lg">
                  {user?.data?.name?.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-300 font-medium mb-1">
                    Account Avatar
                  </p>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {user?.data.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {user?.data.email}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Edit your name"
                  />
                </div>

                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    value={user?.data.email || ""}
                    disabled
                    className="bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Email address cannot be changed
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <FaTimesCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Profile updated successfully!
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FiShield className="w-5 h-5 text-blue-600" />
                <CardTitle>Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Email Status:</span>{" "}
                  {emailVerified ? "Verified" : "Pending Verification"}
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    User ID
                  </p>
                  <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-900 dark:text-gray-100 font-mono truncate">
                      {user?.data._id}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(user?.data._id || "", "User ID")
                      }
                      className="shrink-0 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy User ID"
                    >
                      <FaCopy
                        size={14}
                        className={
                          copiedField === "User ID"
                            ? "text-green-600"
                            : "text-gray-600"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FaClock className="w-5 h-5 text-purple-600" />
                <CardTitle>Account Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-xs font-semibold text-purple-700 uppercase mb-1">
                    Member Since
                  </p>
                  <p className="text-lg font-semibold text-purple-900">
                    {createdDate}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                    Account Age
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(
                          user?.data.createdAt || new Date(),
                        ).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Profile Completion Status
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {emailVerified ? "100%" : "50%"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${emailVerified ? "bg-green-500" : "bg-orange-500"}`}
                  style={{ width: emailVerified ? "100%" : "50%" }}
                />
              </div>
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    emailVerified ? "bg-green-100" : "bg-orange-100"
                  }`}
                >
                  {emailVerified ? (
                    <FaCheckCircle size={14} className="text-green-600" />
                  ) : (
                    <FaTimesCircle size={14} className="text-orange-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email Verification
                  </p>
                  <p className="text-sm text-gray-600">
                    {emailVerified
                      ? "Your email has been verified"
                      : "Verify your email to complete your profile"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
