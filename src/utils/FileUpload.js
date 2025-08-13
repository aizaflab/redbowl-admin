export const FileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gypsyadvisor");

    // Send the request to Cloudinary
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/duilgrzmw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error(
        "Invalid response from Cloudinary: secure_url is missing"
      );
    }
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
