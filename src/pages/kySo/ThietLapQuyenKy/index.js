import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Col, Input, Form } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ROLES,
} from "constants/index";
import { Main, MainChiTiet, MainPage } from "./styled";
import { checkRole } from "utils/role-utils";
import ThongTinThietLapQuyenKy from "./ThongTinThietLapQuyenKy";
import IcCreate from "assets/images/kho/IcCreate.png";
import { ModalNotification2 } from "components/ModalConfirm";
import { debounce } from "lodash";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
const ThietLapQuyenKy = () => {
  const refConfirmXoaRow = useRef(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { listData } = useStore("thietLapQuyenKy", []);
  const { dataEditDefault, dataSortColumn } = useStore("thietLapQuyenKy", {});
  const { totalElements, page, size } = useStore("thietLapQuyenKy", null);

  const { getListAllQuyenKy } = useDispatch().quyenKy;
  const { getListAllNhanVien } = useDispatch().nhanVien;
  const {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    delete: deleteThietLap,
  } = useDispatch().thietLapQuyenKy;
  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnSave = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    let param = { active: true, size: "", page: "" };
    onSizeChange({ size: 10 });
    getListAllQuyenKy(param);
    getListAllNhanVien(param);
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      mauBaoCao: null,
      defaultFileList: [],
      invalidMauBaoCao: false,
    });
    updateData({ dataEditDefault: {} });
    form.resetFields();
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    setState({
      mauBaoCao: data.mauBaoCao,
      editStatus: true,
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const debounceFunc = useCallback(
    debounce(
      (key, value) =>
        onChangeInputSearch({
          [key]: value,
        }),
      500
    ),
    []
  );

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    debounceFunc(key, value);
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onDeletePhieu = (item) => {
    deleteThietLap(item?.id)
      .then((s) => {
        // setTimeout(() => history.push("/kho/nhap-kho"), 200);
      })
      .catch(() => {});
  };
  const onShowModalConfirmXoaPhieu = (item) => () => {
    refConfirmXoaRow.current &&
      refConfirmXoaRow.current.show(
        {
          title: t("common.canhBao"),
          content: `${t("kySo.xoaTaiKhoan")} ${item?.nhanVien?.ma}?`,
          cancelText: t("common.dong"),
          okText: t("common.xoa"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeletePhieu(item);
        },
        () => {}
      );
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "70px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.tenVaiTro")}
          sort_key="vaiTro.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["vaiTro.ten"] || 0}
          search={
            <Input
              placeholder={t("kySo.timTenVaiTro")}
              onChange={onSearchInput("vaiTro.ten")}
            />
          }
        />
      ),
      render: (item) => {
        return item?.vaiTro?.ten;
      },
      width: "120px",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.tenTaiKhoan")}
          sort_key="nhanVien.taiKhoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhanVien.taiKhoan"] || 0}
          search={
            <Input
              placeholder={t("kySo.timTenTaiKhoan")}
              onChange={onSearchInput("nhanVien.taiKhoan")}
            />
          }
        />
      ),
      render: (item) => {
        return item?.nhanVien?.taiKhoan;
      },
      width: "120px",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.hoTenNhanVien")}
          sort_key="nhanVien.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhanVien.ten"] || 0}
          search={
            <Input
              placeholder={t("kySo.timHoTenNhanVien")}
              onChange={onSearchInput("nhanVien.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.nhanVien?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.quyenKy")}
          sort_key="quyenKy.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyenKy.ten"] || 0}
          search={
            <Input
              placeholder={t("kySo.timQuyenKy")}
              onChange={onSearchInput("quyenKy.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.quyenKy?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.khoaChiDinh")}
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaChiDinh.ten"] || 0}
          search={
            <Input
              placeholder={t("kySo.timKhoaChiDinh")}
              onChange={onSearchInput("khoaChiDinh.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.khoaChiDinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.khoaThucHien")}
          sort_key="khoaThucHien.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaThucHien.ten"] || 0}
          search={
            <Input
              placeholder={t("kySo.timKhoaThucHien")}
              onChange={onSearchInput("khoaThucHien.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.khoaThucHien?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("common.xoa")} />,
      render: (item) => {
        return (
          <img
            style={{
              marginLeft: 10,
              marginBottom: 5,
              cursor: "pointer",
              height: 15,
              width: 15,
              objectFit: "contain",
            }}
            src={require("assets/images/utils/delete-red.png")}
            alt=""
            onClick={onShowModalConfirmXoaPhieu(item)}
          />
        );
      },
      align: "center",
      width: "50px",
    },
  ];

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  return (
    <Main>
      <MainPage
        breadcrumb={[
          { title: t("kySo.kySo"), link: "/ky-so" },
          {
            title: t("kySo.thietLapQuyenKy"),
            link: "/ky-so/thiet-lap-quyen-ky",
          },
        ]}
      >
        <Col
          {...(collapseStatus ? TABLE_LAYOUT_COLLAPSE : { xl: 16, xxl: 16 })}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title={t("kySo.thietLapQuyenKy")}
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
            rowKey={(record) => {
              return record.id;
            }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              paddingRight: 50,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM]) && [
                {
                  type: "create",
                  title: `${t("common.themMoi")} [F1]`,
                  onClick: handleClickedBtnAdded,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: "btn-collapse",
                  title: (
                    <img
                      src={require(`assets/images/utils/double-arrow-${
                        collapseStatus ? "right" : "left"
                      }.png`)}
                      alt="btn-collapse"
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            }
            columns={columns}
            dataSource={listData}
            onRow={onRow}
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
          />
          {totalElements ? (
            <Pagination
              listData={listData}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </Col>
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : { xl: 8, xxl: 8 })}
          className={`mt-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <MainChiTiet>
            <ThongTinThietLapQuyenKy
              refCallbackSave={refClickBtnSave}
            ></ThongTinThietLapQuyenKy>
          </MainChiTiet>
        </Col>
      </MainPage>
      <ModalNotification2 ref={refConfirmXoaRow} />
    </Main>
  );
};

export default ThietLapQuyenKy;
