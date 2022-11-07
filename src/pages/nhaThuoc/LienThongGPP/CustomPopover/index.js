import { DatePicker, Input, Button } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import Calendar from "assets/images/kho/calendar.png";
import Select from "components/Select";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";

const { RangePicker } = DatePicker;

const CustomPopover = (props, ref) => {
  const {
    maNb: maNbStore,
    soPhieu: soPhieuStore,
    maHoSo: maHoSoStore,
    tuThoiGianDuyet: tuThoiGianDuyetStore,
    denThoiGianDuyet: denThoiGianDuyetStore,
    nguoiDuyetId: nguoiDuyetIdStore,
  } = useSelector((state) => state.thuocKho);

  const { searchThuocByParams } = useDispatch().thuocKho;
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const [state, _setState] = useState({
    show: false,
  });
  console.log("state: ", state);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    // dùng để xóa tag , kèm theo xóa luôn dữ liệu input
    let obj = {};
    if (!tuThoiGianDuyetStore && !denThoiGianDuyetStore) {
      obj = { ...obj, tuThoiGianDuyet: null, denThoiGianDuyet: null };
    }
    if (!maNbStore) {
      obj = { ...obj, maNb: null };
    }
    if (!soPhieuStore) {
      obj = { ...obj, soPhieu: null };
    }
    if (!maHoSoStore) {
      obj = { ...obj, maHoSo: null };
    }
    if (!nguoiDuyetIdStore) {
      obj = { ...obj, nguoiDuyetId: null };
    }
    if (Object.keys(obj).length > 0) {
      setState(obj);
    }
  }, [
    tuThoiGianDuyetStore,
    denThoiGianDuyetStore,
    maNbStore,
    soPhieuStore,
    maHoSoStore,
    nguoiDuyetIdStore,
  ]);

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

  const onChangeDate = (key) => (e) => {
    console.log("e: ", e);
    let value = "";
    let value1 = "";
    value = e && e[0]?.format("YYYY-MM-DD 00:00:00");
    value1 = e && e[1]?.format("YYYY-MM-DD 23:59:59");
    setState({ [`tuThoiGianDuyet`]: value, [`denThoiGianDuyet`]: value1 });
  };

  const onSearchDocument = () => {
    const {
      soPhieu,
      tuThoiGianDuyet,
      denThoiGianDuyet,
      maNb,
      nguoiDuyetId,
      maHoSo,
    } = state;
    searchThuocByParams({
      maNb,
      soPhieu,
      nguoiDuyetId,
      maHoSo,
      tuThoiGianDuyet,
      denThoiGianDuyet,
    });
    setState({ show: false });
  };
  const content = () => (
    <Main>
      <div className="content-popover">
        <Input
          placeholder="Mã NB"
          bordered={false}
          onChange={onChange("maNb")}
          value={state.maNb}
        ></Input>
        <Input
          placeholder="Mã hồ sơ"
          bordered={false}
          onChange={onChange("maHoSo")}
          value={state.maHoSo}
        ></Input>

        <Input
          placeholder="Số phiếu"
          bordered={false}
          onChange={onChange("soPhieu")}
          value={state.soPhieu}
        ></Input>

        <Select
          // mode="multiple"
          value={state.nguoiDuyetId}
          showArrow
          placeholder="Người phát"
          bordered={false}
          onChange={onChange("nguoiDuyetId")}
          data={listAllNhanVien}
          filterOption={(input, option) =>
            option &&
            option.children &&
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        ></Select>
        <div className="date">
          <label className="title">Ngày phát</label>
          <RangePicker
            value={
              state?.tuThoiGianDuyet && state?.denThoiGianDuyet
                ? [
                    moment(state?.tuThoiGianDuyet),
                    moment(state?.denThoiGianDuyet),
                  ]
                : null
            }
            style={{ paddingTop: 0 }}
            format="DD/MM/YYYY"
            placeholder={["Từ ngày", "đến ngày"]}
            bordered={false}
            onChange={onChangeDate("Duyet")}
            suffixIcon={
              <img src={Calendar} alt="..." style={{ marginRight: 5 }} />
            }
            separator={<div>-</div>}
          ></RangePicker>
        </div>
        <div className="btn-search">
          <label></label>
          <Button onClick={() => onSearchDocument()}>
            <img src={Search} alt="..." />
            <span>Tìm</span>
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      content={content}
      trigger="click"
      visible={state.show}
      placement="bottomLeft"
      onVisibleChange={() => onCancel()}
    ></PopoverStyled>
  );
};

const mapStateToProps = (state) => {
  const {
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
  } = state;

  return { listNguonNhapKho, listAllQuyetDinhThau };
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
