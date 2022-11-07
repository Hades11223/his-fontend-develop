import { Checkbox, Input, InputNumber } from "antd";
import { TableWrapper, HeaderSearch, Select, InputTimeout } from "components";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DvTrongGoiStyled } from "./styled";
import IcThem from "assets/svg/danhMuc/ic-them.svg";
import IcLuu from "assets/svg/danhMuc/ic-luu.svg";
import IcXoa from "assets/svg/danhMuc/ic-xoa.svg";
import IcHuy from "assets/svg/danhMuc/ic-huy.svg";
import IcSua from "assets/svg/danhMuc/ic-sua.svg";
import Icon from "@ant-design/icons";
import { LOAI_DICH_VU } from "constants/index";
import { debounce } from "lodash";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import { ModalThemDv } from "../modals";

const DsDichVuTrongGoi = ({ goiPtTtId }) => {
  const { t } = useTranslation();
  const refModalThemDv = useRef(null);
  const { getDSDichVuTrongGoi, deleteDichVuTrongGoi, createOrEditDvTrongGoi } =
    useDispatch().goiPttt;
  const { getAllDichVu } = useDispatch().dichVu;
  const { getAllTongHopDichVuCap1 } = useDispatch().nhomDichVuCap1;
  const { dsDichVuTrongGoi } = useSelector((state) => state.goiPttt);
  const { listAllDichVu } = useSelector((state) => state.dichVu);
  const { listAllNhomDichVuCap1 = [] } = useSelector(
    (state) => state.nhomDichVuCap1
  );

  //state
  const [state, _setState] = useState({
    data: [],
    searchParams: {},
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    getAllDichVu({
      dsLoaiDichVu: [
        LOAI_DICH_VU.KHAM,
        LOAI_DICH_VU.XET_NGHIEM,
        LOAI_DICH_VU.CDHA,
        LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
        LOAI_DICH_VU.THUOC,
        LOAI_DICH_VU.VAT_TU,
        LOAI_DICH_VU.HOA_CHAT,
        LOAI_DICH_VU.CHE_PHAM_MAU,
      ],
    });
    getAllTongHopDichVuCap1();
  }, []);

  useEffect(() => {
    if (dsDichVuTrongGoi) {
      setState({
        data: dsDichVuTrongGoi,
      });
    }
  }, [dsDichVuTrongGoi]);

  const onAddNewRow = () => {
    // let item = {
    //   soLuongToiDa: 1,
    //   chiDinhCungGoi: true,
    // };

    // setState({
    //   currentItem: item,
    //   currentIndex: 0,
    //   data: [item, ...state.data],
    // });

    refModalThemDv.current &&
      refModalThemDv.current.show({
        goiPtTtId,
      });
  };

  useEffect(() => {
    if (goiPtTtId) {
      getDSDichVuTrongGoi({
        goiPtTtId,
      });
    }
  }, [goiPtTtId]);

  const onSearchInput = (value, name) => {
    const searchParams = { ...state.searchParams, [name]: value };
    getDSDichVuTrongGoi({
      goiPtTtId,
      ...searchParams,
    });

    setState({ searchParams });
  };

  const onSearchDv = debounce((value) => {
    getAllDichVu({
      dsLoaiDichVu: [
        LOAI_DICH_VU.KHAM,
        LOAI_DICH_VU.XET_NGHIEM,
        LOAI_DICH_VU.CDHA,
        LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
        LOAI_DICH_VU.THUOC,
        LOAI_DICH_VU.VAT_TU,
        LOAI_DICH_VU.HOA_CHAT,
        LOAI_DICH_VU.CHE_PHAM_MAU,
      ],
      ten: value,
    });
  }, 500);

  const onChange = (key) => (e) => {
    let value = e;

    if (key == "chiDinhCungGoi") {
      value = e?.target?.checked;
    }
    setState({ currentItem: { ...state.currentItem, [key]: value } });
  };

  const onCancelItem = () => {
    setState({
      currentItem: {},
      currentIndex: -1,
      data: state.data.filter((x) => !!x.id),
    });
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
          deleteDichVuTrongGoi(item?.id).then((res) => {
            getDSDichVuTrongGoi({
              goiPtTtId,
            });
          });
        }
      );
  };

  const onSaveChiTietGiuong = () => {
    createOrEditDvTrongGoi({
      id: state.currentItem?.id > 0 ? state.currentItem?.id : null,
      goiPtTtId: goiPtTtId,
      dichVuId: state.currentItem?.dichVuId,
      chiDinhCungGoi: state.currentItem?.chiDinhCungGoi,
      soLuongToiDa: state.currentItem?.soLuongToiDa,
    }).then(() => {
      getDSDichVuTrongGoi({
        goiPtTtId,
      });

      setState({
        currentItem: {},
        currentIndex: -1,
      });
    });
  };

  const onEditRow = (item, index) => () => {
    setState({
      currentItem: item,
      currentIndex: index,
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: () => {},
    };
  };

  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã dịch vụ, hàng hóa"
          sort_key="dichVu"
          // onClickSort={onClickSort}
          // dataSort={sortData.ma || 0}
          search={
            <InputTimeout
              placeholder="Tìm mã dịch vụ, hàng hóa"
              onChange={(e) => {
                onSearchInput(e, "dichVu.ma");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "dichVu",
      key: "dichVu.ma",
      render: (item) => item?.ma,
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ, hàng hóa"
          sort_key="ten"
          // onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
          search={
            <InputTimeout
              placeholder="Tìm tên dịch vụ, hàng hóa"
              onChange={(e) => {
                onSearchInput(e, "dichVu.ten");
              }}
            />
          }
        />
      ),
      width: 220,
      dataIndex: "dichVu",
      key: "dichVu.ten",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              defaultValue={state.currentItem?.dichVuId}
              data={listAllDichVu || []}
              placeholder="Chọn dịch vụ"
              onChange={onChange("dichVuId")}
              onSearch={onSearchDv}
            />
          );
        } else return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm DV cấp 1"
          sort_key="tenNhomDichVuCap1"
          // onClickSort={onClickSort}
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
      width: 140,
      dataIndex: "dichVu",
      key: "dichVu.tenNhomDichVuCap1",
      render: (item) => item?.tenNhomDichVuCap1,
    },
    {
      title: (
        <HeaderSearch
          title="Chỉ định cùng gói"
          sort_key="chiDinhCungGoi"
          // onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
        />
      ),
      width: 150,
      align: "center",
      dataIndex: "chiDinhCungGoi",
      key: "chiDinhCungGoi",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox
              defaultChecked={state.currentItem?.chiDinhCungGoi}
              onChange={onChange("chiDinhCungGoi")}
            />
          );
        } else return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL tối đa"
          sort_key="soLuongToiDa"
          // onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
        />
      ),
      width: 100,
      dataIndex: "soLuongToiDa",
      key: "soLuongToiDa",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              defaultValue={state.currentItem?.soLuongToiDa}
              placeholder="Nhập số lượng tối đa"
              onChange={onChange("soLuongToiDa")}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="giaKhongBaoHiem"
          // onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
          // search={
          //   <InputTimeout
          //     placeholder="Tìm giá không BH"
          //     onChange={(e) => {
          //       onSearchInput(e, "dichVu.giaKhongBaoHiem");
          //     }}
          //   />
          // }
        />
      ),
      width: 160,
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
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          // onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
          // search={
          //   <InputTimeout
          //     placeholder="Tìm giá BH"
          //     onChange={(e) => {
          //       onSearchInput(e, "dichVu.giaBaoHiem");
          //     }}
          //   />
          // }
        />
      ),
      width: 160,
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
          title="Phụ thu"
          sort_key="giaPhuThu"
          // onClickSort={onClickSort}
          // dataSort={sortData.ten || 0}
          // search={
          //   <InputTimeout
          //     placeholder="Tìm giá BH"
          //     onChange={(e) => {
          //       onSearchInput(e, "dichVu.giaBaoHiem");
          //     }}
          //   />
          // }
        />
      ),
      width: 160,
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
      width: 80,
      align: "center",
      fixed: "right",
      render: (item, list, index) => {
        return (
          <div className="ic-action">
            {index === state.currentIndex ? (
              <>
                <Icon component={IcLuu} onClick={onSaveChiTietGiuong} />
                <Icon component={IcHuy} onClick={onCancelItem} />
              </>
            ) : (
              <>
                <Icon component={IcSua} onClick={onEditRow(item, index)} />
                <Icon component={IcXoa} onClick={handleDeleteItem(item)} />
              </>
            )}
          </div>
        );
      },
    },
  ];

  const refreshList = () => {
    getDSDichVuTrongGoi({
      goiPtTtId,
    });
  };

  return (
    <DvTrongGoiStyled>
      <TableWrapper
        classNameRow={"custom-header"}
        title="Dịch vụ trong gói"
        columns={columnsService}
        dataSource={state.data}
        onRow={onRow}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={[
          {
            className: "btn-them",
            title: "Thêm",
            buttonHeaderIcon: <Icon component={IcThem} />,
            onClick: onAddNewRow,
          },
        ]}
        styleWrap={{ height: 350 }}
      />

      <ModalThemDv ref={refModalThemDv} refreshList={refreshList} />
    </DvTrongGoiStyled>
  );
};

export default DsDichVuTrongGoi;
