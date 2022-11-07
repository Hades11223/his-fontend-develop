import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Upload } from "antd";
import { Main } from "./styled";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ListImage = (props) => {
  const { t } = useTranslation();
  const {
    disabled,
    itemProps,
    imgRef,
    onHandleClickedEdit,
    image,
    onHandleDelete,
    onHandleChange,
    mode,
  } = props;
  const imgRef1 = useRef(null);
  const handleClickedEditImg = (link) => {
    if (imgRef1.current) {
      imgRef.current = imgRef1.current;
      onHandleClickedEdit(link);
    }
  };
  return (
    <Main style={{ position: "relative" }}>
      <Upload
        disabled={disabled || itemProps.allowSelectImage === false}
        showUploadList={false}
        beforeUpload={(file, listFile) => {
          onHandleChange(file, image);
        }}
        customRequest={({ onSuccess }) => {
          onSuccess(null, {});
        }}
        accept=".png,.jpg,.jpeg,.bmp"
        multiple={false}
        style={{ position: "relative" }}
        name="file"
      >
        <img
          className={"img-view"}
          ref={imgRef1}
          src={image.image}
          width={itemProps.width}
          height={itemProps.height}
          alt={"default"}
        />
      </Upload>
      {mode != "config" && !disabled && (
        <div className="group-btn">
          <Button
            className="icon "
            onClick={() => handleClickedEditImg(image.linkImage)}
            icon={<EditOutlined />}
            title={t("editor.chinhSuaHinhAnh")}
          />
          <Button
            className="icon icon-remove"
            icon={<CloseOutlined />}
            onClick={() => onHandleDelete(image.linkImage)}
          />
        </div>
      )}
    </Main>
  );
};

export default ListImage;
