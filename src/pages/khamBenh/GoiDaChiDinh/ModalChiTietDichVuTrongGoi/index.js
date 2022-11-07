import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Main, ModalStyled } from "./styled";
import { TableWrapper, Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { formatDecimal } from "../../../../utils";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import IconDelete from "assets/images/khamBenh/delete.png";

const ModalChiTietDichVuTrongGoi = (props, ref) => {
  const { t } = useTranslation();
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const [state, _setState] = useState({
    show: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const { dsDichVu, page, size, totalElements } = useSelector(
    (state) => state.nbBoChiDinh
  );
  const {
    nbBoChiDinh: { getListDichVuTrongGoi },
  } = useDispatch();

  const dsDichVuMemo = useMemo(() => {
    return dsDichVu.map((item, idx) => ({
      ...item,
      index: page * size + idx + 1,
    }));
  }, [dsDichVu]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      const { nbDotDieuTriId, id } = data;
      setState({
        show: true,
        nbDotDieuTriId,
        nbBoChiDinhId: id,
      });

      getListDichVuTrongGoi({
        page: 0,
        size: 50,
        nbDotDieuTriId,
        nbBoChiDinhId: id,
        dsTrangThaiHoan: [0, 10, 20],
        chiDinhTuLoaiDichVu: 10,
        chiDinhTuDichVuId: thongTinChiTiet.id,
      });
    },
  }));

  const onSearch = (payload) => {
    getListDichVuTrongGoi({
      nbDotDieuTriId: state.nbDotDieuTriId,
      nbBoChiDinhId: state.nbBoChiDinhId,
      dsTrangThaiHoan: [0, 10, 20],
      chiDinhTuLoaiDichVu: 10,
      chiDinhTuDichVuId: thongTinChiTiet.id,
      ...payload,
    });
  };

  const onClose = () => {
    setState({ show: false });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      width: 250,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} />,
      width: 100,
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
    },
    {
      title: <HeaderSearch title={t("common.thanhTien")} />,
      width: 100,
      dataIndex: "thanhTien",
      key: "thanhTien",
      render: (item) => {
        return item ? formatDecimal(String(item)) : 0;
      },
    },
    {
      title: <HeaderSearch title={t("khamBenh.thoiGianKe")} />,
      width: 100,
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      align: "center",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    },
    {
      title: <HeaderSearch title={t("common.trangThai")} />,
      width: 100,
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiDichVu.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("common.tienIch")} />,
      width: 80,
      align: "center",
      render: (item) => {
        return <img src={IconDelete} onClick={() => {}} alt="" />;
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSearch({ size });
  };

  return (
    <ModalStyled
      width={"90%"}
      visible={state.show}
      footer={null}
      closable={false}
      title={
        <div className="div-title">
          <label className="modal-title">
            {t("khamBenh.chiTietDichVuTrongGoi")}
          </label>
          <CloseOutlined onClick={onClose} />
        </div>
      }
      onCancel={onClose}
    >
      <Main>
        <div className="table-content">
          <TableWrapper
            scroll={{ x: false }}
            columns={columns}
            dataSource={dsDichVuMemo}
          />

          {!!totalElements && (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={dsDichVuMemo}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
            />
          )}
        </div>

        <div className="footer-action"></div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalChiTietDichVuTrongGoi);
