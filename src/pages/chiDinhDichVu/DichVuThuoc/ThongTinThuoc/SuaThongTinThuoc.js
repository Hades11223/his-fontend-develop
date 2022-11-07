import TableWraper from "components/TableWrapper";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { DatePicker, Input, message, Row, Checkbox } from "antd";
import Button from "pages/kho/components/Button";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import PopupThemLieuDung from "components/PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import moment from "moment";
import { debounce } from "lodash";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

const SuaThongTinThuoc = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
    data: [],
    isTuTruc: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { chiDinhTuLoaiDichVu, dataNb } = props;
  const refPopupThemLieuDung = useRef(null);
  const refModal = useRef(null);
  const { getListAllLieuDung, createOrEdit: createOrEditLieuDung } =
    useDispatch().lieuDung;
  const { chinhSuaChiDinhDichVuKho, getListDichVuThuoc } =
    useDispatch().chiDinhDichVuThuoc;

  const { createOrEditLieuDungThuoc } = useDispatch().lieuDungThuoc;
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    getListAllLieuDung({});
  }, []);
  useImperativeHandle(ref, () => ({
    show: async (options = {}) => {
      const { newTable, isKeNgoai, isTuTruc = false } = options;
      const table = await Promise.all(
        newTable.map(async (x) => {
          const listLieuDungDependDichVu = await lieuDungProvider
            .searchAll({ bacSiId: nhanVienId, dichVuId: x.dichVuId })
            .then((s) => {
              return s?.data;
            })
            .catch((e) => {
              message.error(e?.message);
            });
          return {
            ...x,
            lieuDungId: x?.lieuDungId || null,
            ngayThucHienTu: x?.ngayThucHienTu || null,
            ngayThucHienDen: x?.ngayThucHienDen || null,
            listLieuDung: listLieuDungDependDichVu,
          };
        })
      );
      setState({ data: table, show: true, isKeNgoai, isTuTruc });
      refModal.current && refModal.current.show();
    },
  }));
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const blockInvalidChar2 = (e) => {
    if (e.key === "Backspace" || e.keyCode === 37 || e.keyCode === 39) {
    } else if (
      ["e", "E", "+", "-"].includes(e.key) ||
      e.target.value.length >= 3
    ) {
      return e.preventDefault();
    }
  };
  const onChangeInput = (type, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;

    if (type === "tuTra" || type === "khongTinhTien") {
      value = e.target.checked;
    }

    if (type === "soLuong" && Number(value) <= 0 && value) {
      message.error(t("khamBenh.donThuoc.nhapSoLuongLonHon0"));
      state.data[index][type] = null;
    } else {
      state.data[index][type] = value;
    }

    if (type === "tuTra" && value) {
      state.data[index]["khongTinhTien"] = false;
    }

    if (type === "khongTinhTien" && value) {
      state.data[index]["tuTra"] = false;
    }

    setState({ data: [...state.data] });
  };

  const onChangeInputDate = (type, index) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    state.data[index][`${type}Tu`] = value;
    state.data[index][`${type}Den`] = value1;
    setState({ data: [...state.data] });
  };

  const onCancel = () => {
    setState({ show: false });
    refModal.current && refModal.current.hide();
  };
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...state.data];
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider
          .searchAll({ bacSiId: nhanVienId, dichVuId: item.dichVuId })
          .then((s) => {
            return s?.data;
          });
        item.listLieuDung = listLieuDungDependDichVu;
      });
    })();
    setState({ data: [...list] });
  };
  const columns = [
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
      title: <HeaderSearch title={t("common.tenThuoc")} sort_key="tenDichVu" />,
      width: "120px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: (item, data, index) => {
        return state?.isKeNgoai ? data?.tenThuocChiDinhNgoai : data?.tenDichVu;
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} sort_key="soLuong" />,
      width: "40px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            value={item}
            onChange={onChangeInput("soLuong", index)}
            onKeyDown={blockInvalidChar}
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
          <>
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <Select
              data={data?.listLieuDung}
              defaultValue={item}
              value={item}
              onChange={onChangeInput("lieuDungId", index)}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}>
                    <small>{t("common.khongCoDuLieuPhuHop")}</small>
                  </div>
                  {!state.isKeNgoai && (
                    <Row justify="center">
                      <Button
                        trigger="click"
                        style={{
                          border: "1px solid",
                          borderRadius: "10px",
                          width: "215px",
                          margin: "auto",
                          lineHeight: 0,
                          // boxShadow: "-1px 3px 1px 1px #d9d9d9",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          refPopupThemLieuDung &&
                          refPopupThemLieuDung.current.show(
                            { visible: true },
                            (res) => {
                              const { values } = res;
                              values.bacSiId = nhanVienId;
                              createOrEditLieuDung(values).then(async (s) => {
                                const dataCustom = {
                                  lieuDung: {
                                    ...s,
                                  },
                                  lieuDungId: s.id,
                                  dichVuId: data.dichVuId,
                                };
                                await createOrEditLieuDungThuoc(dataCustom);
                                await reRenderListLieuDungDependDichVu();
                                getListAllLieuDung({});
                              });
                            }
                          )
                        }
                      >
                        {t("khamBenh.donThuoc.themNhanhLieuDungBS")}
                      </Button>
                    </Row>
                  )}
                </div>
              }
            ></Select>
          </>
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
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            value={item}
            onChange={onChangeInput("dotDung", index)}
            onKeyDown={blockInvalidChar2}
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
          <Input
            defaultValue={item}
            value={item}
            onChange={onChangeInput("ghiChu", index)}
          ></Input>
        );
      },
    },
    {
      title: <HeaderSearch title={"Tự trả"} isTitleCenter={true} />,
      width: 50,
      align: "center",
      dataIndex: "tuTra",
      hidden: !state.isTuTruc,
      render: (item, data, index) => {
        return (
          <Checkbox
            defaultChecked={item}
            checked={item}
            disabled={data?.thanhToan}
            onChange={onChangeInput("tuTra", index)}
          />
        );
      },
    },
    {
      title: <HeaderSearch title={"Không tính tiền"} isTitleCenter={true} />,
      width: 80,
      align: "center",
      dataIndex: "khongTinhTien",
      hidden: !state.isTuTruc,
      render: (item, data, index) => {
        return (
          <Checkbox
            defaultChecked={item}
            checked={item}
            disabled={data?.thanhToan}
            onChange={onChangeInput("khongTinhTien", index)}
          />
        );
      },
    },
  ];

  const onSave = debounce(() => {
    let payload = state.data.map((item) => ({
      id: item?.id,
      nbDichVu: {
        ghiChu: item?.ghiChu,
        soLuong: item?.soLuong,
        tuTra: item?.tuTra,
        khongTinhTien: item?.khongTinhTien,
      },
      lieuDungId: item?.lieuDungId,
      dotDung: item?.dotDung,
      ngayThucHienTu: item?.ngayThucHienTu,
      ngayThucHienDen: item?.ngayThucHienDen,
    }));

    chinhSuaChiDinhDichVuKho(payload)
      .then((s) => {
        if (s?.code === 0) {
          getListDichVuThuoc({
            nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
            chiDinhTuDichVuId: dataNb?.id,
            chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
            dsTrangThaiHoan: [0, 10, 20],
          });
          onCancel();
        } else {
          message.error(s?.[0]?.message || s?.message);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, 500);

  return (
    <ModalTemplate
      ref={refModal}
      title={t("khamBenh.donThuoc.thongTinThuoc")}
      onCancel={onCancel}
      width={1400}
    >
      <Main>
        <div className="info-content">
          <TableWraper columns={columns} dataSource={state.data} />
        </div>
        <div className="footer-btn">
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button type="primary" onClick={onSave} minWidth={100}>
            {t("common.dongY")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(SuaThongTinThuoc);
