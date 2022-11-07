import React, { useEffect, useMemo, useRef, useState } from "react";
import { Main } from "./styled";
import Icon from "@ant-design/icons";
import IcPhauThuat from "assets/svg/noiTru/ic-phau-thuat.svg";
import IcEmptyBox from "assets/svg/noiTru/ic-empty-box.svg";
import { Button, TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Input, Tooltip } from "antd";
import IcDelete from "assets/svg/noiTru/ic-delete.svg";
import IcEdit from "assets/svg/noiTru/ic-edit.svg";
import ChiDinhGoiPTTT from "pages/chiDinhDichVu/GoiPTTT";
import { refConfirm } from "app";

const { Column } = TableWrapper;

const GoiPTTT = () => {
  const { t } = useTranslation();
  const refChiDinhGoiPTTT = useRef(null);

  const { listNbGoiPTTT } = useSelector((state) => state.chiDinhGoiPTTT);
  const { currentToDieuTri } = useSelector((state) => state.toDieuTri);
  const { getDsNbGoiPTTT, xoaNbGoiPTTT } = useDispatch().chiDinhGoiPTTT;

  const [state, _setState] = useState({
    expandIds: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (currentToDieuTri?.nbDotDieuTriId) {
      getDsNbGoiPTTT({
        page: 0,
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuDichVuId: currentToDieuTri?.id,
      });
    }
  }, [currentToDieuTri]);

  const onDeleteGoi = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("common.banCoChacMuonXoa")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          xoaNbGoiPTTT(item?.id).then((res) => {
            refreshList();
          });
        }
      );
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
    }),
    Column({
      title: t("quanLyNoiTru.goiPttt.tenGoiPtTt"),
      width: "300px",
      dataIndex: "tenGoiPtTt",
      key: "tenGoiPtTt",
      i18Name: "quanLyNoiTru.goiPttt.tenGoiPtTt",
    }),
    Column({
      title: t("common.tienIch"),
      width: "50px",
      align: "center",
      i18Name: "common.tienIch",
      render: (item, list, index) => {
        return (
          <>
            {list?.dichVuId && (
              <Tooltip title={`Chỉnh sửa dịch vụ`}>
                <Icon className="ic-edit" component={IcEdit} />
              </Tooltip>
            )}
            <Tooltip title={`Xóa dịch vụ`}>
              <Icon
                className="ic-delete"
                component={IcDelete}
                onClick={onDeleteGoi(item)}
              />
            </Tooltip>
          </>
        );
      },
    }),
  ];

  const onChiDinhGoi = () => {
    refChiDinhGoiPTTT.current &&
      refChiDinhGoiPTTT.current.show({
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuLoaiDichVu: 210,
        chiDinhTuDichVuId: currentToDieuTri?.id,
        khoaChiDinhId: currentToDieuTri?.khoaChiDinhId,
      });
  };

  const refreshList = () => {
    getDsNbGoiPTTT({
      page: 0,
      nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
      chiDinhTuDichVuId: currentToDieuTri?.id,
    });
  };

  return (
    <Main>
      <div className="header">
        <Icon component={IcPhauThuat} />
        <label>Gói mổ 10 ngày</label>
      </div>

      <div className="content">
        {listNbGoiPTTT && listNbGoiPTTT.length > 0 ? (
          <>
            <div className="content-them-moi">
              <label>Thêm gói mổ</label>
              <Input placeholder="Chọn gói mổ" onClick={onChiDinhGoi} />
            </div>
            <div className="content-table">
              <TableWrapper
                rowKey={(record) => record?.id}
                dataSource={listNbGoiPTTT || []}
                columns={columns}
                tableName="table_ToDieuTri_GoiPttt"
              />
            </div>
          </>
        ) : (
          <div className="content-empty">
            <Icon component={IcEmptyBox} />
            <span>Chưa có gói mổ</span>
            <Button type="primary" onClick={onChiDinhGoi}>
              {"Thêm gói mổ"}
            </Button>
          </div>
        )}
      </div>

      <ChiDinhGoiPTTT ref={refChiDinhGoiPTTT} refreshList={refreshList} />
    </Main>
  );
};

export default GoiPTTT;
