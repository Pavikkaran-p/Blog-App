import React, { useState } from 'react';

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <input
          type="file"
          onChange={handlePhotoChange}
          className="mb-4"
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold">{name}</h2>
          <h3 className="text-gray-600">{email}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;