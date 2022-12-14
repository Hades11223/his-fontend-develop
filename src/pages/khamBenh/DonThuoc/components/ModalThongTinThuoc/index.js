import TableWraper from "components/TableWrapper";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { DatePicker, Input, message, Row } from "antd";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import PopupThemLieuDung from "components/PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import moment from "moment";
import { cloneDeep, debounce } from "lodash";
import { ModalTemplate, Button } from "components";
import { useTranslation } from "react-i18next";
import { DOI_TUONG, LOAI_DON_THUOC } from "constants/index";
import { refConfirm } from "app";

const { RangePicker } = DatePicker;

const ModalThongTinThuoc = (props, ref) => {
  const { t } = useTranslation();
  const refPopupThemLieuDung = useRef(null);
  const refModal = useRef(null);
  const refSubmit = useRef(null);

  const [state, _setState] = useState({ data: [] });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);
  const { chiDinhDichVuKho, getListDichVuThuoc } =
    useDispatch().chiDinhDichVuKho;
  const { getListAllLieuDung, createOrEdit: createOrEditLieuDung } =
    useDispatch().lieuDung;

  const { createOrEdit: createOrEditLieuDungThuoc } =
    useDispatch().lieuDungThuoc;

  const { thongTinNguoiBenh } = props;
  useEffect(() => {
    getListAllLieuDung({});
    return () => {
      setState({ data: [] });
    };
  }, []);
  useImperativeHandle(ref, () => ({
    show: async (options = {}, onOk) => {
      const { newTable, loaiDonThuoc } = options;
      refSubmit.current = onOk;
      const table = await Promise.all(
        newTable.map(async (x) => {
          const listLieuDungDependDichVu = await lieuDungProvider
            .searchAll({ bacSiId: nhanVienId, dichVuId: x?.nbDichVu?.dichVuId })
            .then((s) => {
              return s?.data;
            });
          return {
            ...x,
            lieuDungId: x?.lieuDungId || null,
            dotDung: null,
            ghiChu: null,
            ngayThucHienTu: null,
            ngayThucHienDen: null,
            key: x.nbDichVu.dichVuId,
            listLieuDung: listLieuDungDependDichVu,
          };
        })
      );

      setState({
        data: table,
        show: true,
        nbDotDieuTriId: options.nbDotDieuTriId,
        chiDinhTuDichVuId: options.chiDinhTuDichVuId,
        dungKemId: options.dungKemId,
        loaiDonThuoc,
      });
      refModal.current && refModal.current.show();
    },
  }));
  const reRenderListLieuDungDependDichVu = async (dataCustom) => {
    let list = cloneDeep(state.data);
    let newData = list.find(
      (x) => x?.nbDichVu?.dichVuId == dataCustom?.dichVuId
    );
    const listLieuDungDependDichVu = await lieuDungProvider
      .searchAll({
        bacSiId: nhanVienId,
        dichVuId: dataCustom?.dichVuId,
        active: true,
        page: "",
        size: "",
      })
      .then((s) => {
        return s?.data;
      });
    if (newData) {
      newData.listLieuDung = listLieuDungDependDichVu;
      newData.lieuDungId = dataCustom.lieuDungId;
      setState({ data: list });
    }
  };
  const onChangeInput = (type, index) => (e) => {
    const newData = Object.assign([], state.data);
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "soLuong") {
      if (Number(value) <= 0 && value) {
        message.error(t("khamBenh.donThuoc.nhapSoLuongLonHon0"));
        newData[index].nbDichVu[type] = null;
      } else {
        newData[index].nbDichVu[type] = Number(value);
      }
    } else if (type === "ghiChu") {
      newData[index].nbDichVu[type] = value;
    } else {
      newData[index][type] = value;
    }
    setState({ data: newData });
  };
  const onChangeInputDate = (type, index) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    const data = [...state.data];
    data[index][`${type}Tu`] = value;
    data[index][`${type}Den`] = value1;
    setState({ data });
  };

  const onCancel = () => {
    setState({ show: false, disabledButton: false });
    refModal.current && refModal.current.hide();
  };

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
      title: <HeaderSearch title={t("common.tenThuoc")} sort_key="ten" />,
      width: "120px",
      dataIndex: "nbDichVu",
      key: "nbDichVu",
      render: (item) => {
        return `${item.dichVu?.ten} ${
          item.dichVu?.tenHoatChat ? " (" + item.dichVu?.tenHoatChat + ")" : " "
        } ${item.dichVu?.hamLuong ? " - " + item.dichVu?.hamLuong : ""}`;
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} sort_key="soLuong" />,
      width: "40px",
      dataIndex: "nbDichVu",
      key: "nbDichVu",
      render: (item, dataItem, index) => {
        return (
          <Input
            className={`${!item.soLuong ? "error-dv" : ""}`}
            type="number"
            defaultValue={item.soLuong}
            value={item.soLuong}
            onChange={onChangeInput("soLuong", index)}
            onKeyDown={blockInvalidChar}
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
          <>
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <Select
              showSearch={true}
              data={data?.listLieuDung}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", index)}
              onSearch={(e) => setState({ searchLieuDungWord: e || "" })}
              value={item}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}>
                    <small>{t("common.khongCoDuLieuPhuHop")}</small>
                  </div>

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
                          {
                            visible: true,
                            data,
                            tenLieuDung: state.searchLieuDungWord,
                          },
                          (res) => {
                            const { values } = res;
                            values.bacSiId = nhanVienId;
                            createOrEditLieuDung(values).then(async (s) => {
                              const dataCustom = {
                                lieuDung: {
                                  ...s,
                                },
                                lieuDungId: s.id,
                                dichVuId: data?.nbDichVu?.dichVuId,
                              };
                              await createOrEditLieuDungThuoc(dataCustom);
                              reRenderListLieuDungDependDichVu(dataCustom);
                            });
                          }
                        )
                      }
                    >
                      {t("khamBenh.donThuoc.themNhanhLieuDungBS")}
                    </Button>
                  </Row>
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
      render: (item, record, index) => {
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
      dataIndex: "nbDichVu",
      key: "nbDichVu",
      render: (item, data, index) => {
        return (
          <>
            <Input
              onChange={onChangeInput("ghiChu", index)}
              value={item.ghiChu}
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
    {
      title: <HeaderSearch title="TT30" />,
      width: "150px",
      dataIndex: "mucDichId",
      key: "mucDichId",
      hidden:
        thongTinNguoiBenh?.doiTuong !== DOI_TUONG.BAO_HIEM ||
        state?.loaiDonThuoc !== LOAI_DON_THUOC.THUOC_KHO,
      render: (item, record, index) => {
        return (
          <Select
            data={record?.dsMucDich}
            placeholder={t("common.luaChon")}
            onChange={onChangeInput("mucDichId", index)}
            className={
              record?.dsMucDich?.length && !record?.nbDichVu?.mucDichId
                ? "select-border"
                : ""
            }
          />
        );
      },
    },
  ];

  const onSave = debounce(() => {
    if (state.data.some((item) => !item.nbDichVu?.soLuong)) {
      message.error(t("khamBenh.donThuoc.truongBatBuocDienSoLuong"));
      return;
    }
    if ((state.data || []).some((item) => (item.ghiChu || "").length > 1000)) {
      message.error(t("khamBenh.donThuoc.nhapLuuYKhongQua1000KyTu"));
      return;
    }
    if (
      (state.data || []).some(
        (item) => !item?.mucDichId && item?.dsMucDich?.length
      )
    ) {
      message.error(t("khamBenh.chiDinh.thieuThongTinThongTu35"));
      return;
    }
    setState({ disabledButton: true });
    let payload = state.data.map((item) => ({
      nbDotDieuTriId: item?.nbDotDieuTriId,
      listLieuDung: item.listLieuDung,
      nbDichVu: {
        ghiChu: item?.nbDichVu.ghiChu,
        soLuong: item?.nbDichVu.soLuong,
        dichVuId: item?.nbDichVu.dichVuId,
        dichVu: item.nbDichVu.dichVu,
        tuTra: item?.nbDichVu?.tuTra,
        khongTinhTien: item?.nbDichVu?.khongTinhTien,
        chiDinhTuDichVuId: item?.nbDichVu.chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu: item?.nbDichVu.chiDinhTuLoaiDichVu,
        khoaChiDinhId: item?.nbDichVu.khoaChiDinhId,
        mucDichId: item.mucDichId,
      },
      nbDvKho: {
        khoId: item?.nbDvKho.khoId,
        dungKemId: state.dungKemId,
      },
      lieuDungId: item?.lieuDungId,
      dotDung: item?.dotDung,
      ngayThucHienTu: item?.ngayThucHienTu,
      ngayThucHienDen: item?.ngayThucHienDen,
    }));
    chiDinhDichVuKho(payload)
      .then((s) => {
        onShowMessageTuongTacThuoc(s);
        getListDichVuThuoc({
          nbDotDieuTriId: state.nbDotDieuTriId,
          chiDinhTuDichVuId: state.chiDinhTuDichVuId,
          dsTrangThaiHoan: [0, 10, 20],
        }).then((res) => {
          let list = res?.data?.map((item) => item.loaiDonThuoc);
          if (refSubmit.current) {
            refSubmit.current({ activeKey: list });
          }
        });
        const arrIsNotEligible = [];
        const arrIsEligible = [];
        s.forEach((obj, index) => {
          if (obj.code === 1006) {
            // s??? l?????ng t???n ko ????? , n??n b??? qua lu??n
            message.error(obj?.message);
          }
          if (obj.code === 8503 || obj.code === 8501) {
            arrIsNotEligible.push(obj);
            message.error(obj?.message);
          } else {
            arrIsEligible.push(obj);
          }
        });
        if (arrIsNotEligible?.length <= 0) {
          onCancel();
        } else {
          let filter = state.data.filter((item1) =>
            arrIsNotEligible.some(
              (item2) => item2.nbDichVu.dichVuId === item1.nbDichVu.dichVuId
            )
          );
          setState({ data: filter, disabledButton: false });
        }
      })
      .catch(() => {});
  }, 500);

  const onShowMessageTuongTacThuoc = (data) => {
    let tuongTacThuoc = (data?.filter((x) => x.tuongTacThuoc) || []).map(
      (x1) => x1.tuongTacThuoc
    );
    tuongTacThuoc?.length && message.error(tuongTacThuoc.join(", "));

    let content = data?.filter((x) => x.code === 8504 && x.message) || [];
    content?.length &&
      refConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: content[0].message,
          cancelText: t("common.dong"),
          classNameOkText: "button-error",
          showImg: true,
          typeModal: "warning",
        },
        () => {}
      );
  };

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
      title={t("khamBenh.donThuoc.thongTinThuoc")}
      onCancel={onCancel}
      width={1400}
    >
      <Main>
        <div className="info-content">
          <TableWraper
            columns={columns}
            dataSource={state.data}
            rowClassName={setRowClassName}
          />
        </div>
        <div className="footer-btn">
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            disabled={state?.disabledButton}
          >
            {t("common.dongY")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThongTinThuoc);
