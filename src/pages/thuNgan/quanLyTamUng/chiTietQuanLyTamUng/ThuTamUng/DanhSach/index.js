import React, {  useRef, useState } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./general";
import IcCreate from "assets/images/kho/IcCreate.png";
import ThemMoiModal from "pages/thuNgan/quanLyTamUng/chiTietQuanLyTamUng/Modal/ThemMoiModal";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import XemPhieuThuModal from "pages/thuNgan/quanLyTamUng/chiTietQuanLyTamUng/Modal/XemPhieuThuModal";
import HoanTamUng from "../../Modal/HoanTamUngModal";
import printProvider from "data-access/print-provider";

const DanhSach = (props) => {
  const { t } = useTranslation();
  const { hiddenHeader  } = props;
  const { dataSortColumn, listDsThuTamUng, totalElements, page, size } =
    useSelector((state) => state.thuTamUng);
  const [listTrangThaiTamUng] = useEnum(ENUM.TRANG_THAI_TAM_UNG);
  const {
    onSizeChange,
    onSortChange,
    onSearch,
    postNbTamUng,
    huyTamUng,
    onChangeInputSearch,
    hoanUng,
    inPhieuTamUng,
  } = useDispatch().thuTamUng;
  const { tongTienDieuTri } = useDispatch().nbDotDieuTri;
  const { onChangeInputSearch: onChangeInputSearchToanTamUng } =
    useDispatch().hoanTamUng;

  const { id } = useParams();
  const refSettings = useRef(null);
  const refModalThemMoi = useRef(null);
  const refModalXemPhieuThu = useRef(null);
  const refModalHoanUng = useRef(null);
  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        // history.push("/thu-ngan/quan-ly-tam-ung/" + record.id);
      },
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };
  const onOk = (idPhieuThu) => {
    onSearch({ dataSeatch: { nbDotDieuTriId: id } });
    onInPhieuThuTamUng(idPhieuThu);
  };

  const onInPhieuThuTamUng = (idPhieuThu) => {
    inPhieuTamUng(idPhieuThu).then((s) => {
      printProvider.printMergePdf([s?.data.file.pdf]);
    });
  };
  const onDelete = (item) => {
    refConfirm &&
      refConfirm.current &&
      refConfirm.current.show(
        {
          title: "",
          content: t("thuNgan.quanLyTamUng.banDongYHuyPhieuThuTamUng"),
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          huyTamUng(item?.id).then((s) => {
            onChangeInputSearch({
              nbDotDieuTriId: id,
              dsTrangThai: [40, 50],
            });
            tongTienDieuTri({ id });
          });
        },
        () => {}
      );
  };
  const onReturn = (item) => {
    refModalHoanUng.current &&
      refModalHoanUng.current.show(item, (idPhieuThu) => {
        onOkHoanUng(idPhieuThu);
        onChangeInputSearchToanTamUng({
          nbDotDieuTriId: id,
          trangThai: 60,
        });
      });
  };

  const onViewDetail = (item) => {
    refModalXemPhieuThu.current && refModalXemPhieuThu.current.show();
    setState({ data: item });
  };
  const onOkHoanUng = (idPhieuThu) => {
    onChangeInputSearch({
      nbDotDieuTriId: id,
      dsTrangThai: [40, 50],
    });
    onInPhieuThuTamUng(idPhieuThu);
  };

  return (
    <Main>
      <TableWrapper
        columns={columns({
          onClickSort,
          onSettings,
          dataSortColumn,
          onDelete,
          onReturn,
          onViewDetail,
          onInPhieuThuTamUng,
          listTrangThaiTamUng,
          hiddenHeader
        })}
        dataSource={listDsThuTamUng}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 1700 }}
        tableName="tableThuTamUng"
        ref={refSettings}
        title={t("thuNgan.quanLyTamUng.danhSachPhieuThuTamUng")}
        buttonHeader={[
          {
            type: "create",
            title: "Thêm mới [F1]",
            onClick: () => {
              refModalThemMoi.current &&
                refModalThemMoi.current.show({}, (idPhieuThu) => {
                  onOk(idPhieuThu);
                });
            },
            buttonHeaderIcon: (
              <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
            ),
          },
        ]}
        classNameRow={`custom-header ${hiddenHeader ? "none" : ""}`}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listDsThuTamUng}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
      <ThemMoiModal ref={refModalThemMoi} tab="thuTamUng" post={postNbTamUng} />
      <XemPhieuThuModal
        modalXemPhieuThuRef={refModalXemPhieuThu}
        tab="thuTamUng"
        data={state?.data}
      />
      <HoanTamUng ref={refModalHoanUng} post={hoanUng} />
    </Main>
  );
};

export default DanhSach;
