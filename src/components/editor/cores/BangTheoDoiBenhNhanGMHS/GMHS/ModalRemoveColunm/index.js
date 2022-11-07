import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { Col, Icon, Modal, Row } from "antd";
import { cloneDeep, groupBy } from "lodash";
import moment from "moment";
import { GlobalStyle, Main } from "./styled";
const ModalRemoveColunm = (props, ref) => {
  const refCallBack = useRef(null);
  const [state, _setState] = useState({
    show: false,
    left: "",
    right: "",
    timeSelected: [],
  });
  const setState = (data = {}) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: ({ values = {} }, callback) => {
      let listDataColumn = [];
      let newValue = cloneDeep(values);
      for (const [key, value] of Object.entries(newValue)) {
        let colunm = { cot: key };
        for (let [keyChild, valueChid] of Object.entries(value)) {
          keyChild = keyChild.replaceAll(`chiSo_cot${key}_chiSoSong_`, "");
          if (!colunm[keyChild]) colunm[keyChild] = valueChid;

          colunm.thoiGian = value[`chiSo_cot${key}_chiSoSong_thoiGian`]
            ? moment(value[`chiSo_cot${key}_chiSoSong_thoiGian`]).format(
                "DD/MM/YYYY"
              )
            : null;
          colunm.gio = value[`chiSo_cot${key}_chiSoSong_thoiGian`]
            ? moment(value[`chiSo_cot${key}_chiSoSong_thoiGian`]).format(
                "HH:mm"
              )
            : null;
        }
        listDataColumn.push(colunm);
      }

      setState({
        listColunm: groupBy(
          listDataColumn.sort((a, b) => {
            return (
              new Date(moment(a.thoiGian, "DD/MM/YYYY").format()).getTime() -
              new Date(moment(b.thoiGian, "DD/MM/YYYY").format()).getTime()
            );
          }),
          "thoiGian"
        ),
        show: true,
      });
      refCallBack.current = callback;
    },
  }));
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const _onOK = () => {
    Modal.confirm({
      title: "Thông báo",
      content: "Bạn có chắc chắn muốn xóa dữ liệu !",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const cots = state.timeSelected.map((item) => item.split("_")[1]);
        refCallBack.current(
          state.timeSelected.map((item) => item.split("_")[1])
        );
        let listColunm = [];
        Object.keys(state.listColunm).forEach((item) => {
          listColunm.push(...state.listColunm[item]);
        });
        listColunm = groupBy(
          listColunm
            .filter(
              (item) => item.thoiGian && !cots.some((el) => el === item.cot)
            )
            .sort((a, b) => {
              return (
                new Date(moment(a.thoiGian, "DD/MM/YYYY").format()).getTime() -
                new Date(moment(b.thoiGian, "DD/MM/YYYY").format()).getTime()
              );
            }),
          "thoiGian"
        );
        setState({
          listColunm,
          timeSelected: [],
          show: false,
        });
      },
      onCancel() {},
    });
  };

  const onClickTime = (date, col) => {
    if (!state.timeSelected.includes(`${date}_${col.cot}`)) {
      setState({
        timeSelected: [...state.timeSelected, `${date}_${col.cot}`],
      });
    } else {
      const timeSelected = state.timeSelected.filter(
        (item) => item !== `${date}_${col.cot}`
      );
      setState({
        timeSelected: timeSelected,
      });
    }
  };
  const sortHour = (data) => {
    const dataSort = data
      .map((item) => ({
        ...item,
        hour: +item.gio.replaceAll(":", ""),
      }))
      .sort((a, b) => a.hour - b.hour);
    return dataSort;
  };
  return (
    <Modal
      width={500}
      title="Danh sách các cột thời gian dữ liệu của người bệnh "
      visible={state.show}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
      style={{ padding: 10 }}
    >
      <Main>
        <GlobalStyle />
        {Object.keys(state.listColunm || {}).map((date, index) => {
          if (date !== "null") {
            return (
              <div key={index}>
                <div className="date">Ngày phẫu thuật: {date}</div>
                <Row>
                  {sortHour(state.listColunm[date]).map((col, idx) => {
                    const isDelete = state.timeSelected.includes(
                      `${date}_${col.cot}`
                    );
                    return (
                      <Col
                        span={6}
                        key={idx}
                        onClick={() => {
                          onClickTime(date, col);
                        }}
                        style={{ margin: "10px 0px" }}
                        className={`item-time `}
                      >
                        <span className={`time ${isDelete ? "active" : ""}`}>
                          {col.gio}
                        </span>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            );
          }
        })}
      </Main>
    </Modal>
  );
};

export default forwardRef(ModalRemoveColunm);
