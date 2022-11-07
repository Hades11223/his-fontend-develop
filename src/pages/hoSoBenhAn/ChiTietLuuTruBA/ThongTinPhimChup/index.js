import React, { useEffect, useState } from "react";
import Box from "pages/tiepDon/components/Box";
import { Main } from "./styled";
import { TableWrapper, Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Icon, { PlusCircleFilled } from "@ant-design/icons";
import IcDelete from "assets/svg/ic-delete.svg";
import IcEdit from "assets/svg/ic-edit.svg";
import { refConfirm } from "app";
import IconTick from "assets/images/his-core/iconTick.png";
import icHoanDv from "assets/images/khamBenh/icHoanDv.png";
import { InputNumber } from "antd";

const { Column } = TableWrapper;

const ThongTinPhimChup = () => {
  const { t } = useTranslation();

  //state
  const [state, _setState] = useState({
    data: [],
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const { chiTietLuuTru } = useSelector((state) => state.dsLuuTruBa);
  const { listAllNhomDichVuCap2 = [] } = useSelector(
    (state) => state.nhomDichVuCap2
  );
  const { xoaLuuTruPhim, createOrEditLuuTruPhim, getChiTietLuuTruBA } =
    useDispatch().dsLuuTruBa;
  const { getAllDichVuCap2 } = useDispatch().nhomDichVuCap2;

  const { dsLuuTruPhim = [], id } = chiTietLuuTru || {};

  useEffect(() => {
    getAllDichVuCap2();
  }, []);

  useEffect(() => {
    if (dsLuuTruPhim && dsLuuTruPhim.length > 0) {
      setState({
        data: dsLuuTruPhim,
      });
    }
  }, [dsLuuTruPhim]);

  const handleDelete = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: "Bạn có chắc chắn xóa",
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          xoaLuuTruPhim(item.id).then(() => {
            refreshList();
          });
        }
      );
  };

  const onEditRow = (item, index) => () => {
    setState({
      currentItem: item,
      currentIndex: index,
    });
  };

  const onAddNewRow = () => {
    if (state.currentIndex === 0) {
      return;
    }

    let item = {
      id: 0,
      nbLuuTruBaId: id,
      nhomDichVuCap2Id: null,
      soPhimTaiVien: 1,
      soPhimTuyenKhac: 1,
    };

    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
    });
  };

  const onSavePhim = () => {
    const payload = {
      nbLuuTruBaId: id,
      nhomDichVuCap2Id: state.currentItem?.nhomDichVuCap2Id,
      soPhimTaiVien: state.currentItem?.soPhimTaiVien,
      soPhimTuyenKhac: state.currentItem?.soPhimTuyenKhac,
      id: state.currentItem?.id || undefined,
    };
    createOrEditLuuTruPhim(payload).then(() => {
      setState({
        currentItem: {},
        currentIndex: -1,
      });
      refreshList();
    });
  };

  const onChange = (key) => (e) => {
    setState({ currentItem: { ...state.currentItem, [key]: e } });
  };

  const onCancelItem = () => {
    setState({
      currentItem: {},
      currentIndex: -1,
      data: state.data.filter((x) => !!x.id),
    });
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
    }),
    Column({
      title: "Loại dịch vụ",
      sort_key: "nhomDichVuCap2",
      width: "250px",
      dataIndex: "nhomDichVuCap2",
      key: "nhomDichVuCap2",
      i18Name: "giayDayCong.tenNb",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              defaultValue={state.currentItem?.nhomDichVuCap2Id}
              data={listAllNhomDichVuCap2}
              placeholder="Chọn nhóm dịch vụ cấp 2"
              onChange={onChange("nhomDichVuCap2Id")}
            />
          );
        } else return item?.ten || "";
      },
    }),
    Column({
      title: "Số phim chụp tại viện",
      sort_key: "soPhimTaiVien",
      width: "120px",
      dataIndex: "soPhimTaiVien",
      key: "soPhimTaiVien",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              defaultValue={item}
              min={0}
              placeholder="Nhập số phim chụp tại viện"
              onChange={onChange("soPhimTaiVien")}
            />
          );
        } else return item || "";
      },
      i18Name: "giayDayCong.soPhimTaiVien",
    }),
    Column({
      title: "Số phim chụp tuyến khác",
      sort_key: "soPhimTuyenKhac",
      width: "120px",
      dataIndex: "soPhimTuyenKhac",
      key: "soPhimTuyenKhac",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              defaultValue={item}
              min={0}
              placeholder="Nhập số phim chụp tuyến khác"
              onChange={onChange("soPhimTuyenKhac")}
            />
          );
        } else return item || "";
      },
      i18Name: "giayDayCong.soPhimTuyenKhac",
    }),
    Column({
      title: t("common.tienIch"),
      width: "60px",
      align: "center",
      fixed: "right",
      i18Name: "common.tienIch",
      render: (item, list, index) => {
        return index !== state.currentIndex ? (
          <div className="tien-ich">
            <Icon
              className="ic-action"
              component={IcEdit}
              onClick={onEditRow(item, index)}
            />
            <Icon
              className="ic-action"
              component={IcDelete}
              onClick={handleDelete(item)}
            />
          </div>
        ) : (
          <div className="tien-ich">
            <img src={IconTick} onClick={onSavePhim} alt="..."></img>
            <img src={icHoanDv} alt="..." onClick={onCancelItem}></img>
          </div>
        );
      },
    }),
  ];

  const refreshList = () => {
    getChiTietLuuTruBA(id);
  };

  return (
    <Main>
      <Box
        title={
          <>
            <span>Thông tin phim chụp</span>
            <PlusCircleFilled className="btn-add" onClick={onAddNewRow} />
          </>
        }
      >
        <TableWrapper
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={(state.data || []).map((item, idx) => ({
            ...item,
            index: idx + 1,
          }))}
          tableName="table_HSBA_DsPhimChup"
          styleWrap={{ height: 350 }}
        />
      </Box>
    </Main>
  );
};

export default ThongTinPhimChup;
