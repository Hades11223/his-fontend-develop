import { Checkbox, Tooltip } from "antd";
import { HeaderSearch } from "components";
import { useEnum, useStore } from "hook";
import ScreenPhieuLinh from "pages/quanLyNoiTru/components/ScreenPhieuLinh";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import IcSetting from "assets/svg/ic-setting.svg";
import { useSelector } from "react-redux";
import IconDetail from "assets/images/his-core/iconDetail.png";
import { ENUM } from "constants/index";

const DanhSachLinh = () => {
  const [state, _setState] = useState({
    dataSortColumn: {},
    listCheckId: [],
  });
  const { t } = useTranslation();
  const [listTrangThai] = useEnum(ENUM.TRANG_THAI_PHIEU_LINH_SUAT_AN, []);
  const dsPhieuNhapXuat = useStore("nbPhieuLinhSuatAn.listData", []);
  const totalElements = useStore("nbPhieuLinhSuatAn.totalElements", 0);
  const { searchValue } = useSelector((state) => state.nbPhieuLinhSuatAn);
  const refSearch = useRef(null);

  const {
    nbPhieuLinhSuatAn: { search },
  } = useDispatch();

  useEffect(() => {
    refSearch.current && refSearch.current.search(searchValue);
  }, [searchValue]);

  //column
  const renderColumns = ({ columns, onSettings }) => [
    columns.stt,
    columns.inputTimeout({
      title: "Khoa chỉ định",
      dataIndex: "tenKhoa",
      width: 200,
    }),
    columns.date({
      title: "Ngày thực hiện",
      dataIndex: "ngayThucHien",
    }),
    columns.inputTimeout({
      title: "Số phiếu",
      dataIndex: "soPhieu",
      width: 100,
      align: "center",
    }),
    columns.checkbox({
      title: "Đã phát",
      dataIndex: "trangThai",
      render: (item) => <Checkbox checked={item === 20}></Checkbox>,
    }),
    columns.checkbox({
      title: "Đột xuất",
      dataIndex: "dotXuat",
      dataSearch: ["Đột xuất", "Không đột xuất"],
    }),
    columns.inputTimeout({
      title: "Người duyệt",
      dataIndex: "tenNguoiDuyet",
      width: 180,
    }),
    {
      title: (
        <HeaderSearch
          title={
            <>
              Xem chi tiết
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        ></HeaderSearch>
      ),
      fixed: "right",
      align: "center",
      width: 90,
      render: (_, item) => (
        <Tooltip title="Xem chi tiết">
          <img onClick={onRow(item).click} src={IconDetail} alt="..." />
        </Tooltip>
      ),
    },
  ];

  const history = useHistory();

  const onRow = (record) => ({
    onClick: (e) => {
      if (e.target.nodeName !== "INPUT") {
        history.push(
          "/quan-ly-noi-tru/chi-tiet-phieu-linh-suat-an/" + record.id
        );
      }
    },
  });

  return (
    <ScreenPhieuLinh.DanhSach
      ref={refSearch}
      onRow={onRow}
      renderColumns={renderColumns}
      getDanhSach={search}
      dataSource={dsPhieuNhapXuat}
      totalElements={totalElements}
      tableName="table_NOITRU_DanhSachSuatAn"
      initParam={{
        page: 0,
        size: 10,
        loai: 10,
      }}
    ></ScreenPhieuLinh.DanhSach>
  );
};

export default DanhSachLinh;
