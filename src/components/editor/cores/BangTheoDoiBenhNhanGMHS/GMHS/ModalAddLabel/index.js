import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Button, Col, Radio, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import RadioGroup from "antd/lib/radio/group";
import { DeleteOutlined } from "@ant-design/icons";

const ModalAddLabel = forwardRef((props, ref) => {
  const { listLabels } = useSelector((state) => state.nhanTheoDoi);
  const { getAll } = useDispatch().nhanTheoDoi;
  const refCallBack = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: ({ value, status = 1, data = [] }, callback) => {
      setState({ value, show: true, status, data: data });
      refCallBack.current = callback;
      getAll();
    },
  }));
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const _onOK = () => {
    if (refCallBack.current) {
      refCallBack.current([
        ...(state.data || []),
        ...(state.value
          ? [
              {
                id: state.value,
                loai: state.status == 1 ? ["Start"] : ["End"],
              },
            ]
          : []),
      ]);
    }
    setState({
      show: false,
    });
  };

  const onChange = (value) => {
    setState({
      value: value,
    });
  };
  const onChangeRadio = (e) => {
    setState({
      status: e.target.value,
    });
  };
  const filterOption = (input, option) => {
    return (
      option.props.children
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };

  const listData = useMemo(() => {
    if (listLabels.length)
      return (state.data || [])
        .map((item) => {
          let x = listLabels.find((item2) => item2.id == item.id);
          if (x) x.loai = item.loai;
          return x;
        })
        .filter((item) => item);
    return [];
  }, [state.data, listLabels]);
  const listSelect = useMemo(() => {
    if (!listLabels?.length) return [];
    if (!state.data?.length) return listLabels;
    return listLabels.filter(
      (item) => !state.data.find((item2) => item2.id == item.id)
    );
  }, [state.data, listLabels]);
  const onRemove = (item) => () => {
    let data = state.data || [];
    data = data.filter((item2) => item2.id != item.id);
    setState({
      data,
    });
  };
  return (
    <Main
      width={400}
      title="Chọn nhãn"
      visible={state.show}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
    >
      <Select
        size="small"
        showSearch
        onChange={onChange}
        value={state.value}
        disabled={state.data?.length >= 2}
        filterOption={filterOption}
        placeholder={"Chọn nhãn"}
      >
        {listSelect.map((item, key) => {
          return (
            <Select.Option value={item.id} key={key}>
              {`${item.kyHieu ? item.kyHieu + " - " : ""} ${item.ten}`}
            </Select.Option>
          );
        })}
      </Select>
      <div className="status">
        <label className="label">Trạng thái: </label>
        <RadioGroup
          value={state.status}
          onChange={onChangeRadio}
          disabled={state.data?.length >= 2}
        >
          <Radio value={1}>Bắt đầu</Radio>
          <Radio value={2}>Kết thúc</Radio>
        </RadioGroup>
      </div>
      {listData.map((item, index) => (
        <div key={index} className="item-label">
          <div className="f1">
            {item?.kyHieu} - {item?.ten}
          </div>
          <div className="item-status">
            Trạng thái: {item?.loai == "Start" ? "Bắt đầu" : "Kết thúc"}
          </div>
          <Button icon={<DeleteOutlined />} size="small" onClick={onRemove(item)}></Button>
        </div>
      ))}
    </Main>
  );
});

export default ModalAddLabel;
