import { Checkbox, Col, Row } from "antd";
import { DatePicker, Select } from "components";
import ElementFilter from "components/common/ElementFilter";
import { useEnum } from "hook";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { WrapperTimKiem } from "../styled";
import { useParams } from "react-router-dom";
import { LOAI_DICH_VU } from "constants/index";

const TimKiemHangHoa = ({ getAllKho, listAllKho }) => {
  const { id } = useParams();
  const [listLoaiDichVu] = useEnum("LoaiDichVu", []);

  const { loaiHangHoa, dataSearch } = useSelector((state) => state.traHangHoa);
  const { getListHangHoa, updateData } = useDispatch().traHangHoa;

  useEffect(() => {
    getAllKho({ active: true });
  }, []);

  useEffect(() => {
    getListHangHoa({
      nbDotDieuTriId: id,
    });
  }, [id]);

  const onChange = (key) => (e) => {
    const value = key == "traTatCa" ? e.target?.checked : e;

    const _dataSearch = {
      ...dataSearch,
      [key]: value,
    };
    updateData({ dataSearch: _dataSearch });

    if (key == "loaiHangHoa")
      getListHangHoa({
        [key]: value,
        nbDotDieuTriId: id,
      });
  };

  const renderFilter = () => {
    return (
      <Row>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">Loại hàng hóa</label>
            <Select
              onChange={onChange("loaiHangHoa")}
              value={loaiHangHoa}
              className="input-filter"
              placeholder={"Chọn loại hàng hóa"}
              data={(listLoaiDichVu || []).filter((x) =>
                [
                  LOAI_DICH_VU.THUOC,
                  LOAI_DICH_VU.VAT_TU,
                  LOAI_DICH_VU.HOA_CHAT,
                ].includes(x.id)
              )}
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">Tên hàng hóa</label>
            <Select
              onChange={(e) => console.log(e)}
              className="input-filter"
              placeholder={"Chọn loại hàng hóa"}
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">Kho</label>
            <Select
              onChange={onChange("khoId")}
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listAllKho}
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">Ngày thực hiện</label>
            <DatePicker
              onChange={onChange("tuThoiGianThucHien")}
              className="input-filter"
              placeholder={"Từ ngày"}
              format="DD/MM/YYYY HH:mm:ss"
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">Đến ngày thực hiện</label>
            <DatePicker
              onChange={onChange("denThoiGianThucHien")}
              className="input-filter"
              placeholder={"Đến ngày"}
              format="DD/MM/YYYY HH:mm:ss"
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select checkbox-pl">
            <Checkbox onChange={onChange("traTatCa")}></Checkbox>
            <label className="label-filter">Trả tất cả</label>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <WrapperTimKiem>
      <ElementFilter renderFilter={renderFilter} />
    </WrapperTimKiem>
  );
};

export default connect(
  ({ kho: { listAllKho } }) => ({ listAllKho }),
  ({ kho: { getAllTongHop: getAllKho } }) => ({ getAllKho })
)(TimKiemHangHoa);
