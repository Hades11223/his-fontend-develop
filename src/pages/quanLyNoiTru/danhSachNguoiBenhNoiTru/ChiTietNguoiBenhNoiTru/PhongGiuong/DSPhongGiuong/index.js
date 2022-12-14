import React, { useEffect, useRef, useState } from "react";
import { TableWrapper, HeaderSearch, Select } from "components";
import { Input } from "antd";
import { Main } from "./styled";
import ModalChiTietGiuong from "./ModalChiTietGiuong";
import ModalChinhSua from "./ModalChinhSua";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import IcDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/noiTru/icEdit.png";
import IcView from "assets/images/kho/icView.png";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
import { refConfirm } from "app";

const DSPhongGiuong = (props) => {
  const { t } = useTranslation();
  const { isReadonly } = props;
  const { id } = useParams();
  //ref
  const refModalChiTietGiuong = useRef(null);
  const refModalChinhSua = useRef(null);
  const refSettings = useRef(null);
  const [state, _setState] = useState({
    dataSortColumn: {},
  });
  const { dataSortColumn } = state;
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

  useEffect(() => {
    if (id) {
      onSearch({ nbDotDieuTriId: id, sort: "tuThoiGian,asc" });
    }
  }, [id]);

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

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  function refreshList() {
    if (id) {
      onSearch({ nbDotDieuTriId: id, sort: "tuThoiGian,asc" });
    }
  }

  function onDelete(item) {
    return (e) => {
      e.stopPropagation();

      refConfirm.current &&
        refConfirm.current.show(
          {
            title: "Xo?? d??? li???u",
            content: `B???n ch???c ch???n mu???n x??a?`,
            cancelText: "Quay l???i",
            okText: "?????ng ??",
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

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

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
          search={<Input placeholder="T??m ki???m" />}
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
          search={<Input placeholder="T??m ki???m" />}
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
          title="Khoa NB n???m"
          sort_key="khoaNBNam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaNBNam || 0}
          search={<Input placeholder="T??m ki???m" />}
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
          search={<Input placeholder="T??m ki???m" />}
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
          search={<Input placeholder="T??m ki???m" />}
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
          search={<Input placeholder="T??m ki???m" />}
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
              placeholder={"Ch???n lo???i"}
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

  return (
    <Main>
      {/* <div className="table-content"> */}
      <TableWrapper
        ref={refSettings}
        bordered
        columns={columns}
        dataSource={dsPhongGiuong || []}
        tableName="table_QLNT_DanhSachPhongGiuong"
        rowKey={(record) => `${record.id}`}
        styleWrap={{ height: "100%" }}
      />
      {/* </div> */}

      {/* <div className="bottom-btn">
        <Button minWidth={"100px"}>Chuy???n khoa</Button>
      </div> */}

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
