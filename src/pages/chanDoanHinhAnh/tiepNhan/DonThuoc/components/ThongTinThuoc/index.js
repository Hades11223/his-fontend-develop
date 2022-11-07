import TableWraper from "components/TableWrapper";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Button, DatePicker, Input, message, InputNumber, Row, Form, Col, Popover } from "antd";
import { ModalStyled, Main, ContentTable, GlobalStyle, ContentWrapper } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect, useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import PopupThemLieuDung from "../PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

const ThongTinThuoc = (props, ref) => {
  const { t } = useTranslation();
  const refPopupThemLieuDung = useRef(null)
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const listAllDuongDung = useSelector(state => state.duongDung.listAllDuongDung)
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)
  const createOrEditLieuDungThuoc = useDispatch().lieuDungThuoc.createOrEdit

  const {
    getListAllLieuDung,
    listAllLieuDung,
    chiDinhDichVuKho,
    getListDichVuThuoc,
    khoId,
    createOrEditLieuDung,
    thongTinChiTiet
  } = props;
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  useEffect(() => {
    getListAllLieuDung({});
  }, []);
  useImperativeHandle(ref, () => ({
    show: async (options = {}) => {
      const { newTable } = options;
      // let table = newTable.map((x) => {
      //   return {
      //     ...x,
      //     lieuDungId: x?.lieuDungId || null,
      //     dotDung: null,
      //     ghiChu: null,
      //     ngayThucHienTu: null,
      //     ngayThucHienDen: null,
      //     key: x.nbDichVu.dichVuId,
      //   };
      // });
      const table = await Promise.all(newTable.map(async (x) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: x?.nbDichVu?.dichVuId }).then((s) => {
          return s?.data
        })
        return ({
          ...x,
          lieuDungId: x?.lieuDungId || null,
          dotDung: null,
          ghiChu: null,
          ngayThucHienTu: null,
          ngayThucHienDen: null,
          key: x.nbDichVu.dichVuId,
          listLieuDung: listLieuDungDependDichVu
        });
      }));
      console.log('table: ', table);
      setData(table);
      setShow(true);
    },
  }));
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...data]
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: item?.nbDichVu?.dichVuId }).then((s) => {
          return s?.data
        })
        item.listLieuDung = listLieuDungDependDichVu
      })
    })()
    setData([...list])
  }
  const onChangeInput = (type, index) => (e) => {
    const newData = Object.assign([], data);
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
    } else {
      newData[index][type] = value;
      setData(newData);
    }
  };
  const onChangeInputDate = (type, index) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    data[index][`${type}Tu`] = value;
    data[index][`${type}Den`] = value1;
  };

  const onCancel = () => {
    setShow(false);
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const blockInvalidChar2 = (e) => {
    if (e.key === 'Backspace' || e.keyCode === 37 || e.keyCode === 39) {

    } else if (["e", "E", "+", "-"].includes(e.key) || e.target.value.length >= 3) {
      return e.preventDefault()
    }
  };
  const contentPopoverLieuDung = () => {
    return (
      <ContentWrapper>
        <div className="content-popover">
          <div className="title-popup" style={{
            background: "linear-gradient(0deg, rgba(23, 43, 77, 0.1), rgba(23, 43, 77, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            fontFamily: "Nunito Sans",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: 0,
            textAlign: "left",
            padding: "8px 16px",
          }}>{t("khamBenh.donThuoc.themNhanhLieuDungBS")}</div>
          <Form
            form={form}
            layout="vertical"
            className="form-custom form-custom--one-line"
          >
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item
                  label={t("khamBenh.donThuoc.tenLieuDung")}
                  name="ten"
                >
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.donThuoc.vuiLongNhapTenLieuDung")}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={t("khamBenh.donThuoc.soLuongDungSang")}
                  name="slDungSang"
                >
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.donThuoc.vuiLongNhapSoLuongDungSang")}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={t("khamBenh.donThuoc.soLuongDungChieu")}
                  name="slDungChieu"
                >
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.donThuoc.vuiLongNhapSoLuongDungChieu")}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={t("khamBenh.donThuoc.soLuongDungToi")}
                  name="slDungToi"
                >
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.donThuoc.vuiLongNhapSoLuongDungToi")}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={t("khamBenh.donThuoc.soLuongDungDem")}
                  name="slDungDem"
                >
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.donThuoc.vuiLongNhapSoLuongDungDem")}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("khamBenh.donThuoc.thoiDiemDung")}
                  name="thoiDiemDung"
                >
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.donThuoc.vuiLongNhapThoiDiemDung")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("khamBenh.donThuoc.duongDung")}
                  name="duongDung"
                >
                  <Select
                    placeholder={t("khamBenh.donThuoc.vuiLongChonDuongDung")}
                    data={listAllDuongDung}
                    showArrow={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="popover-btn-list">
            <Button className="popover-btn-list__cancel"
              //  onClick={onCancel}
              onClick={() => setState({ visiblePopupThemLieuDung: "" })}
            >
              {t("common.huy")}
            </Button>
            <Button
              className="popover-btn-list__ok"
            // onClick={onSubmitThem}
            >
              {t("common.luu")}<img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    )
  }
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
      title: <HeaderSearch title={t("common.soLuong")} sort_key="thanhTien" />,
      width: "40px",
      dataIndex: "nbDichVu",
      key: "nbDichVu",
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            defaultValue={item.soLuong}
            onChange={onChangeInput("soLuong", index)}
            onKeyDown={blockInvalidChar}
            min={1}
          ></Input>
        );
      },
    },
    {
      title: (
        <HeaderSearch title={t("khamBenh.donThuoc.lieuDungCachDung")} sort_key="lieuDungId" />
      ),
      width: "120px",
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      render: (item, data, index) => {
        return (
          <>
            {/* <Popover
              overlayClassName="popover-table-thuoc-ke-ngoai popover-table-thuoc-ke-ngoai_lieu-dung"
              overlayInnerStyle={{ width: 640, height: 310, padding: "0px !important" }}
              content={contentPopoverLieuDung()}
              // trigger="click"
              visible={state.visiblePopupThemLieuDung === data.id}
              placement="left"
            ></Popover> */}
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <Select
              showSearch={true}
              data={data?.listLieuDung}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", index)}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}><small>{t("common.khongCoDuLieuPhuHop")}</small></div>

                  <Row justify="center">
                    <Button trigger="click" style={{
                      border: "1px solid",
                      borderRadius: "10px",
                      width: "215px",
                      margin: "auto",
                      lineHeight: 0,
                      // boxShadow: "-1px 3px 1px 1px #d9d9d9",
                      cursor: "pointer"
                    }} onClick={() => refPopupThemLieuDung && refPopupThemLieuDung.current.show({ visible: true }, (res) => {
                      const { values } = res
                      values.bacSiId = nhanVienId
                      createOrEditLieuDung(values).then(async (s) => {
                        const dataCustom = {
                          lieuDung: {
                            ...s,
                          },
                          lieuDungId: s.id,
                          dichVuId: data?.nbDichVu?.dichVuId
                        }
                        await createOrEditLieuDungThuoc(dataCustom)
                        await reRenderListLieuDungDependDichVu()
                        getListAllLieuDung({});
                      });
                    })}>
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
      title: <HeaderSearch title={t("khamBenh.donThuoc.dotDung")} sort_key="dotDung" />,
      width: "50px",
      dataIndex: "dotDung",
      key: "dotDung",
      render: (item, record, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            onChange={onChangeInput("dotDung", index)}
            onKeyDown={blockInvalidChar2}
            min={1}
          ></Input>
        );
      },
    },
    {
      title: <HeaderSearch title={t("khamBenh.donThuoc.thoiGianDung")} sort_key="ngayThucHien" />,
      width: "100px",
      dataIndex: "",
      key: "",
      render: (item, data, index) => {
        return (
          <RangePicker
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
            <Input onChange={onChangeInput("ghiChu", index)}></Input>
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

  const onSave = () => {
    if ((data || []).some((item) => (item.ghiChu || "").length > 1000)) {
      message.error(t("khamBenh.donThuoc.nhapLuuYKhongQua1000KyTu"));
      return;
    }
    let payload = data.map((item) => ({
      nbDotDieuTriId: item?.nbDotDieuTriId,
      nbDichVu: {
        ghiChu: item?.ghiChu,
        soLuong: item?.nbDichVu.soLuong,
        dichVuId: item?.nbDichVu.dichVuId,
        chiDinhTuDichVuId: item?.nbDichVu.chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu: item?.nbDichVu.chiDinhTuLoaiDichVu,
        khoaChiDinhId: item?.nbDichVu.khoaChiDinhId
      },
      nbDvKho: {
        khoId
      },
      lieuDungId: item?.lieuDungId,
      dotDung: item?.dotDung,
      ngayThucHienTu: item?.ngayThucHienTu,
      ngayThucHienDen: item?.ngayThucHienDen,
    }));
    chiDinhDichVuKho(payload)
      .then((s) => {
        const arrIsNotEligible = []
        const arrIsEligible = []
        s.forEach((obj, index) => {
          if (obj.code === 8503 || obj.code === 8501) {
            arrIsNotEligible.push(obj)
            message.error(obj?.message);
          } else {
            arrIsEligible.push(obj)
          }
        })
        setData(arrIsNotEligible)
        if (arrIsNotEligible?.length <= 0) {
          onCancel()
        }
        getListDichVuThuoc({ nbDotDieuTriId: s[0].nbDotDieuTriId });
      })
      .catch(() => { });
  };

  return (
    <ModalStyled
      closable={null}
      footer={null}
      width={1320}
      visible={show}
      onCancel={onCancel}
    >
      <Main>
        <GlobalStyle />
        <div className="header">
          <span>{t("khamBenh.donThuoc.thongTinThuoc")}</span>
        </div>
        <div>{show && <TableWraper columns={columns} dataSource={data} />}</div>
        <div className="footer">
          <div className="left"></div>
          <div className="right">
            <Button className="btn-cancel" onClick={onCancel}>
              {t("common.huy")}
            </Button>
            <Button className="btn-accept" onClick={onSave}>
              {t("common.dongY")}
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};
const mapStateToProps = (state) => {
  return {
    listAllLieuDung: state.lieuDung.listAllLieuDung || [],
    thongTinChiTiet: state.khamBenh.thongTinChiTiet || {},
  };
};

const mapDispatchToProps = ({
  lieuDung: { getListAllLieuDung, createOrEdit: createOrEditLieuDung },
  chiDinhDichVuTuTruc: { chiDinhDichVuKho, getListDichVuThuoc },
}) => ({
  getListAllLieuDung,
  chiDinhDichVuKho,
  getListDichVuThuoc,
  createOrEditLieuDung
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ThongTinThuoc));
