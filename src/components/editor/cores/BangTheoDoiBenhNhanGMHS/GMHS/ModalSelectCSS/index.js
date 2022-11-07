import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useContext,
} from "react";
import { Col, Empty, message, Row, Spin } from "antd";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Main } from "./styled";
import DateTimePicker from "components/editor/config/DateTimePicker";
import { DeleteOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import EMRContext from "pages/editor/context/EMR";

const ModalSelectCSS = (props, ref) => {
  const {
    page,
    size,
    total,
    isLoading = false,
    listData = [],
  } = useSelector((state) => state.vitalSignsCommon);
  const context = useContext(EMRContext);  

  const maHoSo = context.patient?.maHoSo;

  const { onDelete, onSizeChange, onSearch } = useDispatch().vitalSignsCommon;

  const refCallBack = useRef(null);
  const [state, _setState] = useState({
    show: false,
    left: "",
    right: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({ chiSoSong, dateDefault = null }, callback) => {
      setState({
        selected: chiSoSong,
        show: true,
        type: 1,
        date: dateDefault ? dateDefault : null,
      });
      refCallBack.current = callback;
      onSizeChange({ size: 50, maHoSo: maHoSo });
    },
  }));
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const onOk = () => {
    if (!state.selected) {
      message.error("Vui lòng chọn 1 mốc thời gian");
      return;
    }
    if (!state.selected.bopBong) {
      state.selected.bopBong = [];
    }
    refCallBack.current &&
      refCallBack.current({
        ...state.selected,
        thoiGian: state.selected.thoiGian || new Date(),
        maHoSo: maHoSo,
      });
    setState({
      show: false,
    });
  };
  const onSelect = (item) => () => {
    setState({ selected: item, show: true, type: 1 });
  };
  const onCreateNew = () => {
    if (!state.date) {
      message.error("Vui lòng chọn thời gian");
      return;
    }
    if (state.date > new Date()) {
      message.error("Thời gian phải nhỏ hơn thời gian hiện tại");
      return;
    }
    refCallBack.current &&
      refCallBack.current({
        thoiGian: state.date?._d ? state.date._d : state.date,
        bopBong: [],
        maHoSo: maHoSo,
      });
    setState({
      show: false,
    });
  };
  const onChangeDate = (date) => {
    setState({
      date: date,
      type: 2,
    });
  };
  const onShowSizeChange = (current, size) => {
    onSizeChange({ size, maHoSo: maHoSo });
  };
  const onChangePage = (page) => {
    onSearch({ page: page - 1, maHoSo: maHoSo });
  };

  const onRemove = (item) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete({ id: item.id });
  };

  const onScroll = (e) => {
    let element = e.target;
    if (
      parseInt(element.scrollHeight) - parseInt(element.scrollTop) ===
      parseInt(element.clientHeight)
    ) {
      if (total >= listData.length)
        onSearch({ page: page + 1, maHoSo: maHoSo });
    }
  };
  return (
    <Modal
      width={500}
      title="Danh sách chỉ số theo dõi của người bệnh"
      visible={state.show}
      onOk={onOk}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
      footer={[
        <div key="action" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <DateTimePicker
              showToday={true}
              showTime={{ format: "HH:mm" }}
              width={150}
              height={30}
              value={state.date}
              onChange={onChangeDate}
              placeholder={"Chọn thời gian"}
            />
            <Button
              style={{ marginLeft: "5px" }}
              key="createnew"
              type={state.type == 2 ? "primary" : "dashed"}
              icon={<PlusOutlined />}
              onClick={onCreateNew}
            >
              Tạo mới
            </Button>
          </div>
          <Button
            key="select"
            type={state.type == 1 ? "primary" : "dashed"}
            icon={<CheckOutlined />}
            onClick={onOk}
          >
            Chọn bản ghi
          </Button>
        </div>,
      ]}
    >
      <Spin spinning={isLoading}>
        <Main>
          <Scrollbars style={{ height: "300px" }} onScroll={onScroll}>
            {listData.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={`item ${
                    state.selected?.id == item.id ? "selected" : ""
                  }`}
                  onClick={onSelect(item)}
                >
                  <div className="time">
                    <div>
                      {item?.thoiGian
                        ?.toDateObject()
                        .format("HH:mm dd/MM/yyyy")}
                    </div>
                    <Button
                      size={"small"}
                      icon={<DeleteOutlined />}
                      onClick={onRemove(item)}
                    ></Button>
                  </div>
                  <Row>
                    {!!item.mach && (
                      <Col span={12} className="chiso">
                        <label className="label">Mạch: </label>
                        <div className="value">{item.mach} Lần/phút</div>
                      </Col>
                    )}
                    {!!item.nhietDo && (
                      <Col span={12} className="chiso">
                        <label className="label">Nhiệt độ: </label>
                        <div className="value">{item.nhietDo} Lần/phút</div>
                      </Col>
                    )}
                    {!!(item.huyetApTamThu && item.huyetApTamTruong) && (
                      <Col span={12} className="chiso">
                        <label className="label">Huyết áp: </label>
                        <div className="value">
                          {item.huyetApTamThu}/{item.huyetApTamTruong} mmHg
                        </div>
                      </Col>
                    )}
                    {!!item.nhipTho && (
                      <Col span={12} className="chiso">
                        <label className="label">Nhịp thở: </label>
                        <div className="value">
                          {`${item.nhipTho} lần/phút ${
                            (item.bopBong || []).includes("Có")
                              ? "(bóp bóng)"
                              : ""
                          }`}
                        </div>
                      </Col>
                    )}
                    {!!item.canNang && (
                      <Col span={12} className="chiso">
                        <label className="label">Cân nặng: </label>
                        <div className="value">{item.canNang} Kg</div>
                      </Col>
                    )}
                    {!!item.chieuCao && (
                      <Col span={12} className="chiso">
                        <label className="label">Chiều cao: </label>
                        <div className="value">{item.chieuCao} m</div>
                      </Col>
                    )}
                    {!!item.spo2 && (
                      <Col span={12} className="chiso">
                        <label className="label">SpO2: </label>
                        <div className="value">{item.spo2} %</div>
                      </Col>
                    )}
                    {!!item.fio2 && (
                      <Col span={12} className="chiso">
                        <label className="label">FiO2: </label>
                        <div className="value">{item.fio2} %</div>
                      </Col>
                    )}
                    {!!item.feCo2 && (
                      <Col span={12} className="chiso">
                        <label className="label">FeCO2: </label>
                        <div className="value">{item.feCo2} %</div>
                      </Col>
                    )}
                  </Row>
                </div>
              );
            })}
            {!listData?.length && <Empty description="Không có dữ liệu" />}
          </Scrollbars>
          {/* <Pagination
            current={page + 1}
            className={"patient-paging"}
            total={total}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} của ${total} bản ghi`
            }
            showQuickJumper
            showSizeChanger
            pageSize={size || 10}
          /> */}
        </Main>
      </Spin>
    </Modal>
  );
};

export default forwardRef(ModalSelectCSS);
