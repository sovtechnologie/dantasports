import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import * as yup from 'yup';
import './StyleSheets/EditProfile.css';
import ProfileImage from "../assets/profileImage.png";
import { useEditProfile } from '../../../hooks/Profile/useEditProfile.js';
import { fetchProfile } from '../../../services/LoginApi/profileApi/endpointApi.js';
import EditProfileICon from "../assets/profileEditIcon.png";

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dob: yup
    .date()
    .required('Date of birth is required')
    .typeError('Enter a valid date'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], 'Select a valid gender')
    .required('Gender is required'),
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA'); // returns yyyy-mm-dd in local time
};


const EditProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const { mutate, isLoading: isSaving } = useEditProfile();

  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const profile = data?.data;
  console.log("Profile data:", profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });



  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.full_name || '',
        email: profile.email || '',
        dob: profile.dob ? profile.dob.slice(0, 10) : '',
        gender: profile.gender || '',
      });

      setProfileImage(profile?.profileImageUrl || null);
    }
  }, [profile, reset]);

  const onSubmit = (formData) => {
    mutate(
      {
        id: user?.id,
        fullName: formData.fullName,
        email: formData.email,
        dob: formatDate(formData.dob),
        gender: formData.gender,
        mobileNumber: profile?.mobile_number || '',
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['profile']); // Fetch updated data
          setSuccessMessage('Profile updated successfully!');

          // Optionally clear the message after 3 seconds
          setTimeout(() => setSuccessMessage(''), 3000);
        },
        onError: (error) => {
          const message = error?.response?.data?.message;

          if (message?.includes("Duplicate entry") && message?.includes("users.email")) {
            setError("email", {
              type: "manual",
              message: "This email is already in use. Please use a different one.",
            });
          } else {
            // Optional: Handle other cases like network error
            setError("fullName", {
              type: "manual",
              message: "Failed to update profile. Please try again later.",
            });
          }
        },
      }
    );
  };



  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.full_name || '',
        email: profile.email || '',
        dob: profile.dob ? profile.dob.slice(0, 10) : '',
        gender: profile.gender || '',
      });
    }
  }, [profile, reset]); // ✅ This gets re-run after refetch

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };


  if (isFetching) return <p>Loading profile...</p>;
  if (!profile) return <p>Error loading profile data.</p>;

  return (<>
    <div className="EditProfile-container">
      <div className="profile-pic-wrapper">
        <img
          src={profileImage || ProfileImage}
          alt="Profile"
          className="profile-pic"
        />
        <label htmlFor="profileImageInput" className="camera-icon">
          <img src={EditProfileICon} alt="Edit Profile" className="edit-icon" />
        </label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>



      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          FullName
          <input {...register('fullName')} placeholder="Enter Full Name" />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </label>

        <label>
          Email
          <input type="email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>

        <label>
          Date of Birth
          <input type="date" {...register('dob')} />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </label>

        <label>
          Gender
          <select {...register('gender')}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </label>

        <label>
          Mobile Number
          {/* Assuming mobile_number is not editable */}
          <input value={profile?.mobile_number || ''} disabled readOnly />
        </label>

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  </>
  );
};

export default EditProfile;
