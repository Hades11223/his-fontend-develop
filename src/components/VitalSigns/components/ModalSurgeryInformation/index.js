import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Modal, Select, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ModalTemplate, Button } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IcSave from "assets/svg/ic-save.svg";
import { useTranslation } from "react-i18next";
const SurgeryInformationModal = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    search: "",
    pttdId: "",
  });
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const { t } = useTranslation();
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    pttt: { listDsPttt = [] },
    vitalSigns: { currentCol, values },
  } = useSelector((state) => state);
  const {
    vitalSigns: { updateData, onUpdate },
  } = useDispatch();
  useImperativeHandle(ref, () => ({
    show: (data, callback) => {
      setState({
        data,
        ptTtId: data?.ptTtId,
        show: true,
      });
      refCallback.current = callback;
    },
  }));

  const onChange = (value) => {
    const pttt = listDsPttt.find((item) => item.id === value);
    setState({ pttdId: value, pttt });
  };
  const onCancel = () =>
    setState({
      show: false,
    });

  const onOK = (isOk) => async () => {
    if (isOk) {
      if (!state.pttdId) {
        message.error("Phẫu thuật không được để trống");
        return;
      }
      let current = null;
      if (currentCol || currentCol === 0) {
        current = values[currentCol];
      } else {
        const index = values.findIndex((item) => (item.id = state.data.id));
        current = values[index];
        updateData({
          currentCol: index,
        });
      }
      current.ptTtId = state?.pttdId;
      current.tenBacSiPtTt = state.pttt.tenBacSiChiDinh;
      current.phuongPhapPtTt = state.pttt.phuongPhap;
      const data = await onUpdate();
      if (refCallback.current) refCallback.current(data);
      setState({ show: false });
    } else {
      setState({ show: false });
    }
  };
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={"Chọn phẫu thuật"}
      width={520}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<IcSave />}
          iconHeight={15}
          onClick={onOK(true)}
        >
          {t("common.luuThayDoi")}
        </Button>
      }
    >
      <div
        style={{
          marginBottom: 10,
          padding: 10,
        }}
      >
        <div>Tên phẫu thuật</div>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Chọn phẫu thuật"
          optionFilterProp="props.children"
          value={state.ptTtId}
          onChange={onChange}
          filterOption={(input, option) => {
            return (
              (option.props.children + "")
                .toLowerCase()
                .createUniqueText()
                .indexOf(input.toLowerCase().createUniqueText()) >= 0
            );
          }}
        >
          {listDsPttt.map((item, index) => {
            return (
              <Select.Option
                key={index}
                value={item.id}
                title={`${item.tenDichVu}`}
              >
                {item.tenDichVu}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    </ModalTemplate>
  );
});

export default SurgeryInformationModal;
