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
    //lấy từ query ra thông tin tuThoiGianThucHien nếu không có thì lấy từ current
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
    //lấy từ query ra thông tin denThoiGianThucHien nếu không có thì lấy từ current
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
    //lọc ra các phòng thực hiện theo khoa thực hiện đã chọn (nếu chưa chọn khoa thì trả về tất cả)
    queries.phongThucHienId = queries.phongThucHienId =
      parseInt(queries.phongThucHienId) || "";

    // nếu không có tham số phongThucHienId thì dùng tham số dsPhongThucHienId
    if (!queries.phongThucHienId) {
      queries.dsPhongThucHienId = (listPhongTheoTaiKhoan || [])
        .filter(
          (phong) =>
            !queries.khoaThucHienId || queries.khoaThucHienId == phong.khoaId
        )
        .map((item) => item.id);
    }
    //kiểm tra xem trong query đã có khoaThucHienId chưa, nếu chưa có thì chọn từ cache ra.
    if (!queries.khoaThucHienId) {
      //lấy thông tin khoa làm việc từ cache
      let khoaLamViec = await cacheUtils.read(
        DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT,
        "",
        null,
        false
      );
      //nếu không tồn tại khoa làm việc
      if (!khoaLamViec) {
        //lếu danh sách khoa > 1 (nhiều khoa) thì show ra modal để chọn khoa
        if (listKhoaTheoTaiKhoan.length > 1) {
          refModalKhoaLamViec.current &&
            refModalKhoaLamViec.current.show({}, (data) => {
              //khi chọn khoa xong thì đẩy thông tin khoa lên query
              queries.khoaThucHienId = data?.id;
              setQueryStringValue("khoaThucHienId", queries.khoaThucHienId);
              queries.phongThucHienId = "";
              queries.dsPhongThucHienId = listPhongTheoTaiKhoan
                .filter((phong) => phong.khoaId === queries.khoaThucHienId)
                .map((phong) => phong.id);
              //lưu lại thông tin khoa đã chọn
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
          //ngược lại nếu chỉ có 1 khoa thì chọn luôn khoa đó, lưu lại khoa đã chọn
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
    // //nếu không có khoa thực hiện thì truyền dsKhoaThucHienId = tất cả khoa trong danh sách
    // if (!queries.khoaThucHienId) {
    //   queries.dsKhoaThucHienId = dsKhoaThucHienId;
    // }
    //sử dụng preQuery để kiểm tra dữ liệu trước và sau, tránh load data nhiều lần
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
      // thiếu
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
