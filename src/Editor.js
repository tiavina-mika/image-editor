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

  const [image, setImage] = useState(null);

  const handleFlipX = () => {
    const editor = editorRef.current?.getInstance();
    editor.flipX();
  };

  const onUpload = async (info) => {
    const editor = editorRef.current?.getInstance();
    await editor.loadImageFromFile(info.file.originFileObj);
    setImage(info.file.originFileObj);

    // .then(result => {
    //   console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
    //   console.log('new : ' + result.newWidth + ', ' + result.newHeight);
    // });
  };

  const crop = async () => {
    const editor = editorRef.current?.getInstance();
    // const result = editor.setCropzoneRect(5 / 4);
    // console.log('result', result);

    // const result = await editor.crop({ top: 0, left: 0, width: 100, height: 100});
    const rect = editor.getCropzoneRect();
    // const result = editor.crop(editor.getCropzoneRect());
    console.log("rect", rect);
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
        <div css={classes.buttonConainter}>
          <Button text="Crop" onClick={crop} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
