import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import HeaderSearchPhieuHoan from "./components/headerSearch";
import {
  HeaderSearch,
  Page,
  TableWrapper,
  Pagination,
  ModalChonToaNha,
} from "components";
import { Tooltip } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import viewItem from "assets/svg/thuNgan/viewItem.svg";
import Icon from "@ant-design/icons";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum, useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import IcLocation from "assets/images/thuNgan/icLocation.png";
import IconEdit from "assets/images/khamBenh/edit.png";

const DsPhieuYeuCauHoan = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const refModalChonToaNha = useRef(null);
  const auth = useStore("auth.auth", {});
  const listNhaTheoTaiKhoan = useStore("toaNha.listNhaTheoTaiKhoan", []);
  const { totalElements, listData, page, size, dataSortColumn } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );
  const [listLoaiDoiTra] = useEnum(ENUM.LOAI_DOI_TRA);

  const {
    danhSachPhieuYeuCauHoan: { onSizeChange, onSortChange, onSearch },
  } = dispatch;

  const [state, _setState] = useState({});
  console.log(state);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onSizeChange({
      size: 10,
      dataSearch: {
        dsTrangThai: [20],
        loai: checkRole([ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC]) ? 40 : null,
      },
      dataSortColumn: {},
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_TAM_UNG",
        "",
        null,
        false
      );
      if (!nhaTamUng) {
        if (auth?.dsToaNha?.length === 1) {
          cacheUtils.save("DATA_NHA_TAM_UNG", "", auth?.dsToaNha[0]?.id, false);
          setState({ nhaTamUng: auth?.dsToaNha[0]?.id });
        } else {
          refModalChonToaNha.current &&
            refModalChonToaNha.current.show({}, (e) => {
              setState({ nhaTamUng: e });
              cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
            });
        }
      } else {
        setState({ nhaTamUng });
      }
    }
    fetchData();
  }, [auth?.dsToaNha]);

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const handleSizeChange = (size) => {
    onSizeChange({
      size,
      dataSearch: {
        loai: checkRole([ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC]) ? 40 : null,
      },
    });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        // if (!checkRole([ROLES["THU_NGAN"].CHI_TIET_PHIEU_HOAN_TRA], roles))
        //   return;
        const { maHoSo, id, nbDotDieuTriId, soPhieu } = record;
        history.push(
          `/thu-ngan/chi-tiet-phieu-hoan-tra/${maHoSo}/${id}/${nbDotDieuTriId}/${soPhieu}`
        );
      },
    };
  };
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 });
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soPhieu")}
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soPhieu || 0}
        />
      ),
      width: 90,
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.maNb || 0}
        />
      ),
      width: 120,
      dataIndex: "maNb",
      key: "maNb",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.hoTenNguoiBenh")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenNb || 0}
        />
      ),
      width: 200,
      dataIndex: "tenNb",
      key: "tenNb",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tienNbTraThem")}
          // sort_key="tienNbTraThem"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn?.tienNbTraThem || 0}
        />
      ),
      width: 120,
      dataIndex: "tienNbTraThem",
      key: "tienNbTraThem",
      align: "right",
      render: (item, list) => {
        return (
          list?.thanhTienMoi -
          list?.thanhTienCu +
          list?.tienPhiTra
        )?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tongTienDVTraLai")}
          sort_key="thanhTienCu"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn?.thanhTienMoi || 0}
        />
      ),
      width: 120,
      dataIndex: "thanhTienCu",
      key: "thanhTienCu",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },

    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tongTienDVMoi")}
          sort_key="thanhTienMoi"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn?.active || 0}
        />
      ),
      width: 120,
      dataIndex: "thanhTienMoi",
      key: "thanhTienMoi",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.thoiGianYeuCau")}
          sort_key="thoiGianYeuCau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thoiGianYeuCau || 0}
        />
      ),
      width: 160,
      dataIndex: "thoiGianYeuCau",
      key: "thoiGianYeuCau",
      align: "center",
      render: (item) => {
        return <>{moment(item).format("DD/MM/YYYY hh:mm:ss")}</>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.trangThaiPhieu")}
          sort_key="trangThai"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn?.trangThai || 0}
        />
      ),
      width: 140,
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (item) => {
        return (
          <>{item === 20 ? t("thuNgan.choHoan") : t("thuNgan.hoanThanh")} </>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.hinhThucHoan")}
          sort_key="loai"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn?.loai || 0}
        />
      ),
      width: 140,
      dataIndex: "loai",
      key: "loai",
      align: "center",
      render: (item) => {
        return (listLoaiDoiTra || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("thuNgan.xemPhieu")} sort_key="soPhieu" />,
      width: 100,
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "center",
      render: (item) => {
        return (
          <Tooltip title={t("thuNgan.xemPhieu")} placement="bottom">
            <Icon component={viewItem} onClick={() => {}}></Icon>
          </Tooltip>
        );
      },
    },
  ];

  const onEdit = () => {
    refModalChonToaNha.current &&
      refModalChonToaNha.current.show(state?.nhaTamUng, (e) => {
        setState({ nhaTamUng: e });
        cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
      });
  };
  return (
    <Page
      breadcrumb={[
        { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
        {
          title: t("thuNgan.danhSachPhieuYeuCauHoan"),
          link: "/thu-ngan/ds-phieu-yeu-cau-hoan",
        },
      ]}
      title={t("thuNgan.danhSachPhieuYeuCauHoan")}
      titleRight={
        <>
          <img src={IcLocation} alt={IcLocation} />{" "}
          <span
            style={{ fontWeight: "bold", padding: "0px 5px", fontSize: "16px" }}
          >
            {" "}
            {listNhaTheoTaiKhoan.find((x) => x.id === state?.nhaTamUng)?.ten}
          </span>
          <img
            src={IconEdit}
            alt={IconEdit}
            style={{ cursor: "pointer" }}
            onClick={onEdit}
          />
        </>
      }
    >
      <Main>
        <HeaderSearchPhieuHoan />
        <div className="table">
          <TableWrapper
            columns={columnsGroup}
            dataSource={listData || []}
            onRow={onRow}
            scroll={{ x: 400 }}
          />
          {!!totalElements ? (
            <Pagination
              listData={listData}
              onChange={handleChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </div>
      </Main>
      <ModalChonToaNha ref={refModalChonToaNha} />
    </Page>
  );
};

export default DsPhieuYeuCauHoan;
