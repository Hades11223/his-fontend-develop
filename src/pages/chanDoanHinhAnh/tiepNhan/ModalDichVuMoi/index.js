import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Row, Button } from "antd";
import { connect } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import imgSearch from "assets/images/template/icSearch.png";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import InputTimeout from "components/InputTimeout";

const ModalDichVuMoi = (props, ref) => {
  const { t } = useTranslation();
  const refInputTimeout = useRef(null);
  const {
    listDichVuKyThuat,
    onSizeChange,
    onChangeInputSearch,
    onSearch,
    totalElements,
    page,
    size,
    onChangeService,
  } = props;
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1,
  });

  const {
    chiDinhDichVuCls: { tamTinhTien },
  } = useDispatch();
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (state.loaiDichVu)
      onChangeInputSearch({ "dichVu.loaiDichVu": state?.loaiDichVu });
  }, [state.loaiDichVu]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        parentService: data,
        nhomDichVuCap2Id: data?.nhomDichVuCap2Id,
        loaiDichVu: data?.loaiDichVu,
        thanhTien: 0,
        selectedRowKeys: data.dichVuMoiId ? Array(data.dichVuMoiId) : undefined,
      });

      setTimeout(() => {
        refInputTimeout.current && refInputTimeout.current.focus();
      }, 500);
    },
  }));
  const onCancel = () => {
    setState({ show: false });
  };

  const onOk = () => {
    setState({ show: false });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    onChangeService(data);
    onTamTinhTien(data, selectedRowKeys);
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state?.selectedRowKeys,
  };
  const onTamTinhTien = (data, selectedRowKeys) => {
    const payload = data.map((item) => ({
      nbDotDieuTriId: state?.parentService?.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item?.dichVu.ten,
          ma: item?.dichVu.ma,
        },
        dichVuId: item?.dichVu.id,
        soLuong: 1,
        loaiDichVu: item?.dichVu.loaiDichVu,
        khoaChiDinhId: state?.parentService?.khoaChiDinhId,
      },
      chiDinhTuDichVuId: state?.parentService?.id,
      chiDinhTuLoaiDichVu: state?.parentService?.loaiDichVu,
    }));
    tamTinhTien(payload).then((s) => {
      debugger;
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );

      setState({
        thanhTien: thanhTien,
        selectedRowKeys,
      });
    });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      dataIndex: "dichVu",
      key: "dichVu",
      width: "150px",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("common.gia")} />,
      dataIndex: "dichVu",
      key: "dichVu",
      width: "100px",
      align: "left",
      render: (item) => {
        return `${item?.giaKhongBaoHiem} | ${t("khamBenh.chiDinh.BH")}: ${
          item?.giaBaoHiem
        } | ${t("khamBenh.chiDinh.phuThu")}: ${item?.giaPhuThu}`;
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onSearchService = (key) => (e) => {
    onChangeInputSearch({ [key]: e });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  return (
    <ModalStyled
      width={860}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row style={{ background: "#fff", padding: "20px" }}>
          <div className="input-search">
            <img src={imgSearch} alt="imgSearch" />
            <InputTimeout
              ref={refInputTimeout}
              placeholder={t("khamBenh.dsBenhNhan.nhapTenDichVu")}
              onChange={onSearchService("dichVu.ten")}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <div className="table-service">
              <Row className="header-table">
                <div className="header-table__left">{t("common.daChon")}</div>
                <div className="header-table__right">
                  {t("khamBenh.chiDinh.tongTien")}:{" "}
                  {(state?.thanhTien || 0).formatPrice()} {t("common.vnd")}
                </div>
              </Row>
              <TableWrapper
                columns={columns}
                dataSource={listDichVuKyThuat}
                rowSelection={{ type: "radio", ...rowSelection }}
                scroll={{ y: 265 }}
                onRow={() => {
                  return {
                    onClick: (row) => {
                      row.currentTarget.firstChild.firstElementChild.firstElementChild.firstElementChild.click();
                    },
                  };
                }}
                rowKey={(record) => record?.id}
              />
              {!!totalElements ? (
                <Pagination
                  listData={listDichVuKyThuat || []}
                  onChange={onChangePage}
                  current={page + 1}
                  pageSize={size}
                  total={totalElements}
                  onShowSizeChange={handleSizeChange}
                  stylePagination={{ flex: 1, justifyContent: "flex-start" }}
                />
              ) : null}
            </div>
          </div>
          <Row className="footer">
            <Button className="btn-cancel" onClick={onCancel}>
              {t("common.huy")}
            </Button>
            <Button className="btn-save" onClick={onOk}>
              {t("common.dongY")}
            </Button>
          </Row>
        </Row>
      </Main>
    </ModalStyled>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuKyThuat: { totalElements, page, size },
  } = state;
  return {
    listgioiTinh: state.utils.listgioiTinh,
    listDichVuKyThuat: state.dichVuKyThuat.listData,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: { onSizeChange, onChangeInputSearch, onSortChange, onSearch },
}) => ({
  onChangeInputSearch,
  onSizeChange,
  onSortChange,
  onSearch,
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ModalDichVuMoi));
