import { message, Row, Popover, Radio } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import imgSearch from "assets/images/template/icSearch.png";
import { Main } from "./styled";
import { LOAI_DICH_VU } from "constants/index.js";
import InputTimeout from "components/InputTimeout";
import Select from "components/Select";
import { Button, ModalTemplate } from "components";
import TableVatTu from "./TableVatTu";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcGroup from "assets/images/template/icGroup.png";
import cacheUtils from "utils/cache-utils";
import { refConfirm } from "app";

const DichVuVatTu = (props, ref) => {
  const { t } = useTranslation();
  const { dataNb, chiDinhTuLoaiDichVu, listLoaiVatTu, khoaChiDinhId } = props;

  const refModal = useRef(null);
  const refIsSubmit = useRef(null);
  const refTable = useRef();

  const {
    tamTinhTien,
    chiDinhDichVu,
    getListDichVuVatTu,
    getListDichVuTonKho,
  } = useDispatch().chiDinhVatTu;

  const dataSearch = useStore("chiDinhVatTu.dataSearch");
  const [state, _setState] = useState({
    show: false,
    listSelectedDv: [],
    thanhTien: 0,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    async function fetchData() {
      let data = await cacheUtils.read(
        "",
        "DATA_THEO_SO_LUONG_TON_KHO_VAT_TU",
        null,
        false
      );
      if (data) {
        setState({ theoSoLuongTonKho: data?.theoSoLuongTonKho });
      } else {
        setState({ theoSoLuongTonKho: 15 });
      }
    }
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    show: (option = {}) => {
      setState({
        show: true,
        loaiDonVatTu: option?.loaiDonVatTu,
        filterText: "",
        dataSource: option?.dataSource || {},
        dataKho: option?.dataKho || [],
      });
      onSelectLoaiVatTu(option?.khoId)(option?.loaiDonVatTu);
      refIsSubmit.current = false;
      if (refTable.current) {
        refTable.current.onShow({ khoId: dataSearch?.khoId });
      }
    },
  }));
  useEffect(() => {
    if (!state.show) {
      setTimeout(() => refModal.current.hide(), 50);
    } else {
      refModal.current.show({});
    }
  }, [state.show]);
  const { thanhTien } = state;

  const onTamTinhTien = (listSelected) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
      nbDichVu: {
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong,
        dichVu: {
          id: item?.id,
          ma: item?.ma,
          ten: item?.ten,
          hamLuong: item?.hamLuong,
          tenHoatChat: item?.tenHoatChat,
        },
        khoaChiDinhId: khoaChiDinhId || dataNb?.khoaChiDinhId,
        chiDinhTuDichVuId: dataNb?.id,
        chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
      },
    }));
    tamTinhTien(payload).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );
      const messageWarning = ((s || []).filter((x) => x.message) || []).reduce(
        (value, currentValue) => value.concat(currentValue.message + ", "),
        ""
      );
      if (messageWarning?.length) message.warning(messageWarning);
      setState({
        thanhTien: thanhTien,
        listSelectedDv: listSelected,
      });
    });
  };

  const onChangeInput = (e) => {
    let objSearch = {
      timKiem: e,
      page: 0,
      size: 10,
    };
    getListDichVuTonKho(objSearch);
  };

  const onSubmit = () => {
    if (refIsSubmit.current) return;
    const { listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error("Yêu cầu nhập chỉ định dịch vụ!");
      return;
    }
    let checkSoLuong = listSelectedDv.some(
      (item) => !item.soLuong || item.soLuong === 0
    );
    if (checkSoLuong) {
      message.error("Trường bắt buộc điền: Số lượng");
      return;
    }

    const payload = listSelectedDv.map((item) => {
      return {
        nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: dataNb?.id,
          chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
          khoaChiDinhId: khoaChiDinhId || dataNb?.khoaChiDinhId,
          loaiDichVu: item?.loaiDichVu,
          tuTra: item?.tuTra,
          khongTinhTien: item?.khongTinhTien,
          dichVu: {
            id: item?.id,
            ma: item?.ma,
            ten: item?.ten,
            hamLuong: item?.hamLuong,
            tenHoatChat: item?.tenHoatChat,
          },
        },
        nbDvKho: {
          khoId: dataSearch?.khoId,
        },
      };
    });
    refIsSubmit.current = true;

    chiDinhDichVu(payload)
      .then((s) => {
        getListDichVuVatTu({
          nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
          chiDinhTuDichVuId: dataNb.id,
          chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
        }).then((res) => {
          onCancel();
        });
        let messageResponse = (s || []).filter((item) => item.message);
        if (messageResponse.length) {
          let messageError = messageResponse.filter((x) => x.code !== 0);
          if (messageError.length) {
            message.error(messageError.map((x) => x.message).join(","));
          } else {
            let content = messageResponse[messageResponse.length - 1].message;
            content &&
              refConfirm.current &&
              refConfirm.current.show(
                {
                  title: t("common.canhBao"),
                  content: content,
                  cancelText: t("common.dong"),
                  classNameOkText: "button-error",
                  showImg: true,
                  typeModal: "warning",
                },
                () => {}
              );
          }
        }
      })

      .catch(() => {
        refIsSubmit.current = false;
      });
  };
  const onSelectLoaiVatTu = (khoId) => (value) => {
    setState({
      loaiDonVatTu: value,
      khoId: khoId,
      listSelectedDv: [],
    });
  };

  const onSelectKho = (khoId) => {
    getListDichVuTonKho({
      page: 0,
      size: 10,
      khoId,
    });
  };

  const onCancel = () => {
    setState({
      show: false,
      thanhTien: 0,
      listSelectedDv: [],
    });
  };

  const onChangeRadio = (e) => {
    setState({ theoSoLuongTonKho: e.target.value });
    getListDichVuTonKho({ theoSoLuongTonKho: e.target.value });
    cacheUtils.save(
      "",
      "DATA_THEO_SO_LUONG_TON_KHO_VAT_TU",
      { theoSoLuongTonKho: e.target.value },
      false
    );
  };

  const popovercontent = (
    <div style={{ display: "grid" }}>
      {t("common.caiDatTimKiemHangHoa")}:
      <Radio.Group
        defaultValue={state?.theoSoLuongTonKho}
        style={{ display: "grid" }}
        onChange={onChangeRadio}
      >
        <Radio value={15}>{t("common.hangHoaConTon")}</Radio>
        <Radio value={""}>{t("common.tatCaHangHoa")}</Radio>
      </Radio.Group>
    </div>
  );
  return (
    <ModalTemplate
      width={1366}
      ref={refModal}
      title={t("common.chiDinhVatTu")}
      onCancel={onCancel}
      visible={state.show}
    >
      <Main>
        <Row className="content">
          <Row className="content-title">
            <span className="text">THÊM CHỈ ĐỊNH</span>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <Select
              placeholder="Chọn loại đơn"
              data={listLoaiVatTu}
              value={state?.loaiDonVatTu}
            ></Select>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <Select
              placeholder="Chọn kho"
              data={state?.dataKho}
              onChange={onSelectKho}
              value={dataSearch?.khoId}
            ></Select>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div className="input-box">
              <img src={imgSearch} alt="imgSearch" />
              <InputTimeout
                style={{ width: 450, height: 32, marginLeft: 0 }}
                className="input-header"
                placeholder="Nhập tên vật tư"
                onChange={onChangeInput}
                value={dataSearch?.timKiem}
              />
            </div>
            <div className="setting">
              <Popover
                trigger={"click"}
                content={popovercontent}
                placement="bottom"
              >
                <img src={IcGroup} alt="IcGroup" />
              </Popover>
            </div>
          </Row>
          <TableVatTu
            thanhTien={thanhTien}
            onSelected={onTamTinhTien}
            loaiDichVu={LOAI_DICH_VU.VAT_TU}
            visible={state.show}
            ref={refTable}
            chiDinhTuLoaiDichVu={chiDinhTuLoaiDichVu}
          />
        </Row>
        <div className="footer-btn">
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            Hủy
          </Button>
          <Button type="primary" onClick={onSubmit} minWidth={100}>
            Đồng ý
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(DichVuVatTu);
