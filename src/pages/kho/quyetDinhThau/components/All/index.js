import React, { useEffect } from "react";
import { Checkbox, Input, DatePicker } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { ENUM, HIEU_LUC } from "constants/index";
import { useSelector, useDispatch } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import { useEnum } from "hook";

const dateFormat = "DD-MM-YYYY";
let timer = null;

const DanhSach = ({ ...props }) => {
  const {
    listQuyetDinhThauChiTiet,
    totalElements,
    page,
    size,
    dataSortColumn,
  } = useSelector((state) => state.quyetDinhThauChiTiet);
  const { listAllQuyetDinhThau } = useSelector((state) => state.quyetDinhThau);
  const { listAllNhaSanXuat, listAllNhaCungCap } = useSelector(
    (state) => state.doiTac
  );
  const { listXuatXu } = useSelector((state) => state.xuatXu);
  const { listAllDichVuKho } = useSelector((state) => state.dichVuKho);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const { listAllDuongDung } = useSelector((state) => state.duongDung);
  const { listAllHoatChat } = useSelector((state) => state.hoatChat);
  const { listAllDonViTinh } = useSelector((state) => state.donViTinh);
  const { listAllNguonNhapKho } = useSelector((state) => state.nguonNhapKho);
  const { listDataTongHop } = useSelector((state) => state.nhomChiPhi);

  const { onSearch, onSortChange, onSizeChange, onChangeInputSearch } =
    useDispatch().quyetDinhThauChiTiet;


  const { listloaiThau } = useEnum(ENUM.LOAI_THAU);
  const { listnhomThau } = useEnum(ENUM.NHOM_THAU);
  const { listloaiDichVuThuocVatTuHoaChat } = useEnum(
    ENUM.LOAI_DICH_VU_THUOC_VAT_TU_HOA_CHAT
  );
  const { listgoiThau } = useEnum(ENUM.GOI_THAU);
  const { listtrangThaiThau } = useEnum(ENUM.TRANG_THAI_THAU);
  const { listloaiThuocThau } = useEnum(ENUM.LOAI_THUOC_THAU);
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  useEffect(() => {
    onSortChange({ ["dichVu.dichVu.ten"]: 1 });
  }, []);
  
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
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Quy???t ?????nh th???u"
          sort_key="quyetDinhThauId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.quyetDinhThauId || 0}
          searchSelect={
            <Select
              placeholder="T??m quy???t ?????nh th???u"
              data={listAllQuyetDinhThau || []}
              onChange={onSearchInput("quyetDinhThauId")}
              ten={"quyetDinhThau"}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      fixed: "left",
      render: (item) => {
        return item && item?.quyetDinhThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="D???ch v???"
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dichVuId || 0}
          searchSelect={
            <SelectLoadMore
              api={dichVuKhoProvider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              keySearch={"ten"}
              placeholder="T??m d???ch v???"
              data={listAllDichVuKho}
              onChange={onSearchInput("dichVuId")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: "dichVu",
      fixed: "left",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL th???u"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongThau || 0}
          search={
            <Input
              placeholder="T??m s??? l?????ng th???u"
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
          title="SL ???????c ph??p mua"
          sort_key="soLuongDuocPhepMua"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongDuocPhepMua || 0}
          search={
            <Input
              placeholder="T??m SL ???????c ph??p mua"
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
          title="Gi?? nh???p sau VAT"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhapSauVat || 0}
          search={
            <Input
              placeholder="T??m lo???i d???ch v???"
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
          title="????n gi?? BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaBaoHiem || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? BH"
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
          title="Ph??? thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaPhuThu || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? ph??? thu"
              onChange={onSearchInput("giaBaoHiem")}
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
          title="Quy c??ch"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="T??m quy c??ch"
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
          title="Nh?? cung c???p"
          sort_key="nhaCungCapId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhaCungCapId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? cung c???p"
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
          title="M?? g??i th???u"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.goiThau || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? g??i th???u"
              data={listgoiThau}
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
          listgoiThau && (listgoiThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="S??? visa"
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soVisa || 0}
          search={
            <Input
              placeholder="T??m s??? visa"
              onChange={onSearchInput("nhaCungCapId")}
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
          title="Nh??m th???u"
          sort_key="nhomThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhomThau || 0}
          searchSelect={
            <Select
              placeholder="T??m nh??m th???u"
              data={listnhomThau}
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomThau",
      key: "nhomThau",
      render: (item) => {
        return (
          listnhomThau && (listnhomThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m chi ph??"
          sort_key="nhomChiPhiId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhomChiPhiId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh??m th???u"
              data={listDataTongHop}
              onChange={onSearchInput("nhomChiPhiBh")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomChiPhiId",
      key: "nhomChiPhiId",
      render: (item) => {
        return (
          listDataTongHop &&
          (listDataTongHop.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??? l??? thanh to??n BH"
          sort_key="tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tyLeBhTt || 0}
          search={
            <Input
              placeholder="T??m t??? l??? TTBH"
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
          title="Ng?????ng th???u"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nguongThau || 0}
          search={
            <Input
              placeholder="T??m ng?????ng th???u"
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
          title="Lo???i thu???c"
          sort_key="loaiThuoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiThuoc || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i thu???c"
              data={listloaiThuocThau}
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
          listloaiThuocThau &&
          (listloaiThuocThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="N?????c s???n xu???t"
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? s???n xu???t"
              data={listXuatXu}
              onChange={onSearchInput("xuatXuId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return (item && item?.ten) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? s???n xu???t"
          sort_key="nhaSanXuatId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhaSanXuatId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? s???n xu???t"
              data={listAllNhaSanXuat}
              onChange={onSearchInput("loaiThuoc")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaSanXuatId",
      key: "nhaSanXuatId",
      render: (item) => {
        return (
          listAllNhaSanXuat &&
          (listAllNhaSanXuat.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tr???n b???o hi???m"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBh || 0}
          search={
            <Input
              placeholder="T??m tr???n b???o hi???m"
              onChange={onSearchInput("tranBh")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tranBh",
      key: "tranBh",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Gi?? tr???n"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaTran || 0}
          search={
            <Input
              placeholder="T??m ng?????ng th???u"
              onChange={onSearchInput("tranBh")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaTran",
      key: "giaTran",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="???????ng d??ng"
          sort_key="duongDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.duongDung || 0}
          searchSelect={
            <Select
              placeholder="T??m ???????ng d??ng"
              data={listAllDuongDung}
              onChange={onSearchInput("duongDung")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVuId",
      key: "duongDung",
      render: (item) => {
        "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="M?? ???????ng d??ng"
          sort_key="maDuongDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maDuongDung || 0}
          searchSelect={
            <Select
              placeholder="T??m ???????ng d??ng"
              data={listAllDuongDung}
              onChange={onSearchInput("tranBh")}
              ten="ma"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maDuongDung",
      key: "maDuongDung",
    },
    {
      title: (
        <HeaderSearch
          title="M?? ho???t ch???t"
          sort_key="maHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maHoatChat || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? ho???t ch???t"
              data={listAllHoatChat}
              onChange={onSearchInput("maHoatChat")}
              ten="ma"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hoatChatId",
      key: "maHoatChat",
      render: (item) => {
        return (
          listAllHoatChat &&
          (listAllHoatChat.find((e) => e.id === item) || [])?.ma
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="H??m l?????ng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hamLuong || 0}
          search={
            <Input
              placeholder="T??m h??m l?????ng"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          title="M?? DV"
          sort_key="maDV"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maDV || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? DV"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "maDV",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="N??m"
          sort_key="quyetDinhThau.nam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau.nam"] || 0}
          search={
            <Input
              placeholder="T??m n??m"
              onChange={onSearchInput("quyetDinhThau.nam")}
            />
          }
        />
      ),
      width: 150,
      align: "center",
      dataIndex: "quyetDinhThau",
      key: "nam",
      render: (item) => {
        return item && item?.nam;
      },
    },
    {
      title: (
        <HeaderSearch
          title="????n v??? t??nh"
          sort_key="donViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.donViTinh || 0}
          searchSelect={
            <Select
              placeholder="T??m ????n v??? t??nh"
              data={listAllDonViTinh}
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "donViTinh",
      key: "donViTinh",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL ???? nh???p"
          sort_key="soLuongDaNhap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongDaNhap || 0}
          search={
            <Input
              placeholder="T??m SL ???? nh???p"
              onChange={onSearchInput("soLuongDaNhap")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongDaNhap",
      key: "soLuongDaNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL tr??? l???i"
          sort_key="soLuongDaTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongDaTra || 0}
          search={
            <Input
              placeholder="T??m SL ???? tr???"
              onChange={onSearchInput("soLuongDaTra")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongDaTra",
      key: "soLuongDaTra",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL c??n l???i"
          sort_key="soLuongConLai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongConLai || 0}
          search={
            <Input
              placeholder="T??m SL c??n l???i"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongConLai",
      key: "soLuongConLai",
    },
    {
      title: (
        <HeaderSearch
          title="SL c?? th??? nh???p"
          sort_key="soLuongCoTheNhap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongCoTheNhap || 0}
          search={
            <Input
              placeholder="T??m SL c?? th??? nh???p"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongCoTheNhap",
      key: "soLuongCoTheNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="G??i th???u"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.goiThau || 0}
          search={
            <Input
              placeholder="T??m g??i th???u"
              onChange={onSearchInput("goiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "goiThau",
      render: (item) => {
        return item && item?.goiThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i DV"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiDichVu || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i d???ch v???"
              data={listloaiDichVuThuocVatTuHoaChat}
              onChange={onSearchInput("loaiDichVu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "loaiDichVu",
      render: (item) => {
        return (
          item &&
          listloaiDichVuThuocVatTuHoaChat &&
          (
            listloaiDichVuThuocVatTuHoaChat.find(
              (e) => e.id === item.loaiDichVu
            ) || []
          )?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngu???n nh???p kho"
          sort_key="nguonNhapKhoId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nguonNhapKhoId || 0}
          searchSelect={
            <Select
              placeholder="T??m ngu???n nh???p kho"
              data={listAllNguonNhapKho}
              onChange={onSearchInput("nguonNhapKhoId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "nguonNhapKho",
      render: (item) => {
        return (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.nguonNhapKho?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i th???u"
          sort_key="loaiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiThau || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i th???u"
              data={listloaiThau}
              onChange={onSearchInput("loaiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "loaiThau",
      render: (item) => {
        const res = (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.loaiThau;
        return (
          res &&
          listloaiThau &&
          (listloaiThau?.find((e) => e.id === res) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ng??y c??ng b???"
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngayCongBo || 0}
          searchSelect={
            <DatePicker
              format={dateFormat}
              placeholder="T??m ng??y c??ng b???"
              onChange={onSearchInput("ngayCongBo")}
            />
          }
        />
      ),
      width: 120,
      align: "center",
      dataIndex: "quyetDinhThauId",
      key: "ngayCongBo",
      render: (item) => {
        return (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.ngayCongBo;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hi???u l???c th???u"
          sort_key="ngayHieuLuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngayHieuLuc || 0}
          searchSelect={
            <DatePicker
              placeholder="T??m hi???u l???c th???u"
              onChange={onSearchInput("ngayHieuLuc")}
            />
          }
        />
      ),
      width: 120,
      align: "center",
      dataIndex: "quyetDinhThauId",
      key: "ngayHieuLuc",
      render: (item) => {
        return (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.ngayHieuLuc;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              placeholder="T??m khoa"
              data={listAllKhoa}
              onChange={onSearchInput("khoaId")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "quyetDinhThauId",
      key: "khoa",
      render: (item) => {
        const res = (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.khoaId;
        return (
          res &&
          listAllKhoa &&
          (listAllKhoa?.find((e) => e.id === res) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tr???ng th??i"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.trangThai || 0}
          searchSelect={
            <Select
              placeholder="T??m tr???ng th??i"
              data={listtrangThaiThau}
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "trangThai",
      render: (item) => {
        const res = (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.trangThai;
        return (
          res &&
          listtrangThaiThau &&
          (listtrangThaiThau?.find((e) => e.id === res) || [])?.ten
        );
      },
    },

    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Ch???n hi???u l???c"
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
    <div>
      <TableWrapper
        columns={columnsGroup}
        dataSource={listQuyetDinhThauChiTiet}
        rowKey={(record) => record.id}
      />
      {!!totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listQuyetDinhThauChiTiet}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </div>
  );
};

export default DanhSach;
