const preset = import.meta.env.VITE_APP_CLOUDINARY_PRESET;
const folder = import.meta.env.VITE_APP_CLOUDINARY_FOLDER;
const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

export const texteditorimageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);
  data.append("folder", folder);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  } catch (err) {
    console.error("Upload failed", err);
    return null;
  }
};
