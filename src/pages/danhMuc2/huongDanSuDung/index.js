import { Checkbox, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import fileProvider from "../../../data-access/file-provider";
import { Main } from "./styled";

import FileUpload from "./file-upload";
import UploadForm from "components/UploadForm";
import BaseDmWrap from "components/BaseDmWrap";
import { useStore } from "hook";
const HuongDanSuDung = ({}) => {
  const [listFile, setListFile] = useState([]);
  const _dataEdit = useStore("hdsd._dataEdit");
  const { updateData } = useDispatch().hdsd;

  const onDeleteFile = (form) => () => {
    setListFile([]);
    updateData({ _dataEdit: { ..._dataEdit, hdsd: null } });
    form.setFieldsValue({ hdsd: null });
  };

  const renderForm = ({ form, editStatus, checkChangeField }) => {
    return (
      <>
        <Form.Item
          label="Mã HDSD"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã HDSD!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã HDSD không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã HDSD!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã HDSD"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên tài liệu HDSD"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tài liệu HDSD!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên tài liệu HDSD!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên tài liệu HDSD"
          />
        </Form.Item>
        <Form.Item
          name="hdsd"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn file tải lên!",
            },
          ]}
          style={{ width: "100%" }}
        >
          <div className="ant-row">
            <div className="ant-col">
              Tải lên HDSD <span style={{ color: "red" }}>*</span>
            </div>
            {_dataEdit?.hdsd ? (
              <FileUpload
                fileName={_dataEdit?.hdsd}
                onDelete={onDeleteFile(form)}
              />
            ) : (
              <Upload
                accept=".pdf,.html"
                fileList={listFile}
                onRemove={(file) => {
                  form.setFieldsValue({ hdsd: null });
                  setListFile([]);
                }}
                customRequest={({ onSuccess, onError, file }) => {
                  setListFile([file]);
                  fileProvider
                    .upload(file, "huongDanSuDung")
                    .then((s) => {
                      if (s && s.code === 0) {
                        form.setFieldsValue({ hdsd: s.data });
                      } else {
                        message.error(s.message);
                      }
                    })
                    .catch((e) => {
                      message.error("Có lỗi xảy ra");
                    });
                }}
              >
                {listFile.length > 0 ? null : (
                  <div className="d-flex direction-col align-center pointer">
                    <div className="img-upload">
                      <img
                        src={require("assets/images/his-core/import.png")}
                        alt=""
                      />
                    </div>

                    <div className="name">Tải file HDSD dạng html, pdf</div>
                  </div>
                )}
              </Upload>
            )}
          </div>
        </Form.Item>

        <Form.Item name="dsVideo" style={{ width: "100%" }}>
          <UploadForm
            accept=".avi,.mp4,.wmv,.mkv,.vob,.flv,.mpeg,.3gp"
            afterUpload={checkChangeField("dsVideo")}
            provider="hdsdVideo"
            label="Video hướng dẫn sử dụng"
            textBtn="Tải lên Video HDSD"
            multiple
          ></UploadForm>
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  const onReset = () => {
    setListFile([]);
  };
  return (
    <Main>
      <BaseDmWrap
        titleTable="Danh mục Tài liệu hướng dẫn sử dụng"
        titleMain={"tài liệu"}
        roleName="HDSD"
        classNameForm={"form-custom--one-line"}
        storeName="hdsd"
        onReset={onReset}
        renderForm={renderForm}
        afterSubmit={onReset}
      />
    </Main>
  );
};

export default HuongDanSuDung;
