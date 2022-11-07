import React, { useState, useEffect, useMemo } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import InputTimeout from "components/InputTimeout";
import { useDispatch, useSelector } from "react-redux";
import { HIEU_LUC, YES_NO, ROLES, LOAI_DICH_VU } from "constants/index";
import { Input, Checkbox, InputNumber } from "antd";
import TabPanel from "../../../../components/MultiLevelTab/TabPanel";
import { WrapperDvTrongGoi } from "../styled";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

const DEFAULT_INPUT = {
  "dichVu.ten": "",
  soLuong: "",
  "phong.ten": "",
  lieuDungId: "",
  khongTinhTien: "",
  tuTra: "",
  active: "",
};

function DichVuTrongGoi(props) {
  const { t } = useTranslation();
  const { refCallbackSave, boChiDinhId, isThuocChiDinhNgoai, dsLoaiDichVu } =
    props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  const listAllThuocKeNgoai = useStore("thuocKeNgoai.listAllThuocKeNgoai");
  const listAllLieuDung = useStore("lieuDung.listAllLieuDung", []);
  const { listAllPhong, listRoom } = useSelector((state) => state.phong);
  const goiDichVu = useSelector((state) => state.goiDichVu.currentItem);

  const {
    listData,
    size,
    page,
    totalElements,
    dataSortColumn,
    listAllDichVu = [],
  } = useSelector((state) => state.goiDichVuChiTiet);

  const {
    goiDichVuChiTiet: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      createOrEdit,
      getDSDichVuTheoLoai,
      createBatch,
    },
    // dichVu: { getListAllDichVu },
    phong: { getListPhongTongHop },
    thuocKeNgoai: { getListAllThuocKeNgoai },
  } = useDispatch();
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onSizeChange({ size: 10 });
    if (isThuocChiDinhNgoai) {
      getListAllThuocKeNgoai({ page: "", size: "" });
    } else {
      getDSDichVuTheoLoai({
        dsLoaiDichVu: goiDichVu?.dsLoaiDichVu?.join(","),
        active: true,
      });
    }
    if (goiDichVu?.id != state.currentItem?.id) {
      setState({
        currentIndex: -1,
        currentItem: null,
      });
    }

    getListPhongTongHop({ active: true });
  }, [goiDichVu]);

  const dsDichVuMemo = useMemo(() => {
    return isThuocChiDinhNgoai
      ? listAllThuocKeNgoai.map((item) => ({
          ...item,
          label: item.ten,
          value: item.thuocChiDinhNgoaiId,
        }))
      : listAllDichVu.map((item) => ({
          ...item,
          label: item.ten,
          value: item.dichVuId,
        }));
  }, [listAllDichVu, listAllThuocKeNgoai, isThuocChiDinhNgoai]);

  useEffect(() => {
    setState({ data: listData });
  }, [listData]);

  useEffect(() => {
    setState(DEFAULT_INPUT);
    onChangeInputSearch(DEFAULT_INPUT);
  }, [boChiDinhId]);

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
    } else value = e;
    onChangeInputSearch({
      [key]: value,
    });
    setState({
      [key]: value,
    });
  };

  const onChangeDichVuId = (e) => {
    const key = isThuocChiDinhNgoai ? "thuocChiDinhNgoaiId" : "dichVuId";
    state.currentItem[key] = e;
  };

  const onChange = (key, selector) => (e) => {
    if (key === "dichVuId" && isThuocChiDinhNgoai) {
      key = "thuocChiDinhNgoaiId";
    }

    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (state.currentItem) {
      if (key === "phongId") {
        setState({ currentItem: { ...state.currentItem, phongId: value } });
      } else if (key === "lieuDungId") {
        setState({
          currentItem: {
            ...state.currentItem,
            lieuDungId: value,
            lieuDung: listAllLieuDung?.find((i) => i.id === e),
          },
        });
      } else state.currentItem[key] = value;
    }

    if (selector === "dichVu") {
      getListPhongTongHop({ dichVuId: value, page: "", size: "" });
      if (state.currentItem) {
        setState({ currentItem: { ...state.currentItem, phongId: null } });
      }
    }
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onHandleSizeChange = (size) => {
    onSizeChange({ size: size });
  };
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            state.currentIndex == -1 ? (
              <InputTimeout
                placeholder={t("thuNgan.timTenDichVu")}
                onChange={onSearchInput("dichVu.ten")}
                value={state["dichVu.ten"]}
              />
            ) : null
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item, list, index) => {
        console.log("state.currentItem", state.currentItem);

        if (index === state.currentIndex) {
          return (
            <>
              <Select
                data={dsDichVuMemo}
                dropdownMatchSelectWidth={400}
                placeholder={t("khamBenh.chiDinh.chonDichVu")}
                onSelect={
                  state.currentItem?.id
                    ? onChange("dichVuId", "dichVu")
                    : undefined
                }
                onChange={!state.currentItem?.id ? onChangeDichVuId : undefined}
                mode={!state.currentItem?.id ? "multiple" : undefined}
                value={
                  isThuocChiDinhNgoai
                    ? state.currentItem?.thuocChiDinhNgoaiId
                    : state.currentItem?.dichVuId
                }
              />
              {state?.checkValidate &&
                !state.currentItem?.dichVuId &&
                !state.currentItem?.thuocChiDinhNgoaiId && (
                  <span className="error">
                    {t("khamBenh.chiDinh.vuiLongChonDichVu")}
                  </span>
                )}
            </>
          );
        } else {
          return isThuocChiDinhNgoai && list?.thuocChiDinhNgoai
            ? list?.thuocChiDinhNgoai?.ten
            : item
            ? item.ten
            : list?.thuocChiDinhNgoai?.ten;
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soLuong")}
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuong || 0}
          search={
            state.currentIndex == -1 ? (
              <Input
                placeholder={t("common.timSoLuong")}
                onChange={onSearchInput("soLuong")}
                value={state["soLuong"]}
              />
            ) : null
          }
        />
      ),
      width: "150px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <InputNumber
                placeholder={t("common.nhapSoLuong")}
                style={{ width: "100%" }}
                defaultValue={state.currentItem?.soLuong}
                onChange={onChange("soLuong", "")}
              />
              {state?.checkValidate && state.currentItem?.soLuong === null && (
                <span className="error">{t("common.vuiLongNhapSoLuong")}</span>
              )}
            </>
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.phong")}
          sort_key="phong.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phong.ten"] || 0}
          search={
            state.currentIndex == -1 ? (
              <Input
                placeholder={t("common.timPhong")}
                onChange={onSearchInput("phong.ten")}
                value={state["phong.ten"]}
              />
            ) : null
          }
        />
      ),
      width: "150px",
      dataIndex: "phong",
      key: "phong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              data={listRoom}
              onSelect={onChange("phongId")}
              placeholder={t("common.chonPhong")}
              value={state.currentItem?.phongId}
              dropdownMatchSelectWidth={250}
            />
          );
        } else return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.lieuDungCachDung")}
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["lieuDungId"] || 0}
          searchSelect={
            state.currentIndex == -1 ? (
              <Select
                data={listAllLieuDung}
                placeholder={t("common.chonLieuDung")}
                onChange={onSearchInput("lieuDungId")}
                value={state["lieuDungId"]}
              />
            ) : null
          }
        />
      ),
      width: 200,
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      align: "center",
      render: (record, _, index) => {
        if (state.currentIndex === index) {
          return (
            <Select
              value={state.currentItem?.lieuDungId}
              data={listAllLieuDung}
              disabled={
                !(dsLoaiDichVu || []).some(
                  (x) =>
                    [
                      LOAI_DICH_VU.THUOC,
                      LOAI_DICH_VU.HOA_CHAT,
                      LOAI_DICH_VU.VAT_TU,
                    ].indexOf(x) >= 0
                )
              }
              placeholder={t("common.chonLieuDung")}
              onChange={onChange("lieuDungId")}
            />
          );
        } else {
          const lieuDung = listAllLieuDung?.find((item) => item.id == record);
          return (lieuDung && lieuDung?.ten) || "";
        }
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khongTinhTien || 0}
          searchSelect={
            state.currentIndex == -1 ? (
              <Select
                data={YES_NO}
                placeholder={t("tiepDon.chonTinhTien")}
                onChange={onSearchInput("khongTinhTien")}
                value={state["khongTinhTien"]}
              />
            ) : null
          }
          title={t("tiepDon.khongTinhTien")}
        />
      ),
      width: 150,
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox
              defaultChecked={item}
              onChange={onChange("khongTinhTien")}
            />
          );
        } else return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="tuTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tuTra || 0}
          searchSelect={
            state.currentIndex == -1 ? (
              <Select
                data={YES_NO}
                placeholder={t("common.chonTuTra")}
                onChange={onSearchInput("tuTra")}
                value={state["tuTra"]}
              />
            ) : null
          }
          title={t("common.tuTra")}
        />
      ),
      width: 150,
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("tuTra")} />
          );
        } else return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            state.currentIndex == -1 ? (
              <Select
                data={HIEU_LUC}
                placeholder={t("danhMuc.chonHieuLuc")}
                onChange={onSearchInput("active")}
                value={state["active"]}
              />
            ) : null
          }
          title={t("danhMuc.coHieuLuc")}
        />
      ),
      width: 150,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} />;
      },
    },
  ];
  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        if (state?.currentIndex !== index) {
          let dsDichVu = listAllPhong.filter(
            (item) => item.dichVuId === record?.dichVuId
          );
          let newState = {
            currentItem: JSON.parse(JSON.stringify(record)),
            currentIndex: index,
            listAllDichVuPhong: dsDichVu,
          };
          if (dsDichVu?.length === 1) {
            newState.currentItem = newState.currentItem || {};
            newState.currentItem["phong"] = { ...dsDichVu[0].phong };
            newState.currentItem["phongId"] = dsDichVu[0]?.phongId;
          }
          setState(newState);
        }
      },
    };
  };
  const onAddNewRow = () => {
    let item = { boChiDinhId: boChiDinhId, soLuong: 1 };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      listAllDichVuPhong: listAllPhong,
    });
  };
  const onSave = () => {
    const {
      id,
      boChiDinhId,
      soLuong,
      active,
      tuTra,
      khongTinhTien,
      thuocChiDinhNgoaiId,
      dichVuId,
    } = state.currentItem || {};
    if (!state.currentItem?.soLuong || (!dichVuId && !thuocChiDinhNgoaiId)) {
      setState({
        checkValidate: true,
      });
      return;
    } else {
      setState({
        checkValidate: false,
      });
    }

    if (!id) {
      const payload = (dichVuId || []).map((item) => ({
        boChiDinhId,
        soLuong,
        dichVuId: item,
        phongId: null,
      }));
      createBatch(payload).then(() => {
        setState({
          currentIndex: -1,
          currentItem: null,
        });
        onSizeChange({ size: 10 });
      });
    } else {
      createOrEdit({
        id,
        boChiDinhId,
        soLuong,
        active,
        tuTra,
        khongTinhTien,
        dichVuId,
        thuocChiDinhNgoaiId,
        phongId: state.currentItem?.phongId,
        lieuDungId: state.currentItem?.lieuDungId,
      }).then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
        });
        onSizeChange({ size: 10 });
      });
    }
  };
  refCallbackSave.current = onSave;

  const onCancel = () => {
    setState({
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
      listAllDichVuPhong: listAllPhong,
    });
  };

  return (
    <TabPanel>
      <EditWrapper
        title={t("common.dichVuTrongBo")}
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={goiDichVu?.id && !state.currentItem}
        roleSave={[ROLES["DANH_MUC"].GOI_DICH_VU_THEM]}
      >
        <WrapperDvTrongGoi
          columns={columns}
          dataSource={goiDichVu?.id ? state.data : []}
          onRow={onRow}
        ></WrapperDvTrongGoi>
        {goiDichVu?.id && totalElements ? (
          <Pagination
            listData={goiDichVu?.id ? state.data : []}
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={onHandleSizeChange}
          />
        ) : null}
      </EditWrapper>
    </TabPanel>
  );
}

export default DichVuTrongGoi;
