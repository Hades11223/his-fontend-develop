import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, message } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { Button, InputTimeout, ModalTemplate, TableWrapper } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import { FORMAT_DATE_TIME } from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { groupBy } from "lodash";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const { Column } = TableWrapper;
let timer = null;
const ModalSuaSoLuongLe = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const history = useHistory();
  const { nbThongTinRaVien } = useStore("nbDotDieuTri", {});

  const {
    nhapKho: { chinhSuaDichVuLe, taoPhieuLinhBu },
  } = useDispatch();
  const [state, _setState] = useState({ show: false, tuVong: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        dataSource: data?.dsDichVu,
        dataSearch: data?.dsDichVu,
        payloadPhieuLinh: data?.payload,
      });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show, nbThongTinRaVien]);

  const onCancel = () => {
    setState({ show: false, tuVong: false });
  };

  const onChangeInputSearch = (key) => (e) => {
    let data = state?.dataSearch.filter((x) => {
      return x[key].toLowerCase().search(e.toLowerCase()) !== -1;
    });
    setState({ dataSource: data });
  };

  const onChangeInput = (key, index) => (e) => {
    state.dataSource[index][key] = e?.target?.value;
    setState({ [key]: e.target.value });
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "40px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => index + 1,
    }),
    Column({
      title: t("quanLyNoiTru.tenHangHoa"),
      width: "200px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      renderSearch: (
        <InputTimeout
          placeholder={t("quanLyNoiTru.tenHangHoa")}
          onChange={onChangeInputSearch("tenDichVu")}
        />
      ),
    }),
    Column({
      title: t("common.maHoSo"),
      width: "90px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.maHoSo")}
          onChange={onChangeInputSearch("maHoSo")}
        />
      ),
    }),
    Column({
      title: t("common.tenNb"),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.tenNb")}
          onChange={onChangeInputSearch("tenNb")}
        />
      ),
    }),
    Column({
      title: t("quanLyNoiTru.slChiDinh"),
      width: "70px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, data, index) => (
        <Input value={item} onChange={onChangeInput("soLuong", index)}></Input>
      ),
    }),
    Column({
      title: t("quanLyNoiTru.ghiChuPhieuLinh"),
      width: "150px",
      dataIndex: "ghiChuPhieuLinh",
      key: "ghiChuPhieuLinh",
      render: (item, data, index) => (
        <Input
          value={item}
          onChange={onChangeInput("ghiChuPhieuLinh", index)}
        ></Input>
      ),
    }),
    Column({
      title: t("quanLyNoiTru.toDieuTri.ngayYLenh"),
      width: "100px",
      dataIndex: "thoiGianYLenh",
      key: "thoiGianYLenh",
      render: (item) => item && moment(item).format(FORMAT_DATE_TIME),
    }),
  ];
  const onSubmit = () => {
    chinhSuaDichVuLe({
      payload: state?.dataSource.map((item) => {
        return {
          id: item?.id,
          nbDvKho: { ghiChuPhieuLinh: item?.ghiChuPhieuLinh },
          nbDichVu: { soLuong: item.soLuong },
        };
      }),
      loaiDichVu: state?.payloadPhieuLinh?.loaiDichVu,
    }).then(() => {
      let body = {
        ...state.payloadPhieuLinh,
        dsKhoaChiDinhId: state.payloadPhieuLinh.dsKhoaChiDinhId
          ? [state.payloadPhieuLinh.dsKhoaChiDinhId]
          : undefined,
      };
      taoPhieuLinhBu(body)
        .then((s) => {
          if (s?.data?.id) {
            if (s?.data.loaiNhapXuat === 80) {
              history.push("/kho/xuat-kho/chi-tiet-linh-bu/" + s?.data.id);
            } else
              history.push(
                "/quan-ly-noi-tru/chi-tiet-phieu-linh/" + s?.data.id
              );
          }
        })
        .catch((e) => message.error(e?.message));
    });
  };
  return (
    <ModalTemplate
      width={1096}
      ref={refModal}
      title={t("common.thongBao")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <div className="title">
          <label>{t("quanLyNoiTru.tonTaiHangHoaCoTongSoLuongLinhLe")}:</label>
          {Object.values(groupBy(state?.dataSource, "dichVuId") || [])
            .map((item) => {
              return {
                dienGiai: `${item[0]?.tenDichVu} : ${item.reduce(
                  (total, x) => (total = total + x.soLuong),
                  0
                )} ${item[0]?.tenDonViTinh}`,
              };
            })
            .map((item1) => (
              <div style={{ paddingLeft: "10px" }}>{item1.dienGiai}</div>
            ))}
        </div>
        <TableWrapper dataSource={state?.dataSource} columns={columns} />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSuaSoLuongLe);
