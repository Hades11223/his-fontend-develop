import React from 'react';
import styled from 'styled-components';
import { XIcon } from '@components/common/svgIcons';
import { Progress } from 'antd';
import customImage from './customImg';
import moment from 'moment';
customImage();

const FileThumbStyled = styled.div`
  margin: 0.5em;
  padding: ${(props) => (props.isIcon ? 0 : '0.5em')};
  width: ${(props) => (props.isIcon ? '100%' : 'auto')};
  display: flex;
  flex-direction: ${(props) => (props.isIcon ? 'row' : 'column')};
  justify-content: center;
  align-items: center;
  justify-items: center;
  border: ${(props) => (props.isIcon ? 'none' : 'solid 1px rgba(0,0,0, 0.25)')};
  border-radius: 10px;
  cursor: pointer;
  .image-wrap {
    width: ${(props) => (props.isIcon ? 40 : 190)}px;
    height: ${(props) => (props.isIcon ? 40 : 160)}px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    margin-bottom: 1.5em;
    border: solid 1px rgba(0, 0, 0, 0.25);
    box-shadow: 2px 4px;
  }
  img {
    width: ${(props) => (props.isIcon ? 40 : 190)}px;
    max-height: 160px;
  }
  .info-wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
    .file-name {
      text-align: left;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: #1c75bc;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .file-date {
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        max-width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .file-size {
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        text-align: right;
        max-width: 70px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
const FileThumb = ({
  file,
  onClick,
  isIcon,
  handleRemoveFile,
  isAuthen,
  progress,
  debugMode,
}) => {
  return (
    <FileThumbStyled
      isIcon={isIcon}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {isIcon && file.fullUrl && (
        <img
          is={debugMode ? '' : 'auth-img'}
          className="image"
          authSrc={file.fullUrl}
          isAuthen={isAuthen}
          src={debugMode ? file.fullUrl : ''}
        />
      )}
      {!isIcon && file.fullUrl && (
        <div className="image-wrap">
          <img
            is={debugMode ? '' : 'auth-img'}
            className="image"
            authSrc={file.fullUrl}
            src={debugMode ? file.fullUrl : ''}
            isAuthen={isAuthen}
          />
        </div>
      )}
      {!isIcon && (
        <div className="info-wrap">
          <div className="file-name">{file.name}</div>
          <div className="file-info">
            <div className="file-date">
              {moment(file.createdAt).format('DD/MM/YYYY HH:mm')}
            </div>
            <div className="file-size">
              {(progress?.size || 0) / 1024 > 1024
                ? `${
                    Math.round((100 * (progress?.size || 0)) / 1024 / 1024) /
                    100
                  }mb`
                : `${Math.round((100 * (progress?.size || 0)) / 1024) / 100}kb`}
            </div>
          </div>
        </div>
      )}
      {isIcon && (
        <div className="file-info">
          <div className="file-info-text">
            <span className="file-name">{file.name}</span>
            <span>
              {progress?.progress < 100 &&
                `${progress?.currentSize || progress?.size || 0}/`}
              {Math.round(
                100 *
                  ((progress?.size || 0) / 1024 < 1024
                    ? (progress?.size || 0) / 1024
                    : (progress?.size || 0) / 1024 / 1024),
              ) / 100}
              &nbsp;{(progress?.size || 0) / 1024 < 1024 ? 'kb' : 'mb'}
              &nbsp;&nbsp;
              <span onClick={handleRemoveFile} className="icon-delete">
                {XIcon}
              </span>
            </span>
          </div>
          <Progress percent={progress?.progress} />
        </div>
      )}
    </FileThumbStyled>
  );
};

export default FileThumb;
