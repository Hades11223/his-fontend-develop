import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import { firstLetterWordUpperCase } from "utils";
import { Select } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const ModalChuyenKhoa = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { refChuyenKhoa, onKiemTraHoSo } = props;
  const [minThoiGian, setMinThoiGian] = useState(null);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const {
    khoa: { listDataTongHop },
    danhSachNguoiBenhNoiTru: { infoPatient = {} },
  } = useSelector((state) => state);
  const {
    khoa: { getListKhoaTongHop },
    nbChuyenKhoa: { chuyenKhoa },
  } = useDispatch();

  useEffect(() => {
    getListKhoaTongHop({
      page: "",
      size: "",
      active: true,
      dsTinhChatKhoa: 70,
    });
  }, []);
  useEffect(() => {
    // denThoiGianSdGiuong khác null -> thời gian chuyển lấy trường denThoiGianSdGiuong, k cho người dùng sửa
    // denThoiGianSdGiuong = null -> người dùng phải chọn th.g lớn hơn tuThoiGianSdGiuong
    if (infoPatient) {
      const { tuThoiGianSdGiuong, denThoiGianSdGiuong } = infoPatient;
      if (!denThoiGianSdGiuong) {
        setMinThoiGian(tuThoiGianSdGiuong);
      } else {
        setMinThoiGian(null);
      }

      form.setFieldsValue({
        tenKhoaNb: infoPatient?.tenKhoaNb,
        tuThoiGian: denThoiGianSdGiuong
          ? moment(denThoiGianSdGiuong)
          : moment(),
      });
    }
  }, [infoPatient]);
  const gioiTinh =
    (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};
  const handleClickBack = () => {
    form.setFieldsValue({
      khoaId: null,
      tuThoiGian: moment(),
    });

    setTimeout(() => refChuyenKhoa.current.close(), 50);
  };

  const handleClickNext = () => {
    form.submit();
  };

  const onHanldeSubmit = (values) => {
    const payload = {
      ...values,
      nbDotDieuTriId: infoPatient.id,
      tuThoiGian: moment(values.tuThoiGian).format("YYYY-MM-DD HH:mm:ss"),
      loai: 20,
    };
    chuyenKhoa(payload)
      .then((s) => {
        setTimeout(() => {
          history.go();
        }, 500);
      })
      .catch((e) => {
        if (e?.code === 7987) onKiemTraHoSo();
      });
    setTimeout(() => refChuyenKhoa.current.close(), 50);
  };
  return (
    <ModalCheckout
      width={500}
      ref={refChuyenKhoa}
      titleHeader="Chuyển khoa"
      subTitleHeader={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(infoPatient?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh?.ten} </span>
          )}

          {infoPatient.tuoi && (
            <span className="normal-weight">- {infoPatient?.tuoi} tuổi</span>
          )}
        </>
      }
      titleBtnBack="Quay lại "
      titleBtnNext={
        <span className="btn-checkout">
          <span className="btn-checkout__text">Lưu </span>
          <img src={IconSave} alt={IconSave} />
        </span>
      }
      onClickBack={handleClickBack}
      onClickNext={handleClickNext}
    >
      <Main>
        <Form form={form} layout="vertical" onFinish={onHanldeSubmit}>
          <Form.Item
            label="Khoa chuyển đến"
            name="khoaId"
            rules={[
              { required: true, message: "Vui lòng chọn khoa chuyển đến!" },
            ]}
          >
            <Select
              data={(listDataTongHop || []).filter(
                (x) => x.id !== infoPatient?.khoaNbId
              )}
              placeholder="Chọn khoa chuyển đến"
            />
          </Form.Item>
          <Form.Item
            label="Thời gian chuyển"
            name="tuThoiGian"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian chuyển hợp lệ!",
              },
            ]}
          >
            <DatePicker
              showTime
              format={"DD/MM/YYYY HH:mm:ss"}
              disabled={!minThoiGian}
              disabledDate={(date) => moment(date).isBefore(minThoiGian)}
            ></DatePicker>
          </Form.Item>
          <Form.Item label="Khoa chuyển đi" name="tenKhoaNb">
            <Input disabled></Input>
          </Form.Item>
        </Form>
      </Main>
    </ModalCheckout>
  );
};

export default ModalChuyenKhoa;
