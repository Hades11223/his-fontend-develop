import React, { useEffect } from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, DatePicker, Form, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InputTimeout, Select } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import { ENUM, DOI_TUONG } from "constants/index";
import { useEnum } from "hook";

const ThongTinDieuTri = ({ layerId, id, requiredTuoiThai, ...props }) => {
  const { t } = useTranslation();

  const [listTreEmKhongThe] = useEnum(ENUM.TRE_EM_KHONG_THE);
  const [listDinhChiThaiNghen] = useEnum(ENUM.DINH_CHI_THAI_NGHEN);
  const { listNhanVien } = useSelector((state) => state.nhanVien);
  const { thongTinBenhNhan = {} } = useSelector((state) => state.nbDotDieuTri);
  const {
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();
  const { doiTuong } = thongTinBenhNhan;

  useEffect(() => {
    getListNhanVienTongHop();
  }, []);

  return (
    <Main>
      <Box title={"Thông tin điều trị"}>
        <Row className="row-name" gutter={6}>
          <Col span={12}>
            <Form.Item
              name={"soBaoHiemXaHoi"}
              label={"Mã số BHXH"}
              rules={[
                {
                  required: doiTuong === DOI_TUONG.BAO_HIEM,
                  message: "Vui lòng nhập mã số BHXH!",
                },
              ]}
            >
              <InputTimeout
                placeholder={"Nhập mã số BHXH"}
                // disabled={doiTuong === DOI_TUONG.BAO_HIEM}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"maKhoaNb"} label={"Mã khoa"}>
              <InputTimeout placeholder={"Nhập mã khoa"} disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"dsCdChinh"}
              label={"Chẩn đoán"}
              rules={[
                { required: true, message: "Thiếu thông tin chẩn đoán!" },
              ]}
            >
              <InputTimeout placeholder={"Nhập chẩn đoán"} disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"dinhChiThaiNghen"} label={"Đình chỉ thai nghén"}>
              <Select
                placeholder={"Chọn đình chỉ thai nghén"}
                data={listDinhChiThaiNghen}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"treEmKhongThe"} label={"Trẻ không thẻ"}>
              <Select
                placeholder={"Chọn trẻ không thẻ"}
                data={listTreEmKhongThe.map((x) => ({
                  id: `${x.id}`,
                  ten: x.ten,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"tuoiThai"}
              label={"Tuổi thai"}
              rules={[
                {
                  required: requiredTuoiThai,
                  message: "Vui lòng nhập tuổi thai!",
                },
              ]}
            >
              <InputNumber
                className="item-number"
                min={1}
                max={42}
                placeholder={"Nhập tuổi thai"}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"tuThoiGianNghiNgoaiTru"}
              label={"Nghỉ ngoại trú từ ngày"}
            >
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn thời gian nghỉ ngoại trú"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"denThoiGianNghiNgoaiTru"}
              label={"Nghỉ ngoại trú đến ngày"}
            >
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn thời gian nghỉ ngoại trú"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"truongKhoaId"}
              label={"Tên trưởng khoa"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trưởng khoa!",
                },
              ]}
            >
              <Select placeholder={"Chọn trưởng khoa"} data={listNhanVien} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"chungChi"}
              label={"Mã CCHN trưởng khoa"}
              rules={[
                {
                  required: true,
                  message: "Thiếu thông tin mã CCHN trưởng khoa!",
                },
              ]}
            >
              <InputTimeout
                placeholder={"Nhập mã CCHN trưởng khoa"}
                disabled={true}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"thoiGianChungTu"}
              label={"Ngày chứng từ"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày chứng từ!",
                },
              ]}
            >
              <DatePicker
                showTime
                className="item-time"
                placeholder="Chọn ngày chứng từ"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"thuTruongDonVi"} label={"Thủ trưởng đơn vị"}>
              <InputTimeout placeholder={"Nhập thủ trưởng đơn vị"} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"phuongPhapDieuTri"}
              label={"Phương pháp điều trị"}
              rules={[
                {
                  required: true,
                  message: "Thiếu thông tin phương pháp điều trị!",
                },
              ]}
            >
              <InputTimeout
                disabled={true}
                placeholder={"Nhập phương pháp điều trị"}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"loiDanBacSi"} label={"Lời dặn bác sĩ"}>
              <InputTimeout
                disabled={true}
                placeholder={"Nhập lời dặn bác sĩ"}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"thoiGianRaVien"}
              label={"Ngày ra viện"}
              rules={[
                {
                  required: true,
                  message: "Thiếu thông tin thời gian ra viện!",
                },
              ]}
            >
              <DatePicker
                showTime
                className="item-time"
                disabled={true}
                placeholder="Chọn thời gian ra viện"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </Form.Item>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinDieuTri;
