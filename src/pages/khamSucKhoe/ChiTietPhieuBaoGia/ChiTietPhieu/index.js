import React, { useState, useRef, useMemo, useEffect } from "react";
import { Main } from "./styled";
import { Row, Col, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ThongTinThemCongTy from "./ThongTinThemCongTy";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { refConfirm } from "app";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const { Option } = Select;
const now = moment().format("YYYY-MM-DD");

const ChiTietPhieu = (props) => {
  const { t } = useTranslation();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const refTen = useRef();
  const { id } = useParams();

  const {
    doiTac: { getLichSuTongHop },
    khamSucKhoe: { updateData, getPhieuBaoGia, deletePhieuBaoGia },
    dichVuKSK: { clearData },
  } = useDispatch();

  const [listTrangThaiHopDong] = useEnum(ENUM.TRANG_THAI_HOP_DONG);
  const { dataLichSuTongHop } = useSelector((state) => state.doiTac);
  const { ttPhieu, validTTPhieu, chiTietPhieu, isEditPhieu } = useSelector(
    (state) => state.khamSucKhoe
  );

  useEffect(() => {
    getLichSuTongHop({ dsLoaiDoiTac: 40, active: true, ngayHieuLuc: now });
  }, []);

  useEffect(() => {
    if (id) {
      getPhieuBaoGia(id);
    } else {
      clearData();
    }
  }, [id]);

  const isThemMoi = useMemo(() => {
    return id === undefined;
  }, [id]);

  const optionsDoiTac = useMemo(() => {
    let options = dataLichSuTongHop?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item?.ma}-${item?.ten}`}
      </Option>
    ));
    return options;
  }, [dataLichSuTongHop]);

  const [state, _setState] = useState({
    ten: "",
    doiTacId: null,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const update = (value, variables) => {
    setState({ [`${variables}`]: value });

    updateData({
      ttPhieu: {
        ...ttPhieu,
        [`${variables}`]: value,
      },
    });
  };

  const onBlur = (value, variables) => {};

  const onChange = (type) => (e) => {
    const value = e?.target ? e.target?.value : e;

    update(value || null, type);
  };

  function onEditClick() {
    const _ttPhieu = {
      ten: chiTietPhieu?.ten,
      doiTacId: chiTietPhieu?.doiTac?.id,
    };

    setState(_ttPhieu);
    updateData({ isEditPhieu: !isEditPhieu, ttPhieu: _ttPhieu });
  }

  function onDeleteClick() {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xoá dữ liệu",
          content: `Bạn chắc chắn muốn xóa ${chiTietPhieu?.ten}?`,
          cancelText: "Quay lại",
          okText: "Đồng ý",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          deletePhieuBaoGia(chiTietPhieu?.id);
        },
        () => {}
      );
  }

  const { ten, doiTacId } = state;

  return (
    <Main>
      <div>
        {/* <Form form={form} layout="horizontal"> */}
        <Row>
          {!isThemMoi && (
            <Col md={3} xl={3} xxl={3} style={{ alignItems: "center" }}>
              <div className="ma-bg">
                <div className="label">{t("khamSucKhoe.phieuBG.maBG")}</div>
                <div className="value">{chiTietPhieu?.ma}</div>
              </div>
            </Col>
          )}

          <Col md={15} xl={15} xxl={15}>
            <div className="ten-bg">
              <div className="item">
                <label>
                  <b>{t("khamSucKhoe.phieuBG.tenPhieuBG")} </b>
                  {isThemMoi && <span className="error">*</span>}
                </label>
                {isThemMoi || isEditPhieu ? (
                  <Input
                    ref={refTen}
                    placeholder={`Nhập tên phiếu báo giá`}
                    value={ten}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) => update(e.target.value, "ten")}
                    onBlur={(e) => onBlur(e.target.value, "ten")}
                  />
                ) : (
                  <span>{chiTietPhieu?.ten}</span>
                )}
              </div>
              {!validTTPhieu.ten && (
                <div className="error">Vui lòng nhập tên phiếu báo giá!</div>
              )}

              <div className="item">
                <label>
                  <b>{t("khamSucKhoe.phieuBG.tenCongTyBG")}:</b>
                </label>
                {isThemMoi || isEditPhieu ? (
                  <Select
                    placeholder="Nhập tên công ty cần báo giá"
                    value={doiTacId}
                    readOnly={!isThemMoi}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={onChange("doiTacId")}
                  >
                    {optionsDoiTac}
                  </Select>
                ) : (
                  <span>{chiTietPhieu?.doiTac?.ten}</span>
                )}
              </div>
              {!validTTPhieu.doiTacId && (
                <div className="error">Vui lòng chọn công ty!</div>
              )}

              {showMoreInfo && (
                <ThongTinThemCongTy
                  thoiGianTao={chiTietPhieu?.thoiGianTao}
                  thoiGianCapNhat={chiTietPhieu?.thoiGianCapNhat}
                  ttCongty={chiTietPhieu?.doiTac}
                />
              )}
            </div>
          </Col>

          {!isThemMoi && (
            <Col md={6} xl={6} xxl={6}>
              <div className="tt-bg">
                <div>
                  <EyeOutlined onClick={() => setShowMoreInfo(!showMoreInfo)} />
                  <EditOutlined onClick={onEditClick} />
                  <DeleteOutlined onClick={onDeleteClick} />
                </div>
                <div className="ellipsisTxt">
                  Trạng thái:{" "}
                  {
                    listTrangThaiHopDong.find(
                      (x) => x.id === chiTietPhieu?.trangThai
                    )?.ten
                  }
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </Main>
  );
};

export default ChiTietPhieu;
