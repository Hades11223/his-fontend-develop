import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import React, { forwardRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import ScreenPhieuLinh from "pages/quanLyNoiTru/components/ScreenPhieuLinh";
import { useHistory, useLocation } from "react-router-dom";

const ModalTaoPhieu = (props, ref) => {
  const { t } = useTranslation();
  const { khoaLamViecId } = props;
  const listAllKhoa = useStore("khoa.listKhoaTheoTaiKhoan", []);
  const {
    nbPhieuLinhSuatAn: { post, search },
  } = useDispatch();
  const { searchValue } = useSelector((state) => state.nbPhieuLinhSuatAn);
  const history = useHistory();
  const location = useLocation();

  const initState = useMemo(() => {
    return {
      ngayThucHien: moment().set("hour", 0).set("minute", 0).set("second", 0),
      khoaId: khoaLamViecId,
    };
  }, [khoaLamViecId]);
  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        <Col md={24} xl={24} xxl={24}>
          <div className="item-select">
            <label className="label-filter">
              Khoa <span className="icon-required">*</span>
            </label>
            <Select
              onChange={onChange("khoaId")}
              value={_state.khoaId}
              className="input-filter"
              placeholder={"Chọn khoa"}
              data={listAllKhoa}
            />
          </div>
        </Col>
        <Col md={24} xl={24} xxl={24}>
          <div className="item-date">
            <label className="label-filter">
              Ngày thực hiện <span className="icon-required">*</span>
            </label>
            <DatePicker
              value={_state.ngayThucHien}
              onChange={onChange("ngayThucHien")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              className="input-filter"
            />
          </div>
        </Col>
      </Row>
    );
  };

  const onSubmit = (data) => {
    if (!data.khoaId) {
      message.error("Vui lòng chọn khoa");
      return;
    }
    if (!data.ngayThucHien) {
      message.error("Vui lòng chọn ngày thực hiện");
      return;
    }
    const body = {
      ngayThucHien: data.ngayThucHien.format("YYYY-MM-DD"),
      khoaId: data.khoaId,
      loai: 10,
    };
    return post(body);
  };

  const afterSubmit = (data) => {
    if (location?.pathname != "/quan-ly-noi-tru/danh-sach-phieu-linh-suat-an") {
      history.push("/quan-ly-noi-tru/danh-sach-phieu-linh-suat-an");
    } else {
      search(searchValue || {});
      ref.current && ref.current.close();
    }
  };

  return (
    <ScreenPhieuLinh.ModalCreate
      width={400}
      title="Tạo phiếu lĩnh suất ăn"
      renderFilter={renderFilter}
      initState={initState}
      ref={ref}
      onSubmit={onSubmit}
      afterSubmit={afterSubmit}
    ></ScreenPhieuLinh.ModalCreate>
  );
};

export default forwardRef(ModalTaoPhieu);
