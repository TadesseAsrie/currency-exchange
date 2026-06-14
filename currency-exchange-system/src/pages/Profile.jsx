// src/pages/Profile.jsx
import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { FiCamera, FiSave, FiLock } from "react-icons/fi";

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    profileImage: user?.profileImage || null,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await changePassword(passwordData.oldPassword, passwordData.newPassword);
    setIsChangingPassword(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <Card title="Profile Picture" className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              ) : (
                <div className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center mx-auto">
                  <span className="text-4xl text-white font-bold">
                    {user?.fullName?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700"
              >
                <FiCamera />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Click the camera icon to upload a profile picture
            </p>
          </div>
        </Card>

        {/* Profile Information */}
        <Card title="Profile Information" className="lg:col-span-2">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                label="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateProfile} icon={FiSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-100">
                <span className="font-medium">Full Name:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-100">
                <span className="font-medium">Email:</span>
                <span>{formData.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-100">
                <span className="font-medium">Phone:</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={() => setIsEditing(true)} variant="primary">
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Change Password */}
        <Card title="Security" className="lg:col-span-3">
          {isChangingPassword ? (
            <div className="space-y-4 max-w-md">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <div className="flex gap-3 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleChangePassword} icon={FiLock}>
                  Change Password
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => setIsChangingPassword(true)}
                variant="outline"
                icon={FiLock}
              >
                Change Password
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
