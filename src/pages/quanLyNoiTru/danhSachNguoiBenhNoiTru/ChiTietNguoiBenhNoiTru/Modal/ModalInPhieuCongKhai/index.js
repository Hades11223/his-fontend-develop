import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main } from "./styled";
import { Button, ModalTemplate, Select } from "components";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { DatePicker } from "antd";
import { useListAll, useStore } from "hook";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";

const ModalInPhieuCongKhai = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const [listAllNhomDichVuCap1] = useListAll("nhomDichVuCap1");
  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);
  const { listToDieuTri } = useSelector((state) => state.toDieuTri);

  const { getKhoaTheoTaiKhoan } = useDispatch().khoa;

  //state
  const [state, _setState] = useState({
    show: false,
    checkValidate: false,
    tuThoiGianThucHien: null,
    denThoiGianThucHien: null,
    nhomDichVuCap1Id: null,
    khoaChiDinhId: null,
  });

  useEffect(() => {
    if (!listToDieuTri || listToDieuTri.length == 0) return;

    const listToDieuTriOrder = orderBy(
      listToDieuTri || [],
      "thoiGianYLenh",
      "asc"
    );

    setState({
      tuThoiGianThucHien: listToDieuTriOrder[0].thoiGianYLenh
        ? moment(listToDieuTriOrder[0].thoiGianYLenh)
        : null,
    });
  }, [listToDieuTri]);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getKhoaTheoTaiKhoan(param);
  }, []);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, onOk) => {
      setState({
        show: true,
        khoaChiDinhId: data?.khoaLamViec?.id || null,
      });

      refCallback.current = onOk;
    },
  }));

  //function
  const onClose = () => {
    setState({
      show: false,
      checkValidate: false,
      tuThoiGianThucHien: null,
      denThoiGianThucHien: null,
      nhomDichVuCap1Id: null,
      khoaChiDinhId: null,
    });
  };

  const onCheckValidate = () => {
    setState({ checkValidate: true });
    if (
      !state.tuThoiGianThucHien ||
      !state.denThoiGianThucHien ||
      !state.khoaChiDinhId
    ) {
      return false;
    }

    return true;
  };

  const onSave = () => {
    if (!onCheckValidate()) {
      return;
    }

    const {
      tuThoiGianThucHien,
      denThoiGianThucHien,
      nhomDichVuCap1Id,
      khoaChiDinhId,
    } = state;

    refCallback.current({
      tuThoiGianThucHien: tuThoiGianThucHien.format("DD-MM-YYYY HH:mm:ss"),
      denThoiGianThucHien: denThoiGianThucHien.format("DD-MM-YYYY HH:mm:ss"),
      nhomDichVuCap1Id,
      khoaChiDinhId,
    });
    onClose();
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onChange = (key) => (e) => {
    setState({
      [key]: e || null,
    });
  };

  const disabledDate = (type) => (date) => {
    if (type == "tuThoiGianThucHien" && state.denThoiGianThucHien) {
      return date < moment(state.denThoiGianThucHien).add(-26, "days");
    }

    if (type == "denThoiGianThucHien" && state.tuThoiGianThucHien) {
      return date > moment(state.tuThoiGianThucHien).add(26, "days");
    }

    return false;
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={600}
      onCancel={onClose}
      title={"Phi???u c??ng khai d???ch v??? kh??m, ch???a b???nh n???i tr??"}
      closable={false}
    >
      <Main>
        <div className="form">
          <div className="form-item">
            <div className="label">
              <span>{"Th???i gian th???c hi???n:"}</span>
              <span className="error">*</span>
            </div>
            <div className="content">
              <DatePicker
                value={
                  state.tuThoiGianThucHien
                    ? moment(state.tuThoiGianThucHien)
                    : null
                }
                showTime={{
                  format: "HH:mm:ss",
                }}
                format="DD-MM-YYYY HH:mm:ss"
                disabledDate={disabledDate("tuThoiGianThucHien")}
                placeholder={t("common.tuNgay")}
                onChange={onChange("tuThoiGianThucHien")}
              ></DatePicker>
              &#9;
              <DatePicker
                value={
                  state.denThoiGianThucHien
                    ? moment(state.denThoiGianThucHien)
                    : null
                }
                showTime={{
                  format: "HH:mm:ss",
                }}
                format="DD-MM-YYYY HH:mm:ss"
                disabledDate={disabledDate("denThoiGianThucHien")}
                placeholder={t("common.denNgay")}
                onChange={onChange("denThoiGianThucHien")}
              ></DatePicker>
            </div>
          </div>
          {state?.checkValidate &&
            (!state.tuThoiGianThucHien || !state.denThoiGianThucHien) && (
              <span className="error">Vui l??ng ch???n th???i gian th???c hi???n</span>
            )}

          <div className="form-item">
            <div className="label">{"Nh??m DV:"}</div>
            <div className="content">
              <Select
                value={state.nhomDichVuCap1Id}
                data={listAllNhomDichVuCap1 || []}
                placeholder="Ch???n nh??m d???ch v???"
                onChange={onChange("nhomDichVuCap1Id")}
              />
            </div>
          </div>

          <div className="form-item">
            <div className="label">
              <span>{"Khoa ch??? ?????nh:"}</span>
              <span className="error">*</span>
            </div>
            <div className="content">
              <Select
                value={state.khoaChiDinhId}
                data={listKhoaTheoTaiKhoan || []}
                placeholder="Ch???n khoa ch??? ?????nh"
                onChange={onChange("khoaChiDinhId")}
              />
            </div>
          </div>

          {state?.checkValidate && !state.khoaChiDinhId && (
            <span className="error">Vui l??ng ch???n khoa ch??? ?????nh</span>
          )}
        </div>

        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<IcArrowLeft />}
            onClick={onClose}
          >
            {t("common.quayLai")}
          </Button.Text>

          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            rightIcon={<IcPrint />}
          >
            {t("common.in")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalInPhieuCongKhai);
