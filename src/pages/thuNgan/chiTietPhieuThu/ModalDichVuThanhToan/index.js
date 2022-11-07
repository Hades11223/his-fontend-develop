import React, {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import { Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import IconCheckout from "assets/images/thuNgan/icCheckout.svg";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Checkbox, Input } from "antd";
import { firstLetterWordUpperCase } from "utils";
import { useTranslation } from "react-i18next";
import { Button, ModalTemplate, TableWrapper, Card } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { ENUM, HOTKEY } from "constants/index";
import { useEnum } from "hook";

let timer = null;

const ModalDichVuThanhToan = (props, ref) => {
  const { listAllPhuongThucThanhToan } = useSelector(
    (state) => state.phuongThucTT
  );
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const listAllService = useSelector(
    (state) => state.danhSachDichVu.listAllService
  );

  const { t } = useTranslation();
  const [state, _setState] = useState({
    tienDaNhan: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refModal = useRef(null);

  useImperativeHandle(ref, () => ({
    show: ({
      phieuThuId,
      hoanUng,
      nbDotDieuTriId,
      tienDaNhan,
      tongTien,
      dsPhuongThucTt,
    }) => {
      setState({
        phieuThuId,
        hoanUng,
        nbDotDieuTriId,
        show: true,
        tienDaNhan,
        tongTien,
        dsPhuongThucTt,
      });
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const { dsPhuongThucTt } = state;

  const {
    danhSachDichVu: { searchAll, onChangeInputSearch, onSizeChange },
    thuNgan: { postPhieuThuThanhToan },
  } = useDispatch();
  const checkNccKhacBv = useMemo(() => {
    if (state.show)
      return listAllPhuongThucThanhToan.some((item) => {
        if (dsPhuongThucTt[item?.id] && item?.nccKhacBv) {
          console.log(item);
          return true;
        }
      });
    return false;
  }, [dsPhuongThucTt, listAllPhuongThucThanhToan, state.show]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    if (state.show)
      searchAll({
        nbDotDieuTriId: state.nbDotDieuTriId,
        phieuThuId: state.phieuThuId,
        dataSortColumn: { tenDichVu: 1 },
      });
  }, [state.phieuThuId, state.show, state.nbDotDieuTriId]);

  useEffect(() => {
    setSelectedRowKeys(listAllService);
    setTotalPayment(calculatorTotalPrice(listAllService));
  }, [listAllService]);

  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const gioiTinh = useMemo(() => {
    return (
      listGioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {}
    );
  }, [listGioiTinh, thongTinBenhNhan]);

  const onOk = (isOk) => async () => {
    if (isOk) {
      if (tienDaNhan < totalPayment) {
        return message.error(
          t("thuNgan.soTienThanhToanKhongDung")
            .replace("{0}", totalPayment.formatPrice())
            .replace("{1}", tienDaNhan.formatPrice())
        );
      }
      const dsDichVu = selectedRowKeys.map((item) => ({ id: item.id }));
      const payload = Object.keys(dsPhuongThucTt).map((key) => {
        let moneyOfMethod = 0;
        moneyOfMethod =
          key === "1"
            ? dsPhuongThucTt[key].tongTien - (tienDaNhan - totalPayment)
            : dsPhuongThucTt[key].tongTien;
        return {
          phuongThucTtId: key,
          tongTien: moneyOfMethod,  
        };
      });
      await postPhieuThuThanhToan({
        id: state.phieuThuId,
        dsDichVu,
        dsPhuongThucTt: payload,
        nbDotDieuTriId: state.nbDotDieuTriId,
        hoanUng: state.hoanUng,
      });
      onSizeChange({
        size: 10,
        nbDotDieuTriId: state.nbDotDieuTriId,
        phieuThuId: state.phieuThuId,
      });
      onOk(false)();
    } else {
      setState({ show: false });
    }
  };
  const { tienDaNhan } = state;

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    // if (requiredNumber && !isNumber(value) && value) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const handleClickCheckbox = (item) => (e) => {
    let selectRowKeysCopy = [...selectedRowKeys];
    const isChecked = e.target.checked;

    if (item === "all") {
      selectRowKeysCopy = isChecked ? listAllService : [];
    } else {
      if (isChecked) {
        selectRowKeysCopy = [...selectRowKeysCopy, item];
      } else {
        const index = selectedRowKeys.findIndex((st) => st.id === item.id);

        if (index !== -1) {
          selectRowKeysCopy.splice(index, 1);
        }
      }
    }
    setSelectedRowKeys(selectRowKeysCopy);
    setTotalPayment(calculatorTotalPrice(selectRowKeysCopy));
  };

  const calculatorTotalPrice = (selectedRowKeys) => {
    let total = 0;
    total =
      selectedRowKeys.length > 0
        ? selectedRowKeys.reduce((reducer, current) => {
            return reducer + current.thanhTien;
          }, 0)
        : 0;
    return total;
  };

  const calculatorPriceReturn = () => {
    const moneyReturn =
      totalPayment < tienDaNhan ? tienDaNhan - totalPayment : 0;
    return moneyReturn;
  };

  const columns = [
    {
      title: (
        <HeaderSearch
          title={
            <Checkbox
              defaultChecked={true}
              onChange={handleClickCheckbox("all")}
            >
              {t("common.tatCa")}
            </Checkbox>
          }
        />
      ),
      width: "100px",
      dataIndex: "thaotac",
      key: "thaotac",
      align: "center",
      render: (item) => (
        <Checkbox
          checked={selectedRowKeys.findIndex((st) => st.id === item.id) !== -1}
          onChange={handleClickCheckbox(item)}
        />
      ),
    },
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "60px",
      dataIndex: "stt",
      key: "stt",
      align: "right",
    },
    {
      title: <HeaderSearch title={t("common.thanhTien")} />,
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (item) => item && item.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          search={
            <Input
              placeholder={t("thuNgan.timTenDichVu")}
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} />,
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },
  ];

  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOk(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOk(true)();
      },
    },
  ];

  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOk(false)}
      closable={false}
      width={917}
      title={t("thuNgan.dichVuThanhToan")}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {thongTinBenhNhan.tuoi && (
            <span className="normal-weight">
              - {thongTinBenhNhan?.tuoi} {t("common.tuoi")}
            </span>
          )}
        </>
      }
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
          disabled={checkNccKhacBv}
        >
          {t("common.quayLai")} [ESC]
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<IconCheckout className="btn-checkout__icon" />}
          iconHeight={15}
          onClick={onOk(true)}
        >
          {t("common.xacNhan")} [F4]
        </Button>
      }
      hotKeys={hotKeys}
    >
      <Main>
        <Col span={8}>
          <div className="box-left">
            <div className="box-left__price">
              <div className="box-left__title">{t("thuNgan.soTienDaNhan")}</div>
              <div className="box-left__detail">
                {tienDaNhan.formatPrice()} đ
              </div>
            </div>
            <div className="box-left__price">
              <div className="box-left__title">
                {t("thuNgan.soTienThanhToanDv")}
              </div>
              <div className="box-left__detail">
                {(totalPayment || 0).formatPrice()} đ
              </div>
            </div>
            <div className="box-left__price">
              <div className="box-left__title">{t("thuNgan.soTienTraLai")}</div>
              <div className="box-left__detail">
                {calculatorPriceReturn().formatPrice()} đ
              </div>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="box-right">
            <div className="box-right__title">
              {t("thuNgan.chonDvDeThanhToan")}
            </div>
            <Card noPadding={true} bottom={0}>
              <div className="box-right__table-title">
                {t("common.daChon")} {selectedRowKeys.length}{" "}
                {t("common.dichVu")}
              </div>
              <div className="box-right__table-content">
                <TableWrapper columns={columns} dataSource={listAllService} />
              </div>
            </Card>
          </div>
        </Col>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDichVuThanhToan);
