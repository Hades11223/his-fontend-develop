import React, { memo, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Input, Form, Radio } from "antd";
import { Main } from "./styled";
import DOBInput from "components/DOBInput";
import { MAX_MONTH_AGE } from "constants/index";

import { isNil } from "lodash";
import AddressFull from "components/AddressFull";
import { Card, Select } from "components";
import Header1 from "pages/kho/components/Header1";
import { useStore } from "hook";

const ThemMoi = ({ layerId, ...props }) => {
  const [form] = Form.useForm();
  const { tuoi, thangTuoi, checkValidate, nbDotDieuTri, ngaySinh, phieuXuat } =
    useSelector((state) => state.themMoiThuoc);
  const { nbDiaChi, nbNguoiBaoLanh } = nbDotDieuTri || {};
  const { bacSiChiDinhId, dsBacSiNgoaiVienId } = phieuXuat || {};
  const {
    themMoiThuoc: { updateData, clearData },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  const listBacSi = useStore("nhanVien.listNhanVien", []);
  const listAllBacSiNgoaiVien = useStore(
    "bacSiNgoaiVien.listAllBacSiNgoaiVien",
    []
  );

  const refHoTen = useRef();

  const [state, _setState] = useState({
    diaChi: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    diaChi,
    tenNb,
    // ngaySinh,
    validate,
    soDienThoai,
    soNha,
    sdtNguoiBaoLanh,
    hoTenNguoiBaoLanh,
    gioiTinh,
  } = state;

  const update = (value, variables) => {
    setState({ [`${variables}`]: value });
    if (
      variables === "tenNb" ||
      variables === "gioiTinh" ||
      variables === "tuoi" ||
      variables === "soDienThoai" ||
      variables === "tenNb"
    ) {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          [`${variables}`]: value,
        },
      });
    } else if (variables === "soNha") {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          nbDiaChi: {
            ...nbDiaChi,
            [`${variables}`]: value,
          },
        },
      });
    } else if (
      variables === "sdtNguoiBaoLanh" ||
      variables === "hoTenNguoiBaoLanh"
    ) {
      let keyCustom =
        variables === "hoTenNguoiBaoLanh" ? "hoTen" : "soDienThoai";
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          nbNguoiBaoLanh: {
            ...nbNguoiBaoLanh,
            [`${keyCustom}`]: value,
          },
        },
      });
    } else if (
      variables === "dsBacSiNgoaiVienId" ||
      variables === "bacSiChiDinhId"
    ) {
      updateData({
        phieuXuat: {
          ...phieuXuat,
          [`${variables}`]: value,
        },
      });
    } else {
      updateData({ [`${variables}`]: value });
    }
  };
  const onSelectAddress = async (data) => {
    let address = {};
    if (data?.tinhThanhPho && data?.quanHuyen) {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.quanHuyen?.id,
        xaPhuongId: data?.id,
        diaChi: data?.displayText,
      };
    } else if (data?.tinhThanhPho) {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.id,
        diaChi: data?.displayText,
      };
    } else {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.id,
        diaChi: data?.displayText,
      };
    }
    updateData({
      nbDotDieuTri: {
        ...nbDotDieuTri,
        nbDiaChi: {
          ...nbDiaChi,
          ...address,
        },
      },
    });
    // onCheckTrungThongTin(address, "diaChi");
  };
  const checkGender = (value) => {
    let dataTen = value.toUpperCase();
    let genderVan = dataTen.search("VĂN");
    let genderThi = dataTen.search("THỊ");
    let valueGender = "";
    if (genderVan >= 0 && genderThi < 0) {
      // updateData({ gioiTinh: 1 });
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          gioiTinh: 1,
        },
      });
      valueGender = 1;
    } else if (genderThi >= 0) {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          gioiTinh: 2,
        },
      });
      valueGender = 2;
    } else {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          gioiTinh: "",
        },
      });
    }
    setState({ gioiTinh: valueGender });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refHoTen.current && refHoTen.current.focus();
          },
        },
      ],
    });
    return () => {
      clearData({
        nbDotDieuTri: {
          nbDiaChi: {
            quocGiaId: 1,
            quocTichId: 1,
          },
        },
      });
    };
  }, []);
  const onBlur = (value, variables) => {
    if (variables === "tenNb") checkGender(value);
  };
  return (
    <Card>
      <Main className="them-moi">
        <div className="body-info">
          <Form form={form} layout="horizontal">
            <Header1 title="Thông tin khách hàng"> </Header1>
            <Row>
              <Row justify={"space-between"} style={{ width: "100%" }}>
                <Col span={8} className="form-item">
                  <div
                    className="item-input paddingLeft"
                    style={{ marginLeft: 10 }}
                  >
                    <Input
                      ref={refHoTen}
                      placeholder={`Họ và tên`}
                      value={tenNb}
                      style={{ textTransform: "uppercase" }}
                      onChange={(e) => update(e.target.value, "tenNb")}
                      onBlur={(e) => onBlur(e.target.value, "tenNb")}
                      // disabled={disableTiepDon}
                    />
                    {!nbDotDieuTri?.tenNb && (
                      <span
                        style={{ position: "absolute", left: 97, color: "red" }}
                      >
                        *
                      </span>
                    )}
                    {/* <span class="floating-label">Họ và tên</span> */}
                    {/* {checkValidate && !tenNb ? (
                    <div className="error">Vui lòng nhập tên người bệnh!</div>
                  ) : null} */}
                  </div>
                </Col>

                <Col className="form-item" span={8}>
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <Radio.Group
                      value={gioiTinh || 1}
                      onChange={(e) => update(e.target.value, "gioiTinh")}
                    >
                      <Radio value={1}>Nam</Radio>
                      <Radio value={2}>Nữ</Radio>
                    </Radio.Group>
                  </div>
                </Col>

                <Col span={8} className="form-item">
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <Input
                      placeholder="Số điện thoại:"
                      autoFocus
                      value={soDienThoai}
                      onChange={(e) => update(e.target.value, "soDienThoai")}
                      onBlur={(e) => onBlur(e.target.value, "soDienThoai")}
                    />
                    {soDienThoai &&
                    !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
                      <div className="error">Số điện thoại sai định dạng!</div>
                    ) : null}
                  </div>
                </Col>
              </Row>

              <Row justify={"space-between"} style={{ width: "100%" }}>
                <Col span={8} className="form-item">
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <Input
                      placeholder="SN/ Thôn/ Xóm"
                      value={soNha}
                      onChange={(e) => update(e.target.value, "soNha")}
                      onBlur={(e) => onBlur(e.target.value, "soNha")}
                      // disabled={disableTiepDon}
                      // onChange={onChange("qrBN", true)}
                      // onKeyDown={onKeyDown}
                    />
                  </div>
                </Col>
                <Col span={8} className="form-item">
                  {/* <div className="item-input" style={{ marginBottom: 0 }}> */}
                  {/* <label className={!diaChi ? `label label-error` : "label"}>
                    Phường/Xã, Quận/Huyện, Tỉnh/TP
              <span style={{ color: "red" }}> *</span>
                  </label> */}
                  <AddressFull
                    className="form-item_address"
                    onChangeAdrressText={(e) => setState({ diaChi: e })}
                    placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố"
                    value={diaChi}
                    onSelectAddress={onSelectAddress}
                    // disabled={disableTiepDon}
                  ></AddressFull>
                  {/* </div> */}
                  <div
                    style={{
                      fontStyle: "italic",
                      opacity: 0.8,
                      fontSize: 12,
                      lineHeight: "15px",
                      paddingLeft: "10px",
                    }}
                  >
                    VD: Khương Mai, Thanh Xuân, Hà Nội
                  </div>
                  {checkValidate && !diaChi ? (
                    <div className="error">
                      Vui lòng nhập Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố!
                    </div>
                  ) : null}
                </Col>

                <Col span={8} className="form-item">
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <Input
                      placeholder="Người bảo lãnh"
                      value={hoTenNguoiBaoLanh}
                      // autoFocus
                      onChange={(e) =>
                        update(e.target.value, "hoTenNguoiBaoLanh")
                      }
                      onBlur={() =>
                        update(hoTenNguoiBaoLanh, "hoTenNguoiBaoLanh")
                      }
                      // onChange={onChange("qrBN", true)}
                      // onKeyDown={onKeyDown}
                    />
                  </div>
                </Col>
              </Row>

              <Row justify={"space-between"} style={{ width: "100%" }}>
                <Col span={8} className="form-item">
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <DOBInput
                      className="item-born"
                      value={ngaySinh || ""}
                      onBlur={(e, nofi, ageStr, chiNamSinh) => {
                        let ngaySinhTime =
                          nofi === 0 && e && e.date && e.date._d;
                        let tuoi = nofi === 0 ? ngaySinhTime.getAge() : "";
                        setState({ validate: nofi });
                        updateData({
                          ngaySinh: e,
                          tuoi: tuoi,
                          thangTuoi:
                            tuoi <= 3 ? (ageStr > 0 ? ageStr : null) : null,
                          ngaySinhTime: ngaySinhTime,
                          checkNgaySinh: nofi === 0 ? true : false,
                          chiNamSinh: chiNamSinh,
                        });
                        // onCheckTrungThongTin(e, "ngaySinh");
                      }}
                      // disabled={disableTiepDon}
                      onChange={(e) => update(e, "ngaySinh")}
                      placeholder={"Ngày sinh (dd/mm/yyyy)"}
                      showIcon={false}
                    />
                    {validate && validate !== 0 && ngaySinh?.str ? (
                      <div className="error">Ngày sinh sai định dạng!</div>
                    ) : checkValidate &&
                      !props.checkNgaySinh &&
                      !ngaySinh?.str ? (
                      <div className="error">Vui lòng nhập ngày sinh!</div>
                    ) : null}
                  </div>
                </Col>

                <Col span={8} className="form-item">
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <div className="item-input">
                      <Input
                        value={
                          !isNil(thangTuoi) && thangTuoi <= MAX_MONTH_AGE
                            ? `${thangTuoi} tháng`
                            : tuoi
                        }
                        placeholder="Tuổi"
                        // onChange={(e) => setState({ diaChi: e })}
                        // onBlur={() => update(tuoi, "tuoi")}
                        disabled
                      />
                    </div>
                  </div>
                </Col>

                <Col span={8} className="form-item">
                  <div className="paddingLeft" style={{ marginLeft: 10 }}>
                    <Input
                      placeholder="SĐT người bảo lãnh"
                      value={sdtNguoiBaoLanh}
                      onChange={(e) =>
                        setState({ sdtNguoiBaoLanh: e.target.value })
                      }
                      onBlur={() => update(sdtNguoiBaoLanh, "sdtNguoiBaoLanh")}
                      // onChange={onChange("qrBN", true)}
                      // onKeyDown={onKeyDown}
                    />
                    {sdtNguoiBaoLanh &&
                    !sdtNguoiBaoLanh.replaceAll(" ", "").isPhoneNumber() ? (
                      <div className="error">
                        SĐT người bảo lãnh sai định dạng!
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Row style={{ paddingLeft: 20 }} span={24} className="doctor">
                  <Col span={11}>
                    <div className="title last" style={{ marginRight: 5 }}>
                      BS chỉ định <span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="detail-last">
                      <Select
                        placeholder="Vui lòng nhập Bs chỉ định"
                        onChange={(e) => update(e, "bacSiChiDinhId")}
                        value={bacSiChiDinhId}
                        data={listBacSi}
                        style={{ width: "100%" }}
                        disabled={!!dsBacSiNgoaiVienId?.length}
                      />
                    </div>
                  </Col>

                  <Col span={11} offset={1}>
                    <div className="title last" style={{ marginRight: 5 }}>
                      BS chỉ định ngoại viện
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="detail-last">
                      <Select
                        placeholder="Vui lòng nhập Bs chỉ định"
                        onChange={(e) => update(e, "dsBacSiNgoaiVienId")}
                        value={dsBacSiNgoaiVienId}
                        data={listAllBacSiNgoaiVien}
                        style={{ width: "100%" }}
                        mode="multiple"
                        disabled={bacSiChiDinhId > 0}
                      >
                        {/* {children} */}
                      </Select>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Row>
            {/* </Row> */}
          </Form>
        </div>
      </Main>
    </Card>
  );
};

export default memo(ThemMoi);
