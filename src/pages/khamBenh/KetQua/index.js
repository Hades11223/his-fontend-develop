import React, { useState, useEffect, useMemo } from "react";
import { Collapse } from "antd";
import Header from "./Header";
import DanhSachDichVu from "./DanhSachDichVu";
import { groupBy, orderBy } from "lodash";
import { CollapseWrapper } from "./styled";
import { connect, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import printProvider from "data-access/print-provider";

const { Panel } = Collapse;

function KetQua(props) {
  const { t } = useTranslation();
  const {
    chiDinhTuDichVuId,
    dsKetQuaXN,
    dsKetQuaDichVuCLS,
    getDsKetQuaXN,
    getDsKetQuaDichVuCLS,
  } = props;

  const {
    pacs: { pacsUrl },
    khamBenh: { listThietLapTrangThai },
  } = useSelector((state) => state);

  const {
    pacs: { getUrl },
    nbHoSo: { getKetQuaXNPdf },
    choTiepDonDV: { getPhieuKetQua },
  } = useDispatch();

  const [state, _setState] = useState({
    collapsedKey: null,
    dataSortColumn: {},
  });

  useEffect(() => {
    if (chiDinhTuDichVuId) {
      getDsKetQuaXN();
      getDsKetQuaDichVuCLS();
    }
  }, [chiDinhTuDichVuId]);

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };

  const onCollapsed = (value) => {
    setState({
      collapsedKey: value,
    });
  };

  const groupAndOrderItem = (items, groupkey, orderKey) => {
    const groupData = groupBy(items, "trangChiDinh");
    const data = {};
    Object.keys(groupData).forEach((trangChiDinh) => {
      data[`${trangChiDinh}-${groupkey}`] = orderBy(
        groupData[trangChiDinh],
        orderKey,
        "asc"
      );
    });

    return data;
  };

  const dataKetQuaXN = useMemo(() => {
    return groupAndOrderItem(dsKetQuaXN, "xn", [
      "phieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsKetQuaXN]);

  const dataKetQuaDichVuCLS = useMemo(() => {
    return groupAndOrderItem(dsKetQuaDichVuCLS, "cls", [
      "phieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsKetQuaDichVuCLS]);

  const dataSource = useMemo(() => {
    return { ...dataKetQuaXN, ...dataKetQuaDichVuCLS };
  }, [dataKetQuaXN, dataKetQuaDichVuCLS]);

  const onViewPacs = (data) => {
    getUrl({ id: data[0]?.id }).then((res) => {
      window.open(res, "_blank").focus();
    });
  };

  const onPrintPdfLis = (data) => {
    let payload = {
      nbDotDieuTriId: data[0]?.nbDotDieuTriId,
      dsSoPhieuId: data[0]?.soPhieuId,
    };

    getKetQuaXNPdf(payload).then((s) => {
      if (s.dsPhieuHis && s.dsPhieuHis.length > 0) {
        printProvider.printMergePdf(
          s.dsPhieuHis.map((item) => {
            return item.file.pdf;
          })
        );
      } else {
        printProvider.printMergePdf(
          s.dsPhieuLis.map((item) => {
            return item.duongDan;
          })
        );
      }
    });
  };

  const onPrintPdfCdha = (data) => {
    let payload = {
      nbDotDieuTriId: data[0]?.nbDotDieuTriId,
      dsSoKetNoi: data[0]?.soKetNoi,
    };

    getPhieuKetQua(payload).then((s) => {
      let dsPhieuPacs = groupBy(s.dsPhieuPacs || [], "soPhieuId");
      dsPhieuPacs = Object.keys(dsPhieuPacs).map((key) => {
        const item = dsPhieuPacs[key].sort((a, b) => {
          return a.thoiGianCoKetQua > b.thoiGianCoKetQua ? -1 : 1;
        })[0];
        item.file = { pdf: item.duongDan };
        return item;
      });
      let data = [
        ...dsPhieuPacs,
        ...(s?.dsPhieuHis || []),
        ...(s?.dsPhieuLis || []).map((item) => {
          return item;
        }),
      ];  
      printProvider.printMergePdf(data.map((item) => item?.file?.pdf));
    });
  };

  const listPanel = useMemo(() => {
    return Object.keys(dataSource)
      .map((key, index) => {
        const {
          soPhieu,
          tenNhomDichVuCap1,
          tenNhomDichVuCap2,
          tenNhomDichVuCap3,
          tenBacSiChiDinh,
          tenKhoaThucHien,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          trangThai,
          loaiDichVu,
        } = dataSource[key][0] || {};
        let hasThietLapTrangThai = listThietLapTrangThai?.filter(
          (item) =>
            item.nhomDichVuCap3Id == nhomDichVuCap3Id ||
            (item.nhomDichVuCap2Id == nhomDichVuCap2Id &&
              item.trangThaiHoanThanh == trangThai)
        );
        const title = `${t("khamBenh.ketQua.ketQua")} ${
          tenNhomDichVuCap1 || ""
        } ${tenNhomDichVuCap2 || ""} ${tenNhomDichVuCap3 || ""}`;

        if (hasThietLapTrangThai.length > 0) {
          return {
            header: (
              <Header
                title={title}
                isCollapsed={state.collapsedKey === key}
                key={key}
                dataSource={dataSource[key]}
                onViewPacs={() => onViewPacs(dataSource[key])}
                onPrint={
                  loaiDichVu === 20
                    ? () => onPrintPdfLis(dataSource[key])
                    : loaiDichVu === 30
                    ? () => onPrintPdfCdha(dataSource[key])
                    : null
                }
              />
            ),
            content: (
              <DanhSachDichVu
                loaiDichVu={loaiDichVu}
                dataGroup={orderBy(dataSource[key], "thoiGianCoKetQua", "desc")}
                dataSortColumn={state.dataSortColumn}
                soPhieu={soPhieu}
                tenBacSiChiDinh={tenBacSiChiDinh}
                tenKhoaThucHien={tenKhoaThucHien}
                nhomDichVuCap1Id={nhomDichVuCap1Id}
              />
            ),
            key,
          };
        }
      })
      .filter((item) => item);
  }, [dataSource, state.dataSortColumn, state.collapsedKey]);

  return (
    <div className="collapse-content fadeIn">
      <CollapseWrapper bordered={false} accordion onChange={onCollapsed}>
        {listPanel.map((panel, idx) => (
          <Panel showArrow={false} key={panel.key} header={panel.header}>
            {panel.content}
          </Panel>
        ))}
      </CollapseWrapper>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    ketQuaKham: { dsKetQuaXN, dsKetQuaDichVuCLS },
    khamBenh: { thongTinChiTiet },
  } = state;
  const chiDinhTuDichVuId = thongTinChiTiet?.id;
  return { dsKetQuaXN, dsKetQuaDichVuCLS, chiDinhTuDichVuId };
};

export default connect(
  mapStateToProps,
  ({ ketQuaKham: { getDsKetQuaXN, getDsKetQuaDichVuCLS } }) => ({
    getDsKetQuaXN,
    getDsKetQuaDichVuCLS,
  })
)(KetQua);
