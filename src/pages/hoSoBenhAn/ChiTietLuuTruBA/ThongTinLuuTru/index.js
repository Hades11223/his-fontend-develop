import React from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, DatePicker, Form } from "antd";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import Select from "components/Select";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ThongTinLuuTru = ({
  layerId,
  onChange,
  handleSetData,
  handleSetMultiData,
  disabled = false,
  id,
  ...props
}) => {
  const { t } = useTranslation();
  const [listTrangThaiBenhAn] = useEnum(ENUM.TRANG_THAI_BENH_AN);

  return (
    <Main>
      <Box title={"Thông tin lưu trữ"}>
        <Row className="row-name" gutter={6}>
          <Col span={12}>
            <Form.Item name={"maLuuTru"} label={"Mã lưu trữ"}>
              <InputTimeout
                placeholder={"Nhập mã lưu trữ"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"thoiGianLuuTru"} label={"Thời gian lưu trữ"}>
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn thời gian lưu trữ"
                format="DD/MM/YYYY HH:mm:ss"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"maBenhAn"} label={"Mã bệnh án"}>
              <InputTimeout
                placeholder={"Nhập mã bệnh án"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"thoiGianNhanBa"} label={"Thời gian nhận BA"}>
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn thời gian nhận BA"
                format="DD/MM/YYYY HH:mm:ss"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"tenLoaiBenhAn"} label={"Loại bệnh án"}>
              <InputTimeout
                placeholder={"Chọn loại bệnh án"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name={"doiTuongKcb"} label={"Đối tượng KCB"}>
              <InputTimeout
                placeholder={"Chọn đối tượng KCB"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name={"trangThaiBenhAn"} label={"Trạng thái bệnh án"}>
              <Select
                placeholder={"Chọn trạng thái bệnh án"}
                data={listTrangThaiBenhAn}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"lyDoTuChoi"} label={"Lý do từ chối"}>
              <InputTimeout
                placeholder={"Nhập lý do từ chối"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"thoiGianTuChoi"} label={"Ngày từ chối"}>
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn ngày từ chối"
                format="DD/MM/YYYY HH:mm:ss"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"lyDoMuon"} label={"Lý do mượn"}>
              <InputTimeout
                placeholder={"Nhập lý do mượn"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"thoiGianMuon"} label={"Ngày mượn"}>
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn ngày mượn"
                format="DD/MM/YYYY HH:mm:ss"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"nguoiMuon"} label={"Người mượn"}>
              <InputTimeout
                placeholder={"Nhập người mượn"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"soDienThoaiMuonBa"} label={"Số điện thoại"}>
              <InputTimeout
                placeholder={"Nhập số điện thoại"}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinLuuTru;
