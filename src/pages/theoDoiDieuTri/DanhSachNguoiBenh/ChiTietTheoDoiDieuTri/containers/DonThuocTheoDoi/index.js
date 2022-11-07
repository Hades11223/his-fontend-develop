import { Row } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import IcEdit from "assets/images/khamBenh/edit.png";
import IcSave from "assets/images/theoDoiDieuTri/icSave.png";
import IcCancel from "assets/images/theoDoiDieuTri/icCancel.png";
import { useParams } from "react-router-dom";
import Select from "components/Select";
import ModalLichSuThuoc from "../ModalLichSuThuoc";
import { useEffect } from "react";

const DonThuocTheoDoi = ({ ...props }) => {
  const [state, _setState] = useState({
    editData: false,
  });
  const {
    listDichVuThuocCovid,
    listAllLieuDung,
    getListAllLieuDung,
    thoiGianVaoVien,
    getListDichVuThuoc,
    donThuocCovid,
    listChiTietTheoDoiNguoiBenh,
    nbTheoDoiCovidId,
    updateData
  } = props;
  const LichSuThuocRef = useRef(null);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const { id } = useParams();

  useEffect(() => {
    getListAllLieuDung({});
  }, []);

  useEffect(() => {
    let nbTheoDoiCovidId = listChiTietTheoDoiNguoiBenh.find((item) => item.ngayTheoDoi === moment().format("YYYY/DD/MM"))?.id;
    getListDichVuThuoc({
      nbDotDieuTriId: id,
      nbTheoDoiCovidId: nbTheoDoiCovidId,
    });
    updateData({ nbTheoDoiCovidId: nbTheoDoiCovidId });
  }, [listChiTietTheoDoiNguoiBenh, id]);
  const onEdit = (item, index) => {
    setState({ editData: true, currentIndex: index });
  };
  const onCancel = () => {
    setState({ editData: false, currentIndex: null });
  };
  const onSave = (item) => {
    const payload = { id: item.id, lieuDungId: state.lieuDungId };
    donThuocCovid(Array(payload)).then((s) => {
      getListDichVuThuoc({
        nbDotDieuTriId: id,
        nbTheoDoiCovidId: listChiTietTheoDoiNguoiBenh[0]?.id,
      });
    });
    onCancel();
  };
  const onShowPopUp = () => {
    LichSuThuocRef.current && LichSuThuocRef.current.show();
  };
  return (
    <Main>
      <Row>
        <div className="header">
          <span>
            <b>
              Đơn thuốc điều trị ngày{" "}
              {moment(
                listChiTietTheoDoiNguoiBenh.find(
                  (x) => x.id == nbTheoDoiCovidId
                )?.ngayTheoDoi
              ).format("DD/MM/YYYY")}
            </b>
          </span>
          <img
            src={require("assets/images/theoDoiDieuTri/time.png")}
            alt="..."
            onClick={onShowPopUp}
          />
        </div>
      </Row>
      <Row>
        {(listDichVuThuocCovid || []).map((item, index) => {
          return (
            <div className="content" key={index}>
              <h1>{`${index+1}. Tên thuốc: ${item.ten} ${item.tenDonViTinh? "("+item.tenDonViTinh +")" : ""}`}</h1>
              <h2>Liều dùng - Cách dùng</h2>
              {(state.currentIndex !== index || state.currentIndex == null) && (
                <div className="info">
                  <span>{item.tenLieuDung}</span>
                  <img
                    src={IcEdit}
                    alt="..."
                    onClick={() => onEdit(item, index)}
                  />
                </div>
              )}
              {state.editData && state.currentIndex == index && (
                <div className="lieuDung" key={index}>
                  <Select
                    placeholder="Nhập liều dùng"
                    data={listAllLieuDung}
                    onChange={(e) => setState({ lieuDungId: e })}
                  ></Select>
                  <div className="image">
                    <div className="cancel">
                      <a>Hủy</a>
                      <img src={IcCancel} alt="..." onClick={onCancel} />
                    </div>
                    <div className="save">
                      <a>Lưu</a>
                      <img
                        src={IcSave}
                        alt="..."
                        onClick={() => onSave(item)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Row>
      <ModalLichSuThuoc ref={LichSuThuocRef} />
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    listDichVuThuocCovid: state.nbDocThuocCovid.listDichVuThuocCovid || [],
    listAllLieuDung: state.lieuDung.listAllLieuDung || [],
    thoiGianVaoVien: state.danhSachCovid.thoiGianVaoVien,
    selectedId: state.danhSachCovid.selectedId,
    listChiTietTheoDoiNguoiBenh:
      state.chiTietTheoDoiNguoiBenh.listChiTietTheoDoiNguoiBenh || [],
    nbTheoDoiCovidId: state.nbDocThuocCovid.nbTheoDoiCovidId,
  };
};

const mapDispatchToProps = ({
  utils: { getUtils },
  lieuDung: { getListAllLieuDung },
  nbDocThuocCovid: { getListDichVuThuoc, donThuocCovid, updateData },
}) => ({
  getUtils,
  getListAllLieuDung,
  getListDichVuThuoc,
  donThuocCovid,
  updateData,
});
export default connect(mapStateToProps, mapDispatchToProps)(DonThuocTheoDoi);
