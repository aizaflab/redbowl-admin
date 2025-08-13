import React, { useEffect, useState } from "react";
import { MdOutlineUploadFile, MdArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../features/user/userApiSlice";
import toast from "react-hot-toast";
import { CloudinarhandleUpload } from "../../config/Cloudinar";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading, isSuccess, data }] = useUpdateUserMutation();

  const [profileData, setProfileData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(user.profileImage || "");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePreviewUrl = URL.createObjectURL(file);
      setImagePreview(filePreviewUrl);
      setProfileData({ ...profileData, profileImage: file });
    } else {
      setError("No file selected. Please try again.");
    }
  };

  const handleSave = async () => {
    const formData = new FormData();

    if (profileData?.profileImage?.name) {
      const result = await CloudinarhandleUpload(
        profileData?.profileImage,
        "profile"
      );

      if (result.status) {
        formData.append("profileImage", result.url); // Append uploaded image URL
      } else {
        toast.error("Image upload failed!");
        return;
      }
    }
    formData.append("name", profileData?.name);
    try {
      await updateUser(formData).unwrap();
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-primary/20 border border-mainLight/20 rounded-lg shadow-2xl p-6 w-96  overflow-hidden">
        <div className="text-center z-[6] relative">
          {isEditing && (
            <p className="text-start m-0 p-0 text-white">
              <span
                className="cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                <MdArrowBackIos />
              </span>
            </p>
          )}

          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              className="w-full h-full rounded-full object-cover shadow-lg border-4 border-primary bg-primary"
              src={imagePreview}
              alt="Profile"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <MdOutlineUploadFile className="w-6 h-6" />
              </label>
            )}
          </div>

          {isEditing ? (
            <div>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-primary rounded-lg bg-mainBg text-white"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                disabled
                className="w-full p-2 mb-2 border border-primary rounded-lg bg-mainBg text-white"
                placeholder="Email"
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-medium text-gray-200">
                {profileData.name}
              </h2>
              <p className="text-sm text-gray-300">{profileData.email}</p>
              <span className="mt-4 inline-block bg-primary text-white text-sm font-medium px-4 py-2 rounded-full">
                {profileData.role}
              </span>
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 z-[6] relative">{error}</p>
        )}
        <div className="mt-6 z-[6] relative">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full py-2 text-white font-semibold bg-primary hover:bg-opacity-90 rounded-lg shadow-lg transition"
            >
              {isLoading ? "Loading.." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 text-white font-semibold bg-primary hover:bg-opacity-90 rounded-lg shadow-lg transition"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-96 rotate-45 opacity-30 "></div>
      </div>
    </div>
  );
};

export default ProfilePage;
