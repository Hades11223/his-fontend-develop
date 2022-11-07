import { Row, Button, Col, Radio, Select } from "antd";
import React, { forwardRef, useImperativeHandle, useState, useEffect, useMemo } from "react";
import { ModalStyle, Main, DivInfo, SelectGroup } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TextField from "components/TextField";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const { Option } = Select

const ModalKetThucDieuTri = (props, ref) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { listKetQuaDieuTriCovid } = useSelector(state => state.utils)
  const { listChiTietTheoDoiNguoiBenh, nbDaKetThuc } = useSelector(state => state.chiTietTheoDoiNguoiBenh)
  const { selectedId } = useSelector(state => state.danhSachCovid)

  const { listBenhVien } = useSelector(state => state.benhVien)
  const { getUtils } = useDispatch().utils
  const { getNbCovid, postKetThuc, } = useDispatch().chiTietTheoDoiNguoiBenh
  const { getListBenhVien } = useDispatch().benhVien
  const closeToggleModal = () => {
    setOpen(false);
  };
  const openToggleModal = () => {
    postKetThuc({ ...state?.dataSubmit, id: props?.match?.params?.id })
    setOpen(false);
  };

  useEffect(() => {
    if (nbDaKetThuc) {
      setState({
        dataSubmit: nbDaKetThuc
      })
    }
  }, [nbDaKetThuc])

  useEffect(() => {
    getUtils({ name: "KetQuaDieuTriCovid" })
    getListBenhVien({ active: true })
    getNbCovid({ nbDotDieuTriId: props?.match?.params?.id })
  }, [])
  useImperativeHandle(ref, () => ({
    show: (item) => {
      setOpen(true);
      setItem(item);
    },
  }));
  const handleChange = (key) => e => {
    if (key === "vaoVien") {
      setState({
        dataSubmit: {
          ...state.dataSubmit,
          ...JSON.parse(e),
        }
      })
      return null
    }
    let value = e?.target?.value || e
    setState({
      dataSubmit: {
        ...state.dataSubmit,
        [key]: value,
      }
    })
  }
  const handleDropdownVisibleChange = (open) => {
    // document.querySelector("#containerElement").style.overflowY = open
    //   ? "hidden"
    //   : "auto";
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  const childrenBenhVien = (listBenhVien || []).map((item, index) => {
    return (
      <Option
        key={index}
        value={JSON.stringify({
          vienChuyenDenId: item?.id,
          vienChuyenDen: null
        })}
      >{item.ten}</Option>
    );
  });
  const renderValueSoNgayDieuTri = useMemo(() => {
    let ngayTheoDoi = listChiTietTheoDoiNguoiBenh && listChiTietTheoDoiNguoiBenh[0]?.ngayTheoDoi
    let milisecondsD1 = moment(Number(moment(ngayTheoDoi, "YYYY/MM/DD").format("x")));
    let milisecondsNgayHienTai = moment(Number(moment().format("x")));
    let value = milisecondsNgayHienTai.diff(milisecondsD1, 'days') + 1
    setState({
      dataSubmit: {
        ...state?.dataSubmit,
        soNgay: value
      }
    })
    return value
  }, [listChiTietTheoDoiNguoiBenh])
  return (
    <ModalStyle width={768} visible={open} closable={false} footer={null}>
      <Main>
        <Row className="header">
          <span>Kết thúc điều trị </span>
        </Row>
        <hr />
        <div style={{ marginLeft: 10 }}>
          <Row style={{ marginTop: 16 }}>
            <Col span={6}>
              <Radio
                name="ketQua"
                value={listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[0].id}
                onChange={handleChange("ketQua")}
                checked={state?.dataSubmit?.ketQua === (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[0].id)}
              >
                {listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[0].ten}
              </Radio>
            </Col>
            <Col span={6}>
              <DivInfo>
                <TextField
                  label="Số ngày điều trị"
                  // spanId="nhiet-do-chan-doan"
                  // nextInputByTabKey={"huyet-ap-chan-doan"}
                  maxLine={1}
                  maxLength={4}
                  html={renderValueSoNgayDieuTri}
                  style={{ width: 135 }}
                  disabled={true}
                />
                <span>
                  ngày
                </span>
              </DivInfo>
            </Col>
          </Row>
          <Row style={{ marginTop: 5 }}>
            <div span={12}>
              <Row align="middle">
                <Radio
                  name="ketQua"
                  value={listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[1].id}
                  onChange={handleChange("ketQua")}
                  checked={state?.dataSubmit?.ketQua === (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[1].id)}
                >
                  {listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[1].ten}
                </Radio>
                <SelectGroup >
                  <div className="select-box-chan-doan">
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      disabled={state?.dataSubmit?.ketQua !== (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[1].id)}
                      value={state?.dataSubmit?.vienChuyenDenId && JSON.stringify({
                        vienChuyenDenId: state?.dataSubmit?.vienChuyenDenId,
                        vienChuyenDen: null
                      })}
                      // onChange={handleChangeData("dsCdChinhId")}
                      onDropdownVisibleChange={handleDropdownVisibleChange}
                      filterOption={filterOption}
                      onChange={handleChange("vaoVien")}
                    >
                      {childrenBenhVien}
                    </Select>
                  </div>
                </SelectGroup>
              </Row>
              <div>
                <TextField
                  label="Kết quả tại bệnh viện"
                  disabled={state?.dataSubmit?.ketQua !== (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[1].id)}
                  // spanId="nhiet-do-chan-doan"
                  // nextInputByTabKey={"huyet-ap-chan-doan"}
                  maxLine={1}
                  html={nbDaKetThuc?.ketQuaTaiVien}
                  style={{ width: 300, marginLeft: 25 }}
                  delayTyping={200}
                  onChange={handleChange("ketQuaTaiVien")}
                />
              </div>
            </div>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Radio
              name="ketQua"
              value={listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[2].id}
              onChange={handleChange("ketQua")}
              checked={state?.dataSubmit?.ketQua === (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[2].id)}
            >
            </Radio>
            <div>
              <TextField
                label={listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[2].ten}
                disabled={state?.dataSubmit?.ketQua !== (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[2].id)}
                onChange={handleChange("bienChung")}
                // spanId="nhiet-do-chan-doan"
                // nextInputByTabKey={"huyet-ap-chan-doan"}
                maxLine={1}
                delayTyping={200}
                html={nbDaKetThuc?.bienChung}
                style={{ width: 300 }}
              />
            </div>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col span={6}>
              <Radio
                name="ketQua"
                value={listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[3].id}
                onChange={handleChange("ketQua")}
                checked={state?.dataSubmit?.ketQua === (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[3].id)}
              >
                {listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[3].ten}
              </Radio>
            </Col>
            <Col span={6}>
              <div>
                <TextField
                  label="Nguyên nhân"
                  onChange={handleChange("nguyenNhanTuVong")}
                  disabled={state?.dataSubmit?.ketQua !== (listKetQuaDieuTriCovid && listKetQuaDieuTriCovid[3].id)}
                  // spanId="nhiet-do-chan-doan"
                  // nextInputByTabKey={"huyet-ap-chan-doan"}
                  delayTyping={200}
                  maxLine={1}
                  html={nbDaKetThuc?.nguyenNhanTuVong}
                  style={{ width: 300 }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="footer">
          <Button className="btn-back" onClick={closeToggleModal}>
            Quay lại
          </Button>
          <Button className="btn-submit" onClick={openToggleModal}>
            Lưu <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
          </Button>
        </div>
      </Main>
    </ModalStyle>
  );
};

export default forwardRef(ModalKetThucDieuTri);
