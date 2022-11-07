import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Row, Checkbox, Col, Form } from "antd";
import { Main } from "./styled";
import TextField from "components/TextField";
import {
  Select,
  DateTimePicker,
  ModalTemplate,
  Button,
  BasicBox,
  SplitPanel,
} from "components";
import IcPrint from "assets/images/kho/IcPrint.png";
import IcSave from "assets/svg/ic-save.svg";
import moment from "moment";
import { dataInfoCommon, TRANG_THAI } from "../../configs";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import { ENUM, FORMAT_DATE_TIME, LOAI_DICH_VU, ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useEnum, useLoading } from "hook";
import { useSelector, useDispatch } from "react-redux";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";

const ModalChiTietDichVuTiepNhan = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const refBtnSave = useRef(null);
  const [form] = Form.useForm();
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const { nbDotDieuTriId } = useSelector((state) => state.choTiepDonDV);
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { listAllMauKetQuaCDHA } = useSelector((state) => state.mauKetQuaCDHA);
  const { listDataTongHop: listDataTongHopMaMay } = useSelector(
    (state) => state.maMay
  );
  const { showLoading, hideLoading } = useLoading();
  const dataInput = useRef(null);
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const {
    choTiepDonDV: { getTongHopDichVuCLS, updateKetQua },
    phimTat: { onAddLayer, onRegisterHotkey },
    mauKetQuaCDHA: { getListAllMauKetQuaCDHA },
    maMay: { getDataTongHop: getDataTongHopMaMay },
  } = useDispatch();

  const [state, _setState] = useState({
    ketQua: null,
    ketLuan: null,
    cachThucCanThiep: null,
    phuongPhapCanThiep: null,
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onOk = (isOk) => async () => {
    if (isOk) {
      const values = await form.validateFields();
      try {
        showLoading();
        const { dieuDuongId, nguoiThucHienId, maMayId, nguoiTiepNhanId } =
          values;
        const data = {
          ketQua: dataInput.current?.ketQua,
          ketLuan: dataInput.current?.ketLuan,
          cachThucCanThiep: dataInput.current?.cachThucCanThiep,
          phuongPhapCanThiep: dataInput.current?.phuongPhapCanThiep,
          nbDotDieuTriId,
          id: state.item?.id,
          nguoiThucHienId: nguoiThucHienId,
          dieuDuongId: dieuDuongId,
          maMayId: maMayId,
          nguoiTiepNhanId: nguoiTiepNhanId,
          thoiGianCoKetQua:
            state?.item?.thoiGianCoKetQua &&
            moment(state?.item?.thoiGianCoKetQua).format("YYYY-MM-DD HH:mm:ss"),
          thoiGianTiepNhan:
            state?.item?.thoiGianTiepNhan &&
            moment(state?.item?.thoiGianTiepNhan).format("YYYY-MM-DD HH:mm:ss"),
          thoiGianThucHien:
            state?.item?.thoiGianThucHien &&
            moment(state?.item?.thoiGianThucHien).format("YYYY-MM-DD HH:mm:ss"),
        };
        await updateKetQua(data);
        await getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
        onOk(false)();
      } catch (error) {
      } finally {
        hideLoading();
      }
    } else {
      setState({ show: false });
    }
  };
  useImperativeHandle(ref, () => ({
    show: (item) => {
      setState({
        show: true,
        item: item,
        ketQua: item?.ketQua,
        ketLuan: item?.ketLuan,
        cachThucCanThiep: item?.cachThucCanThiep,
        phuongPhapCanThiep: item?.phuongPhapCanThiep,
      });

      const dataForm = {
        nguoiThucHienId: item?.nguoiThucHienId,
        dieuDuongId: item?.dieuDuongId,
        maMayId: item?.maMayId,
        nguoiTiepNhanId: item?.nguoiTiepNhanId,
      };

      form.setFieldsValue(dataForm);

      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setState({
                show: false,
              });
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refBtnSave.current && refBtnSave.current.click();
            },
          },
        ],
      });
    },
  }));

  useEffect(() => {
    if (state.show) {
      // form.resetFields();
      refModal.current && refModal.current.show();
      getListAllMauKetQuaCDHA({
        page: "",
        size: "",
        active: true,
        loaiDichVu: LOAI_DICH_VU.CDHA,
      });
      getDataTongHopMaMay({ page: "", size: "", active: true });
    } else {
      refModal.current && refModal.current.hide();
      form.resetFields();
    }
  }, [state.show]);

  const onChange = (key) => (value) => {
    dataInput.current = {
      ...dataInput.current,
      [key]: value,
    };
  };

  const onChangeDate = (key) => (e) => {
    state.item[key] = e?._d;
    setState({ [key]: e?._d });
  };
  const renderData = (item, type, key) => {
    if (type === "datetime") {
      return item && moment(item).format(FORMAT_DATE_TIME);
    }
    if (type === "status") {
      return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
    }
    if (type === "price") {
      return item && item.formatPrice();
    }
    if (type === "checkbox") {
      return (
        <Checkbox disabled checked={item}>
          {item}
        </Checkbox>
      );
    }
    if (type === "listNhanVien" || type === "listMaMay") {
      return (
        <div style={{ display: "flex" }}>
          <div className="hanlde-textfield mt-0">
            <Form form={form} className="form-custom">
              {type === "listNhanVien" &&
                TRANG_THAI.DA_TIEP_NHAN.concat(
                  TRANG_THAI.TIEP_NHAN,
                  TRANG_THAI.DA_CO_KET_QUA
                ).includes(state.item?.trangThai) && (
                  <Form.Item name={key}>
                    <Select
                      data={listAllNhanVien || []}
                      // value={listAllNhanVien.find((itm) => itm.id === item).id}
                      style={{ width: "250px" }}
                      disabled={disabled}
                    ></Select>
                  </Form.Item>
                )}
              {type === "listMaMay" &&
                TRANG_THAI.DA_TIEP_NHAN.concat(
                  TRANG_THAI.TIEP_NHAN,
                  TRANG_THAI.DA_CO_KET_QUA
                ).includes(state.item?.trangThai) && (
                  <Form.Item name={key}>
                    <Select
                      data={listDataTongHopMaMay || []}
                      style={{ width: "250px", marginTop: "4px" }}
                      disabled={disabled}
                    ></Select>
                  </Form.Item>
                )}
            </Form>
          </div>
        </div>
      );
    }

    if (type === "datetimeEdit") {
      return (
        <DateTimePicker
          value={moment(item)}
          disabled={disabled}
          onChange={onChangeDate(key)}
          style={{ width: "250px" }}
        />
      );
    }

    return item;
  };

  const disable =
    TRANG_THAI.DA_TIEP_NHAN.includes(state?.item?.trangThai) &&
    state?.item?.trangThaiHoan === 0;

  const onChangeMauKQ = (e, item) => {
    debugger;
    let data = item?.lists;
    setState({
      ketQua: data?.ketQua || state.item?.ketQua,
      ketLuan: data?.ketLuan || state.item?.ketLuan,
      cachThucCanThiep: data?.cachThuc || state.item?.cachThucCanThiep,
      phuongPhapCanThiep: data?.phuongThuc || state.item?.phuongPhapCanThiep,
    });
    dataInput.current = {
      ketQua: data?.ketQua || state.item?.ketQua,
      ketLuan: data?.ketLuan || state.item?.ketLuan,
      cachThucCanThiep: data?.cachThuc || state.item?.cachThucCanThiep,
      phuongPhapCanThiep: data?.phuongThuc || state.item?.phuongPhapCanThiep,
    };
  };

  let hours = state?.item?.thoiGianCoKetQua
    ? moment(new Date()).diff(moment(state?.item?.thoiGianCoKetQua), "hours")
    : 0;

  const disabledKetLuan = !TRANG_THAI.DA_TIEP_NHAN.includes(
    state.item?.trangThai
  );

  const disabled =
    hours > 48 && !checkRole([ROLES["CDHA_TDCN"].SUA_DICH_VU_CO_KET_QUA]);

  return (
    <ModalTemplate
      onCancel={onOk(false)}
      ref={refModal}
      closable={false}
      title={
        <>
          <span>{t("xetNghiem.chiTietDichVu")}: </span>
          <span style={{ fontWeight: "bold" }}>{state.item?.tenDichVu}</span>
          <span> | </span>
          <span>{t("xetNghiem.chanDoanSoBo")}: </span>
          <span style={{ fontWeight: "bold" }}>{state.item?.cdSoBo}</span>
        </>
      }
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onOk(false)}
          leftIcon={<IcArrowLeft />}
          iconHeight={15}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        ((TRANG_THAI.DA_TIEP_NHAN.concat(
          TRANG_THAI.TIEP_NHAN,
          TRANG_THAI.DA_CO_KET_QUA
        ).includes(state.item?.trangThai) &&
          hours < 48) ||
          checkRole([ROLES["CDHA_TDCN"].SUA_DICH_VU_CO_KET_QUA])) && (
          <Button ref={refBtnSave} onClick={onOk(true)}>
            <span className="btn-ok">{t("common.luuThayDoi")}</span>
            <img src={IcSave} alt="..."></img>
          </Button>
        ) && (
          <Button
            type="primary"
            minWidth={100}
            rightIcon={<IcSave />}
            iconHeight={15}
            onClick={onOk(true)}
          >
            {t("common.luuThayDoi")}
          </Button>
        )
      }
    >
      <Main>
        <SplitPanel>
          <BasicBox className={"box-left"} title={t("common.thongTinDichVu")}>
            {state?.show &&
              dataInfoCommon.map((value) => {
                return (
                  <Row key={value.dataIndex} className={value.className}>
                    <Col span={10}> {t(value.title)}</Col>
                    <Col span={14} style={{ fontWeight: "bold" }}>
                      {renderData(
                        state.item && state.item[value.dataIndex],
                        value.type,
                        value.dataIndex
                      )}
                    </Col>
                  </Row>
                );
              })}
          </BasicBox>
          <BasicBox
            className={"box-right"}
            title={
              <>
                <span>{t("common.ketLuan")}</span>
                <Select
                  placeholder={t("common.chonMauKetQua")}
                  data={listAllMauKetQuaCDHA}
                  onChange={onChangeMauKQ}
                  // disabled={!disable}
                />
              </>
            }
          >
            <div className="result-info">
              <TextField
                label={t("common.ketQua")}
                onChange={onChange("ketQua")}
                html={state.ketQua}
                readOnly={disabledKetLuan}
                type="html"
                style={state.ketQua ? { background: "none" } : {}}
              />
              <TextField
                label={t("common.ketLuan")}
                onChange={onChange("ketLuan")}
                html={state.ketLuan}
                readOnly={disabledKetLuan}
                type="html"
                style={state.ketLuan ? { background: "none" } : {}}
              />
              <TextField
                label={t("common.cachThucCanThiep")}
                onChange={onChange("cachThucCanThiep")}
                html={state.cachThucCanThiep}
                readOnly={disabledKetLuan}
                type="html"
                style={state.cachThucCanThiep ? { background: "none" } : {}}
              />
              <TextField
                label={t("common.phuongThucCanThiep")}
                onChange={onChange("phuongPhapCanThiep")}
                html={state.phuongPhapCanThiep}
                readOnly={disabledKetLuan}
                type="html"
                style={state.phuongPhapCanThiep ? { background: "none" } : {}}
              />
            </div>
          </BasicBox>
        </SplitPanel>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChiTietDichVuTiepNhan);
