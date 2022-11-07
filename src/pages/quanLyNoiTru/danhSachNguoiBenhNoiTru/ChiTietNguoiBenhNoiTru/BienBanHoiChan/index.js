import React, { useEffect, useMemo, useRef, useState } from "react";
import { Main } from "./styled";
import empty from "assets/images/kho/empty.png";
import { Button, HeaderSearch, Pagination } from "components";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import IconEdit from "assets/images/noiTru/icEdit.png";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import IcCreate from "assets/images/kho/IcCreate.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { ModalNotification2 } from "components/ModalConfirm";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM, ROLES, TRANG_THAI_NB } from "constants/index";
import moment from "moment";
import cacheUtils from "utils/cache-utils";
import { checkRole } from "utils/role-utils";

const HoiChan = () => {
  const { listDsBienBanHoiChan, dataSortColumn, totalElements, page, size } =
    useSelector((state) => state.nbBienBanHoiChan);
  const {
    nbBienBanHoiChan: {
      onSearch,
      onSizeChange,
      onSortChange,
      onDelete,
      onChangeInputSearch,
    },
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();
  const refModalConfirm = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const [listtienLuong] = useEnum(ENUM.TIEN_LUONG);

  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  useEffect(() => {
    if (id) {
      onChangeInputSearch({ nbDotDieuTriId: id });
      getNbNoiTruById(id);
    }
  }, [id]);

  const [state, _setState] = useState();

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onDeleteItem = (item) => {
    onDelete(item.id).then(() => {
      onSearch({ dataSearch: { nbDotDieuTriId: id } });
    });
  };

  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      setState({ khoaLamViec });
    }
    fetchData();
  }, []);

  const isReadonly = useMemo(() => {
    return (
      (infoPatient?.khoaNbId !== state?.khoaLamViec?.id ||
        [
          TRANG_THAI_NB.DANG_CHUYEN_KHOA,
          TRANG_THAI_NB.HEN_DIEU_TRI,
          TRANG_THAI_NB.DA_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_HEN_DIEU_TRI,
        ].includes(infoPatient?.trangThai)) &&
      !checkRole([ROLES["QUAN_LY_NOI_TRU"].THAO_TAC_NB_KHAC_KHOA])
    );
  }, [infoPatient, state?.khoaLamViec]);

  const showModaConfirmRemove = (item) => {
    refModalConfirm.current &&
      refModalConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: `${t("quanLyNoiTru.banCoChacChanXoaPhieuKhoiHeThong")}?`,
          cancelText: t("common.huy"),
          okText: t("common.xacNhan"),
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          onDeleteItem(item);
        },
        () => {}
      );
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("hoiChan.ngayHoiChan")}
          sort_key="dienBien"
          dataSort={dataSortColumn["thoiGianThucHien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      show: true,
      render: (item) => (
        <div className="item">
          {item && moment(item).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("hoiChan.chuTri")}
          sort_key="chuTriId"
          dataSort={dataSortColumn["chuTriId"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "chuTri",
      key: "chuTri",
      show: true,
      render: (item) => <div className="item">{item?.ten}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("hoiChan.tienLuong")}
          sort_key="tienLuong"
          dataSort={dataSortColumn["tienLuong"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "tienLuong",
      key: "tienLuong",
      show: true,
      render: (item) => (
        <div className="item">
          {(listtienLuong || []).find((x) => x.id === item)?.ten}
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("hoiChan.tomTatQuaTrinhBienBienDieuTriBenh")}
          sort_key="dienBienBenh"
          dataSort={dataSortColumn["dienBienBenh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "200px",
      dataIndex: "dienBienBenh",
      key: "dienBienBenh",
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("hoiChan.ketLuan")}
          sort_key="danhGiaKetQua"
          dataSort={dataSortColumn["ketLuan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "ketLuan",
      key: "ketLuan",
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("hoiChan.huongDieuTri")}
          sort_key="huongDieuTri"
          dataSort={dataSortColumn["huongDieuTri"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "huongDieuTri",
      key: "huongDieuTri",
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: <HeaderSearch title={t("common.thaoTac")} />,
      width: "60px",
      align: "right",
      show: true,
      render: (item, data) => {
        return (
          <div className="image">
            <img
              src={IconEdit}
              alt={IconEdit}
              onClick={() =>
                history.push(
                  `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/bien-ban-hoi-chan/chi-tiet/${data.id}`
                )
              }
            />
            {!isReadonly && (
              <img
                src={IconDelete}
                alt={IconDelete}
                onClick={() => showModaConfirmRemove(item)}
              />
            )}
          </div>
        );
      },
    },
  ];
  const onCreate = () => {
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/bien-ban-hoi-chan/them-moi?nbDotDieuTriId=${id}`
    );
  };

  return (
    <Main>
      <div className="title">
        <div className="left">
          <h1>{t("quanLyNoiTru.lichSuHoiChan")}</h1>
        </div>
        {!!listDsBienBanHoiChan.length && !isReadonly && (
          <div className="right">
            <Button
              type="success"
              iconHeight={30}
              rightIcon={<img src={IcCreate} alt={IcCreate} />}
              onClick={() => onCreate()}
            >
              {t("common.themMoi")} [F1]
            </Button>{" "}
          </div>
        )}
      </div>

      {!listDsBienBanHoiChan.length && !isReadonly && (
        <div className="dieuTriSoKet">
          <img src={empty} alt="..." />
          <div style={{ padding: "10px 0" }}>
            {t("quanLyNoiTru.chuaTaoHoiChan")}
          </div>
          <Button type="primary" onClick={() => onCreate()}>
            {t("quanLyNoiTru.taoHoiChanMoi")}
          </Button>
        </div>
      )}
      {!!listDsBienBanHoiChan.length && (
        <div>
          <TableWrapper
            columns={columns}
            dataSource={listDsBienBanHoiChan}
            rowKey={(record) => record?.id}
          />

          {!!totalElements && (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listDsBienBanHoiChan}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              stylePagination={{ flex: 1, justifyContent: "flex-start" }}
            />
          )}
        </div>
      )}
      <ModalNotification2 ref={refModalConfirm} />
    </Main>
  );
};

export default HoiChan;
