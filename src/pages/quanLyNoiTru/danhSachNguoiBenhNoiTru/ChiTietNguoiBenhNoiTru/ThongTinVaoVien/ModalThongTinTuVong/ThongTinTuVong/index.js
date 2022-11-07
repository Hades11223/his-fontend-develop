import React, { useEffect } from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import moment from "moment";
import { useEnum } from "hook";
import Select from "components/Select";

const ThongTinTuVong = ({ layerId, onChange, id, handleSetData, ...props }) => {
  const { t } = useTranslation();
  const { nbThongTinTuVong, nbThongTinRaVien } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const {
    nhanVien: { getListAllNhanVien },
  } = useDispatch();
  const [listLyDoTuVong] = useEnum("LyDoTuVong");
  const {
    tenBo,
    tenMe,
    tenChongVo,
    soPhieu,
    thoiGianThucHien,
    nguoiThongBaoId,
    thoiGianThongBao,
    thoiGianVaoVien,
  } = nbThongTinTuVong || {};
  const { thoiGianRaVien } = nbThongTinRaVien || {};

  useEffect(() => {
    getListAllNhanVien({ page: "", size: "" });
  }, []);

  const onChangeValue = (key) => (value) => {
    handleSetData(key, value);
  };

  return (
    <Main>
      <Box title={"Thông tin tử vong"}>
        <Row className="row-name" gutter={6}>
          <Col span={11}>
            <div className="item-input">
              <label className={"label"}>{"Số giấy chứng từ"}</label>
              <InputTimeout
                placeholder={"Nhập số giấy chứng từ"}
                value={soPhieu}
                onChange={onChangeValue("soPhieu")}
              />
            </div>
          </Col>

          <Col span={11} offset={1}>
            <div className="item-input" key={thoiGianThucHien}>
              <label className={"label"}>{"Thời gian chứng từ"}</label>
              <DatePicker
                showTime
                placeholder="Chọn thời gian chứng từ"
                className="item-time"
                defaultValue={
                  thoiGianThucHien ? moment(thoiGianThucHien) : thoiGianThucHien
                }
                format="DD/MM/YYYY HH:mm:ss"
                onChange={onChangeValue("thoiGianThucHien")}
              />
            </div>
          </Col>

          <Col span={11}>
            <div className="item-input">
              <label className={"label"}>{"Tên chồng hoặc vợ"}</label>
              <InputTimeout
                placeholder={"Nhập tên chồng hoặc vợ"}
                onChange={onChangeValue("tenChongVo")}
                value={tenChongVo}
              />
            </div>
          </Col>

          <Col span={11} offset={1}>
            <div className="item-input">
              <label className="label">{"Tên bố"}</label>
              <InputTimeout
                placeholder={"Nhập tên bố"}
                onChange={onChangeValue("tenBo")}
                value={tenBo}
              />
            </div>
          </Col>

          <Col span={11}>
            <div className="item-input">
              <label className="label">{"Tên mẹ"}</label>
              <InputTimeout
                placeholder={"Nhập tên mẹ"}
                onChange={onChangeValue("tenMe")}
                value={tenMe}
              />
            </div>
          </Col>

          <Col span={11} offset={1}>
            <div className="item-input" key={nguoiThongBaoId}>
              <label className={"label"}>
                {"Người thông báo"}
                <span className="error">*</span>
              </label>

              <Select
                onChange={onChangeValue("nguoiThongBaoId")}
                defaultValue={nguoiThongBaoId}
                className="item-select"
                placeholder={"Chọn người thông báo"}
                data={listAllNhanVien || []}
              />
            </div>
          </Col>

          <Col span={11}>
            <div className="item-input">
              <label className={`label`}>
                {"Nguyên nhân tử vong"}
                <span className="error">*</span>
              </label>
              <InputTimeout
                disabled
                value={
                  listLyDoTuVong?.find(
                    (i) => i.id === nbThongTinRaVien?.lyDoTuVong
                  )?.ten || ""
                }
              />
            </div>
          </Col>
          <Col span={11} offset={1}>
            <div className="item-input" key={thoiGianThongBao}>
              <label className="label">
                {"Thời gian thông báo"}
                <span className="error">*</span>
              </label>
              <DatePicker
                showTime
                placeholder="Chọn thời gian thông báo"
                className="item-time"
                defaultValue={
                  thoiGianThongBao
                    ? moment(thoiGianThongBao)
                    : thoiGianRaVien
                    ? moment(thoiGianRaVien)
                    : null
                }
                format="DD/MM/YYYY HH:mm:ss"
                onChange={onChangeValue("thoiGianThongBao")}
              />
            </div>
          </Col>

          <Col span={11}>
            <div className="item-input">
              <label className={"label"}>
                {"Ngày vào viện"}
                <span className="error">*</span>
              </label>
              <DatePicker
                showTime
                placeholder="DD/MM/YYYY HH:mm:ss"
                className="item-time"
                disabled
                value={thoiGianVaoVien ? moment(thoiGianVaoVien) : null}
                format="DD/MM/YYYY HH:mm:ss"
              />
            </div>
          </Col>
          <Col span={11} offset={1}>
            <div className="item-input">
              <label className="label">
                {"Thời gian tử vong"}
                <span className="error">*</span>
              </label>
              <DatePicker
                showTime
                placeholder="DD/MM/YYYY HH:mm:ss"
                className="item-time"
                disabled
                value={moment(nbThongTinRaVien?.thoiGianTuVong)}
                format="DD/MM/YYYY HH:mm:ss"
              />
            </div>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinTuVong;
