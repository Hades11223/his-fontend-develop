import React from "react";
import CheckIcon from "assets/svg/chuanDoanHinhAnh/check.svg";
import EyeIcon from "assets/svg/chuanDoanHinhAnh/eye.svg";
import FileIcon from "assets/svg/chuanDoanHinhAnh/file.svg";
import PrintIcon from "assets/svg/chuanDoanHinhAnh/print.svg";
import SaveIcon from "assets/svg/chuanDoanHinhAnh/save.svg";

export const trangThaiDV = [
  { ten: "Đã TN", id: 1, icon: <FileIcon /> },
  { ten: "Đã TH", id: 2, icon: <FileIcon /> },
  { ten: "Đang đọc", id: 3, icon: <EyeIcon /> },
  { ten: "Đã lưu KQ", id: 4, icon: <SaveIcon /> },
  { ten: "Đã duyệt KQ", id: 5, icon: <CheckIcon /> },
  { ten: "Đã In", id: 6, icon: <PrintIcon /> },
];
