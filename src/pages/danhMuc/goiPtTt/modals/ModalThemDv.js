import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { InputTimeout, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import { ThemDvStyled } from "./styled";
import { TableWrapper, HeaderSearch, Pagination, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { LOAI_DICH_VU } from "constants/index";
import { Checkbox } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { difference, union } from "lodash";

const ModalThemDv = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refInputTimeout = useRef(null);

  const { themDvChung } = useDispatch().goiPtttChiTiet;
  const { onSearch, onChangeInputSearch, onSizeChange } = useDispatch().dichVu;
  const { listAllDichVu, totalElements, page, size } = useSelector(
    (state) => state.dichVu
  );

  //state
  const [state, _setState] = useState({
    show: false,
    isCheckedAll: false,
    selectedRowKeys: [],
    goiPtTtId: null,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useEffect(() => {
    if (listAllDichVu) {
      setState({
        isCheckedAll:
          difference(
            listAllDichVu.map((x) => x.id),
            state.selectedRowKeys
          ).length === 0,
      });
    }
  }, [listAllDichVu]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        isCheckedAll: false,
        selectedRowKeys: [],
        goiPtTtId: data?.goiPtTtId || null,
      });

      refInputTimeout.current && refInputTimeout.current.setValue("");

      onChangeInputSearch({
        dsLoaiDichVu: [
          LOAI_DICH_VU.KHAM,
          LOAI_DICH_VU.XET_NGHIEM,
          LOAI_DICH_VU.CDHA,
          LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
          LOAI_DICH_VU.THUOC,
          LOAI_DICH_VU.VAT_TU,
          LOAI_DICH_VU.HOA_CHAT,
          LOAI_DICH_VU.CHE_PHAM_MAU,
          LOAI_DICH_VU.GIUONG,
        ],
        ten: "",
      });
    },
  }));

  const onClose = () => {
    setState({ show: false });
  };

  const onRow = (record, index) => {
    return {
      onClick: () => {},
    };
  };

  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: <HeaderSearch title="Mã dịch vụ, hàng hóa" sort_key="dichVu" />,
      width: 160,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: <HeaderSearch title="Tên dịch vụ, hàng hóa" sort_key="ten" />,
      width: 280,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch title="Nhóm DV cấp 1" sort_key="tenNhomDichVuCap1" />
      ),
      width: 140,
      dataIndex: "tenNhomDichVuCap1",
      key: "tenNhomDichVuCap1",
    },
    {
      title: (
        <HeaderSearch title="Đơn giá không BH" sort_key="giaKhongBaoHiem" />
      ),
      width: 160,
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      render: (item, list, index) =>
        item
          ? item.formatPrice()
          : [
              LOAI_DICH_VU.THUOC,
              LOAI_DICH_VU.VAT_TU,
              LOAI_DICH_VU.HOA_CHAT,
            ].includes(list?.loaiDichVu)
          ? ""
          : 0,
    },
    {
      title: <HeaderSearch title="Đơn giá BH" sort_key="giaBaoHiem" />,
      width: 120,
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      render: (item, list, index) =>
        item
          ? item.formatPrice()
          : [
              LOAI_DICH_VU.THUOC,
              LOAI_DICH_VU.VAT_TU,
              LOAI_DICH_VU.HOA_CHAT,
            ].includes(list?.loaiDichVu)
          ? ""
          : 0,
    },
    {
      title: <HeaderSearch title="Giá phụ thu" sort_key="giaPhuThu" />,
      width: 120,
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      render: (item, list, index) =>
        item
          ? item.formatPrice()
          : [
              LOAI_DICH_VU.THUOC,
              LOAI_DICH_VU.VAT_TU,
              LOAI_DICH_VU.HOA_CHAT,
            ].includes(list?.loaiDichVu)
          ? ""
          : 0,
    },
  ];

  const handleChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleChangeSize = (size) => {
    onSizeChange({ size });
  };

  const onChange = (key) => (e) => {
    onChangeInputSearch({
      [key]: e,
    });
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked
        ? union(
            state.selectedRowKeys,
            listAllDichVu.map((x) => x.id)
          )
        : difference(
            state.selectedRowKeys,
            listAllDichVu.map((x) => x.id)
          ),
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = union(
      difference(
        state.selectedRowKeys,
        listAllDichVu.map((x) => x.id)
      ),
      [...new Set(updatedSelectedKeys)]
    );

    setState({
      selectedRowKeys: updatedSelectedKeys,
      isCheckedAll:
        difference(
          listAllDichVu.map((x) => x.id),
          updatedSelectedKeys
        ).length === 0,
    });
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onSave = () => {
    const payload = (state.selectedRowKeys || []).map((item) => ({
      dichVuId: item,
      ...(state.goiPtTtId
        ? {
            goiPtTtId: state.goiPtTtId,
            chiDinhCungGoi: true,
            soLuongToiDa: 1,
          }
        : {}),
    }));
    themDvChung(payload).then(() => {
      props.refreshList && props.refreshList();
      onClose();
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={"80%"}
      onCancel={onClose}
      title={"Thêm dịch vụ, hàng hóa"}
      closable={true}
    >
      <ThemDvStyled>
        <div className="header-search">
          <label>Tìm dịch vụ, hàng hóa</label>
          <InputTimeout
            refWrap={refInputTimeout}
            placeholder="Nhập từ khóa tìm kiếm"
            onChange={onChange("ten")}
          />
        </div>

        <div>
          Đã chọn <b>{state.selectedRowKeys?.length || 0}</b> dịch vụ
        </div>

        <div className="table-content">
          <TableWrapper
            columns={columnsService}
            dataSource={listAllDichVu || []}
            onRow={onRow}
            rowSelection={rowSelection}
            rowKey={(record) => record.id}
            styleWrap={{ height: 450 }}
          />

          {totalElements ? (
            <Pagination
              listData={listAllDichVu || []}
              onChange={handleChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleChangeSize}
              style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
            />
          ) : null}
        </div>

        <div className="footer-action">
          <Button type="text" onClick={onClose}>
            {t("common.huy")}
          </Button>

          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            rightIcon={<SaveOutlined />}
          >
            {t("common.luu")}
          </Button>
        </div>
      </ThemDvStyled>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThemDv);
