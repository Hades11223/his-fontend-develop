import React, { useState, forwardRef} from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Select, Spin } from "antd";
import { Element, Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import PhieuIn from "./PhieuIn";
import { debounce } from "lodash";

const { Option } = Select;

const XemTruoc = (
  { data, isHoSoBenhAn = false, title = "Phiếu 1", ...props },
  ref
) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { selectedIds, isLoadingListPhieu } = useSelector(
    (state) => state.phieuIn
  );
  const { updateData } = useDispatch().phieuIn;

  const onChange = (type) => (e) => {
    const value = e.target ? e.target?.value : e;
    setState({ [type]: value });
  };
  const onChangeKey = debounce((key) => {
    updateData({
      elementScrollingPdfKey: key,
    });
  }, 500);

  return (
    <Main
      title={title}
      subTitle={
        !isHoSoBenhAn && (
          <div className="mode">
            <Select
              value={state.mode}
              defaultValue={0}
              onChange={onChange("mode")}
            >
              <Option value={0}>{t("phieuIn.xemPhieuDaKyMoiNhat")}</Option>
              <Option value={1}>{t("phieuIn.xemPhieuChuaKyMoiNhat")}</Option>
            </Select>
          </div>
        )
      }
    >
      <Element
        name="stepwrapper"
        className="element section-body"
        id="containerElementPdf"
        style={{
          position: "relative",
          height: `calc(100vh - 255px)`,
          overflowY: "scroll",
        }}
      >
        <Spin spinning={isLoadingListPhieu}></Spin>
        {(selectedIds || []).map((item, index) => {
          return (
            <Link
              key={item}
              activeClass="active"
              to={item}
              spy={true}
              smooth={true}
              isDynamic={true}
              duration={0}
              containerId="containerElementPdf"
              offset={-100}
              onSetActive={(key, element, onClick) => {
                onChangeKey(key);
              }}
              id={"id" + item.replaceAll("-", "")}
              style={{ height: "100%", display: "block" }}
            >
              <Element
                name={`${item}`}
                className="element element-page"
                style={{ minHeight: "100%", display: "block" }}
              >
                <PhieuIn id={item} data={data} mode={state.mode} />
              </Element>
            </Link>
          );
        })}
      </Element>
    </Main>
  );
};

export default forwardRef(XemTruoc);
