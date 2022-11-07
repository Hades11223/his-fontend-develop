import { Input, Button, Row, Col } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled, SelectStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CustomPopover = (props, ref) => {
  const { t } = useTranslation();
  const cachXem = useSelector((state) => state.danhSachDichVuKho.cachXem);
  const dataSearch = useSelector((state) => state.danhSachDichVuKho.dataSearch);

  const searchByParams = useDispatch().danhSachDichVuKho.searchByParams;
  const updateData = useDispatch().danhSachDichVuKho.updateData;

  const {
    nguonNhapKho: { onSearch },
    quyetDinhThau: { getListAllQuyetDinhThau },
  } = useDispatch();
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListAllQuyetDinhThau({});
    onSearch({});
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else value = e;
    setState({ [key]: value });
  };

  const content = () => (
    <Main>
      <div className="content-popover">
        <Input
          placeholder={t("kho.donViTinh")}
          bordered={false}
          onChange={onChange("tenDonViTinh")}
        ></Input>
        {cachXem == 2 && (
          <Input
            placeholder={t("kho.soLo")}
            bordered={false}
            onChange={onChange("soLo")}
            type="number"
          ></Input>
        )}
        <div className="content-popover__select">
          <Select
            mode="multiple"
            showArrow
            placeholder={t("kho.loaiDichVu")}
            bordered={false}
            data={[
              {
                ten: "Thuốc",
                id: 90,
              },
              {
                ten: "Vật tư",
                id: 100,
              },
              {
                ten: "Hóa Chất",
                id: 110,
              },
            ]}
            onChange={onChange("dsLoaiDichVu")}
          ></Select>
        </div>

        <Row
          className="row-select-group"
          style={{ alignItems: "center", borderBottom: "1px solid #d9d9d9" }}
        >
          <Col span={11}>
            <SelectStyled>
              <label>{t("kho.slTonThucTe")}</label>
              <Input
                placeholder={t("kho.nhapSlNhoNhat")}
                bordered={false}
                onChange={onChange("soLuongTu")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongTu}
                onBlur={(e) => {
                  if (
                    state.soLuongDen &&
                    Number(state.soLuongTu) > Number(state.soLuongDen)
                  ) {
                    setState({
                      soLuongTu: "",
                    });
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault();
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
          <Col span={1}>-</Col>
          <Col span={11}>
            <SelectStyled>
              <Input
                placeholder={t("kho.nhapSlLonNhat")}
                bordered={false}
                onChange={onChange("soLuongDen")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongDen}
                onBlur={(e) => {
                  if (
                    state.soLuongTu &&
                    Number(state.soLuongTu) > Number(state.soLuongDen)
                  ) {
                    setState({
                      soLuongDen: "",
                    });
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault();
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
        </Row>
        <Row
          className="row-select-group"
          style={{ alignItems: "center", borderBottom: "1px solid #d9d9d9" }}
        >
          <Col span={11}>
            <SelectStyled>
              <label>{t("kho.slTonKhaDung")}</label>
              <Input
                placeholder={t("kho.nhapSlNhoNhat")}
                bordered={false}
                onChange={onChange("soLuongKhaDungTu")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongKhaDungTu}
                onBlur={(e) => {
                  if (
                    state.soLuongKhaDungDen &&
                    Number(state.soLuongKhaDungTu) >
                      Number(state.soLuongKhaDungDen)
                  ) {
                    setState({
                      soLuongKhaDungTu: "",
                    });
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault();
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
          <Col span={1}>-</Col>
          <Col span={11}>
            <SelectStyled>
              <label>{t("kho.slTonKhaDung")}</label>
              <Input
                placeholder={t("kho.nhapSlLonNhat")}
                bordered={false}
                onChange={onChange("soLuongKhaDungDen")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongKhaDungDen}
                onBlur={(e) => {
                  if (
                    state.soLuongKhaDungTu &&
                    Number(state.soLuongKhaDungTu) >
                      Number(state.soLuongKhaDungDen)
                  ) {
                    setState({
                      soLuongKhaDungDen: "",
                    });
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault();
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
        </Row>
        <div className="btn-search">
          <label></label>
          <Button
            onClick={() => {
              const { show, ...rest } = state;
              if (cachXem != 2) {
                delete rest?.soLo;
              } else {
                rest.theoLo = true;
              }
              if (rest?.dsLoaiDichVu?.length <= 0) {
                delete rest.dsLoaiDichVu;
                delete dataSearch.dsLoaiDichVu;
                updateData({
                  dataSearch,
                });
              }
              searchByParams(rest);
            }}
          >
            <img src={Search} alt="..." />
            <span>{t("kho.tim")}</span>
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      content={content}
      visible={state.show}
      placement="bottomLeft"
      trigger={"click"}
      onVisibleChange={() => onCancel()}
    ></PopoverStyled>
  );
};

export default forwardRef(CustomPopover);
