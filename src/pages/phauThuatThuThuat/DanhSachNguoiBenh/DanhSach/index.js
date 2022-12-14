import React, { useEffect, useRef } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import { Checkbox, Tooltip } from "antd";
import moment from "moment";
import { useEnum, useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import ModalKhoaLamViec from "../ModalKhoaLamViec";
import { ENUM } from "constants/index";
import {
  getAllQueryString,
  setQueryStringValue,
  setQueryStringValues,
} from "hook/useQueryString/queryString";
import { cloneDeep, isEqual } from "lodash";

const DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT =
  "DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT";
const { Column } = TableWrapper;
const DanhSach = (props) => {
  const { t } = useTranslation();
  const refModalKhoaLamViec = useRef();
  const { listKhoaTheoTaiKhoan } = useSelector((state) => state.khoa);
  const { dataSortColumn, listDsPttt, totalElements, page, size } = useSelector(
    (state) => state.pttt
  );
  const listPhongTheoTaiKhoan = useStore("phong.listPhongTheoTaiKhoan", []);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listPhanLoaiPTTT] = useEnum(ENUM.PHAN_LOAI_PTTT);
  const [listLoaiPtTt] = useEnum(ENUM.LOAI_PTTT);
  const preQuery = useRef(null);

  const {
    pttt: { onSizeChange, onSortChange, onSearch, getDashboardTheoTrangThai },
  } = useDispatch();
  const refSettings = useRef(null);

  useEffect(() => {
    loadData();
  }, [listKhoaTheoTaiKhoan, listPhongTheoTaiKhoan]);

  // const dsKhoaThucHienId = useMemo(() => {
  //   return (listKhoaTheoTaiKhoan || []).map((item) => item.id);
  // }, [listKhoaTheoTaiKhoan]);

  const loadData = async () => {
    const {
      page,
      size,
      dataSortColumn = "{}",
      ...queries
    } = getAllQueryString();

    const sort = JSON.parse(dataSortColumn);
    //l???y t??? query ra th??ng tin tuThoiGianThucHien n???u kh??ng c?? th?? l???y t??? current
    if (queries.tuThoiGianThucHien == "-") delete queries.tuThoiGianThucHien;
    else
      queries.tuThoiGianThucHien = queries.tuThoiGianThucHien
        ? moment(queries.tuThoiGianThucHien?.toDateObject()).format(
            "YYYY-MM-DD 00:00:00"
          )
        : moment()
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .format("YYYY-MM-DD 00:00:00");
    //l???y t??? query ra th??ng tin denThoiGianThucHien n???u kh??ng c?? th?? l???y t??? current
    if (queries.denThoiGianThucHien == "-") delete queries.denThoiGianThucHien;
    else
      queries.denThoiGianThucHien = queries.denThoiGianThucHien
        ? moment(queries.denThoiGianThucHien?.toDateObject()).format(
            "YYYY-MM-DD 23:59:59"
          )
        : moment()
            .set("hour", 23)
            .set("minute", 59)
            .set("second", 59)
            .format("YYYY-MM-DD 23:59:59");

    queries.khoaThucHienId = parseInt(queries.khoaThucHienId) || 0;
    //l???c ra c??c ph??ng th???c hi???n theo khoa th???c hi???n ???? ch???n (n???u ch??a ch???n khoa th?? tr??? v??? t???t c???)
    queries.phongThucHienId = queries.phongThucHienId =
      parseInt(queries.phongThucHienId) || "";

    // n???u kh??ng c?? tham s??? phongThucHienId th?? d??ng tham s??? dsPhongThucHienId
    if (!queries.phongThucHienId) {
      queries.dsPhongThucHienId = (listPhongTheoTaiKhoan || [])
        .filter(
          (phong) =>
            !queries.khoaThucHienId || queries.khoaThucHienId == phong.khoaId
        )
        .map((item) => item.id);
    }
    //ki???m tra xem trong query ???? c?? khoaThucHienId ch??a, n???u ch??a c?? th?? ch???n t??? cache ra.
    if (!queries.khoaThucHienId) {
      //l???y th??ng tin khoa l??m vi???c t??? cache
      let khoaLamViec = await cacheUtils.read(
        DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT,
        "",
        null,
        false
      );
      //n???u kh??ng t???n t???i khoa l??m vi???c
      if (!khoaLamViec) {
        //l???u danh s??ch khoa > 1 (nhi???u khoa) th?? show ra modal ????? ch???n khoa
        if (listKhoaTheoTaiKhoan.length > 1) {
          refModalKhoaLamViec.current &&
            refModalKhoaLamViec.current.show({}, (data) => {
              //khi ch???n khoa xong th?? ?????y th??ng tin khoa l??n query
              queries.khoaThucHienId = data?.id;
              setQueryStringValue("khoaThucHienId", queries.khoaThucHienId);
              queries.phongThucHienId = "";
              queries.dsPhongThucHienId = listPhongTheoTaiKhoan
                .filter((phong) => phong.khoaId === queries.khoaThucHienId)
                .map((phong) => phong.id);
              //l??u l???i th??ng tin khoa ???? ch???n
              cacheUtils.save(
                DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT,
                "",
                data,
                false
              );
              if (queries.khoaThucHienId) {
                onSizeChange({
                  dataSearch: queries,
                  dataSortColumn: sort,
                  size: parseInt(size || 10),
                  page: parseInt(page || 0),
                });
                getDashboardTheoTrangThai({
                  tuThoiGianThucHien: queries.tuThoiGianThucHien,
                  denThoiGianThucHien: queries.denThoiGianThucHien,
                  dsKhoaThucHienId: queries.khoaThucHienId,
                  dsPhongThucHienId:
                    queries.phongThucHienId || queries.dsPhongThucHienId,
                });
              }
            });
        } else {
          //ng?????c l???i n???u ch??? c?? 1 khoa th?? ch???n lu??n khoa ????, l??u l???i khoa ???? ch???n
          cacheUtils.save(
            DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT,
            "",
            listKhoaTheoTaiKhoan[0],
            false
          );
          queries.khoaThucHienId = listKhoaTheoTaiKhoan[0]?.id;
          queries.phongThucHienId = "";
          queries.dsPhongThucHienId = listPhongTheoTaiKhoan
            .filter((i) => i.khoaId === queries.khoaThucHienId)
            .map((i) => i.id);
        }
      } else {
        queries.khoaThucHienId = khoaLamViec.id;
        queries.phongThucHienId = "";
        queries.dsPhongThucHienId = listPhongTheoTaiKhoan
          .filter((i) => i.khoaId === queries.khoaThucHienId)
          .map((i) => i.id);
      }
    }
    // //n???u kh??ng c?? khoa th???c hi???n th?? truy???n dsKhoaThucHienId = t???t c??? khoa trong danh s??ch
    // if (!queries.khoaThucHienId) {
    //   queries.dsKhoaThucHienId = dsKhoaThucHienId;
    // }
    //s??? d???ng preQuery ????? ki???m tra d??? li???u tr?????c v?? sau, tr??nh load data nhi???u l???n
    if (!isEqual(preQuery.current, queries)) {
      preQuery.current = queries;
      if (queries.khoaThucHienId) {
        onSizeChange({
          dataSearch: queries,
          dataSortColumn: sort,
          size: parseInt(size || 10),
          page: parseInt(page || 0),
        });
        getDashboardTheoTrangThai({
          tuThoiGianThucHien: queries.tuThoiGianThucHien,
          denThoiGianThucHien: queries.denThoiGianThucHien,
          dsKhoaThucHienId: queries.khoaThucHienId,
          dsPhongThucHienId:
            queries.phongThucHienId || queries.dsPhongThucHienId,
        });
      }
    }
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
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
      onClick: onViewDetail(record),
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const onViewDetail = (record) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    history.push({
      pathname: "/phau-thuat-thu-thuat/chi-tiet-phau-thuat/" + record.id,
      state: getAllQueryString(),
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
      ignore: true,
    }),
    Column({
      title: t("pttt.hoTenNguoiBenh"),
      sort_key: "tenNb",
      dataSort: dataSortColumn["tenNb"] || "",
      onClickSort: onClickSort,
      width: "250px",
      dataIndex: "tenNb",
      key: "tenNb",
      i18Name: "pttt.hoTenNguoiBenh",
      align: "left",
    }),
    Column({
      title: t("common.ngaySinh"),
      sort_key: "ngaySinh",
      dataSort: dataSortColumn["ngaySinh"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      align: "left",
      i18Name: "common.ngaySinh",
      render: (field, item) => {
        return (
          <div>
            {field
              ? moment(field).format(item.chiNamSinh ? "YYYY" : "DD/MM/YYYY")
              : ""}
          </div>
        );
      },
    }),
    Column({
      title: t("common.maHs"),
      sort_key: "maHoSo",
      dataSort: dataSortColumn["maHoSo"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "left",
      i18Name: "common.maHs",
    }),
    Column({
      title: t("common.maBa"),
      sort_key: "maBenhAn",
      dataSort: dataSortColumn["maBenhAn"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      align: "left",
      i18Name: "common.maBa",
    }),
    Column({
      title: t("common.maNb"),
      sort_key: "maNb",
      dataSort: dataSortColumn["maNb"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maNb",
      key: "maNb",
      i18Name: "common.maNb",
      // align: "center",
      render: (field, item, index) => {
        return <div>{item?.maNb}</div>;
      },
    }),
    Column({
      title: t("common.maDv"),
      sort_key: "maDichVu",
      dataSort: dataSortColumn["maDichVu"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      i18Name: "common.maDv",
      // align: "center",
    }),
    Column({
      title: t("xetNghiem.tenDV"),
      sort_key: "tenDichVu",
      dataSort: dataSortColumn["tenDichVu"] || "",
      onClickSort: onClickSort,
      width: "300px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "xetNghiem.tenDV",
      // align: "center",
      render: (item) => (
        <Tooltip title={item}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item}
          </div>
        </Tooltip>
      ),
    }),
    Column({
      // thi???u
      title: t("common.trangThai"),
      sort_key: "trangThai",
      dataSort: dataSortColumn["trangThai"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      i18Name: "common.trangThai",
      render: (value) => {
        return listTrangThaiDichVu?.find((item) => item.id == value)?.ten || "";
      },
    }),
    Column({
      title: t("pttt.phanLoaiPTTT"),
      sort_key: "phanLoai",
      dataSort: dataSortColumn["phanLoai"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "phanLoai",
      key: "phanLoai",
      i18Name: "pttt.phanLoaiPTTT",
      // align: "center",
      render: (value) => {
        return listPhanLoaiPTTT?.find((item) => item.id == value)?.ten || "";
      },
    }),
    Column({
      title: t("pttt.tyLeThanhToan"),
      sort_key: "tyLeTtDv",
      dataSort: dataSortColumn["tyLeTtDv"] || "",
      onClickSort: onClickSort,
      width: "135px",
      dataIndex: "tyLeTtDv",
      key: "tyLeTtDv",
      i18Name: "pttt.tyLeThanhToan",
    }),
    Column({
      title: t("pttt.loaiPttt"),
      sort_key: "loaiPtTt",
      dataSort: dataSortColumn["loaiPtTt"] || "",
      onClickSort: onClickSort,
      width: "125px",
      dataIndex: "loaiPtTt",
      key: "loaiPtTt",
      i18Name: "pttt.loaiPttt",
      render: (field, item, index) => {
        return listLoaiPtTt.find((x) => x.id === field)?.ten;
      },
    }),
    Column({
      title: t("pttt.khongPt"),
      sort_key: "khongThucHien",
      dataSort: dataSortColumn["khongThucHien"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "khongThucHien",
      key: "khongThucHien",
      i18Name: "pttt.khongPt",
      align: "center",
      render: (field, item, index) => {
        return <Checkbox checked={field}></Checkbox>;
      },
    }),
    Column({
      title: (
        <>
          {t("common.tienIch")}
          <IcSetting
            onClick={onSettings}
            style={{ cursor: "pointer" }}
            className="icon"
          />
        </>
      ),
      width: "150px",
      align: "center",
      fixed: "right",
      i18Name: "common.tienIch",
      ignore: true,
      render: (record) => {
        return <IcEye className="ic-action" onClick={onViewDetail(record)} />;
      },
    }),
  ];

  const onShowSizeChange = (size) => {
    setQueryStringValues({ size: size, page: 0 });
    onSizeChange({ size });
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listDsPttt}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 1700 }}
        tableName="table_PTTT_DSNGUOIBENH"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listDsPttt}
          total={totalElements}
          onShowSizeChange={onShowSizeChange}
        />
      )}
      <ModalKhoaLamViec ref={refModalKhoaLamViec} />
    </Main>
  );
};

export default DanhSach;
