import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import { Pagination, HeaderSearch, TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ModalDichVu from "pages/tiepDon/components/ModalDichVu";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import {
  getAllQueryString,
  setQueryStringValue,
  setQueryStringValues,
} from "hook/useQueryString/queryString";
import { cloneDeep } from "lodash";

const DanhSach = (props) => {
  const { t } = useTranslation();
  const refModalDichVu = useRef(null);
  const {
    danhSachNbTiepDon: { getListNguoiBenhTiepDon, onSizeChange, onSortChange },
  } = useDispatch();
  const { dataSortColumn, listNguoiBenhTiepDon, totalElements, page, size } =
    useSelector((state) => state.danhSachNbTiepDon);
  const [listTrangThaiNbKsk] = useEnum(ENUM.TRANG_THAI_NB_KSK);
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);

  useEffect(() => {
    const {
      page,
      size,
      dataSortColumn = "{}",
      ...queries
    } = getAllQueryString();
    const sort = JSON.parse(dataSortColumn);

    getListNguoiBenhTiepDon({
      page,
      size,
      dataSearch: queries,
      dataSortColumn: sort,
    });
  }, []);

  const onChangePage = (page) => {
    setQueryStringValue("page", page - 1);
    getListNguoiBenhTiepDon({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    setQueryStringValues({ size: size, page: 0 });
    onSizeChange({ size: size });
  };

  const onClickSort = (key, value) => {
    let sort = cloneDeep(dataSortColumn);
    sort[key] = value;
    for (let key in sort) {
      if (!sort[key]) delete sort[key];
    }
    setQueryStringValues({ dataSortColumn: JSON.stringify(sort), page: 0 });
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("/quan-ly-tiep-don/danh-sach-nb-da-tiep-don/" + id);
      },
    };
  };

  const onEdit = (record) => {
    history.push("/tiep-don/" + record?.id);
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
          title={t("tiepDon.ngayDangKy")}
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHs")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.hoTenNguoiBenh")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ngaySinh")}
          sort_key="ngaySinh"
          dataSort={dataSortColumn["ngaySinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (field, item, index) =>
        field
          ? moment(field).format(item.chiNamSinh ? "YYYY" : "DD / MM / YYYY")
          : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.diaChi")}
          // sort_key="diaChi"
          // dataSort={dataSortColumn["diaChi"] || ""}
          // onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soDienThoai")}
          sort_key="soDienThoai"
          dataSort={dataSortColumn["soDienThoai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.soBHYT")}
          sort_key="maTheBhyt"
          dataSort={dataSortColumn["maTheBhyt"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "maTheBhyt",
      key: "maTheBhyt",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.doiTuong")}
          sort_key="doiTuong"
          dataSort={dataSortColumn["doiTuong"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        return listDoiTuong.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.chuaKiemTraThe")}
          sort_key="boQuaTheLoi"
          dataSort={dataSortColumn["boQuaTheLoi"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "boQuaTheLoi",
      key: "boQuaTheLoi",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.khoa")}
          sort_key="tenKhoaNb"
          dataSort={dataSortColumn["tenKhoaNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenKhoaNb",
      key: "tenKhoaNb",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.tenCongTy")}
          sort_key="tenDoiTac"
          dataSort={dataSortColumn["tenDoiTac"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "tenDoiTac",
      key: "tenDoiTac",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.nguoiBenhKSK")}
          sort_key="khamSucKhoe"
          dataSort={dataSortColumn["khamSucKhoe"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "60px",
      dataIndex: "khamSucKhoe",
      key: "khamSucKhoe",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.trangThaiKSK")}
          sort_key="trangThaiKsk"
          dataSort={dataSortColumn["trangThaiKsk"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "60px",
      dataIndex: "trangThaiKsk",
      key: "trangThaiKsk",
      align: "center",
      render: (item) => {
        return (
          (listTrangThaiNbKsk || []).find((x) => x?.id === item)?.ten || ""
        );
      },
    },
    // {
    //   title: <HeaderSearch title="Thao tác" />,
    //   width: "50px",
    //   dataIndex: "",
    //   key: "",
    //   render: (item, data) => {
    //     return (
    //       <div className="icon">
    //         <Tooltip title="Chỉnh sửa thông tin" placement="bottom">
    //           <img src={IcEdit} alt="..." onClick={() => onEdit(data)}></img>
    //         </Tooltip>
    //         <Tooltip title="Danh sách dịch vụ đã chỉ định" placement="bottom">
    //           <img
    //             src={IconDetail}
    //             alt="..."
    //             onClick={() =>
    //               history.push(
    //                 "/quan-ly-tiep-don/danh-sach-nb-da-tiep-don/" + data?.id
    //               )
    //             }
    //           ></img>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listNguoiBenhTiepDon}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 2500 }}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listNguoiBenhTiepDon}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
      <ModalDichVu ref={refModalDichVu} />
    </Main>
  );
};

export default DanhSach;
