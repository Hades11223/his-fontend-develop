import React from "react";
import { Input, Form, InputNumber, Tooltip } from "antd";
import Icon from "@ant-design/icons";
import CreatedWrapper from "components/CreatedWrapper";
import { Main } from "./styled";
import FormWraper from "components/FormWraper";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Select from "components/Select";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const LeftSide = ({ form1, setState, state }) => {
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [listtrangThaiQuyetToan] = useEnum(ENUM.TRANG_THAI_QUYET_TOAN);
  const [listtrangThaiDlqt] = useEnum(ENUM.TRANG_THAI_DLQT);

  return (
    <Main>
      <CreatedWrapper
        classNameWrapperChildren={"version-1"}
        hiddenOk={true}
        title={"XML1 - THÔNG TIN CHUNG"}
        icon1={
          <Icon
            className="icon-custom-1 btn-change-full-table"
            component={state.collapseStatus ? extendTable : extendChiTiet}
            onClick={() => {
              setState({ collapseStatus: !state.collapseStatus });
            }}
          />
        }
        icon2={
          <Tooltip title="Mở rộng" placement="bottom">
            <Icon
              className="icon-custom-2"
              component={state.showFullTable ? thuNho : showFull}
              onClick={() => {
                setState({ showFullTable: !state.showFullTable });
              }}
            />
          </Tooltip>
        }
      >
        <FormWraper
          readOnly={!state.saveState}
          form={form1}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="MA_LK"
            name="MA_LK"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập MA_LK!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập MA_LK!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              className="input-option"
              placeholder="Vui lòng nhập MA_LK"
            />
          </Form.Item>
          <Form.Item
            label="HO_TEN"
            name="HO_TEN"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập HO_TEN!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập HO_TEN!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập HO_TEN"
            />
          </Form.Item>
          <Form.Item
            label="MA_BN"
            name="MA_BN"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập MA_BN!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập MA_BN!",
              },
            ]}
          >
            <Input className="input-option" placeholder="Vui lòng nhập MA_BN" />
          </Form.Item>
          <Form.Item
            label="DIA_CHI"
            name="DIA_CHI"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập DIA_CHI!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập DIA_CHI!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập DIA_CHI"
            />
          </Form.Item>
          <Form.Item
            label="GIOI_TINH"
            name="GIOI_TINH"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập GIOI_TINH!",
              },
            ]}
          >
            <Select
              className="input-option"
              style={{ width: 307 }}
              // mode="multiple"
              showArrow
              showSearch
              placeholder="Vui lòng nhập GIOI_TINH!"
              data={listgioiTinh}
            ></Select>
          </Form.Item>
          <Form.Item
            label="NGAY_SINH"
            name="NGAY_SINH"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập NGAY_SINH!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập NGAY_SINH!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập NGAY_SINH"
            />
          </Form.Item>
          {/* ---------------------------------------------------------------- */}
          <Form.Item
            style={{ marginTop: 25 }}
            label="T_TONGCHI"
            name="T_TONGCHI"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập T_TONGCHI!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_TONGCHI"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 25 }}
            label="Tổng tiền Xét nghiệm"
            name="txn"
          >
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Tổng tiền Khám" name="tkham">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Tổng tiền CĐHA" name="tcdha">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="T_THUOC" name="T_THUOC">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Tổng tiền Máu" name="tmau">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Tổng tiền PTTT" name="tpttt">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item
            label="T_VTYT"
            name="T_VTYT"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập T_VTYT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_VTYT"
            />
          </Form.Item>
          <Form.Item label="T_GIUONG" name="T_GIUONG">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Tổng tiền Vận chuyển" name="tvchuyen">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="T_VTKTC" name="T_VTKTC">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập T_VTKTC"
            />
          </Form.Item>
          <Form.Item label="T_DVKT_TYLE" name="T_DVKT_TYLE">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="T_THUOC_TYLE" name="T_THUOC_TYLE">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="T_VTYT_TYLE" name="T_VTYT_TYLE">
            <InputNumber disabled={true} className="input-option" />
          </Form.Item>
          {/* ------------------------------------------------------------------- */}
          <Form.Item
            style={{ marginTop: 25 }}
            label="T_BNTT"
            name="T_BNTT"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập T_BNTT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_BNTT"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 25 }}
            label="T_BHTT"
            name="T_BHTT"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập T_BHTT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_BHTT"
            />
          </Form.Item>
          <Form.Item
            label="T_BNCCT"
            name="T_BNCCT"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập T_BNCCT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_BNCCT"
            />
          </Form.Item>
          <Form.Item
            label="T_NGOAIDS"
            name="T_NGOAIDS"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập T_NGOAIDS!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_NGOAIDS"
            />
          </Form.Item>
          <Form.Item label="T_NGUONKHAC" name="T_NGUONKHAC">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập T_NGUONKHAC"
            />
          </Form.Item>
          <Form.Item>{/* để cắt xún hàng */}</Form.Item>
          {/* ------------------------------------------------------------------- */}
          <Form.Item style={{ marginTop: 25 }} label="MA_THE" name="MA_THE">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_THE"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 25 }}
            label="MUC_HUONG"
            name="mucHuong"
          >
            <Input disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item
            label="GT_THE_TU"
            name="GT_THE_TU"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập GT_THE_TU!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập GT_THE_TU!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập GT_THE_TU"
            />
          </Form.Item>
          <Form.Item label="GT_THE_DEN" name="GT_THE_DEN">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập GT_THE_DEN"
            />
          </Form.Item>
          <Form.Item label="MA_KHUVUC" name="MA_KHUVUC">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_KHUVUC"
            />
          </Form.Item>
          <Form.Item label="MIEN_CUNG_CT" name="MIEN_CUNG_CT">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MIEN_CUNG_CT"
            />
          </Form.Item>
          <Form.Item label="MA_DKBD" name="MA_DKBD">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_DKBD"
            />
          </Form.Item>
          <Form.Item
            label="MA_CSKCB"
            name="MA_CSKCB"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập MA_CSKCB!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập MA_CSKCB!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_CSKCB"
            />
          </Form.Item>
          <Form.Item label="MA_NOI_CHUYEN" name="MA_NOI_CHUYEN">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_NOI_CHUYEN"
            />
          </Form.Item>
          <Form.Item label="MA_TINH" name="MA_TINH">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_TINH"
            />
          </Form.Item>
          {/* ------------------------------------------------------------------- */}
          <Form.Item style={{ marginTop: 25 }} label="MA_BENH" name="MA_BENH">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_BENH"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 25 }}
            label="MA_BENHKHAC"
            name="MA_BENHKHAC"
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_BENHKHAC"
            />
          </Form.Item>
          <Form.Item label="TEN_BENH" name="TEN_BENH">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập TEN_BENH"
            />
          </Form.Item>
          <Form.Item label="MA_TAI_NAN" name="MA_TAI_NAN">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập MA_TAI_NAN"
            />
          </Form.Item>
          <Form.Item label="MA_PTTT_QT" name="MA_PTTT_QT">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_PTTT_QT"
            />
          </Form.Item>
          <Form.Item label="MA_LOAI_KCB" name="MA_LOAI_KCB">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập MA_LOAI_KCB"
            />
          </Form.Item>
          <Form.Item
            label="MA_KHOA"
            name="MA_KHOA"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập MA_KHOA!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập MA_KHOA!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập MA_KHOA"
            />
          </Form.Item>
          <Form.Item label="TEN_KHOA" name="TEN_KHOA">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập TEN_KHOA"
            />
          </Form.Item>
          <Form.Item label="CAN_NANG" name="CAN_NANG">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập CAN_NANG"
            />
          </Form.Item>
          <Form.Item label="SO_PHOI" name="SO_PHOI">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập SO_PHOI"
            />
          </Form.Item>
          <Form.Item label="NGAY_TTOAN" name="NGAY_TTOAN">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập NGAY_TTOAN"
            />
          </Form.Item>
          <Form.Item label="NOI_TTOAN" name="NOI_TTOAN">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập NOI_TTOAN"
            />
          </Form.Item>
          <Form.Item label="SO_NGAY_DTRI" name="SO_NGAY_DTRI">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập SO_NGAY_DTRI"
            />
          </Form.Item>
          <Form.Item label="MA_LYDO_VVIEN" name="MA_LYDO_VVIEN">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập MA_LYDO_VVIEN"
            />
          </Form.Item>
          <Form.Item label="KET_QUA_DTRI" name="KET_QUA_DTRI">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập KET_QUA_DTRI"
            />
          </Form.Item>
          <Form.Item label="TINH_TRANG_RV" name="TINH_TRANG_RV">
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập TINH_TRANG_RV"
            />
          </Form.Item>
          <Form.Item label="NGAY_VAO" name="NGAY_VAO">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập NGAY_VAO"
            />
          </Form.Item>
          <Form.Item label="NGAY_RA" name="NGAY_RA">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập NGAY_RA"
            />
          </Form.Item>
          <Form.Item
            label="NAM_QT"
            name="NAM_QT"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập NAM_QT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập NAM_QT"
            />
          </Form.Item>
          <Form.Item
            label="THANG_QT"
            name="THANG_QT"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập THANG_QT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập THANG_QT"
            />
          </Form.Item>
          {/* ---------------------------------------------------------------------- */}
          <Form.Item
            style={{ marginTop: 25 }}
            label="T_XUATTOAN"
            name="T_XUATTOAN"
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập T_XUATTOAN"
            />
          </Form.Item>
          <Form.Item style={{ marginTop: 25 }} label="LYDO_XT" name="LYDO_XT">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập LYDO_XT"
            />
          </Form.Item>
          <Form.Item label="T_DATUYEN" name="T_DATUYEN">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập T_DATUYEN"
            />
          </Form.Item>
          <Form.Item label="GIAM_DINH" name="GIAM_DINH">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập GIAM_DINH"
            />
          </Form.Item>
          <Form.Item label="T_VUOTTRAN" name="T_VUOTTRAN">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập T_VUOTTRAN"
            />
          </Form.Item>
          <Form.Item label="Th/g TT" name="thoiGianThanhToan">
            <Input disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Ngày tạo hồ sơ XML" name="thoiGianTaoHoSo">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập ngày tạo hồ sơ XML"
            />
          </Form.Item>
          <Form.Item></Form.Item>
          {/* --------------------------------------------------------------------- */}
          <Form.Item
            style={{ marginTop: 25 }}
            label="Trạng thái"
            name="trangThai"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Trạng thái!",
              },
            ]}
          >
            <Select
              className="input-option"
              style={{ width: 307 }}
              // mode="multiple"
              showArrow
              showSearch
              placeholder="Tất cả trạng thái"
              data={listtrangThaiQuyetToan}
              ten="trangThai"
            ></Select>
          </Form.Item>
          <Form.Item
            style={{ marginTop: 25 }}
            label="Thông tin trả về"
            name="moTa"
          >
            <Input disabled={true} className="input-option" />
          </Form.Item>
          <Form.Item label="Trạng thái DLQT" name="trangThaiDlqt">
            <Select
              data={listtrangThaiDlqt}
              disabled={true}
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="Thông tin DL lỗi" name="motaLoiDlqt">
            <Input disabled={true} className="input-option" />
          </Form.Item>
        </FormWraper>
      </CreatedWrapper>
    </Main>
  );
};

export default LeftSide;
