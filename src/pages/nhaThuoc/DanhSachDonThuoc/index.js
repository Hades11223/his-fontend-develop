import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { TableWrapper } from "components";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDecimal } from "../../../utils";
import { useTranslation } from "react-i18next";
import { FORMAT_DATE_TIME, TRANG_THAI_PHIEU_NHAP_XUAT } from "constants/index";
import moment from "moment";
import IconDelete from "assets/images/khamBenh/delete.png";

const DanhSachDonThuoc = (props, ref) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);

  const {
    thuocKho: {
      dsKhoId,
      dsTrangThai,
      dataSortColumn,
      listThuoc,
      totalElements,
      page,
      size,
    },
    utils: { listTrangThaiDonThuocNhaThuoc = [] },
  } = useSelector((state) => state);

  const { listKhoUser } = useSelector((state) => state.kho);
  const {
    thuocKho: {
      onSortChange,
      getListThuoc,
      updateData,
      onSizeChange,
      searchThuocByParams,
      onDelete,
    },
    utils: { getUtils },
  } = useDispatch();

  useEffect(() => {
    let obj = {
      dsTrangThai,
      dsKhoId,
      loaiNhapXuat: 120,
    };
    for (let i in obj) {
      // xóa param search bằng null hoặc không có
      if (!obj[i] || obj[i]?.length === 0) {
        delete obj[i];
      }
    }
    searchThuocByParams(obj);
    getUtils({ name: "TrangThaiDonThuocNhaThuoc" });
  }, []);
  useEffect(() => {
    if (listKhoUser.length > 0) {
      // random kho khi render lần đầu
      const list = listKhoUser.map((item) => item.id);
      const randomId = list[~~(Math.random() * list.length)]; // random
      updateData({
        dsKhoId: [randomId],
      });
      let obj = {
        dsTrangThai,
        dsKhoId,
        loaiNhapXuat: 120,
      };
      for (let i in obj) {
        // xóa param search bằng null hoặc không có
        if (!obj[i] || obj[i]?.length === 0) {
          delete obj[i];
        }
      }
      searchThuocByParams(obj);
    }
  }, [listKhoUser]);

  useImperativeHandle(ref, () => ({
    onSettings: () => {
      refSettings && refSettings.current.settings();
    },
  }));

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const onChangePage = (page) => {
    getListThuoc({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const history = useHistory();

  const onDeleteItem = (data) => (e) => {
    e.stopPropagation();
    onDelete(data?.id);
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("/nha-thuoc/chi-tiet/" + id);
      },
    };
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
          title={t("common.maNb")}
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maNb"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
      show: true,
      i18Name: "nhaThuoc.maNguoiBenh",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenNb")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNb",
      key: "tenNb",
      show: true,
      i18Name: "nhaThuoc.tenNguoiBenh",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.thanhTien")}
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      show: true,
      i18Name: "nhaThuoc.thanhTien",
      align: "right",
      render: (item) => {
        return formatDecimal(String(item));
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThai")}
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThai"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      show: true,
      i18Name: "nhaThuoc.trangThai",
      render: (item) => {
        return listTrangThaiDonThuocNhaThuoc.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soPhieu")}
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      show: true,
      i18Name: "nhaThuoc.soPhieu",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.diaChi")}
          // sort_key="diaChi"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
      show: true,
      i18Name: "nhaThuoc.diaChi",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("nhaThuoc.kho")}
          sort_key="tenKho"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenKho"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "tenKho",
      key: "tenKho",
      show: true,
      i18Name: "nhaThuoc.tenKho",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("nhaThuoc.ngayPhat")}
          sort_key="thoiGianDuyet"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianDuyet"] || ""}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianDuyet",
      key: "thoiGianDuyet",
      show: true,
      i18Name: "nhaThuoc.thoiGianDuyet",
      render: (item) => {
        return item && moment(item).format(FORMAT_DATE_TIME);
      },
    },
    {
      title: <HeaderSearch title={t("common.tienIch")} />,
      width: 40,
      align: "center",
      render: (item, data) => {
        return (
          data?.trangThai === TRANG_THAI_PHIEU_NHAP_XUAT.TAO_MOI_DA_GIU_CHO && (
            <img src={IconDelete} onClick={onDeleteItem(data)} alt="" />
          )
        );
      },
    },
  ];

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listThuoc}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        ref={refSettings}
      />
      <Pagination
        listData={listThuoc}
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};

export default forwardRef(DanhSachDonThuoc);
