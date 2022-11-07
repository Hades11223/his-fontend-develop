import TableWraper from "components/TableWrapper";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Button, DatePicker, Input, InputNumber, message, Row } from "antd";
import { ModalStyled, Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect, useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import PopupThemLieuDung from "../PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

const SuaThongTinThuoc = (props, ref) => {
  const { t } = useTranslation();
  const refPopupThemLieuDung = useRef(null)
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)
  const createOrEditLieuDungThuoc = useDispatch().lieuDungThuoc.createOrEdit

  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const {
    getListAllLieuDung,
    listAllLieuDung,
    themThongTin,
    getListDichVuThuoc,
    createOrEditLieuDung,
    getListLieuDung,
    thongTinChiTiet
  } = props;

  useEffect(() => {
    getListAllLieuDung({});
  }, []);
  useImperativeHandle(ref, () => ({
    show: async (options = {}) => {
      const { newTable } = options;
      const table = await Promise.all(newTable.map(async(x) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: x.dichVuId }).then((s) => {
          return s?.data
        })
        return ({
          ...x,
          lieuDungId: x?.lieuDungId || null,
          ngayThucHienTu: null,
          ngayThucHienDen: null,
          listLieuDung : listLieuDungDependDichVu
        });
      }));
      setData(table);
      setShow(true);
    },
  }));
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const onChangeInput = (type, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "soLuong" && Number(value) <= 0 && value) {
      message.error(t("khamBenh.donThuoc.nhapSoLuongLonHon0"));
      data[index][type] = null;
    } else {
      data[index][type] = value;
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
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...data]
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: item.dichVuId }).then((s) => {
          return s?.data
        })
        item.listLieuDung = listLieuDungDependDichVu
      })
    })()
    setData([...list])
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
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} sort_key="thanhTien" />,
      width: "40px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            onChange={onChangeInput("soLuong", index)}
            onKeyDown={blockInvalidChar}
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
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <Select
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
                          dichVuId: data.dichVuId
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
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            onChange={onChangeInput("dotDung", index)}
            onKeyDown={blockInvalidChar}
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
          <Input
            defaultValue={item}
            onChange={onChangeInput("ghiChu", index)}
          ></Input>
        );
      },
    },
  ];

  const onSave = () => {
    let payload = data.map((item) => ({
      id: item?.id,
      nbDichVu: {
        ghiChu: item?.ghiChu,
        soLuong: item?.soLuong,
      },
      lieuDungId: item?.lieuDungId,
      dotDung: item?.dotDung,
      ngayThucHienTu: item?.ngayThucHienTu,
      ngayThucHienDen: item?.ngayThucHienDen,
    }));

    themThongTin(payload)
      .then((s) => {
        if (s?.code === 0) {
          onCancel();
          getListDichVuThuoc({ nbDotDieuTriId: s?.data[0].nbDotDieuTriId });
        } else {
          message.error(s[0]?.message);
        }
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
        <div className="header">
          <span>{t("khamBenh.donThuoc.thongTinThuoc")}</span>
        </div>
        <div>
          <TableWraper columns={columns} dataSource={data} />
        </div>
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
  lieuDung: { getListAllLieuDung, createOrEdit: createOrEditLieuDung, getListLieuDung },
  chiDinhDichVuTuTruc: { themThongTin, getListDichVuThuoc },
}) => ({
  getListAllLieuDung,
  themThongTin,
  getListDichVuThuoc,
  createOrEditLieuDung,
  getListLieuDung
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(SuaThongTinThuoc));
