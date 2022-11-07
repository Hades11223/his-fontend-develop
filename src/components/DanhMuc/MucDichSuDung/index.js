import React, { useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { ENUM, HIEU_LUC } from "constants/index";
import { Checkbox, DatePicker, Input, InputNumber } from "antd";
import moment from "moment";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import InputTimeout from "components/InputTimeout";
import { useEnum, useStore } from "hook";
import { LOAI_DICH_VU } from "constants/index";
import { cloneDeep } from "lodash";
const { Column } = TableWrapper;
const MucDichSuDung = (props) => {
  const { t } = useTranslation();
  const [listtheoThoiGian] = useEnum(ENUM.AP_DUNG_THEO_THOI_GIAN);
  const { dichVuId, refCallbackSave = {}, currentItem } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);

  const thuoc = [LOAI_DICH_VU.THUOC].includes(currentItem?.dichVu?.loaiDichVu);
  const dichVuKyThuat = [
    LOAI_DICH_VU.CDHA,
    LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
    LOAI_DICH_VU.XET_NGHIEM,
  ].includes(currentItem?.dichVu?.loaiDichVu);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { size, page, totalElements } = useSelector(
    (state) => state.mucDichSuDung
  );
  const listMucDichSuDung = useStore("mucDichSuDung.listMucDichSuDung");
  const {
    mucDichSuDung: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      createOrEdit,
    },
  } = useDispatch();
  useEffect(() => {
    if (dichVuId) onChangeInputSearch({ dichVuId: dichVuId });
  }, [dichVuId]);

  useEffect(() => {
    setState({ data: cloneDeep(listMucDichSuDung) });
  }, [listMucDichSuDung]);
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    onChangeInputSearch({
      [key]: value,
      dichVuId,
    });
  };

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;
    if (state.currentItem) {
      setState({ currentItem: { ...state.currentItem, [key]: value } });
    }
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1, dichVuId });
  };

  const onHandleSizeChange = (size) => {
    onSizeChange({ size: size, dichVuId });
  };
  const getDefaultValue = (value) => {
    if (value?.toDateObject) {
      return moment(value.toDateObject());
    }
  };
  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    }),
    Column({
      title: t("danhMuc.maMucDich"),
      dataIndex: "ma",
      key: "ma",
      width: 80,
      renderSearch: (
        <InputTimeout
          placeholder={t("common.timKiem")}
          onChange={(e) => {
            onSearchInput(e.target.value, "ma");
          }}
        />
      ),
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Input
              placeholder={t("danhMuc.maMucDich")}
              value={state?.currentItem?.ma}
              onChange={onChange("ma")}
            ></Input>
          );
        } else return item;
      },
    }),
    Column({
      title: t("danhMuc.tenMucDich"),
      dataIndex: "ten",
      key: "ten",
      width: 180,
      renderSearch: (
        <InputTimeout
          placeholder={t("common.timKiem")}
          onChange={(e) => {
            onSearchInput(e.target.value, "ten");
          }}
        />
      ),
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Input
              placeholder={t("danhMuc.tenMucDich")}
              value={state.currentItem?.ten}
              onChange={onChange("ten")}
            ></Input>
          );
        } else return item;
      },
    }),
    Column({
      title: t("common.tuNgay"),
      dataIndex: "tuNgay",
      key: "tuNgay",
      width: 100,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <DatePicker
                defaultValue={getDefaultValue(state.currentItem?.tuNgay)}
                placeholder="Từ ngày"
                format="DD/MM/YYYY"
                onChange={onChange("tuNgay")}
              />
            </>
          );
        } else return (item && moment(item).format("DD/MM/YYYY")) || "";
      },
    }),
    Column({
      title: t("common.denNgay"),
      dataIndex: "denNgay",
      key: "denNgay",
      width: 100,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <DatePicker
                defaultValue={getDefaultValue(state.currentItem?.denNgay)}
                placeholder="Từ ngày"
                format="DD/MM/YYYY"
                onChange={onChange("denNgay")}
              />
            </>
          );
        } else return (item && moment(item).format("DD/MM/YYYY")) || "";
      },
    }),

    Column({
      title: t("danhMuc.tyLeThanhToanBh"),
      dataIndex: "tyLeBhTt",
      key: "tyLeBhTt",
      width: 100,
      hidden: !thuoc,
      onClickSort: onClickSort,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <InputNumber
                min={0}
                defaultValue={state.currentItem?.tyLeBhTt}
                placeholder={t("danhMuc.tyLeThanhToanBh")}
                onChange={onChange("tyLeBhTt")}
                style={{ width: "100%" }}
              />
            </>
          );
        } else return item;
      },
    }),
    Column({
      title: t("danhMuc.donGiaKhongBh"),
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      width: 100,
      hidden: !dichVuKyThuat,
      onClickSort: onClickSort,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              min={0}
              type="number"
              value={state.currentItem?.giaKhongBaoHiem}
              placeholder={t("danhMuc.nhapGiaKhongBaoHiem")}
              onChange={onChange("giaKhongBaoHiem")}
              style={{ width: "100%" }}
              formatPrice={true}
            />
          );
        } else return item ? (item + "").formatPrice() : "";
      },
    }),
    Column({
      title: t("danhMuc.donGiaBh"),
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      width: 100,
      hidden: !dichVuKyThuat,
      onClickSort: onClickSort,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              formatPrice={true}
              min={0}
              value={state.currentItem?.giaBaoHiem}
              type="number"
              placeholder={t("danhMuc.nhapGiaBaoHiem")}
              style={{ width: "100%" }}
              onChange={onChange("giaBaoHiem")}
            />
          );
        } else return item ? (item + "").formatPrice() : "";
      },
    }),

    Column({
      title: t("danhMuc.phuThu"),
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      width: 100,
      hidden: !dichVuKyThuat,
      onClickSort: onClickSort,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              min={0}
              type="number"
              value={state.currentItem?.giaPhuThu}
              placeholder={t("danhMuc.nhapGiaPhuThu")}
              onChange={onChange("giaPhuThu")}
              style={{ width: "100%" }}
              formatPrice={true}
            />
          );
        } else return item ? (item + "").formatPrice() : "";
      },
    }),

    Column({
      title: t("danhMuc.apDungTheoThoiGianThucHienDv"),
      dataIndex: "theoThoiGian",
      key: "theoThoiGian",
      width: 100,
      onClickSort: onClickSort,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              data={listtheoThoiGian}
              value={state.currentItem?.theoThoiGian}
              onChange={onChange("theoThoiGian")}
            />
          );
        } else return item && listtheoThoiGian.find((x) => x.id === item)?.ten;
      },
    }),

    Column({
      title: t("danhMuc.ghiChu"),
      dataIndex: "ghiChu",
      key: "ghiChu",
      width: 250,
      onClickSort: onClickSort,
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Input
              placeholder={t("common.nhapGhiChu")}
              onChange={onChange("ghiChu")}
            />
          );
        } else return item;
      },
    }),

    Column({
      title: t("danhMuc.coHieuLuc"),
      dataIndex: "active",
      key: "active",
      i18Name: "active",
      onClickSort: onClickSort,
      width: 70,
      align: "center",
      selectSearch: true,
      renderSearch: (
        <Select
          data={HIEU_LUC}
          placeholder="Chọn hiệu lực"
          onChange={onSearchInput("active")}
        />
      ),
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} onChange={onChange("active")} />;
      },
    }),
  ];

  const onRow = (record = {}, index) => {
    if (!state.pressButtonAdded) {
      return {
        onClick: (event) => {
          if (state?.currentIndex !== index)
            setState({
              currentItem: JSON.parse(JSON.stringify(record)),
              currentIndex: index,
              pressedRow: true,
            });
        },
      };
    }
  };
  const onAddNewRow = () => {
    let item = {
      dichVuId,
      active: true,
      tyLeBhTt: thuoc ? currentItem?.dichVu?.tyLeBhTt : undefined,
      giaBaoHiem: dichVuKyThuat ? currentItem?.dichVu?.giaBaoHiem : undefined,
      giaKhongBaoHiem: dichVuKyThuat
        ? currentItem?.dichVu?.giaKhongBaoHiem
        : undefined,
      giaPhuThu: dichVuKyThuat ? currentItem?.dichVu?.giaPhuThu : undefined,
    };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      pressButtonAdded: true,
    });
  };
  const onSave = () => {
    const {
      id,
      dichVuId,
      active = true,
      tuNgay,
      denNgay,
      ghiChu,
      theoThoiGian,
      giaPhuThu,
      giaBaoHiem,
      giaKhongBaoHiem,
      ma,
      ten,
      tyLeBhTt,
    } = state.currentItem || {};
    createOrEdit({
      id,
      dichVuId: dichVuId,
      active,
      tuNgay,
      denNgay,
      ghiChu,
      theoThoiGian,
      giaPhuThu,
      giaBaoHiem,
      giaKhongBaoHiem,
      ma,
      ten,
      tyLeBhTt,
    }).then((s) => {
      setState({
        currentIndex: -1,
        currentItem: null,
        pressButtonAdded: false,
      });
    });
  };
  refCallbackSave.current = onSave;

  const onCancel = () => {
    setState({
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <Main>
      <EditWrapper
        title={`${t("danhMuc.mucDichSuDung")}(TT35)`}
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={dichVuId && !state.currentItem}
        editStatus={state?.pressButtonAdded ? false : editStatus}
      >
        <fieldset
          disabled={state?.pressButtonAdded ? false : editStatus}
          style={{ height: "100%" }}
        >
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <TableWrapper
              scroll={{ y: 500, x: 1800 }}
              columns={columns}
              dataSource={dichVuId ? state.data : []}
              onRow={onRow}
            ></TableWrapper>
            {dichVuId && totalElements ? (
              <Pagination
                onChange={onChangePage}
                current={page + 1}
                pageSize={size}
                total={totalElements}
                onShowSizeChange={onHandleSizeChange}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            ) : null}
          </div>
        </fieldset>
      </EditWrapper>
    </Main>
  );
};

export default MucDichSuDung;
