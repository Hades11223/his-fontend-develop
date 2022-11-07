import { Checkbox, Col, Form, Input, InputNumber, Row } from "antd";
import Select from "components/Select";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import FormElement from "../../../../components/common/ElementForm";
import { InputNumberFormat } from "components/common";

const ThongTinGoi = ({
  listLoaiDichVu,
  _dataSearch,
  _createOrEdit,
  _dataEdit,
  _getList,
  updateData,
  listLoaiHoiDongKiemKe,
  roleEdit,
  refTab,
  ...props
}) => {
  // console.log(refTab, "reftab ...");
  const refTimeout = useRef();
  const [state, _setState] = useState({});
  const setState = (data) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      _setState((pre) => ({ ...pre, ...data }));
    }, [500]);
  };

  useEffect(() => {
    _setState({
      phanTramGiamGia: _dataEdit.phanTramGiamGia,
      tienGiamGia: _dataEdit.phanTramGiamGia ? null : _dataEdit.tienGiamGia,
    });
    refTab?.current &&
      refTab.current.setKhoaChiDinh(!!_dataEdit?.hanCheKhoaChiDinh);
  }, [_dataEdit]);

  const onChangeHanCheKhoaChiDinh = (e) => {
    refTab?.current && refTab.current.setKhoaChiDinh(!!e.target.checked);
  };

  const renderForm = ({ form }) => {
    return (
      <Row style={{ width: "100%" }}>
        <Col span={12}>
          <Form.Item
            label="Mã gói"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Nhập mã "
              autoFocus
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="Loại dịch vụ" name="dsLoaiDichVu">
            <Select
              data={listLoaiDichVu}
              mode="multiple"
              placeholder="Chọn loại DV"
            />
          </Form.Item>
          {/* <Form.Item label="% Miễn giảm cả gói" name="phanTramGiamGia">
            <InputNumber
              type={"number"}
              min={0}
              placeholder="nhập % miễn giảm"
              disabled={state.tienGiamGia}
              onChange={(e) => {
                setState({ phanTramGiamGia: e });
              }}
            />
          </Form.Item> */}
          <Form.Item name="hanCheKhoaChiDinh" valuePropName="checked">
            <Checkbox onChange={onChangeHanCheKhoaChiDinh}>
              Hạn chế khoa chỉ định
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Tên gói"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên !",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên !",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Nhập tên "
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="Tổng tiền gói" name="tongTien">
            <InputNumberFormat disabled placeholder="Tổng tiền" />
          </Form.Item>
          {/* <Form.Item label="Tiền miễn giảm cả gói" name="tienGiamGia">
            <InputNumberFormat
              disabled={state.phanTramGiamGia}
              placeholder="nhập tiền miễn giảm"
              onChange={(e) => {
                setState({ tienGiamGia: e.target.value });
              }}
            />
          </Form.Item> */}

          {_dataEdit?.id && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </Col>
      </Row>
    );
  };

  const mapToBody = (data) => {
    return {
      ...data,
      tienGiamGia: data?.tienGiamGia
        ? (data?.tienGiamGia + "")?.replaceAll(".", "")
        : null,
    };
  };

  const getFieldValue = (data) => {
    // mục đích: fix chọn các hàng vẫn giữ nguyên
    // giá trị cũ nếu phanTramGiamGia và tienGiamGia null
    return {
      ...data,
      phanTramGiamGia: data.phanTramGiamGia || "",
      tienGiamGia: data.tienGiamGia || "",
    };
  };
  // console.log("_dataEdit", _dataEdit);
  return (
    <FormElement
      {...props}
      renderForm={renderForm}
      createOrEdit={_createOrEdit}
      dataEdit={_dataEdit}
      updateData={updateData}
      getData={_getList}
      dataSearch={_dataSearch}
      // roleSave={[ROLES["DANH_MUC"].HOI_DONG_THEM]}
      roleEdit={roleEdit}
      mapToBody={mapToBody}
      getFieldValue={getFieldValue}
      widthItem={100}
    />
  );
};

export default connect(
  ({
    goiDV: { _dataEdit, _dataSearch },
    utils: { listLoaiHoiDongKiemKe },
  }) => ({
    listLoaiHoiDongKiemKe,
    _dataEdit,
    _dataSearch,
  }),
  ({ goiDV: { _createOrEdit, _getList, updateData } }) => ({
    _createOrEdit,
    updateData,
    _getList,
  })
)(ThongTinGoi);
