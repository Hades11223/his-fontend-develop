import React from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, DatePicker, Form } from "antd";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import Select from "components/Select";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ThongTinDieuTri = ({
  layerId,
  onChange,
  handleSetData,
  handleSetMultiData,
  disabled,
  id,
  ...props
}) => {
  const { t } = useTranslation();

  const [listHuongDieuTriKham] = useEnum(ENUM.HUONG_DIEU_TRI_KHAM);
  const [listHuongDieuTriNoiTru] = useEnum(ENUM.HUONG_DIEU_TRI_NOI_TRU);
  const [listketQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const [listSoNamLuuTru] = useEnum(ENUM.SO_NAM_LUU_TRU);

  return (
    <Main>
      <Box title={"Thông tin điều trị"}>
        <Row className="row-name" gutter={6}>
          <Col span={12}>
            <Form.Item name={"tenKhoaNb"} label={"Khoa người bệnh"}>
              <InputTimeout
                placeholder={"Nhập khoa người bệnh"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"soNgayDieuTri"} label={"Số ngày điều trị"}>
              <InputTimeout
                placeholder={"Nhập số ngày điều trị"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"dsCdChinh"} label={"Chẩn đoán chính"}>
              <InputTimeout
                placeholder={"Nhập chẩn đoán chính"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"dsCdKemTheo"} label={"Chẩn đoán kèm theo"}>
              <InputTimeout
                placeholder={"Nhập chẩn đoán kèm theo"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"thoiGianVaoVien"} label={"Thời gian nhập viện"}>
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn thời gian nhập viện"
                format="DD/MM/YYYY HH:mm:ss"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"thoiGianRaVien"} label={"Thời gian ra viện"}>
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn thời gian ra viện"
                format="DD/MM/YYYY HH:mm:ss"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"tienConLai"} label={"Số tiền còn lại"}>
              <InputTimeout
                placeholder={"Nhập số tiền còn lại"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"huongDieuTri"} label={"Hướng điều trị"}>
              <Select
                placeholder={"Chọn hướng điều trị"}
                data={[...listHuongDieuTriKham, ...listHuongDieuTriNoiTru]}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"soNamLuuTru"} label={"Số năm lưu trữ"}>
              <Select
                placeholder={"Chọn số năm lưu trữ"}
                data={listSoNamLuuTru}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"ketQuaDieuTri"} label={"Kết quả điều trị"}>
              <Select
                placeholder={"Chọn kết quả điều trị"}
                data={listketQuaDieuTri}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"trangThaiNb"} label={"Trạng thái"}>
              <Select
                placeholder={"Chọn trạng thái"}
                data={listTrangThaiNb}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinDieuTri;
