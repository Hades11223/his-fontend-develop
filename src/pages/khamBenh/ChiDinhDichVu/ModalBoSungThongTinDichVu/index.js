import React, {
  memo,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Checkbox, message } from "antd";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Button, ModalTemplate, TableWrapper, Select } from "components";
import { Main } from "./styled";
import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import { useSelector, useDispatch } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash";
import { refConfirm } from "app";
import { DOI_TUONG } from "constants/index";
import { useStore } from "hook";

const ModalBoSungThongTinDichVu = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refIsSubmit = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const refFuncSubmit = useRef(null);
  const { onDichVuKemTheo } = props;
  const [state, _setState] = useState({
    show: false,
    data: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const thongTinNguoiBenh = useStore(
    "chiDinhKhamBenh.configData.thongTinNguoiBenh",
    null
  );

  const {
    chiDinhKhamBenh: { chiDinhDichVu },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    benhPham: { getListAllBenhPham },
  } = useDispatch();

  const listAllBenhPham = useSelector(
    (state) => state.benhPham.listAllBenhPham
  );

  useImperativeHandle(ref, () => ({
    show: ({ dataSource, isPhauThuat, response }) => {
      if (!dataSource.length) return;
      let listErrorCode = [];
      const data = dataSource.map((item, idx) => {
        const nbDichVu = item.nbDichVu;
        listErrorCode = [...listErrorCode, item.code];
        return {
          boChiDinhId: item.boChiDinhId || undefined,
          benhPhamId: item.benhPhamId,
          nbChanDoan: { cdSoBo: item.nbChanDoan?.cdSoBo },
          nbDichVu: {
            dichVu: nbDichVu?.dichVu,
            dichVuId: nbDichVu?.dichVuId,
            soLuong: nbDichVu?.soLuong || 1,
            chiDinhTuDichVuId: nbDichVu?.chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu: nbDichVu?.chiDinhTuLoaiDichVu,
            khoaChiDinhId: nbDichVu?.khoaChiDinhId,
            loaiDichVu: nbDichVu?.loaiDichVu,
            nbGoiDvId: nbDichVu?.nbGoiDvId || undefined,
            nbGoiDvChiTietId: nbDichVu?.nbGoiDvChiTietId || undefined,
            loaiHinhThanhToanId: nbDichVu?.loaiHinhThanhToanId || undefined,
            tyLeTtDv: nbDichVu?.tyLeTtDv,
          },
          nbDotDieuTriId: item.nbDotDieuTriId,
          nbDvKyThuat: {
            phongThucHienId: item.nbDvKyThuat?.phongThucHienId,
            tuVanVienId: item.nbDvKyThuat?.tuVanVienId,
          },
          key: idx,
          stt: idx + 1,
          code: item.code,
          dsPhongThucHien: item.dsPhongThucHien,
          yeuCauBenhPham: item.yeuCauBenhPham,
          dsMucDich: item.dsMucDich,
        };
      });
      setState({
        data,
        isPhauThuat,
        show: true,
        listErrorCode: [...new Set(listErrorCode)],
      });
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show({});
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              onCancel();
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refFuncSubmit.current && refFuncSubmit.current();
            },
          },
        ],
      });
    } else {
      refModal.current && refModal.current.hide();
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [state.show]);
  const onCancel = () => {
    setState({
      show: false,
    });
  };
  const onShowModalWarning = (data) => {
    let item = data.filter((x) => x.data).map((x1) => x1.data);
    let messageWarning = item[item.length - 1]?.filter((x) => x.message);
    let content = messageWarning?.length
      ? messageWarning[messageWarning?.length - 1]?.message
      : null;
    content &&
      refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: content,
          cancelText: t("common.huy"),
          classNameOkText: "button-error",
          showImg: true,
          typeModal: "warning",
        },
        () => {}
      );
  };
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
    setState({
      data: state.data.map((item, index) => {
        if (idx === index) {
          if (type === "benhPhamId") item.benhPhamId = value;
          if (type === "phongThucHienId")
            item.nbDvKyThuat.phongThucHienId = value;
          if (type === "tuTra") item.nbDichVu.tuTra = value;
          if (type === "tyLeTtDv") item.nbDichVu.tyLeTtDv = value;
          if (type === "mucDichId") item.nbDichVu.mucDichId = value;
        }
        return item;
      }),
    });
  };

  const onSubmit = (e) => {
    if (refIsSubmit.current) return; //Nếu đang submit thì bỏ qua
    e.preventDefault();
    const isInValid = state.data.some((item) => {
      return (
        (item.yeuCauBenhPham && !item.benhPhamId) ||
        (item.dsPhongThucHien.length > 1 && !item.nbDvKyThuat.phongThucHienId)
      );
    });
    if (isInValid) {
      message.error(t("khamBenh.chiDinh.moiBoSungThongTinDichVuConThieu"));
      return;
    }

    if (
      (state.data || []).some(
        (item) => !item?.nbDichVu?.mucDichId && item?.dsMucDich?.length
      )
    ) {
      message.error(t("khamBenh.chiDinh.thieuThongTinThongTu35"));
      return;
    }

    const updatedData = cloneDeep(state.data).map((item) => {
      delete item["key"];
      delete item["stt"];
      delete item["code"];
      delete item["dsPhongThucHien"];
      delete item["yeuCauBenhPham"];
      delete item["dsMucDich"];
      if (item.benhPhamId?.length) {
        item.benhPhamId = item.benhPhamId[item.benhPhamId.length - 1];
      }
      return item;
    });
    refIsSubmit.current = true;
    chiDinhDichVu({ dataTamTinhTien: updatedData })
      .then((options) => {
        const { listDichVuPending } = options || {};
        if (listDichVuPending?.length) {
          const ids = listDichVuPending
            .map((item) => item.nbDichVu?.dichVuId)
            .filter((id) => id);
          const data = state.data.filter((item) =>
            ids.includes(item.nbDichVu?.dichVuId)
          );
          if (data.length) {
            setState({ data: data });
          } else {
            onCancel();
          }
        } else {
          onCancel();
        }
        onShowModalWarning(options.response);
        onDichVuKemTheo && onDichVuKemTheo(options.response);
      })
      .finally(() => {
        refIsSubmit.current = false;
      });
  };
  refFuncSubmit.current = onSubmit;

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
      render: (item, record) => record?.nbDichVu?.dichVu?.ten,
    },
    {
      title: <HeaderSearch title={t("khamBenh.chiDinh.benhPham")} />,
      width: "200px",
      dataIndex: "benhPhamId",
      key: "benhPhamId",
      render: (item, record, idx) => {
        return (
          <Select
            className={
              record?.yeuCauBenhPham && !record?.benhPhamId ? "error" : ""
            }
            value={record?.benhPhamId}
            disabled={!record?.yeuCauBenhPham}
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
      render: (item, record, idx) => {
        const dataPhong = record?.dsPhongThucHien?.map((item) => ({
          id: item?.phongId,
          ten: `${item?.ma} - ${item?.ten}`,
          dichVuId: item.dichVuId,
        }));
        debugger;
        let value = record?.nbDvKyThuat?.phongThucHienId;
        if (!value && record?.dsPhongThucHien?.length == 1) {
          value = record?.dsPhongThucHien[0].phongId;
        }
        return (
          <Select
            value={value}
            className={
              record?.dsPhongThucHien?.length > 1 &&
              !record?.nbDvKyThuat?.phongThucHienId
                ? "error"
                : ""
            }
            disabled={record?.dsPhongThucHien?.length < 2}
            allowClear
            data={dataPhong}
            placeholder={t("common.luaChon")}
            onChange={onChange("phongThucHienId", idx)}
          />
        );
      },
    },
    {
      title: <HeaderSearch title="TT35" />,
      width: "150px",
      dataIndex: "mucDichId",
      key: "mucDichId",
      render: (item, record, idx) => {
        return (
          <Select
            data={record?.dsMucDich}
            placeholder={t("common.luaChon")}
            onChange={onChange("mucDichId", idx)}
            className={
              record?.dsMucDich?.length && !record?.nbDichVu?.mucDichId
                ? "select-border"
                : ""
            }
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.tuTuc")} />,
      width: "50px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      render: (item, record, idx) => (
        <div className="check">
          <Checkbox
            onChange={onChange("tuTra", idx)}
            disabled={record?.dsMucDich}
          />
        </div>
      ),
    },
  ];
  const setRowClassName = (record) => {
    if (
      record?.dsMucDich?.length &&
      thongTinNguoiBenh?.doiTuong === DOI_TUONG.BAO_HIEM
    )
      return "row-tt35";
  };
  return (
    <ModalTemplate
      ref={refModal}
      title={t("khamBenh.chiDinh.boSungThongTin")}
      onCancel={onCancel}
      width={1400}
    >
      <Main data={state?.data}>
        <div className="info-content">
          <TableWrapper
            scroll={{ y: 500, x: 700 }}
            columns={columns}
            dataSource={state.data}
            rowClassName={setRowClassName}
          />
        </div>
        <div className="footer-action">
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button type="primary" onClick={onSubmit} minWidth={100}>
            {t("common.dongY")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default memo(forwardRef(ModalBoSungThongTinDichVu));
