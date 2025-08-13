import React, { useRef } from 'react';
import JoditEditor from 'jodit-react'; // Correct import

const JoditEditorComponent = ({ value, setValue }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 400,
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setValue(newContent)} // Updates content on blur
    />
  );
};

export default JoditEditorComponent;
