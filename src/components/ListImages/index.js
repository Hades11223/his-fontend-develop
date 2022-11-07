import React, { useState, useRef, useEffect } from "react";
import { Upload, Modal } from "antd";
import Image from "components/Image";
import fileProvider from "data-access/file-provider";
import fileUtils from "utils/file-utils";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function Index(props) {
  const files = useRef([]);
  const [state, _setState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: files.current,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useEffect(() => {
    files.current = props.files
      ? [
          {
            status: "done",
            uid: "-1",
            name: "ảnh",
            url: props.files,
          },
        ]
      : [];
    setState({
      fileList: files.current,
      hasChange: false,
    });
  }, [props.files]);
  const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = (file) => {
    setState({
      previewImage: file.url || file.preview || file.originFileObj,
      previewVisible: true,
    });
  };

  const handleChange = ({ fileList }) => {};

  const { previewVisible, previewImage, fileList } = state;
  const uploadButton = (
    <div>
      {/* <Image type="plus" style={{ paddingBottom: 11 }} /> */}
      <div className="ant-upload-text">Tải ảnh lên</div>
    </div>
  );
  return (
    <div className="clearfix">
      <Upload
        listType="picture-card"
        fileList={fileList.map((item) => {
          let item2 = JSON.parse(JSON.stringify(item));
          if (item2.url) item2.url = fileUtils.absoluteFileUrl(item2.url);
          return item2;
        })}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => {
          files.current = files.current.filter((item) => item.uid !== file.uid);
          setState({
            fileList: files.current,
            hasChange: true,
          });
          props.uploadImage("");
        }}
        customRequest={({ onSuccess, onError, file }) => {
          file.status = "uploading";
          files.current.push(file);
          setState({
            fileList: files.current,
          });
          fileProvider
            .upload(file, props.provider)
            .then((s) => {
              var x = files.current.find((item) => item.uid === file.uid);
              if (x) {
                if (s && s.code === 0 && s.data.length) {
                  props.uploadImage(s.data);
                  let url = s.data;
                  x.status = "done";
                  x.url = url;
                } else {
                  x.status = "error";
                }
                setState({
                  fileList: files.current,
                  hasChange: true,
                });
              }
            })
            .catch((e) => {
              var x = files.current.find((item) => item.uid === file.uid);
              if (x) {
                x.status = "error";
                setState({
                  fileList: files.current,
                });
              }
            });
        }}
        accept=".png,.gif,.jpg"
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>
      {/* {state.hasChange && <Button onClick={onSave}>Lưu thay đổi</Button>} */}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
export default Index;
