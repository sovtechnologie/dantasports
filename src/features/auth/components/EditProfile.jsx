import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import * as yup from 'yup';
import './StyleSheets/EditProfile.css';
import { useEditProfile } from '../../../hooks/Profile/useEditProfile.js';
import { fetchProfile } from '../../../services/LoginApi/profileApi/endpointApi.js';

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

const EditProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const { mutate, isLoading: isSaving } = useEditProfile();

  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const profile = data?.result[0];
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
    }
  }, [profile, reset]);

  const onSubmit = (formData) => {
    const formattedDOB = new Date(formData.dob).toISOString().split('T')[0];
    mutate(
      {
        id: user?.id,
        fullName: formData.fullName,
        email: formData.email,
        dob: formattedDOB,
        gender: formData.gender,
        mobileNumber: profile?.mobile_number || '',
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['profile']); // Fetch updated data
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


  if (isFetching) return <p>Loading profile...</p>;
  if (!profile) return <p>Error loading profile data.</p>;

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Full Name:
          <input {...register('fullName')} />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </label>

        <label>
          Email:
          <input type="email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>

        <label>
          Date of Birth:
          <input type="date" {...register('dob')} />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </label>

        <label>
          Gender:
          <select {...register('gender')}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </label>

        <label>
          Mobile Number:
          <input value={profile?.mobile_number || ''} disabled readOnly />
        </label>

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
