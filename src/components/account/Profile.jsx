// src/components/Account/ProfileSection.jsx
import React from "react";

const ProfileSection = ({ user }) => {
  return (
    <div className="w-full bg-white shadow-md p-4 rounded-lg mb-6">
      <img
        src="https://picsum.photos/150"
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 mx-auto"
      />
      <h2 className="text-xl font-semibold text-center">{user.displayName}</h2>
      <p className="text-gray-600 text-center">{user.email}</p>
    </div>
  );
};

export default ProfileSection;
