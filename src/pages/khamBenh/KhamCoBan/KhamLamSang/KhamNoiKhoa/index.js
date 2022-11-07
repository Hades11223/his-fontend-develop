import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import AutoCompleteField from "../../components/AutoCompleteField";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const KhamNoiKhoa = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const {
    tuanHoan,
    phanLoaiTuanHoan,
    hoHap,
    phanLoaiHoHap,
    tieuHoa,
    phanLoaiTieuHoa,
    thanTietLieu,
    phanLoaiThanTietLieu,
    coXuongKhop,
    phanLoaiCoXuongKhop,
    thanKinh,
    phanLoaiThanKinh,
    tamThan,
    phanLoaiTamThan,
    noiTiet,
    phanLoaiNoiTiet,
  } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["kham-noi-khoa"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"kham-noi-khoa"} header={"Khám nội khoa"}>
          <AutoCompleteField
            defaultValue={tuanHoan}
            label={`a) Tuần hoàn`}
            onChange={handleSetData(["nbKSK", "tuanHoan"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiTuanHoan}
            onChange={handleSetData(["nbKSK", "phanLoaiTuanHoan"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`b) Hô hấp`}
            defaultValue={hoHap}
            onChange={handleSetData(["nbKSK", "hoHap"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiHoHap}
            onChange={handleSetData(["nbKSK", "phanLoaiHoHap"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`c) Tiêu hóa`}
            defaultValue={tieuHoa}
            onChange={handleSetData(["nbKSK", "tieuHoa"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiTieuHoa}
            onChange={handleSetData(["nbKSK", "phanLoaiTieuHoa"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`d) Thận-Tiết niệu`}
            defaultValue={thanTietLieu}
            onChange={handleSetData(["nbKSK", "thanTietLieu"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiThanTietLieu}
            onChange={handleSetData(["nbKSK", "phanLoaiThanTietLieu"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`đ) Nội tiết`}
            defaultValue={noiTiet}
            onChange={handleSetData(["nbKSK", "noiTiet"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiNoiTiet}
            onChange={handleSetData(["nbKSK", "phanLoaiNoiTiet"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`e) Cơ-xương-khớp`}
            defaultValue={coXuongKhop}
            onChange={handleSetData(["nbKSK", "coXuongKhop"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiCoXuongKhop}
            onChange={handleSetData(["nbKSK", "phanLoaiCoXuongKhop"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`f) Thần kinh`}
            defaultValue={thanKinh}
            onChange={handleSetData(["nbKSK", "thanKinh"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiThanKinh}
            onChange={handleSetData(["nbKSK", "phanLoaiThanKinh"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <AutoCompleteField
            label={`g) Tâm thần`}
            defaultValue={tamThan}
            onChange={handleSetData(["nbKSK", "tamThan"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiTamThan}
            onChange={handleSetData(["nbKSK", "phanLoaiTamThan"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default KhamNoiKhoa;
