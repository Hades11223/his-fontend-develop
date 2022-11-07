import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ModalTemplate, InputTimeout, Button, Select } from "components";
import { useTranslation } from "react-i18next";
import SelectLoadMore from "components/SelectLoadMore";
import dmGoiDvProvider from "data-access/categories/dm-goi-dv-provider";
import { Main, AddButtonStyled } from "./styled";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import {
  CheckCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { TableWrapper, Pagination } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Radio } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import ModalThemMoiGoi from "../ModalThemMoiGoi";
import { LOAI_DICH_VU_CHI_DINH } from "pages/khamBenh/configs";

const { Column } = TableWrapper;

const ModalThemMoiNguoiBenh = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const refModalThemMoiGoi = useRef(null);
  const [state, _setState] = useState({ addParam: null });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({}, callback) => {
      setState({ show: true });
      refCallback.current = callback;
    },
  }));
  const listLoaiChiDinhDV = useMemo(() => {
    const list = LOAI_DICH_VU_CHI_DINH.map((item) => {
      item.ten = t(item.i18n);
      return item;
    });
    return list;
  }, [t]);
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
      onSizeChange(10);
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const { dataSortColumn, listNbThongTin, totalElements, page, size } =
    useSelector((state) => state.nbThongTin);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const {
    nbThongTin: { onSizeChange, onSortChange, onSearch, onChangeInputSearch },
    nbGoiDv: { onThemNguoiBenh },
  } = useDispatch();

  const listGioiTinhMemo = useMemo(() => {
    return [{ id: "", ten: t("common.tatCa") }, ...(listGioiTinh || [])];
  }, [listGioiTinh]);
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onCreateGoiLieuTrinh = () => {
    refModalThemMoiGoi.current &&
      refModalThemMoiGoi.current.show(
        {
          // loaiDichVu: state.loaiDichVu,
          dsDoiTuongSuDung: [],
          // nbThongTinId: infoPatient.nbThongTinId,
          // nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
          // khoaChiDinhId: currentToDieuTri.khoaChiDinhId,
          // chiDinhTuDichVuId: currentToDieuTri.id,
          currentItem: null,
          chiDinhTuLoaiDichVu: 210,
          listLoaiChiDinhDV: listLoaiChiDinhDV,
        },
        (newId) => {
          setState({ goiDvId: newId, addParam: newId });
        }
      );
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        setState({ nbDotDieuTriId: record.nbDotDieuTriId });
      },
    };
  };
  const onOK = (isOk) => () => {
    if (isOk) {
      onThemNguoiBenh({
        goiDvId: state.goiDvId,
        nbDotDieuTriId: state.nbDotDieuTriId,
      })
        .then((s) => {
          refCallback.current && refCallback.current(s.data);
          setState({ show: false });
        })
        .catch((e) => {});
    } else setState({ show: false });
  };

  const onChange = (type) => (value) => {
    setState({ [type]: value });
  };
  const columns = [
    Column({
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (value, item) => {
        return <Radio checked={item.nbDotDieuTriId == state.nbDotDieuTriId} />;
      },
    }),
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: t("common.stt"),
    }),
    Column({
      title: t("common.maNb"),
      sort_key: "maNb",
      dataSort: dataSortColumn["maNb"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "maNb",
      key: "maNb",
      i18Name: t("common.maNb"),
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapMaNguoiBenh")}
          type="number"
          onChange={(e) => {
            onChangeInputSearch({ maNb: e });
          }}
        />
      ),
    }),
    Column({
      title: t("common.tenNb"),
      sort_key: "tenNb",
      dataSort: dataSortColumn["tenNb"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapTenNguoiBenh")}
          onChange={(e) => {
            onChangeInputSearch({ tenNb: e });
          }}
        />
      ),
    }),
    Column({
      title: t("common.gioiTinh"),
      sort_key: "tenNb",
      dataSort: dataSortColumn["gioiTinh"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      align: "left",
      selectSearch: true,
      renderSearch: (
        <Select
          data={listGioiTinhMemo}
          placeholder={t("common.chonGioiTinh")}
          onChange={(value) => {
            onChangeInputSearch({ gioiTinh: value });
          }}
        ></Select>
      ),
      render: (value) => {
        return listGioiTinh?.find((item) => item.id == value)?.ten || "";
      },
    }),
    Column({
      title: t("common.ngaySinh"),
      sort_key: "ngaySinh",
      dataSort: dataSortColumn["ngaySinh"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      align: "left",
      i18Name: t("common.ngaySinh"),
      render: (field, item, index) => {
        return <div>{item?.ngaySinh?.toDateObject().format("dd/MM/YYYY")}</div>;
      },
    }),
    Column({
      title: t("common.diaChiNguoiBenh"),
      sort_key: "namSinh",
      dataSort: dataSortColumn["diaChi"] || "",
      onClickSort: onClickSort,
      width: "300px",
      dataIndex: "diaChi",
      key: "diaChi",
      align: "left",
      i18Name: t("common.diaChiNguoiBenh"),
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapDiaChi")}
          onChange={(e) => {
            onChangeInputSearch({ diaChi: e });
          }}
        />
      ),
    }),
  ];
  const onShowSizeChange = (size) => {
    onSizeChange({ size });
  };

  //   const rowSelection = {
  //     columnTitle: Column({ title: "" }),
  //     columnWidth: 40,
  //   };
  return (
    <ModalTemplate
      width={"1000px"}
      ref={refModal}
      title={t("goiDichVu.themMoiNguoiBenhApDungGoi")}
      closeable={false}
      onCancel={onOK(false)}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<CheckCircleOutlined />}
          iconHeight={15}
          onClick={onOK(true)}
        >
          {t("common.xacNhan")}
        </Button>
      }
    >
      <Main>
        <div className="chon-goi">
          <div className="label">
            {t("goiDichVu.chonGoiApDung")} <span className="require">*</span>
          </div>
          <SelectLoadMore
            api={dmGoiDvProvider.searchAll}
            mapData={(i) => ({
              value: i.id,
              label: i.ten,
            })}
            limit={10}
            listHeight={150}
            addParam={state.addParam}
            value={state.goiDvId}
            keySearch={"ten"}
            placeholder={t("goiDichVu.timGoiApDung")}
            onChange={onChange("goiDvId")}
            className="select-chon-goi"
            allowClear={true}
            suffixIcon={<SearchOutlined />}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <AddButtonStyled>
                  <Button
                    leftIcon={<PlusCircleOutlined />}
                    type={"success"}
                    onClick={onCreateGoiLieuTrinh}
                  >
                    {t("goiDichVu.themMoiGoi")}
                  </Button>
                </AddButtonStyled>
              </>
            )}
          />
        </div>
        <div className="label">{t("goiDichVu.chonNguoiBenhApDung")}</div>
        <TableWrapper
          columns={columns}
          dataSource={listNbThongTin}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          scroll={{ x: 1000 }}
          tableName="table_GOIDV_DanhSachNguoiBenh"
          rowClassName={(record) =>
            record.nbDotDieuTriId === state.nbDotDieuTriId
              ? "item-selected"
              : ""
          }
          //   rowSelection={rowSelection}
        />
        {!!totalElements && (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listNbThongTin}
            total={totalElements}
            onShowSizeChange={onShowSizeChange}
          />
        )}

        <ModalThemMoiGoi ref={refModalThemMoiGoi} />
      </Main>
    </ModalTemplate>
  );
});
export default ModalThemMoiNguoiBenh;
