import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { ModalTemplate, Pagination, TableWrapper } from "components";
import Button from "pages/kho/components/Button";
import { Main } from "./styled";
import IcAdd from "assets/svg/hoSoBenhAn/ic-add.svg";
import IconEdit from "assets/svg/ic-edit.svg";
import IconDelete from "assets/svg/kho/delete.svg";
import { useStore } from "hook";
import { combineSort, firstLetterWordUpperCase } from "utils";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import moment from "moment";
import IcEye from "assets/svg/ic-eye.svg";
import { HOTKEY } from "constants/index";
import { useDispatch } from "react-redux";
import { refConfirm } from "app";
import ModalScanPrint from "../ModalScanPrint";
const { Column } = TableWrapper;
const ModalDanhSachBieuMauScan = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
    data: [],
    dataSortColumn: {},
    dataSearch: {
      page: 0,
      size: 10,
    },
  });
  const {
    hoSoBenhAn: { getDsScan, deleteFileScan },
  } = useDispatch();
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  const refModal = useRef(null);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan", {});
  const refModalAddBieuMau = useRef();
  const refModalScan = useRef();
  useImperativeHandle(ref, () => ({
    show: async ({ refModalBieuMauScan, refModalScanPrint }, callBack) => {
      const data = await search(state.dataSearch.page, state.dataSearch.size);
      setState({
        show: true,
      });
      refModalAddBieuMau.current = refModalBieuMauScan;
      refModalScan.current = refModalScanPrint;
    },
  }));
  const onOk = (isOk) => () => {
    if (isOk) {
    } else {
      setState({
        show: false,
        dataSearch: {
          page: 0,
          size: 10,
        },
        dataSortColumn: {},
      });
    }
  };

  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOk(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOk(true)();
      },
    },
  ];
  const onClickSort = (key, value) => {
    const sort = { ...state.dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
    search(state.dataSearch.page, state.dataSearch.size, sort);
  };
  const handleEdit = (item) => {
    setState({
      show: false,
    });
    refModalAddBieuMau.current &&
      refModalAddBieuMau.current.show({
        item: { ...item },
      });
  };
  const handleDelete = (item) => {
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
          deleteFileScan(item.id).then((s) => {
            search(
              state.dataSearch.page,
              state.dataSearch.size,
              state.dataSortColumn
            );
          });
        }
      );
  };
  const onShowModalAdd = () => {
    setState({
      show: false,
    });
    refModalAddBieuMau.current &&
      refModalAddBieuMau.current.show({
        refModalScanPrint: refModalScan.current,
      });
  };
  const handleView = (item) => {
    refModalScan.current && refModalScan.current.show(item.dsDuongDan);
  };
  const columns = [
    Column({
      title: t("hsba.maBieuMau"),
      sort_key: "maBaoCao",
      dataSort: state.dataSortColumn["maBaoCao"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "maBaoCao",
      key: "maBaoCao",
      i18Name: "hsba.maBieuMau",
      align: "left",
    }),
    Column({
      title: t("hsba.tenBieuMau"),
      sort_key: "tenBaoCao",
      dataSort: state.dataSortColumn["tenBaoCao"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenBaoCao",
      key: "tenBaoCao",
      i18Name: "hsba.tenBieuMau",
      align: "left",
    }),
    Column({
      title: t("hsba.thoiGianThucHien"),
      sort_key: "thoiGianCoKetQua",
      dataSort: state.dataSortColumn["thoiGianCoKetQua"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "thoiGianCoKetQua",
      key: "thoiGianCoKetQua",
      i18Name: "hsba.thoiGianThucHien",
      align: "left",
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY hh:mm") : "";
      },
    }),
    Column({
      title: t("hsba.ghiChu"),
      sort_key: "moTa",
      dataSort: state.dataSortColumn["moTa"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "moTa",
      key: "moTa",
      i18Name: "hsba.ghiChu",
      align: "left",
      render: (item) => {
        return item || "";
      },
    }),
    Column({
      title: t("common.tienIch"),
      dataIndex: "id",
      key: 4,
      align: "center",
      i18Name: "common.tienIch",
      width: 100,
      render: (field, item) => {
        return (
          <span className="action">
            <IcEye
              style={{ width: 20, height: 20 }}
              className="ic-action"
              onClick={() => handleView(item)}
            />
            <IconEdit
              style={{
                width: 20,
                height: 20,
                margin: "0 10px",
                fill: "#2F80ED",
              }}
              onClick={() => handleEdit(item)}
            ></IconEdit>
            <IconDelete
              style={{ width: 20, height: 20 }}
              onClick={() => handleDelete(item)}
            ></IconDelete>
          </span>
        );
      },
    }),
  ];
  const onChangePage = (page) => {
    setState({
      dataSearch: {
        ...state.dataSearch,
        page: page - 1,
      },
    });
    search(page - 1, state.dataSearch.size);
  };
  const onSizeChange = (size) => {
    setState({
      dataSearch: {
        ...state.dataSearch,
        size: size,
      },
    });
    search(state.dataSearch.page, size);
  };
  const search = async (page, size, sort) => {
    if (thongTinBenhNhan.id) {
      const data = await getDsScan({
        nbDotDieuTriId: thongTinBenhNhan.id,
        sort: combineSort(sort || state.dataSortColumn),
        ...state.dataSearch,
        page,
        size,
      });
      setState({
        data: data.data,
        totalElements: data.totalElements,
      });
    }
  };
  useEffect(() => {
    if (state.show) {
      refModal.current.show();
    } else {
      refModal.current.hide();
    }
  }, [state.show]);
  return (
    <ModalTemplate
      closable={true}
      ref={refModal}
      onCancel={onOk(false)}
      hotKeys={hotKeys}
      rightTitle={
        <span style={{ marginRight: "10px" }}>
          <span className="normal-weight">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}{" "}
          </span>{" "}
          -{" "}
          {thongTinBenhNhan?.tuoi && (
            <span className="normal-weight">
              {thongTinBenhNhan?.tuoi} {t("common.tuoi")}
            </span>
          )}
        </span>
      }
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
        >
          {t("common.quayLai")} [ESC]
        </Button.Text>
      }
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{t("hsba.danhSachBieuMauScan")}</span>
          <IcAdd
            style={{ marginLeft: "10px" }}
            onClick={onShowModalAdd}
          ></IcAdd>
        </div>
      }
      width={1200}
    >
      <Main>
        <TableWrapper
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={state.data}
          tableName="table_HSBA_bieuMauScan"
          styleWrap={{ height: 350 }}
        />
        <Pagination
          onChange={onChangePage}
          current={state.dataSearch.page + 1}
          pageSize={state.dataSearch.size}
          total={state.totalElements}
          listData={state.data}
          onShowSizeChange={onSizeChange}
        />
      </Main>
    </ModalTemplate>
  );
};
export default forwardRef(ModalDanhSachBieuMauScan);
