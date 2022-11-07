import { Input, Button } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import Select from "components/Select";
import { connect } from "react-redux";
import { THANG_DU_TRU } from "constants/index";
let timer = null;

const CustomPopover = (props, ref) => {
  const {
    listNguonNhapKho,
    getListAllQuyetDinhThau,
    onSearch,
    onChangeInputSearch,
    listAllDoiTac,
  } = props;

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListAllQuyetDinhThau({ size: 99999 });
    onSearch({ size: 99999 });
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
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({ [key]: value });
    }, 300);
  };

  const content = () => (
    <Main>
      <div className="content-popover">
        <label>Nguồn nhập kho</label>
        <Select
          placeholder="Chọn nguồn nhập kho"
          bordered={false}
          data={listNguonNhapKho}
          onChange={onChange("dsNguonNhapKhoId")}
        ></Select>
        <label>Số hóa đơn</label>
        <Input
          placeholder="Nhập số hóa đơn"
          bordered={false}
          onChange={onChange("soHoaDon")}
        ></Input>
        <label>Tháng dự trù</label>
        <Select
          placeholder="Chọn tháng dự trù"
          bordered={false}
          data={THANG_DU_TRU}
          onChange={onChange("thangDuTru")}
        ></Select>
        <label>Nhà cung cấp</label>
        <Select
          placeholder="Chọn nhà cung cấp"
          bordered={false}
          data={listAllDoiTac}
          onChange={onChange("nhaCungCapId")}
        ></Select>
        <div className="btn-search">
          <label></label>
          <Button onClick={() => onCancel()}>Đóng</Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      content={content}
      visible={state.show}
      placement="bottomLeft"
      onVisibleChange={null}
    ></PopoverStyled>
  );
};

const mapStateToProps = (state) => {
  const {
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
    doiTac: { listAllDoiTac },
  } = state;

  return { listNguonNhapKho, listAllQuyetDinhThau, listAllDoiTac };
};

const mapDispatchToProps = ({
  nguonNhapKho: { onSearch },
  quyetDinhThau: { getListAllQuyetDinhThau },
  nhapKho: { onChangeInputSearch },
}) => ({
  getListAllQuyetDinhThau,
  onSearch,
  onChangeInputSearch,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(CustomPopover));
