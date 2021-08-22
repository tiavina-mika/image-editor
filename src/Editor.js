/** @jsxRuntime classic /
/* @jsx jsx */
import { useRef, useState } from "react";
import { jsx } from "@emotion/react";
import ImageEditor from "@toast-ui/react-image-editor";

import Button from "./components/Button";
import { Upload } from "antd";

const props = (image) => ({
  includeUI: {
    loadImage: {
      path: image,
      name: "SampleImage"
    },
    menu: [],
    initMenu: "",
    uiSize: {
      width: "700px",
      height: "700px"
    }
  }
});

const uploadProps = {
  name: "file"
};

const classes = {
  editor: {
    "& .tui-image-editor-header, .tui-image-editor-help-menu, .tui-image-editor-controls": {
      display: "none"
    },
    "& .tui-image-editor-main-container": {
      backgroundColor: "transparent !important"
    }
  }
};

const Editor = () => {
  const editorRef = useRef();
  const [image, setImage] = useState(null);

  const handleFlipX = () => {
    const editorInstance = editorRef.current.getInstance();

    editorInstance.flipX();
  };

  const onUpload = (info) => {
    setImage(info.file.originFileObj);
  };

  return (
    <div css={classes.editor} className="justifyStart">
      <ImageEditor ref={editorRef} {...props(image)} />
      <Button text="Flip X" onClick={handleFlipX} />
      <Upload {...uploadProps} onChange={onUpload}>
        <Button text="Click to Upload" />
      </Upload>
    </div>
  );
};

export default Editor;
