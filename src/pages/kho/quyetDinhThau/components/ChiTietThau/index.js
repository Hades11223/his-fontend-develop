import React, { useEffect, useRef } from "react";
import { Checkbox, Input } from "antd";
import { Main } from "./styled";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC } from "constants/index";
import { useSelector, useDispatch } from "react-redux";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import SelectLoadMore from "components/SelectLoadMore";
import { useTranslation } from "react-i18next";

let timer = null;

const ChiTietThau = ({
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  layerId,
}) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  const { t } = useTranslation();

  const {
    listQuyetDinhThauChiTiet,
    dataEditDefault,
    page,
    size,
    totalElements,
    dataSortColumn,
  } = useSelector((state) => state.quyetDinhThauChiTiet);
  const { listAllQuyetDinhThau } = useSelector((state) => state.quyetDinhThau);
  const { listAllNhaSanXuat, listAllNhaCungCap } = useSelector(
    (state) => state.doiTac
  );
  const { listAllXuatXu } = useSelector((state) => state.xuatXu);
  const { listGoiThau, listNhomThau, listNhomChiPhiBh, listLoaiThuocThau } =
    useSelector((state) => state.utils);
  const {
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onSearch,
  } = useDispatch().quyetDinhThauChiTiet;
  const { _getList: getKichCo } = useDispatch().kichCo;

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: (e) => {
            refClickBtnAdd.current && refClickBtnAdd.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName !== "INPUT")
              refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName !== "INPUT")
              refSelectRow.current(1);
          },
        },
      ],
    });
  }, []);
  const onReset = () => {
    updateData({ dataEditDefault: null });
  };

  refSelectRow.current = (index) => {
    const indexNextItem =
      (listQuyetDinhThauChiTiet?.findIndex(
        (item) => item.id === dataEditDefault?.id
      ) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listQuyetDinhThauChiTiet.length) {
      updateData({ dataEditDefault: listQuyetDinhThauChiTiet[indexNextItem] });
      document
        .getElementsByClassName(
          "row-id-" + listQuyetDinhThauChiTiet[indexNextItem]?.id
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  refClickBtnAdd.current = onReset;

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      updateData({ dataEditDefault: record });
      getKichCo({ dichVuId: record?.dichVuId });
    },
  });

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
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
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.tenHangHoa")}
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVuId"] || 0}
          searchSelect={
            <SelectLoadMore
              api={dichVuKhoProvider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              keySearch={"ten"}
              placeholder={t("kho.quyetDinhThau.timDichVu")}
              onChange={onSearchInput("dichVuId")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.title")}
          sort_key="quyetDinhThauId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThauId"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timQuyetDinhThau")}
              data={listAllQuyetDinhThau}
              onChange={onSearchInput("quyetDinhThauId")}
              ten="quyetDinhThau"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      render: (item) => {
        return item && item?.quyetDinhThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.maHangHoaTrungThau")}
          sort_key="maTrungThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maTrungThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timMaTrungThuau")}
              onChange={onSearchInput("maTrungThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "maTrungThau",
      key: "maTrungThau",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.tenHangHoaTrungThau")}
          sort_key="tenTrungThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenTrungThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timTenTrungThau")}
              onChange={onSearchInput("tenTrungThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tenTrungThau",
      key: "tenTrungThau",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.maHangHoaDauThau")}
          sort_key="maDauThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maDauThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timMaDauThau")}
              onChange={onSearchInput("maDauThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "maDauThau",
      key: "maDauThau",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.slThau")}
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timSoLuongThau")}
              onChange={onSearchInput("soLuongThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongThau",
      key: "soLuongThau",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.slDuocPhepMua")}
          sort_key="soLuongDuocPhepMua"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongDuocPhepMua"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timSlDuocPhepMua")}
              onChange={onSearchInput("soLuongDuocPhepMua")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "soLuongDuocPhepMua",
      key: "soLuongDuocPhepMua",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.giaNhapSauVat")}
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaNhapSauVat"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timGiaNhapSauVat")}
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.donGiaKhongBh")}
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaKhongBaoHiem"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timDonGiaKhongBh")}
              onChange={onSearchInput("giaKhongBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.donGiaBh")}
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaBaoHiem"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timDonGiaBh")}
              onChange={onSearchInput("giaBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.phuThu")}
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaPhuThu"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timDonGiaPhuThu")}
              onChange={onSearchInput("giaPhuThu")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.quyCach")}
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyCach"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timQuyCach")}
              onChange={onSearchInput("quyCach")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nhaCungCap")}
          sort_key="nhaCungCapId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaCungCapId"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timNhaCungCap")}
              data={listAllNhaCungCap}
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaCungCapId",
      key: "nhaCungCapId",
      render: (item) => {
        return (
          listAllNhaCungCap &&
          (listAllNhaCungCap.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.maGoiThau")}
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["goiThau"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timMaGoiThau")}
              data={listGoiThau}
              onChange={onSearchInput("goiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "goiThau",
      key: "goiThau",
      render: (item) => {
        return (
          listGoiThau && (listGoiThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.soVisa")}
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soVisa"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timSoViSa")}
              onChange={onSearchInput("soVisa")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soVisa",
      key: "soVisa",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nhomThau")}
          sort_key="nhomThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomThau"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timNhomThau")}
              data={listNhomThau}
              onChange={onSearchInput("nhomThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomThau",
      key: "nhomThau",
      render: (item) => {
        return (
          listNhomThau && (listNhomThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nhomChiPhi")}
          sort_key="nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timNhomChiPhi")}
              data={listNhomChiPhiBh}
              onChange={onSearchInput("nhomChiPhiBh")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomChiPhiBh",
      key: "nhomChiPhiBh",
      render: (item) => {
        return (
          listNhomChiPhiBh &&
          (listNhomChiPhiBh.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.tyLeThanhToanBh")}
          sort_key="tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tyLeBhTt"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timTyLeTTBH")}
              onChange={onSearchInput("tyLeBhTt")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tyLeBhTt",
      key: "tyLeBhTt",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nguongThau")}
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nguongThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timNguongThau")}
              onChange={onSearchInput("nguongThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "nguongThau",
      key: "nguongThau",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.loaiThuoc")}
          sort_key="loaiThuoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaiThuoc"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timLoaiThuoc")}
              data={listLoaiThuocThau}
              onChange={onSearchInput("loaiThuoc")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiThuoc",
      key: "loaiThuoc",
      render: (item) => {
        return (
          listLoaiThuocThau &&
          (listLoaiThuocThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nuocSanXuat")}
          sort_key="xuatXuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXuId"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timNuocSanXuat")}
              data={listAllXuatXu}
              onChange={onSearchInput("xuatXuId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "nuocSanXuatId",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nhaSanXuat")}
          sort_key="nhaSanXuatId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaSanXuatId"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timNhaSanXuat")}
              data={listAllNhaSanXuat}
              onChange={onSearchInput("nhaSanXuatId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaSanXuatId",
      key: "nhaSanXuatId",
      render: (item) => {
        return (
          item &&
          listAllNhaSanXuat &&
          (listAllNhaSanXuat.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.tranBaoHiem")}
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tranBaoHiem"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timTranBaoHiem")}
              onChange={onSearchInput("tranBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.giaTran")}
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaTran"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timGiaTran")}
              onChange={onSearchInput("giaTran")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaTran",
      key: "giaTran",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.soLuongHangHoaDaNhap")}
          sort_key="soLuongDuocPhepMua"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongDuocPhepMua"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timSoLuongHangHoaDaNhap")}
              onChange={onSearchInput("soLuongNhap")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "soLuongNhap",
      key: "soLuongNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.soLuongHangHoaDaTraLaiNcc")}
          sort_key="soLuongTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongDuocPhepMua"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timSoLuongHangDaTraLaiNcc")}
              onChange={onSearchInput("soLuongNhap")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.soLuongHangHoaConLai")}
          sort_key="soLuongCon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongCon"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timSoLuongHangHoaConLai")}
              onChange={onSearchInput("soLuongCon")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "soLuongCon",
      key: "soLuongCon",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.coHieuLuc")}
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder={t("kho.chonHieuLuc")}
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  return (
    <Main>
      <TableWrapper
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        rowKey={(record) => record?.id}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={[
          {
            content: (
              <>
                <Select
                  defaultValue={""}
                  data={[
                    { id: "", ten: "Tất cả Quyết định thầu" },
                    ...listAllQuyetDinhThau,
                  ]}
                  placeholder="Chọn quyết định thầu"
                  onChange={(value) => {
                    onSearchInput(value, "quyetDinhThauId");
                  }}
                  ten="quyetDinhThau"
                />
              </>
            ),
          },
          {
            title: "Thêm mới [F1]",
            onClick: onReset,
            buttonHeaderIcon: (
              <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
            ),
          },
          {
            className: `btn-change-full-table ${
              showFullTable ? "small" : "large"
            }`,
            title: <Icon component={showFullTable ? thuNho : showFull} />,
            onClick: handleChangeshowTable,
          },

          {
            className: "btn-collapse",
            title: (
              <Icon component={collapseStatus ? extendTable : extendChiTiet} />
            ),
            onClick: handleCollapsePane,
          },
        ]}
        columns={columns}
        dataSource={listQuyetDinhThauChiTiet}
        onRow={onRow}
        rowClassName={(record, index) =>
          dataEditDefault?.id === record.id
            ? "row-actived row-id-" + record.id
            : "row-id-" + record.id
        }
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listQuyetDinhThauChiTiet}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </Main>
  );
};

export default ChiTietThau;
