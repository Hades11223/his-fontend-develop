import React, { memo, useEffect, useState, useRef } from "react";
import { Checkbox, message, Button } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { ChiDinhBoSungWrapper } from "./styled";
import Select from "components/Select";
import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import { LOAI_DICH_VU } from "constants/index";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalChiDinh = (props) => {
  const { t } = useTranslation();
  const { width, dataSource, onCancel, visible, dataNbChiDinh } = props;
  const refFuncSubmit = useRef(null);

  const listAllBenhPham = useSelector((state) => state.benhPham.listAllBenhPham);
  const listPhongThucHien = useSelector(
    (state) => state.phongThucHien.listData || []
  );

  const {
    chiDinhDichVuCls: {
      chiDinhDichVu,
      getDsDichVuChiDinhXN,
      getDsDichVuChiDinhCLS,
    },
    benhPham: { getListAllBenhPham },
    phongThucHien: { getData: searchPhongThucHien },
  } = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dataTable, setData] = useState([]);
  const [listErrorCode, setListErrorCode] = useState([]);
  const dataPhongThucHien = listPhongThucHien.map((item) => ({
    id: item.phongId,
    ten: item.phong?.ten,
    dichVuId: item.dichVuId,
  }));

  useEffect(() => {
    if (!dataSource.length) return;
    let listErrorCode = [];
    const data = dataSource.map((item, idx) => {
      const nbDichVu = item.nbDichVu;
      listErrorCode = [...listErrorCode, item.code];
      return {
        benhPhamId: item.benhPhamId,
        nbChanDoan: { cdSoBo: item.nbChanDoan?.cdSoBo },
        nbDichVu: {
          dichVu: nbDichVu?.dichVu,
          dichVuId: nbDichVu?.dichVuId,
          soLuong: 1,
          chiDinhTuDichVuId: nbDichVu?.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: nbDichVu?.chiDinhTuLoaiDichVu,
          khoaChiDinhId: nbDichVu?.khoaChiDinhId,
          loaiDichVu: nbDichVu?.loaiDichVu,
        },
        nbDotDieuTriId: item.nbDotDieuTriId,
        nbDvKyThuat: {
          phongThucHienId: item.nbDvKyThuat?.phongThucHienId,
        },
        key: idx,
        stt: idx + 1,
        code: item.code,
      };
    });
    setData(data);
    setListErrorCode([...new Set(listErrorCode)]);
  }, [dataSource]);

  const onChange = (type, idx) => async (e) => {
    let value = e;
    if (e.target) {
      value = e.target.checked;
    } else {
      let item = value[0];
      if (typeof item === "string") {
        const response = await benhPhamProvider.post({
          ten: item,
        });
        if (response.code === 0) {
          value = response.data.id;
          getListAllBenhPham();
        } else {
          value = item;
        }
      }
    }
    dataTable.map((item, index) => {
      if (idx === index) {
        if (type === "benhPhamId") item.benhPhamId = value;
        if (type === "phongThucHienId")
          item.nbDvKyThuat.phongThucHienId = value;
        if (type === "tuTra") item.nbDichVu.tuTra = value;
      }
      return item;
    });
    setData([...dataTable]);
  };

  const getDsDichVu = (listLoaiDv) => {
    const payload = {
      chiDinhTuDichVuId: dataNbChiDinh?.id,
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
    };
    if (listLoaiDv.includes(LOAI_DICH_VU.XET_NGHIEM)) {
      getDsDichVuChiDinhXN(payload);
    }
    if (listLoaiDv.includes(LOAI_DICH_VU.CDHA)) {
      getDsDichVuChiDinhCLS(payload);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isInValid = dataTable.some(
      (item) =>
        (item.code === 8709 && !item.benhPhamId) ||
        (item.code === 7802 && !item.nbDvKyThuat?.phongThucHienId)
    );
    if (isInValid) {
      message.error(t("khamBenh.chiDinh.moiBoSungThongTinDichVuConThieu"));
      return;
    }
    const updatedData = dataTable.map((item) => {
      delete item["key"];
      delete item["stt"];
      delete item["code"];
      if (item.benhPhamId?.length) {
        item.benhPhamId = item.benhPhamId[item.benhPhamId.length - 1];
      }
      return item;
    });

    setLoading(true);
    chiDinhDichVu({ dataTable: updatedData, isUpdateInfo: true })
      .then(({ code, listLoaiDichVu, neededUpdateRecord }) => {
        if (code === 0 && !neededUpdateRecord.length) {
          getDsDichVu(listLoaiDichVu);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  refFuncSubmit.current = onSubmit;

  const onSearhDSPhong =
    ({ dichVuId }) =>
    () => {
      searchPhongThucHien({ dichVuId });
    };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "stt",
      align: "center",
      key: "stt",
    },
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      width: "250px",
      dataIndex: "tenDichVu",
      align: "left",
      key: "tenDichVu",
      render: (item, record) => record?.nbDichVu?.dichVu.ten,
    },
    {
      title: <HeaderSearch title={t("khamBenh.chiDinh.benhPham")} />,
      width: "250px",
      dataIndex: "benhPhamId",
      key: "benhPhamId",
      render: (item, record, idx) => {
        return (
          <Select
            // mode="tags"
            // defaultValue={record?.benhPhamId || null}
            className={
              record.code === 8709 && !record.benhPhamId ? "error" : ""
            }
            allowClear
            data={listAllBenhPham}
            showSearch={true}
            placeholder={t("common.luaChon")}
            onChange={onChange("benhPhamId", idx)}
          ></Select>
        );
      },
      className: "custom-col",
    },
    {
      title: <HeaderSearch title={t("khamBenh.chiDinh.phongThucHien")} />,
      width: "150px",
      dataIndex: "phongThucHienId",
      key: "phongThucHienId",
      className: "custom-col",
      render: (item, record, idx) => (
        <Select
          defaultValue={record?.nbDvKyThuat?.phongThucHienId}
          className={record.code === 7802 && !record.benhPhamId ? "error" : ""}
          allowClear
          data={dataPhongThucHien}
          placeholder={t("common.luaChon")}
          onChange={onChange("phongThucHienId", idx)}
          onClick={onSearhDSPhong({
            dichVuId: record.nbDichVu?.dichVuId,
          })}
        />
      ),
    },
    {
      title: <HeaderSearch title={t("common.tuTuc")} />,
      width: "50px",
      dataIndex: "tuTra",
      key: "tuTra",
      render: (item, record, idx) => (
        <div className="check">
          <Checkbox onChange={onChange("tuTra", idx)} />
        </div>
      ),
    },
  ];

  return (
    <ChiDinhBoSungWrapper
      width={width}
      visible={visible}
      closable={false}
      footer={null}
    >
      <div className="header-chidinh">
        <span>{t("khamBenh.chiDinh.boSungThongTin")}</span>
      </div>
      <TableWrapper
        scroll={{ y: 500, x: 700 }}
        columns={columns}
        dataSource={dataTable}
      />
      <div className="btn-action">
        <Button className="cancel" onClick={onCancel}>
          {t("common.huy")}
        </Button>
        <Button className="ok" onClick={onSubmit}>
          {t("common.dongY")}
        </Button>
      </div>
    </ChiDinhBoSungWrapper>
  );
};

export default memo(ModalChiDinh);
