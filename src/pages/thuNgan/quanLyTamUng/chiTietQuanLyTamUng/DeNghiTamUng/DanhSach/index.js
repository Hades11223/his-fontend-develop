import React, { useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./general";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useTranslation } from "react-i18next";
import { ModalNotification2 } from "components/ModalConfirm";
import ThemMoiModal from "pages/thuNgan/quanLyTamUng/chiTietQuanLyTamUng/Modal/ThemMoiModal";
import printProvider from "data-access/print-provider";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
const DanhSach = (props) => {
  const { t } = useTranslation();
  const { dataSortColumn, listDsDeNghiTamUng, totalElements, page, size } =
    useSelector((state) => state.deNghiTamUng);

  const {
    quanLyTamUng: { onDelete },
    deNghiTamUng: {
      onSizeChange,
      onSortChange,
      onSearch,
      postDeNghiTamUng,
      duyetDeNghiTamUng,
      suaDeNghiTamUng,
    },
    thuTamUng: { onChangeInputSearch, inPhieuTamUng },
  } = useDispatch();

  const { id } = useParams();
  const refSettings = useRef(null);
  const refThemMoiThuTamUng = useRef(null);
  const refDuyet = useRef(null);
  const refXoa = useRef(null);
  const refSuaDeNghiTamUng = useRef(null);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
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

  const showModaConfirmRemove = (data) => {
    refXoa &&
      refXoa.current &&
      refXoa.current.show(
        {
          title: "",
          content: `${t("thuNgan.quanLyTamUng.xacNhanXoaDeNghi")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          typeModal: "warning",
          showBtnOk: true,
        },
        () => {
          onDelete(data?.id).then(() => {
            onSearch({ dataSearch: { nbDotDieuTriId: id, trangThai: 10 } });
          });
        },
        () => {}
      );
  };

  const onOk = (idPhieuThu) => {
    onSearch({ dataSearch: { nbDotDieuTriId: id, trangThai: 10 } });
    onInPhieuTamUng(idPhieuThu);
  };

  const onOkSuaPhieu = () => {
    onSearch({ dataSearch: { nbDotDieuTriId: id, trangThai: 10 } });
  };

  const onOkDuyetDeNghi = (idPhieuThu) => {
    onChangeInputSearch({ nbDotDieuTriId: id, dsTrangThai: [40, 50] });
    onInPhieuTamUng(idPhieuThu);
  };

  const onInPhieuTamUng = (idPhieuThu) => {
    inPhieuTamUng(idPhieuThu).then((s) => {
      printProvider.printMergePdf([s?.data.file.pdf]);
    });
  };

  const onShowDuyetTamUng = (item) => {
    refThemMoiThuTamUng.current &&
      refThemMoiThuTamUng.current.show(item, (idPhieuThu) => {
        onOkDuyetDeNghi(idPhieuThu);
      });
  };

  const onShowEditDeNghiTamUng = (item) => {
    refSuaDeNghiTamUng.current &&
      refSuaDeNghiTamUng.current.show(item, () => {
        onOkSuaPhieu();
      });
  };
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns({
            onClickSort,
            onSettings,
            dataSortColumn,
            onShowDuyetTamUng,
            showModaConfirmRemove,
            t,
            onShowEditDeNghiTamUng,
            onInPhieuTamUng,
          })}
          dataSource={listDsDeNghiTamUng}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          scroll={{ x: 2000 }}
          tableName="tableDeNghiTamUng"
          ref={refSettings}
          title={t("thuNgan.quanLyTamUng.danhSachDeNghiTamUng")}
          buttonHeader={
            checkRole([ROLES["THU_NGAN"].THEM_DE_NGHI_TAM_UNG])
              ? [
                  {
                    onClick: () => {
                      refDuyet.current &&
                        refDuyet.current.show({}, (idPhieuThu) => {
                          onOk(idPhieuThu);
                        });
                    },
                    type: "create",
                    title: `${t("common.themMoi")} [F1]`,
                    buttonHeaderIcon: (
                      <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                    ),
                  },
                ]
              : []
          }
          classNameRow={"custom-header"}
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
            listData={listDsDeNghiTamUng}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          />
        )}
      </ContentTable>
      <ModalNotification2 ref={refXoa} />
      <ThemMoiModal ref={refDuyet} tab="deNghiTamUng" post={postDeNghiTamUng} />
      <ThemMoiModal
        ref={refThemMoiThuTamUng}
        tab="thuTamUng"
        post={duyetDeNghiTamUng}
      />
      <ThemMoiModal
        ref={refSuaDeNghiTamUng}
        tab="deNghiTamUng"
        post={suaDeNghiTamUng}
      />
    </Main>
  );
};

export default DanhSach;
