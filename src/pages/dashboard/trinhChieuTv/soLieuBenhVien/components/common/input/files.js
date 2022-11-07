import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'antd';
import snackbar from '@utils/snackbar-utils';
import Styled from 'styled-components';
import clientUtils from '@utils/client-utils';
import IsofhCarousel from '../carousel';
import { isEmpty } from 'lodash';
import FileThumb from './FileThumb';

const UploadFileStyled = Styled.div`
@media (min-width: 900px) {
  .file-list-view-wrapper {
    min-width: 900px;
  }
}
.file-list-view-wrapper {
  border: 1px dashed 2px rgba(23, 43, 77, 0.25);
  background: #FFFFFF;
  border-radius: 4px;
  display: flex;
  flex-flow: ${(props) => (props.viewMode ? 'row' : 'row wrap')};
  overflow: scroll;
}
.upload-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 0.5em;
}
.file-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.file-info-text {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .file-name {
    max-width: 450px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.icon-delete {
  cursor: pointer;
  :hover {

  }
}
.upload-button {
  width: 100%;
  border: dashed 2px rgba(23, 43, 77, 0.25);
  padding: 0.5em;
  .link-placeholder {
    color: #72a4cd;
    text-decoration: underline;
  }
}
.ant-upload.ant-upload-select.ant-upload-select-text {
  width: 100%;
}
.image-thumb,
.icon-thumb {
  margin-right: 1em;
  width: 40px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
`;
const defaultTexts = {
  uploadError: 'Lỗi upload, vui lòng thử file khác!',
  errorBigFile: 'File tải lên vượt quá dung lượng 25MB, vui lòng kiểm tra lại.',
  errorMaxFile:
    'Các file tải lên có tổng dung lượng không được vượt quá 75MB, vui lòng kiểm tra lại.',
};

const filePath = '/api/medical-incident/v1/files/';

export default function UploadFile(props) {
  const {
    onChange,
    placeholder,
    linkPlaceholder,
    disabled = false,
    viewMode,
    defaultValue,
    viewDetail = false,
    openModalFileView,
    apiUploadFileProgress,
    requireAuthen = false,
    isAuthen,
    currentViewIndex,
  } = props;

  const [fileList, setFileList] = useState([]);
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    if (isEmpty(fileList) && !isEmpty(defaultValue)) {
      setFileList(
        (defaultValue || []).map((file, index) => ({
          ...file,
          fullUrl: `${clientUtils.serverApi}${filePath}${file.url}`,
        })),
      );
      setProgressList(
        (defaultValue || []).map((v, index) => ({
          progress: 100,
          currentSize: v.size,
          size: v.size,
          id: v.id,
          status: 'done',
        })),
      );
    }
  }, [defaultValue]);

  const handleUploadProgress = (file) => (event) => {
    const percent = Math.floor((event.loaded / event.total) * 100);
    setProgressList((prev) =>
      prev.map((_progress) => {
        if (_progress.uid === file.uid) {
          _progress.progress = percent;
          _progress.size = event.loaded;
          _progress.currentSize = `${
            Math.round(
              100 *
                (event.loaded / 1024 < 1024
                  ? event.loaded / 1024
                  : event.loaded / 1024 / 1024),
            ) / 100
          }${event.loaded / 1024 > 1024 ? 'mb' : 'kb'}`;
        }
        return _progress;
      }),
    );
  };

  const handleRemoveFile = (file) => () => {
    setFileList((prev) => {
      const newValue = prev.filter((f) => f.id !== file.id);
      onChange && onChange(newValue);
      return newValue;
    });
    setProgressList((prev) => {
      const newValue = prev.filter((p) => p.id !== file.id);
      return newValue;
    });
  };

  const customUploadRequest = ({ onSuccess, onError, file }) => {
    setFileList((prev) => [...prev, file]);
    setProgressList((prev) => [
      ...prev,
      {
        status: 'pending',
        uid: file.uid,
      },
    ]);
    apiUploadFileProgress &&
      apiUploadFileProgress(file, {
        onUploadProgress: handleUploadProgress(file),
        requireAuthen,
      })
        .then((fileRes) => {
          setFileList((prev) => {
            let newFileList = prev.map((f) => {
              if (f.id === file.id) {
                return {
                  ...f,
                  ...fileRes.data[0],
                  fullUrl: `${clientUtils.serverApi}${filePath}${fileRes.data[0].url}`,
                  file: fileRes.file,
                };
              }
              return f;
            });
            onChange && typeof onChange === 'function' && onChange(newFileList);
            return newFileList;
          });
          setFileList((prev) => {
            return prev.map((p) => {
              if (p.id === file.id) {
                return {
                  status: 'done',
                  progress: 100,
                  size: file.size,
                  currentSize: file.size,
                  id: fileRes.data[0].id,
                  uid: null,
                };
              }
              return p;
            });
          });
        })
        .catch(() => {
          setFileList((prev) => {
            let newFileList = prev.map((f) => {
              if (f.id === file.id) {
                f.status = 'error';
              }
              return f;
            });
            onChange && typeof onChange === 'function' && onChange(newFileList);
            return newFileList;
          });
          snackbar.show(defaultTexts.uploadError, 'danger');
        });
  };

  const handleBeforeUpload = (file, fileList) => {
    const sizeAllFile = (fileList || []).reduce(
      (previousValue, file) => previousValue + file.size,
    );
    if (file.size > 26214400) {
      snackbar.show(defaultTexts.errorBigFile, 'danger');
      return Upload.LIST_IGNORE;
    }
    if (sizeAllFile > 78643200) {
      snackbar.show(defaultTexts.errorMaxFile, 'danger');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const itemRender = (file, index) => {
    return (
      <div key={file.id} className="upload-item">
        <FileThumb
          key={file.id}
          handleRemoveFile={handleRemoveFile(file)}
          file={file}
          progress={progressList[index]}
          isIcon={true}
          isAuthen={isAuthen}
        />
      </div>
    );
  };

  return (
    <UploadFileStyled key="upload-file" viewMode={viewMode}>
      {!viewMode && (
        <Upload
          name="file-upload"
          disabled={disabled}
          fileList={fileList}
          beforeUpload={handleBeforeUpload}
          customRequest={customUploadRequest}
          showUploadList={{
            showPreviewIcon: false,
            showRemoveIcon: false,
            showDownloadIcon: false,
          }}
          itemRender={() => ''}
        >
          <div className="upload-button">
            <div disabled={disabled}>
              {placeholder}
              <span className="link-placeholder">{linkPlaceholder}</span>
            </div>
          </div>
        </Upload>
      )}
      {!viewMode && fileList.map((file, index) => itemRender(file, index))}
      {viewDetail && (
        <div className="file-list-view-detail">
          <IsofhCarousel
            dataSource={fileList}
            defaultIndex={currentViewIndex}
            isAuthen={isAuthen}
          />
        </div>
      )}
      {viewMode && !viewDetail && (
        <div className={`file-list-view-wrapper`}>
          {fileList.map((file, index) => {
            return (
              <FileThumb
                key={file.id || file.uid}
                file={file}
                progress={progressList[index]}
                isAuthen={isAuthen}
                onClick={() => {
                  openModalFileView &&
                    typeof openModalFileView === 'function' &&
                    openModalFileView(true, {
                      files: fileList,
                      currentViewIndex: index,
                    });
                }}
              />
            );
          })}
        </div>
      )}
    </UploadFileStyled>
  );
}
