import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  HeaderSearch,
  TableWrapper,
  Select,
  InputTimeout,
} from "components";
import Icon from "@ant-design/icons";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcXoa from "assets/svg/danhMuc/ic-xoa.svg";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import { ModalThemDv } from "../modals";
import { GoiPtTtChiTietStyled } from "./styled";
import { LOAI_DICH_VU } from "constants/index";

const GoiPtTtChiTiet = ({
  layerId,
  page,
  size,
  total,
  searchGoiPtTtChiTiet,
  listGoiPtTtChiTiet,
  onDeleteGoiPtTtChiTiet,
}) => {
  const { t } = useTranslation();
  const [dataEditDefault, setDataEditDefault] = useState(null);
  const refSelectRow = useRef();
  const refModalThemDv = useRef(null);
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const { getAllTongHopDichVuCap1 } = useDispatch().nhomDichVuCap1;
  const { listAllNhomDichVuCap1 = [] } = useSelector(
    (state) => state.nhomDichVuCap1
  );

  //state
  const [state, _setState] = useState({
    data: [],
    searchParams: {
      page: 0,
      size: 10,
    },
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId });
    };
  }, []);

  useEffect(() => {
    searchGoiPtTtChiTiet({
      ...state.searchParams,
      // sort: combineSort(sortData),
    });

    getAllTongHopDichVuCap1();
  }, []);

  const onPageChange = (page) => {
    searchGoiPtTtChiTiet({ ...state.searchParams, page: page - 1 });
  };

  const onSizeChange = (size) => {
    searchGoiPtTtChiTiet({ ...state.searchParams, size });
  };

  const onClickSort = (key, value) => {};

  const onSearchInput = (value, name) => {
    const searchParams = { ...state.searchParams, [name]: value };
    searchGoiPtTtChiTiet({ ...searchParams });

    setState({ searchParams });
  };

  const handleDeleteItem = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("common.banCoChacMuonXoa")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          onDeleteGoiPtTtChiTiet(item?.id);
        }
      );
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const onRow = (record, index) => ({
    onClick: (event) => {},
  });

  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã dịch vụ, hàng hóa"
          sort_key="ma"
          onClickSort={onClickSort}
          // dataSort={sortData.ma || 0}
          search={
            <InputTimeout
              placeholder="Tìm theo mã dịch vụ, hàng hóa"
              onChange={(e) => {
                onSearchInput(e, "dichVu.ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu.ma",
      render: (item) => item?.ma,
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ, hàng hóa"
          sort_key="ten"
          onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
          search={
            <InputTimeout
              placeholder="Tìm theo tên dịch vụ, hàng hóa"
              onChange={(e) => {
                onSearchInput(e, "dichVu.ten");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: "dichVu.ten",
      render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm DV cấp 1"
          sort_key="tenNhomDichVuCap1"
          onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
          searchSelect={
            <Select
              data={listAllNhomDichVuCap1 || []}
              placeholder="Tìm nhóm Dv cấp 1"
              onChange={(value) => {
                onSearchInput(value, "dichVu.nhomDichVuCap1Id");
              }}
            />
          }
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu.tenNhomDichVuCap1",
      render: (item) => item?.tenNhomDichVuCap1,
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu.giaBaoHiem",
      render: (item) =>
        item?.giaBaoHiem
          ? item?.giaBaoHiem.formatPrice()
          : [
              LOAI_DICH_VU.THUOC,
              LOAI_DICH_VU.VAT_TU,
              LOAI_DICH_VU.HOA_CHAT,
            ].includes(item?.loaiDichVu)
          ? ""
          : 0,
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu.giaKhongBaoHiem",
      render: (item) =>
        item?.giaKhongBaoHiem
          ? item?.giaKhongBaoHiem.formatPrice()
          : [
              LOAI_DICH_VU.THUOC,
              LOAI_DICH_VU.VAT_TU,
              LOAI_DICH_VU.HOA_CHAT,
            ].includes(item?.loaiDichVu)
          ? ""
          : 0,
    },
    {
      title: (
        <HeaderSearch
          title="Phụ thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          // dataSort={sortData.active || 0}
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu.giaPhuThu",
      render: (item) =>
        item?.giaPhuThu
          ? item?.giaPhuThu.formatPrice()
          : [
              LOAI_DICH_VU.THUOC,
              LOAI_DICH_VU.VAT_TU,
              LOAI_DICH_VU.HOA_CHAT,
            ].includes(item?.loaiDichVu)
          ? ""
          : 0,
    },
    {
      title: <HeaderSearch title="" />,
      width: 60,
      align: "center",
      fixed: "right",
      render: (item, list, index) => {
        return (
          <div className="ic-action">
            <Icon component={IcXoa} onClick={handleDeleteItem(item)} />
          </div>
        );
      },
    },
  ];

  const onAddDv = () => {
    refModalThemDv.current && refModalThemDv.current.show({});
  };

  const data = listGoiPtTtChiTiet.map((item, index) => {
    return {
      ...item,
      action: item,
      stt: page * size + index + 1,
    };
  });

  const refreshList = () => {
    searchGoiPtTtChiTiet({
      page: 0,
      size: 10,
    });
  };

  return (
    <GoiPtTtChiTietStyled>
      <div className="table-content">
        <TableWrapper
          classNameRow={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
          buttonHeader={[
            {
              title: "Thêm mới [F1]",
              onClick: onAddDv,
              buttonHeaderIcon: (
                <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
              ),
            },
          ]}
          columns={columnsService}
          dataSource={data}
          onRow={onRow}
          rowClassName={setRowClassName}
          styleWrap={{ height: "100%" }}
        />
        {total && (
          <Pagination
            onChange={onPageChange}
            current={page + 1}
            pageSize={size}
            total={total}
            listData={data}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>

      <ModalThemDv ref={refModalThemDv} refreshList={refreshList} />
    </GoiPtTtChiTietStyled>
  );
};
export default GoiPtTtChiTiet;
