import { message, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Main, MainPage, MainSpin } from "./styled";
import fileUtils from "utils/file-utils";
import { openInNewTab } from "utils";
import { Button } from "components";

const defaultState = {
  loaiThoiGian: 40,
  tuNgay: moment().set("hour", 0).set("minute", 0).set("second", 0),
  denNgay: moment().set("hour", 23).set("minute", 59).set("second", 59),
  tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
  denThoiGian: moment().set("hour", 23).set("minute", 59).set("second", 59),
  isValidData: true,
  priviewPdf: false,
  clickedSubmit: false,
  loading: false,
};

const getExtension = (path) => {
  const arr = path.split(".");
  return "." + arr[arr.length - 1];
};

const BaseBaoCao = ({
  title = "",
  renderFilter = () => <div></div>,
  getBc,
  // map param search ({_state}) => ({})
  handleDataSearch = () => ({}),
  beforeOk, // = () => false
  onReset, // () => () => {}
  initState = {},
  breadcrumb = [],
}) => {
  const [_state, _setState] = useState({
    ...defaultState,
    ...initState,
  });

  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const onChange = (type, isAll) => (e) => {
    let value;
    if (isAll) {
      // select multiple có chọn tất cả
      const newBool = JSON.stringify(e || "");
      const oldBool = JSON.stringify(_state[type]);
      if (newBool.indexOf('""') !== -1 && oldBool.indexOf('""') === -1) {
        value = [""];
      } else if (e.length > 1) value = e.filter((item) => item);
      else value = e;
    } else {
      value = e?.hasOwnProperty("target")
        ? e?.target?.type === "checkbox"
          ? e?.target?.checked
          : e?.target?.value
        : e?.hasOwnProperty("_d")
        ? moment(e._d)
        : e;
    }
    setState({
      [type]: value,
    });
    return value;
  };

  const onKeyDownDate = (key) => (e, f) => {
    const { value } = e.target;
    if (e.keyCode === 13 && value.length === 8) {
      const arr = value.match(/.{1,2}/g);
      let h = 0,
        m = 0,
        s = 0;
      if (key === "denNgay") {
        h = 23;
        m = 59;
        s = 59;
      }
      setState({
        [key]: moment()
          .set("date", arr[0])
          .set("month", parseInt(arr[1]) - 1)
          .set("year", arr[2] + arr[3])
          .set("hour", h)
          .set("minute", m)
          .set("second", s),
      });
    }
  };

  /**
   * hàm check mặc định trước khi submit.
   */
  const _beforeOk = () => {
    if (!_state.tuNgay) {
      message.error("Vui lòng chọn từ ngày");
      return false;
    }
    if (!_state.denNgay) {
      message.error("Vui lòng chọn đến ngày");
      return false;
    }
    return true;
  };

  const handleReset = onReset
    ? onReset({ _state })
    : () => {
        _setState({
          ...defaultState,
          ...initState,
        });
      };

  const isValidate = beforeOk ? beforeOk({ _state, _beforeOk }) : _beforeOk;

  const onOk = (isOk) => () => {
    if (!isValidate()) {
      setState({ isValidData: false, clickedSubmit: true });
      return;
    }
    const payload = handleDataSearch({ _state });
    if (!getBc) {
      message.error("Chưa ghép api");
      return;
    }
    setState({ loading: true });
    if (isOk) {
      getBc(payload)
        .then((data) => {
          if (!data.dinhDang || data.dinhDang === 20) {
            // export pdf
            if (data.file.pdf) {
              setState({
                src: data.file?.pdf,
                fileName: data.tenBaoCao + getExtension(data.file?.pdf),
                type: 20,
                priviewPdf: false,
              });
            }
          } else if (data.dinhDang === 10) {
            // export xlsx
            setState({
              src: data.file?.doc,
              fileName: data.tenBaoCao + getExtension(data.file?.doc),
              type: 10,
            });
          }
        })
        .catch((e) => {
          message.error(e?.message);
        })
        .finally(() => {
          setState({ loading: false });
        });
    } else {
      getBc(payload)
        .then((data) => {
          // export pdf
          if (data.file.pdf) {
            setState({
              src: data.file?.pdf,
              type: 20,
              priviewPdf: true,
            });
          }
        })
        .catch((e) => {
          message.error(e?.message);
        })
        .finally(() => {
          setState({ loading: false });
        });
    }
  };

  useEffect(() => {
    if (_state.src) {
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(_state.src) })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {
            type: _state.type
              ? _state.type == 20
                ? "application/pdf"
                : _state.type == 10
                ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                : "application/pdf"
              : "application/ pdf",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", `${_state.fileName}`); //or any other extension
          document.body.appendChild(link);
          if (_state.priviewPdf) {
            openInNewTab(blobUrl);
          } else {
            link.click();
          }
        });
    }
  }, [_state.src]);

  return (
    <Spin spinning={_state.loading || false} tip="Đang tải dữ liệu ...">
      <MainPage
        breadcrumb={[{ title: "Báo cáo", link: "/bao-cao" }, ...breadcrumb]}
      >
        <Main className="main-bao-cao">
          <div className="wrapper-layer">
            <div className="layer-title">
              <div className="left">{title}</div>
            </div>
            <div className="layer-content">
              <div className="layer-content-note">
                Chọn tiêu chí lọc cho báo cáo!
              </div>
              <div className="layer-content-main">
                {renderFilter({ onChange, _state, onKeyDownDate })}
              </div>
              <div className="layer-content-action">
                <Button
                  onClick={handleReset}
                  type="default"
                  rightIcon={
                    <img
                      src={require("assets/images/kho/icClose.png")}
                      alt=""
                    />
                  }
                  minWidth={100}
                >
                  Huỷ
                </Button>
                <Button
                  onClick={onOk(true)}
                  type="default"
                  minWidth={100}
                  rightIcon={
                    <img
                      src={require("assets/images/bao-cao/icDownload.png")}
                      alt=""
                    />
                  }
                >
                  Tải về
                </Button>
                <Button onClick={onOk(false)} type="primary" minWidth={100}>
                  Xem báo cáo
                </Button>
              </div>
            </div>
          </div>
        </Main>
      </MainPage>
    </Spin>
  );
};

export default BaseBaoCao;
