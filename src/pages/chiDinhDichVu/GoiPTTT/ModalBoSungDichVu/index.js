import React, {
  memo,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input, message, DatePicker } from "antd";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Button, ModalTemplate, TableWrapper, Select } from "components";
import { Main } from "./styled";
import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import { useSelector, useDispatch } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import { LOAI_DICH_VU } from "constants/index";
import moment from "moment";

const { RangePicker } = DatePicker;

const ModalBoSungThongTinDichVu = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refIsSubmit = useRef(null);
  const refCallback = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const refFuncSubmit = useRef(null);
  const [state, _setState] = useState({
    show: false,
    data: [],
    dataThuoc: [],
    dataDichVu: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    chiDinhGoiPTTT: { chiDinhNbGoiPTTT },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    benhPham: { getListAllBenhPham },
  } = useDispatch();

  const listAllBenhPham = useSelector(
    (state) => state.benhPham.listAllBenhPham
  );

  const { getListAllLieuDung } = useDispatch().lieuDung;
  const { listAllLieuDung = [] } = useSelector((state) => state.lieuDung);

  useImperativeHandle(ref, () => ({
    show: (
      {
        dsDichVuCanBoSung,
        dsDichVuThoaDieuKien,
        nbDotDieuTriId,
        goiPtTtId,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        khoaChiDinhId,
      },
      callback
    ) => {
      if (!dsDichVuCanBoSung.length) return;

      const dataThuoc = dsDichVuCanBoSung
        .filter((item) => item.loaiDichVu === LOAI_DICH_VU.THUOC)
        .map((item, idx) => {
          return {
            ...item,
            key: idx,
            stt: idx + 1,
            soLuong: 1,
          };
        });
      const dataDichVu = dsDichVuCanBoSung
        .filter((item) => item.loaiDichVu !== LOAI_DICH_VU.THUOC)
        .map((item, idx) => {
          return {
            ...item,
            key: idx,
            stt: idx + 1,
          };
        });

      setState({
        dataThuoc,
        dataDichVu,
        show: true,
        nbDotDieuTriId,
        goiPtTtId,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        khoaChiDinhId,
        dsDichVuThoaDieuKien,
      });
      getListAllLieuDung({});

      refCallback.current = callback;
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
      dataDichVu: state.dataDichVu.map((item, index) => {
        if (idx === index) {
          item[type] = value;
        }
        return item;
      }),
    });
  };

  const onChangeThuoc = (type, idx) => async (e) => {
    let value = e?.target?.value || e;

    setState({
      dataThuoc: state.dataThuoc.map((item, index) => {
        if (idx === index) {
          item[type] = value;
        }
        return item;
      }),
    });
  };

  const onChangeInputDate = (type, index) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    const dataThuoc = [...state.dataThuoc];
    dataThuoc[index][`${type}Tu`] = value;
    dataThuoc[index][`${type}Den`] = value1;
    setState({ dataThuoc });
  };

  const onSubmit = (e) => {
    if (refIsSubmit.current) return; //Nếu đang submit thì bỏ qua
    e.preventDefault();
    const data = [...state.dataDichVu, ...state.dataThuoc];
    const isInValid = data.some((item) => {
      return (
        (item.yeuCauBenhPham && !item.benhPhamId) ||
        (item.dsPhongThucHien.length > 1 && !item.phongThucHienId) ||
        (item.nhapDotDung && !item.dotDung)
      );
    });
    if (isInValid) {
      message.error(t("khamBenh.chiDinh.moiBoSungThongTinDichVuConThieu"));
      return;
    }

    refIsSubmit.current = true;
    chiDinhNbGoiPTTT({
      dsDichVu: [...state.dsDichVuThoaDieuKien, ...data],
      nbDotDieuTriId: state.nbDotDieuTriId,
      goiPtTtId: state.goiPtTtId,
      chiDinhTuDichVuId: state.chiDinhTuDichVuId,
      chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
      khoaChiDinhId: state.khoaChiDinhId,
    })
      .then((options) => {
        refCallback.current && refCallback.current();
        onCancel();
      })
      .finally(() => {
        refIsSubmit.current = false;
      });
  };
  refFuncSubmit.current = onSubmit;

  const columnsThuoc = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title={t("common.tenThuoc")} sort_key="ten" />,
      width: "120px",
      dataIndex: "ten",
      key: "ten",
      render: (item, list, index) => {
        return `${item} ${
          list?.tenHoatChat ? " (" + list?.tenHoatChat + ")" : " "
        } ${list?.hamLuong ? " - " + list?.hamLuong : ""}`;
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} sort_key="soLuong" />,
      width: "40px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, dataItem, index) => {
        return (
          <Input
            className={`${!item ? "error-dv" : ""}`}
            type="number"
            defaultValue={item}
            value={item}
            onChange={onChangeThuoc("soLuong", index)}
            min={1}
          ></Input>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.lieuDungCachDung")}
          sort_key="lieuDungId"
        />
      ),
      width: "120px",
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      render: (item, data, index) => {
        return (
          <Select
            showSearch={true}
            data={listAllLieuDung}
            defaultValue={item}
            onChange={onChangeThuoc("lieuDungId", index)}
            value={item}
          />
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.dotDung")}
          sort_key="dotDung"
        />
      ),
      width: "50px",
      dataIndex: "dotDung",
      key: "dotDung",
      render: (item, record, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            value={item}
            onChange={onChangeThuoc("dotDung", index)}
            min={1}
            max={999}
          ></Input>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.thoiGianDung")}
          sort_key="ngayThucHien"
        />
      ),
      width: "100px",
      dataIndex: "",
      key: "",
      render: (item, data, index) => {
        return (
          <RangePicker
            value={[
              data?.ngayThucHienTu ? moment(data?.ngayThucHienTu) : null,
              data?.ngayThucHienDen ? moment(data?.ngayThucHienDen) : null,
            ]}
            placeholder={[t("common.tuNgay"), t("common.denNgay")]}
            onChange={onChangeInputDate("ngayThucHien", index)}
          ></RangePicker>
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.luuY")} sort_key="ghiChu" />,
      width: "50px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (item, data, index) => {
        return (
          <>
            <Input
              onChange={onChangeThuoc("ghiChu", index)}
              value={item}
            ></Input>
            {(item || "").length > 1000 && (
              <span className="error">
                {t("khamBenh.donThuoc.nhapLuuYKhongQua1000KyTu")}
              </span>
            )}
          </>
        );
      },
    },
  ];

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
      dataIndex: "ten",
      align: "left",
      key: "ten",
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
        let value = record?.phongThucHienId;
        if (!value && record?.dsPhongThucHien?.length == 1) {
          value = record?.dsPhongThucHien[0].phongId;
        }
        return (
          <Select
            value={value}
            className={
              record?.dsPhongThucHien?.length > 1 && !record?.phongThucHienId
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
          />
        );
      },
    },
  ];
  const setRowClassName = (record) => {
    if (record?.dsMucDich?.length) return "row-tt35";
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
          {state.dataDichVu?.length > 0 && (
            <div className="table-dv">
              <TableWrapper
                title="Thông tin dịch vụ"
                scroll={{ y: 500, x: 700 }}
                columns={columns}
                dataSource={state.dataDichVu}
                rowClassName={setRowClassName}
              />
            </div>
          )}

          {state.dataThuoc?.length > 0 && (
            <div className="table-thuoc">
              <TableWrapper
                title="Thông tin thuốc"
                scroll={{ y: 500, x: 700 }}
                columns={columnsThuoc}
                dataSource={state.dataThuoc}
                rowClassName={setRowClassName}
              />
            </div>
          )}
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
