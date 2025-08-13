/* eslint-disable react/prop-types */
import { useRef } from "react";
import JoditEditor from "jodit-react";
import { FileUpload } from "../../utils/FileUpload";

const JoditEditorComponent = ({ value, setValue }) => {
  const editor = useRef(null);

  // Function to handle image upload and insertion
  const insertImage = async (editorInstance) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const imageUrl = await FileUpload(file);
        if (imageUrl && imageUrl?.secure_url) {
          editorInstance?.s?.insertImage(imageUrl?.secure_url);
        } else {
          console.error("Image URL is undefined or invalid.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
  };

  // Jodit editor configuration
  const config = {
    theme: "dark",
    readonly: false,
    height: "80vh",
    toolbarAdaptive: false,
    extraButtons: [
      {
        name: "uploadImage",
        iconURL: "../../../public/camera.png",
        tooltip: "Upload Image",
        exec: (editorInstance) => insertImage(editorInstance),
      },
    ],
  };

  return (
    <JoditEditor ref={editor} value={value} config={config} tabIndex={1}

      onBlur={(newContent) => setValue(newContent)}
    />
  );
};

export default JoditEditorComponent;
