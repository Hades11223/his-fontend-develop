import { message, Spin, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import fileProvider from "../../data-access/file-provider";
import fileUtils from "../../utils/file-utils";

const UploadForm = ({
  label = "",
  textBtn = "tải lên",
  value,
  accept,
  provider = "",
  afterUpload = () => {},
  multiple,
  disabled,
}) => {
  const refFileRes = useRef([]);
  const refWait = useRef(0);
  const [state, _setState] = useState({
    visibleData: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const mapFile = (v) => {
    return v && v.length > 0
      ? v.map((item, idx) => {
          const splitName = item.split("/");
          return {
            status: "done",
            uid: idx + 1,
            name: splitName[splitName.length - 1],
            url: item,
            path: item,
          };
        })
      : [];
  };

  useEffect(() => {
    const visibleData = mapFile(value);
    setState({
      visibleData,
    });
    refFileRes.current = value || [];
  }, [value]);

  const downloadFile = ({ path }) => {
    fileUtils.downloadFile(path);
  };

  return (
    <div className="ant-row">
      <div className="ant-col">{label}</div>
      <Upload
        disabled={disabled || refWait.current !== 0}
        accept={accept}
        fileList={state.visibleData.map((item) => {
          let item2 = JSON.parse(JSON.stringify(item));
          if (item2.url) item2.url = fileUtils.absoluteFileUrl(item2.url);
          return item2;
        })}
        onRemove={(file) => {
          afterUpload(
            state.visibleData
              .filter((item) => item.uid !== file.uid)
              .map((item) => item.path)
          );
          refFileRes.current = refFileRes.current.filter(
            (item) => item !== file.path
          );
        }}
        onPreview={downloadFile}
        customRequest={({ onSuccess, onError, file }) => {
          file.status = "uploading";
          refWait.current = refWait.current + 1;
          setState({ wait: refWait.current });
          fileProvider
            .upload(file, provider)
            .then((s) => {
              if (s && s.code === 0) {
                refFileRes.current.push(s.data);
                setState({
                  visibleData: mapFile(refFileRes.current),
                });
              } else {
                message.error(s.message);
              }
            })
            .catch((e) => {
              message.error("Có lỗi xảy ra");
            })
            .finally(() => {
              refWait.current = refWait.current - 1;
              setState({ wait: refWait.current });
              if (refWait.current === 0) {
                afterUpload(refFileRes.current);
              }
            });
        }}
        multiple={multiple}
      >
        <div className="d-flex direction-col align-center pointer">
          {refWait.current == 0 ? (
            <div className="img-upload">
              <img src={require("assets/images/his-core/import.png")} alt="" />
            </div>
          ) : (
            <div className="img-upload">
              <Spin spinning />
            </div>
          )}

          <div className="name">{textBtn}</div>
        </div>
      </Upload>
    </div>
  );
};

export default UploadForm;
