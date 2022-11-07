import React, { useMemo } from "react";
import { Input } from "antd";
import { HeaderSearch, TableWrapper, Select } from "components";
import { useRef, useState } from "react";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import ModalChiTietGiuong from "../DSPhongGiuong/ModalChiTietGiuong";
import ModalChinhSua from "../DSPhongGiuong/ModalChinhSua";
import { useParams } from "react-router-dom";
import { refConfirm } from "app";
import IcDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/noiTru/icEdit.png";
import IcView from "assets/images/kho/icView.png";

const DSPhongGiuong = (props) => {
  const { isReadonly } = props;
  const { id } = useParams();
  //ref
  const refModalChiTietGiuong = useRef(null);
  const refModalChinhSua = useRef(null);
  const refSettings = useRef(null);
  const [state, _setState] = useState({ dataSortColumn: {} });
  const { dataSortColumn } = state;
  const { t } = useTranslation();
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const [listLoaiChuyenKhoa] = useEnum(ENUM.LOAI_CHUYEN_KHOA);
  const {
    noiTruPhongGiuong: { dsPhongGiuong },
  } = useSelector((state) => state);
  const {
    noiTruPhongGiuong: { onSearch, deletePhongGiuong },
  } = useDispatch();

  const dsPhongGiuongMemo = useMemo(() => {
    return (dsPhongGiuong || [])
      .filter((item) => item.loai == 30)
      .map((item, idx) => ({ ...item, index: idx + 1 }));
  }, [dsPhongGiuong]);

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  //function
  function onViewChiTietGiuong(item) {
    return () => {
      refModalChiTietGiuong.current && refModalChiTietGiuong.current.show(item);
    };
  }

  function onEdit(item) {
    return () => {
      refModalChinhSua.current && refModalChinhSua.current.show(item);
    };
  }

  function onDelete(item) {
    return (e) => {
      e.stopPropagation();

      refConfirm.current &&
        refConfirm.current.show(
          {
            title: "Xoá dữ liệu",
            content: `Bạn chắc chắn muốn xóa?`,
            cancelText: "Quay lại",
            okText: "Đồng ý",
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
          },
          () => {
            deletePhongGiuong(item?.id).then(() => {
              refreshList();
            });
          },
          () => {}
        );
    };
  }

  //column
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      width: "50px",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.phong")}
          sort_key="phong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.phong || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 120,
      dataIndex: "tenPhong",
      show: true,
      i18Name: "quanLyNoiTru.phong",
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.phongGiuong.soHieuGiuong")}
          sort_key="soHieuGiuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soHieuGiuong || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 150,
      dataIndex: "soHieuGiuong",
      show: true,
      i18Name: "quanLyNoiTru.phongGiuong.soHieuGiuong",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa NB nằm"
          sort_key="khoaNBNam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaNBNam || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 250,
      dataIndex: "tenKhoa",
      show: true,
      i18Name: "quanLyNoiTru.phongGiuong.khoaNbNam",
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.phongGiuong.namTuNgay")}
          sort_key="namTuNgay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.namTuNgay || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 180,
      dataIndex: "tuThoiGian",
      i18Name: "quanLyNoiTru.phongGiuong.namTuNgay",
      show: true,
      render: (field, item, index) => {
        return (
          <div>{field && moment(field).format("DD/MM/YYYY HH:mm:ss")}</div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.phongGiuong.namDenNgay")}
          sort_key="namDenNgay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.namDenNgay || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 180,
      dataIndex: "denThoiGian",
      i18Name: "quanLyNoiTru.phongGiuong.namDenNgay",
      show: true,
      render: (field, item, index) => {
        return (
          <div>{field && moment(field).format("DD/MM/YYYY  HH:mm:ss")}</div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.phongGiuong.soNgayGiuong")}
          sort_key="soNgay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soNgay || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "soNgay",
      i18Name: "quanLyNoiTru.phongGiuong.soNgayGiuong",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("quanLyNoiTru.phongGiuong.loai")}
          sort_key="loai"
          dataSort={dataSortColumn["loai"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              placeholder={"Chọn loại"}
              data={[{ id: "", ten: t("common.tatCa") }, ...listLoaiChuyenKhoa]}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "loai",
      key: "loai",
      i18Name: "quanLyNoiTru.phongGiuong.loai",
      show: true,
      render: (item) => {
        const res = listLoaiChuyenKhoa.find((el) => el.id === item) || {};
        return res.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.tienIch")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "100px",
      align: "center",
      render: (item) => {
        return (
          <div className="tool-btn">
            <img
              src={IcView}
              alt="..."
              onClick={onViewChiTietGiuong(item)}
            ></img>
            <img src={IconEdit} alt="..." onClick={onEdit(item)}></img>
            {!isReadonly && (
              <img src={IcDelete} alt="..." onClick={onDelete(item)}></img>
            )}
          </div>
        );
      },
    },
  ];

  function refreshList() {
    if (id) {
      onSearch({ nbDotDieuTriId: id, sort: "tuThoiGian,asc" });
    }
  }

  return (
    <Main>
      <TableWrapper
        bordered
        ref={refSettings}
        columns={columns}
        tableName="table_QLNT_DanhSachNghiDieuTri"
        dataSource={dsPhongGiuongMemo}
        rowKey={(record) => `${record.id}`}
        styleWrap={{ height: "100%" }}
      />

      <ModalChiTietGiuong
        ref={refModalChiTietGiuong}
        refreshList={refreshList}
        isReadonly={isReadonly}
      />
      <ModalChinhSua
        ref={refModalChinhSua}
        refreshList={refreshList}
        isReadonly={isReadonly}
      />
    </Main>
  );
};

export default DSPhongGiuong;
