import { TableWrapper } from "components";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import IcEye from "assets/svg/noiTru/ic-eye.svg";
import IcAdd from "assets/svg/noiTru/ic-add.svg";
import Icon from "@ant-design/icons";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import ModalChiTietDichVuTrongGoi from "../Modal/ModalChiTietDichVuTrongGoi";
import ModalThemDichVuVaoGoi from "../Modal/ModalThemDichVuVaoGoi";
import moment from "moment";

const { Column } = TableWrapper;

const GoiPtTt = () => {
  const { t } = useTranslation();
  const refModalChiTietDichVuTrongGoi = useRef(null);
  const refModalThemDichVuVaoGoi = useRef(null);

  const { listNbGoiPTTT } = useSelector((state) => state.chiDinhGoiPTTT);
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { getDsNbGoiPTTT } = useDispatch().chiDinhGoiPTTT;

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
    if (infoPatient?.id) {
      getDsNbGoiPTTT({
        page: 0,
        nbDotDieuTriId: infoPatient?.id,
      });
    }
  }, [infoPatient]);

  const onShowDvTrongGoi = (item) => {
    refModalChiTietDichVuTrongGoi.current &&
      refModalChiTietDichVuTrongGoi.current.show({
        currentItem: (listNbGoiPTTT || []).find(
          (x) => x.id == item.nbGoiPtTtId
        ),
        nbGoiPtTtId: item.nbGoiPtTtId,
        nbDotDieuTriId: infoPatient?.id,
      });
  };

  const onAddDichVuVaoGoi = (item) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    refModalThemDichVuVaoGoi.current &&
      refModalThemDichVuVaoGoi.current.show(
        {
          nbGoiPtTtId: item.id,
          thoiGianThucHien: item.thoiGianThucHien,
        },
        () => {
          refreshList();
        }
      );
  };

  const refreshList = () => {
    getDsNbGoiPTTT({
      page: 0,
      nbDotDieuTriId: infoPatient?.id,
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
    }),
    Column({
      title: t("quanLyNoiTru.goiPttt.tenGoiPtTt"),
      width: "250px",
      dataIndex: "tenGoiPtTt",
      key: "tenGoiPtTt",
      i18Name: "quanLyNoiTru.goiPttt.tenGoiPtTt",
      render: (item, list, index) => {
        return (
          <>
            {list.children &&
              (state.expandIds.includes(list.id) ? (
                <CaretDownOutlined />
              ) : (
                <CaretRightOutlined />
              ))}{" "}
            <span style={!list.children ? { fontStyle: "italic" } : {}}>
              {item}
            </span>
          </>
        );
      },
    }),
    Column({
      title: t("common.thanhTien"),
      width: "80px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      i18Name: "common.thanhTien",
      render: (item, list, index) => {
        return (
          <div style={!list.children ? { fontStyle: "italic" } : {}}>
            {item?.formatPrice() || ""}
          </div>
        );
      },
    }),
    Column({
      title: t("quanLyNoiTru.thoiGianYLenh"),
      width: "120px",
      dataIndex: "thoiGianYLenh",
      key: "thoiGianYLenh",
      i18Name: "quanLyNoiTru.thoiGianYLenh",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("quanLyNoiTru.khoaChiDinh"),
      width: "120px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      i18Name: "quanLyNoiTru.khoaChiDinh",
    }),
    Column({
      title: t("common.tienIch"),
      width: "50px",
      align: "center",
      i18Name: "common.tienIch",
      render: (item, list, index) => {
        return (
          <>
            {list.children ? (
              <Icon
                className="ic-action"
                component={IcAdd}
                onClick={onAddDichVuVaoGoi(item)}
              ></Icon>
            ) : (
              <Icon className="ic-action" component={IcEye}></Icon>
            )}
          </>
        );
      },
    }),
  ];

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        if (record.children) {
          const findIndex = state.expandIds.find((x) => x === record.id);
          if (findIndex > -1) {
            setState({
              expandIds: state.expandIds.filter((x) => x !== record.id),
            });
          } else {
            setState({
              expandIds: [...state.expandIds, record.id],
            });
          }
        } else {
          onShowDvTrongGoi(record);
        }
      },
    };
  };

  return (
    <Main>
      <div className="table-content">
        <TableWrapper
          title={"Gói mổ 10 ngày"}
          columns={columns}
          dataSource={(listNbGoiPTTT || []).map((item) => ({
            ...item,
            children: [
              {
                key: `${item.id}-child`,
                nbGoiPtTtId: item.id,
                tenGoiPtTt: "Các dịch vụ, hàng hóa trong gói",
                thanhTien: item.tongThanhTien || 0,
              },
            ],
          }))}
          onRow={onRow}
          expandable={{
            expandRowByClick: true,
            expandIcon: ({ expanded, onExpand, record }) => null,
          }}
        />
      </div>

      <ModalChiTietDichVuTrongGoi
        ref={refModalChiTietDichVuTrongGoi}
        onAddDichVuVaoGoi={onAddDichVuVaoGoi}
      />
      <ModalThemDichVuVaoGoi ref={refModalThemDichVuVaoGoi} />
    </Main>
  );
};

export default GoiPtTt;
