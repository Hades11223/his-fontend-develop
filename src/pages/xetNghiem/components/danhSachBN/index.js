import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Input, Checkbox, Popover } from "antd";
import { TableWrapper, Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import MainTable from "../../components/tableXetNghiem";
import { TRANG_THAI_HHSH_GPB, TRANG_THAI_LAY_MAU_BN } from "constants/index";
import IconDropDown from "assets/images/xetNghiem/icDropDown.png";
import "./style.css";
import { useTranslation } from "react-i18next";

let timer = null;
const DanhSachBN = ({ layerId }) => {
  const { t } = useTranslation();

  const refInputMaHs = useRef(null);
  const {
    nbXetNghiem: {
      listData,
      totalElements,
      page,
      size,
      dataSortColumn,
    },
    layMauXN: { nbDotDieuTriId },
    xnHuyetHocSinhHoa: { nbDotDieuTriId: nbDotDieuTriIdHHSH },
    xnGiaiPhauBenhViSinh: { nbDotDieuTriId: nbDotDieuTriIdGPB },
  } = useSelector((state) => state);
  const {
    nbXetNghiem: {
      getBNXetNghiem,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
    },
    layMauXN: { updateData: updateDataTiepNhanXN, onChangeInputSearchDSDV },
    xnHuyetHocSinhHoa: {
      updateData: updateDataXNHuyetHocSinhHoa,
      onChangeInputSearchDSDV: onChangeInputSearchDSDVHHSH,
    },
    xnGiaiPhauBenhViSinh: {
      updateData: updateDataGPB,
      onChangeInputSearchDSDV: onChangeInputSearchDSDVGPB,
    },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const location = useLocation();
  const { pathname } = location;
  const paramCheck = ["/xet-nghiem/lay-mau"].includes(window.location.pathname);
  const [state, _setState] = useState({ value: [], data: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 113, //F3
          onEvent: () => {
            refInputMaHs.current && refInputMaHs.current.focus();
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    setState({
      data: listData,
    });
  }, [listData, page, size]);

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "dsTrangThai") {
      if (!value.length) {
        value = paramCheck
          ? TRANG_THAI_LAY_MAU_BN.reduce((arr, cur) => [...arr, cur.value], [])
          : TRANG_THAI_HHSH_GPB.reduce((arr, cur) => [...arr, cur.value], []);
      }
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
      if (key === "dsTrangThai") {
        if (paramCheck) {
          if (nbDotDieuTriId) {
            onChangeInputSearchDSDV({ nbDotDieuTriId, dsTrangThai: value });
          } else {
            updateDataTiepNhanXN({ listServices: [], dsTrangThai: value });
          }
        } else if (
          ["/xet-nghiem/sinh-hoa-huyet-hoc"].includes(window.location.pathname)
        ) {
          if (nbDotDieuTriIdHHSH) {
            onChangeInputSearchDSDVHHSH({
              nbDotDieuTriId: nbDotDieuTriIdHHSH,
              dsTrangThai: value,
            });
          } else {
            updateDataXNHuyetHocSinhHoa({
              listServices: [],
              dsTrangThai: value,
            });
          }
        } else {
          if (nbDotDieuTriIdGPB) {
            onChangeInputSearchDSDVGPB({
              nbDotDieuTriId: nbDotDieuTriIdGPB,
              dsTrangThai: value,
            });
          } else {
            updateDataGPB({ listServices: [], dsTrangThai: value });
          }
        }
      }
    }, 300);
  };

  const content = (data, defaultValue) => (
    <Checkbox.Group
      options={data}
      defaultValue={defaultValue}
      onChange={onSearchInput("dsTrangThai")}
    />
  );

  const renderHeaderRight = () => {
    if (paramCheck) {
      return (
        <Popover
          content={content(
            TRANG_THAI_LAY_MAU_BN.map((item) => {
              if (item.i18n) item.label = t(item.i18n);
              return item;
            }),
            state.value
          )}
          placement="bottomRight"
        >
          <img src={IconDropDown} alt="IconDropDown" />
        </Popover>
      );
    } else {
      return (
        <Popover
          content={content(
            TRANG_THAI_HHSH_GPB.map((item) => {
              if (item.i18n) item.label = t(item.i18n);
              return item;
            }),
            [66]
          )}
          placement="bottomRight"
        >
          <img src={IconDropDown} alt="IconDropDown" />
        </Popover>
      );
    }
  };
  const handleChangePage = (page) => {
    getBNXetNghiem({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHs")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              ref={refInputMaHs}
              placeholder={t("common.nhapMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenNb")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.nhapTenNb")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
  ];
  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        if (pathname.includes("/lay-mau")) {
          updateDataTiepNhanXN({
            nbDotDieuTriId: id,
          });
        }
        if (pathname.includes("/sinh-hoa-huyet-hoc")) {
          updateDataXNHuyetHocSinhHoa({
            nbDotDieuTriId: id,
          });
        }

        if (pathname.includes("/giai-phau-benh-vi-ky-sinh")) {
          updateDataGPB({
            nbDotDieuTriId: id,
            infoDichVu: {},
          });
        }
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    if (paramCheck) {
      idDiff = nbDotDieuTriId;
    } else if (
      ["/xet-nghiem/sinh-hoa-huyet-hoc"].includes(window.location.pathname)
    ) {
      idDiff = nbDotDieuTriIdHHSH;
    } else {
      idDiff = nbDotDieuTriIdGPB;
    }
    return record.id === idDiff ? "row-actived" : "";
  };

  return (
    <MainTable
      contentHeaderLeft={t("xetNghiem.danhSachNguoiBenh")}
      contentHeaderRight={renderHeaderRight()}
    >
      <TableWrapper
        columns={columns}
        dataSource={state.data}
        onRow={onRow}
        rowKey={(record) => `${record.id}-${record.tenNb}`}
        rowClassName={setRowClassName}
      />
      {totalElements > 0 && (
        <Pagination
          onChange={handleChangePage}
          current={page + 1}
          pageSize={size}
          listData={state.data}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </MainTable>
  );
};

export default DanhSachBN;
