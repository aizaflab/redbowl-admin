import toast from "react-hot-toast";

export const CloudinarhandleUpload = async (image, preset) => {
    if (!image) {
        toast.error('Please select an image!');
        return { status: false, url: null };
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/ddnvk9rja/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
            return { status: true, url: data.secure_url };
        } else {
            throw new Error(data.message || "Failed to upload image");
        }
    } catch (error) {
        toast.error(error.message || "An error occurred during upload");
        return { status: false, url: null };
    }
};
