import EyeIcon from "assets/svg/chuanDoanHinhAnh/eye.svg";
import SaveIcon from "assets/svg/chuanDoanHinhAnh/save.svg";
import ShareIcon from "assets/svg/chuanDoanHinhAnh/share.svg";
import React from "react";
import { Main } from "./styled";

const ThongTinDichVu = (props) => {
  return (
    <Main>
      <div className="head">
        <div className="d-flex">
          <span className="d-flex pointer">
            <div>Chia sẻ</div>
            <ShareIcon />
          </span>
          <span className="d-flex pointer" style={{ marginLeft: "20px" }}>
            <div>Xem ảnh</div>
            <EyeIcon />
          </span>
        </div>
        <div>
          <span className="d-flex pointer">
            <div>Đọc kết quả</div>
            <SaveIcon />
          </span>
        </div>
      </div>
      <div className="title">
        <h3>Thông tin dịch vụ</h3>
      </div>
      <div className="content">
        <div>
          <span>Họ tên: Nguyễn Hoàng Thảo Nguyên</span>
        </div>
        <div>
          <span>Ngày tháng năm sinh: 21/02/1999 (22t)</span>
        </div>
        <div>
          <span>Giới tính: Nam</span>
        </div>
        <div>
          <span>Mã NB: 7123456</span>
        </div>
        <div>
          <span>Mã kết nối: 21254654</span>
        </div>
        <div>
          <span>Địa chỉ: 64 Ngõ 97 Trịnh Công Sơn</span>
        </div>
        <div>
          <span>SĐT: 0941235645</span>
        </div>
        <div>
          <span>Chuẩn đoán: Đau bụng</span>
        </div>
        <div>
          <span>Bác sĩ chỉ định: Nguyễn Văn A</span>
        </div>
        <div>
          <span>Chỉ định: dịch vụ chỉ định</span>
        </div>
        <div>
          <span>Khoa chỉ định: khoa chỉ định dịch vụ</span>
        </div>
      </div>
    </Main>
  );
};

export default ThongTinDichVu;
