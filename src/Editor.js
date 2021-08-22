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
      path: image || "me.jpg",
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
    "& #container": {
      padding: 0
    },
    "& .tui-image-editor-container": {
      overflow: "hidden"
    },
    "& .tui-image-editor-header, .tui-image-editor-help-menu, .tui-image-editor-controls": {
      display: "none"
    },
    "& .tui-image-editor-main-container": {
      backgroundColor: "transparent !important"
    }
  },
  buttonConainter: {
    margin: 10
  }
};

const Editor = () => {
  const editorRef = useRef();
  const editor = editorRef.current.getInstance();

  const [image, setImage] = useState(null);

  const handleFlipX = () => {
    editor.flipX();
  };

  const onUpload = (info) => {
    setImage(info.file.originFileObj);
  };

  return (
    <div css={classes.editor} className="justifyStart">
      <ImageEditor ref={editorRef} {...props(image)} />

      <div className="flexRow m-t-20">
        <div css={classes.buttonConainter}>
          <Button text="Flip X" onClick={handleFlipX} />
        </div>
        <div css={classes.buttonConainter}>
          <Upload {...uploadProps} onChange={onUpload}>
            <Button text="Click to Upload" />
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default Editor;
