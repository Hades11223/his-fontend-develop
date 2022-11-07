import SaveIcon from "assets/svg/chuanDoanHinhAnh/save.svg";
import CheckIcon from "assets/svg/chuanDoanHinhAnh/check.svg";
import UploadIcon from "assets/svg/chuanDoanHinhAnh/upload.svg";
import DownIcon from "assets/svg/chuanDoanHinhAnh/download.svg";
import CameraIcon from "assets/svg/chuanDoanHinhAnh/camera.svg";
import CameraShowIcon from "assets/svg/chuanDoanHinhAnh/camera-turn-on.svg";
import DeleteIcon from "assets/svg/chuanDoanHinhAnh/delete.svg";
import React from "react";
import VideoWrapper from "../../components/VideoWrapper";
import { Main } from "./styled";
import { Upload } from "antd";

const ThongTinDichVu = (props) => {
  return (
    <Main>
      <div className="head">
        <div className="d-flex">
          <span className="d-flex pointer">
            <div>Lưu kết quả</div>
            <SaveIcon />
          </span>
          <span className="d-flex pointer green ml-1">
            <div>Duyệt kết quả</div>
            <CheckIcon className="bg-green" />
          </span>
          <span className="d-flex pointer ml-1">
            <div>Đọc kết quả</div>
            <SaveIcon />
          </span>
        </div>
      </div>
      <div className="title">
        <h3>Hình ảnh liên quan</h3>
      </div>
      <div className="content">
        <VideoWrapper />
        <div className="actions">
          <Upload className="d-flex direction-col align-center pointer">
            <div className="icon">
              <UploadIcon />
            </div>
            <div className="name">Tải lên</div>
          </Upload>
          <div className="d-flex direction-col align-center pointer">
            <div className="icon">
              <DownIcon />
            </div>
            <div className="name">Tải xuống</div>
          </div>
          <div className="d-flex direction-col align-center pointer">
            <div className="icon circle">
              <CameraIcon />
            </div>
            <div className="name">
              Chụp
            </div>
          </div>
          <div className="d-flex direction-col align-center pointer">
            <div className="icon">
              <CameraShowIcon />
            </div>
            <div className="name">
              Bật camera
            </div>
          </div>
          <div className="d-flex direction-col align-center pointer">
            <div className="icon">
              <DeleteIcon />
            </div>
            <div className="name">
              Xóa
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ThongTinDichVu;
