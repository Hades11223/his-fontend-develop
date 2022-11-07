import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Main, ModalMain } from "./styled";

const ModalSelectNurse = forwardRef(({ nursesAll }, ref) => {
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
    show: ({ value }, callback) => {
      setState({ value, show: true });
      refCallBack.current = callback;
    },
  }));
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const _onOK = () => {
    refCallBack.current && refCallBack.current(state.value);
    setState({
      show: false,
    });
  };

  const onChange = (value) => {
    setState({
      value: value,
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
  return (
    <ModalMain
      width={400}
      title="Chọn điều dưỡng"
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
        filterOption={filterOption}
        placeholder={"Chọn điều dưỡng"}
      >
        {nursesAll.map((item, key) => {
          return (
            <Select.Option value={item.id} key={key}>
              {item.fullName}
            </Select.Option>
          );
        })}
      </Select>
    </ModalMain>
  );
});

const SelectNurse = ({ value, disabled, ...props }, ref) => {
  const refModalSelectNurse = useRef(null);
  const [state, _setState] = useState({
    value,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const nursesAll = useSelector((state) => state.patientRoom.nursesAll || []);
  const getAllNursing = useDispatch().patientRoom.getAllNursing;

  useEffect(() => {
    getAllNursing();
  }, []);

  useEffect(() => {
    setState({
      value,
    });
  }, [value]);

  const nurse = useMemo(() => {
    return nursesAll?.find((item) => item.id == state.value);
  }, [nursesAll, state.value]);

  const onShowSelectNurse = () => {
    refModalSelectNurse.current &&
      refModalSelectNurse.current.show({ value: state.value }, (value) => {
        if (props.onChange) props.onChange(value);
        setState({
          value: value,
        });
      });
  };
  return (
    <>
      <Main onClick={!disabled ? onShowSelectNurse : null}>
        {nurse?.fullName}
      </Main>
      <ModalSelectNurse ref={refModalSelectNurse} nursesAll={nursesAll} />
    </>
  );
};

export default SelectNurse;
