import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Checkbox, DatePicker, Tooltip } from "antd";
import { Main } from "./styled";
import { InputTimeout, ModalTemplate, Select, TableWrapper } from "components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { firstLetterWordUpperCase } from "utils";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import IcEdit from "assets/svg/noiTru/ic-edit.svg";
import ModalChuyenDichVuGoiMo from "../ModalChuyenDichVuGoiMo";
import { refConfirm } from "app";
import IcBoDv from "assets/images/noiTru/IcBoDv.png";
import IcAdd from "assets/svg/noiTru/ic-add.svg";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

const { Column } = TableWrapper;

const ModalChiTietDichVuTrongGoi = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refModalChuyenDichVuGoiMo = useRef(null);
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});
  const { getChiTietDvTrongGoi, updateDichVuNbGoiPTTT } =
    useDispatch().chiDinhGoiPTTT;
  const { getListKhoaTongHop } = useDispatch().khoa;

  const { dsDvTrongGoiNb } = useSelector((state) => state.chiDinhGoiPTTT);
  const { listDataTongHop } = useSelector((state) => state.khoa);

  const [state, _setState] = useState({
    show: false,
    currentItem: null,
    isExpand: true,
    searchLocal: {
      tenDichVu: null,
      thanhTien: null,
      giaKhongBaoHiem: null,
      giaBaoHiem: null,
      thoiGianThucHien: null,
      thoiGianYLenh: null,
      tenPhongThucHien: null,
      khoaChiDinhId: null,
    },
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: ({ currentItem, nbGoiPtTtId, nbDotDieuTriId }) => {
      setState({ show: true, currentItem, nbGoiPtTtId, nbDotDieuTriId });

      getChiTietDvTrongGoi({
        nbDotDieuTriId,
        nbGoiPtTtId,
      });
    },
  }));

  const dsDvTrongGoiNbMemo = useMemo(() => {
    let dsDvTrongGoiNbFilter = dsDvTrongGoiNb;

    Object.keys(state.searchLocal).forEach((key) => {
      if (!!state.searchLocal[key]) {
        let valueText = state.searchLocal[key];

        if (["tenDichVu", "tenPhongThucHien"].includes(key)) {
          valueText = state.searchLocal[key]?.trim().toLowerCase().unsignText();

          dsDvTrongGoiNbFilter = dsDvTrongGoiNbFilter.filter(
            (option) =>
              option[key]?.toLowerCase().unsignText().indexOf(valueText) >= 0
          );
        }

        if (
          [
            "thanhTien",
            "giaKhongBaoHiem",
            "giaBaoHiem",
            "khoaChiDinhId",
          ].includes(key)
        ) {
          dsDvTrongGoiNbFilter = dsDvTrongGoiNbFilter.filter(
            (option) => option[key] == state.searchLocal[key]
          );
        }

        if (
          ["thoiGianThucHien", "thoiGianYLenh"].includes(key) &&
          state.searchLocal[key] instanceof moment
        ) {
          dsDvTrongGoiNbFilter = dsDvTrongGoiNbFilter.filter((option) =>
            state.searchLocal[key].isSame(moment(option[key]), "day")
          );
        }
      }
    });

    return [
      {
        ...state.currentItem,
        index: undefined,
        tenDichVu: state.currentItem?.tenGoiPtTt,
        isTitle: true,
      },
      {
        tenDichVu: "Các dịch vụ, hàng hóa trong gói",
        isGroup: true,
        id: -1,
        thanhTien: state.currentItem?.tongThanhTien || 0,
      },
      ...(state.isExpand
        ? (dsDvTrongGoiNbFilter || []).map((item, idx) => ({
            ...item,
            index: idx + 1,
          }))
        : []),
    ];
  }, [dsDvTrongGoiNb, state.searchLocal, state.currentItem, state.isExpand]);

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  useEffect(() => {
    getListKhoaTongHop({});
  }, []);
  const gioiTinh =
    (listgioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};

  const onCancel = () => {
    setState({
      show: false,
      currentItem: null,
      isExpand: true,
      searchLocal: {
        tenDichVu: null,
        thanhTien: null,
        giaKhongBaoHiem: null,
        giaBaoHiem: null,
        thoiGianThucHien: null,
        thoiGianYLenh: null,
        tenPhongThucHien: null,
        khoaChiDinhId: null,
      },
    });
  };

  const refreshList = () => {
    const { nbDotDieuTriId, nbGoiPtTtId } = state;

    getChiTietDvTrongGoi({
      nbDotDieuTriId,
      nbGoiPtTtId,
    });
  };

  let tuoi =
    infoPatient?.thangTuoi > 36 || infoPatient?.tuoi
      ? `${infoPatient?.tuoi} ${t("common.tuoi")}`
      : `${infoPatient?.thangTuoi} ${t("common.thang")}`;

  const onDoiGoiMo = (item) => () => {
    refModalChuyenDichVuGoiMo.current &&
      refModalChuyenDichVuGoiMo.current.show({ id: item.id }, () => {
        refreshList();
      });
  };

  const onDeleteDichVu = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `Bạn có chắc chắn muốn xóa ${item.tenDichVu}`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          updateDichVuNbGoiPTTT([
            {
              id: item.id,
              nbGoiPtTtId: null,
            },
          ]).then(() => {
            refreshList();
          });
        }
      );
  };

  const onSearch = (key) => (e) => {
    setState({
      searchLocal: { ...state.searchLocal, [key]: e },
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
      title: "Tên dịch vụ",
      width: "300px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "quanLyNoiTru.goiPttt.tenGoiPtTt",
      renderSearch: (
        <InputTimeout
          value={state.searchLocal.tenDichVu}
          placeholder="Tìm kiếm"
          onChange={onSearch("tenDichVu")}
        />
      ),
      render: (item, list, index) => (
        <span
          style={list?.isGroup ? { fontStyle: "italic" } : {}}
          onClick={() =>
            list?.isGroup && setState({ isExpand: !state.isExpand })
          }
        >
          {list?.isGroup && (
            <span style={{ marginRight: 5 }}>
              {state.isExpand ? <CaretDownOutlined /> : <CaretRightOutlined />}
            </span>
          )}
          {item}
        </span>
      ),
    }),
    Column({
      title: t("common.thanhTien"),
      width: "120px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      i18Name: "common.thanhTien",
      renderSearch: (
        <InputTimeout
          value={state.searchLocal.thanhTien}
          placeholder="Tìm kiếm"
          onChange={onSearch("thanhTien")}
        />
      ),
      render: (item, list, index) => {
        return (
          <div style={list?.isGroup ? { fontStyle: "italic" } : {}}>
            {item?.formatPrice() || ""}
          </div>
        );
      },
    }),
    Column({
      title: t("common.soLuong"),
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      i18Name: "common.soLuong",
    }),
    Column({
      title: "Giá không BH",
      width: "120px",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      align: "right",
      i18Name: "common.giaKhongBaoHiem",
      renderSearch: (
        <InputTimeout
          value={state.searchLocal.giaKhongBaoHiem}
          placeholder="Tìm kiếm"
          onChange={onSearch("giaKhongBaoHiem")}
        />
      ),
      render: (item) => {
        return item?.formatPrice();
      },
    }),
    Column({
      title: "Giá BH",
      width: "120px",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      align: "right",
      i18Name: "common.giaBaoHiem",
      renderSearch: (
        <InputTimeout
          value={state.searchLocal.giaBaoHiem}
          placeholder="Tìm kiếm"
          onChange={onSearch("giaBaoHiem")}
        />
      ),
      render: (item) => {
        return item?.formatPrice();
      },
    }),
    Column({
      title: "Giá Phụ thu",
      width: "120px",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      align: "right",
      i18Name: "common.giaPhuThu",
      render: (item) => {
        return item?.formatPrice();
      },
    }),
    Column({
      title: "Không tính tiền",
      width: "80px",
      align: "center",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      i18Name: "common.khongTinhTien",
      render: (item, list, index) =>
        list?.isGroup || list?.isTitle ? null : <Checkbox checked={item} />,
    }),
    Column({
      title: "Tự trả",
      width: "80px",
      align: "center",
      dataIndex: "tuTra",
      key: "tuTra",
      i18Name: "common.tuTra",
      render: (item, list, index) =>
        list?.isGroup || list?.isTitle ? null : <Checkbox checked={item} />,
    }),
    Column({
      title: "Thời gian thực hiện",
      width: "160px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "common.thoiGianThucHien",
      selectSearch: true,
      renderSearch: (
        <DatePicker
          placeholder="Tìm kiếm"
          format="DD/MM/YYYY"
          onChange={onSearch("thoiGianThucHien")}
        />
      ),
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: "Thời gian y lệnh",
      width: "160px",
      dataIndex: "thoiGianYLenh",
      key: "thoiGianYLenh",
      i18Name: "common.thoiGianYLenh",
      selectSearch: true,
      renderSearch: (
        <DatePicker
          placeholder="Tìm kiếm"
          format="DD/MM/YYYY"
          onChange={onSearch("thoiGianYLenh")}
        />
      ),
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: "Phòng thực hiện",
      width: "200px",
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      i18Name: "common.tenPhongThucHien",
      renderSearch: (
        <InputTimeout
          placeholder="Tìm kiếm"
          value={state.searchLocal.tenPhongThucHien}
          onChange={onSearch("tenPhongThucHien")}
        />
      ),
    }),
    Column({
      title: "Khoa chỉ định",
      width: "220px",
      dataIndex: "khoaChiDinhId",
      key: "khoaChiDinhId",
      i18Name: "common.khoaChiDinhId",
      selectSearch: true,
      renderSearch: (
        <Select
          data={listDataTongHop || []}
          placeholder="Tìm kiếm"
          onChange={onSearch("khoaChiDinhId")}
        />
      ),
      render: (item) =>
        (listDataTongHop || []).find((x) => x.id == item)?.ten || "",
    }),
    Column({
      title: t("common.tienIch"),
      width: "80px",
      align: "center",
      fixed: "right",
      i18Name: "common.tienIch",
      render: (item, list, index) => {
        return list?.isGroup ? null : (
          <div className="ic-action">
            {list?.isTitle && (
              <Tooltip title={`Thêm dịch vụ vào gói`}>
                <Icon
                  className="ic-edit"
                  component={IcAdd}
                  onClick={props?.onAddDichVuVaoGoi({ id: list?.id })}
                />
              </Tooltip>
            )}
            {!list?.isTitle && (
              <Tooltip title={`Chỉnh sửa dịch vụ`}>
                <Icon
                  className="ic-edit"
                  component={IcEdit}
                  onClick={onDoiGoiMo(item)}
                />
              </Tooltip>
            )}
            {!list?.isTitle && (
              <Tooltip title={`Bỏ dịch vụ ra khỏi gói`}>
                <img src={IcBoDv} alt="" onClick={onDeleteDichVu(item)} />
              </Tooltip>
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <ModalTemplate
      width={"95%"}
      ref={refModal}
      zIndex={1000}
      title={"Các dịch vụ, hàng hóa trong gói"}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(infoPatient?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {tuoi && <span className="normal-weight">- {tuoi}</span>}
        </>
      }
      onCancel={onCancel}
    >
      <Main>
        <TableWrapper
          columns={columns}
          dataSource={dsDvTrongGoiNbMemo}
          rowKey={(record) => record.id}
          styleWrap={{ height: 500 }}
        />

        <ModalChuyenDichVuGoiMo ref={refModalChuyenDichVuGoiMo} />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChiTietDichVuTrongGoi);
