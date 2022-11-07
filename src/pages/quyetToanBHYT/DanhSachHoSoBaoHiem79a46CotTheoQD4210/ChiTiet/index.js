import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import { Row, Col, Form, message } from "antd";
import { Button } from "components";
import TimKiem from "./TimKiem";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
  TABLE_LAYOUT,
} from "constants/index";
import BaseDm2 from "pages/danhMuc/BaseDm2";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";
const DanhSachPhieu = (props) => {
  const { dataXml1 } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201
  );
  const { dataCurrent: dataCurrentXml2 } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml2
  );
  const { dataCurrent: dataCurrentXml3 } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml3
  );
  const { dataCurrent: dataCurrentXml4 } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml4
  );
  const { dataCurrent: dataCurrentXml5 } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml5
  );
  const { searchById, dayHoSoBaoHiem, putXml1 } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201;
  const {
    putXml2,
    updateData: updateDataXml2,
    getList: getList2,
  } = useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml2;
  const {
    putXml3,
    updateData: updateDataXml3,
    getList: getList3,
  } = useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml3;
  const {
    putXml4,
    updateData: updateDataXml4,
    getList: getList4,
  } = useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml4;
  const {
    putXml5,
    updateData: updateDataXml5,
    getList: getList5,
  } = useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml5;

  const { id } = useParams();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [form5] = Form.useForm();
  const [state, _setState] = useState({ activeKeyTab: "2" });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getList2({ id: id, activeKeyTab: "2" });
    getList3({ id: id, activeKeyTab: "3" });
    getList4({ id: id, activeKeyTab: "4" });
    getList5({ id: id, activeKeyTab: "5" });
    (async () => {
      let res1 = await searchById({ id: id });
      form1.setFieldsValue({
        ...res1.data,
        thoiGianTaoHoSo:
          res1.data.thoiGianTaoHoSo &&
          moment(res1.data.thoiGianTaoHoSo).format("DD/MM/YYYY HH:mm:ss"),
        thoiGianThanhToan:
          res1.data.thoiGianThanhToan &&
          moment(res1.data.thoiGianThanhToan).format("DD/MM/YYYY HH:mm:ss"),
      });
    })();
    return () => {
      updateDataXml2({ dataSortColumn: {} });
      updateDataXml3({ dataSortColumn: {} });
      updateDataXml4({ dataSortColumn: {} });
      updateDataXml5({ dataSortColumn: {} });
    };
  }, [id]);

  const onSave = () => {
    // xml1
    let isValidationForm1 = form1
      .getFieldsError()
      .some((item) => item?.errors?.length > 0);
    if (isValidationForm1) {
      message.error("Kiểm tra lại XML1");
    }
    form1.validateFields().then((values) => {
      values.id = id;
      values.nbDotDieuTriId = dataXml1?.nbDotDieuTriId;
      putXml1(values);
      message.success("Lưu thành công XML1");
    });
    // từ xml2 trờ đi
    let formViewing = null;
    let onHandleDependXml = null;
    let dataCurrent = null;
    switch (state.activeKeyTab) {
      case "2":
        formViewing = form2;
        onHandleDependXml = putXml2;
        dataCurrent = dataCurrentXml2;
        break;
      case "3":
        formViewing = form3;
        onHandleDependXml = putXml3;
        dataCurrent = dataCurrentXml3;
        break;
      case "4":
        formViewing = form4;
        onHandleDependXml = putXml4;
        dataCurrent = dataCurrentXml4;
        break;
      case "5":
        formViewing = form5;
        onHandleDependXml = putXml5;
        dataCurrent = dataCurrentXml5;
        break;
      default:
        break;
    }
    let isValidationForm = formViewing
      .getFieldsError()
      .some((item) => item?.errors?.length > 0);
    if (isValidationForm) {
      message.error(`Kiểm tra lại XML${state.activeKeyTab}`);
    }
    if (
      formViewing &&
      onHandleDependXml &&
      Object.keys(dataCurrent)?.length > 0
    ) {
      formViewing.validateFields().then((values) => {
        values.id = dataCurrent.id;
        values.nbDotDieuTriId = dataXml1?.nbDotDieuTriId;
        if (state.activeKeyTab == 4) {
          values.nb79aXml1Id = id;
        }
        onHandleDependXml(values).then((s) => {
          (async () => {
            let res1 = await searchById({ id: id });
            form1.setFieldsValue({
              ...res1.data,
              thoiGianTaoHoSo:
                res1.data.thoiGianTaoHoSo &&
                moment(res1.data.thoiGianTaoHoSo).format("DD/MM/YYYY HH:mm:ss"),
              thoiGianThanhToan:
                res1.data.thoiGianThanhToan &&
                moment(res1.data.thoiGianThanhToan).format(
                  "DD/MM/YYYY HH:mm:ss"
                ),
            });
            message.success(`Lưu thành công XML${state.activeKeyTab}`);
          })();
        });
      });
    }
    if (isValidationForm1 || isValidationForm) {
      return null;
    } else {
      setState({ saveState: false });
    }
  };
  const onEdit = () => {
    setState({ saveState: true });
  };
  const onCancle = () => {
    setState({ saveState: false });
  };

  const onDayHoSoBaoHiem = () => {
    dayHoSoBaoHiem(id);
  };
  return (
    <Main>
      <BaseDm2
        breadcrumb={[
          { title: "Quyết toán BHYT", link: "/quyet-toan-bhyt" },
          {
            title: "Mẫu 79A 46 cột QĐ4210",
            link: "/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210",
          },
          {
            title: "Chi tiết mẫu 79A 46 cột QĐ4210",
            link: `/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210/chi-tiet/${id}`,
          },
        ]}
        title={<TimKiem />}
      >
        <Row gutter={[16, 0]}>
          <Col
            {...(!state.showFullTable
              ? state.collapseStatus
                ? TABLE_LAYOUT_COLLAPSE
                : TABLE_LAYOUT
              : null)}
            span={state.showFullTable ? 24 : 12}
          >
            <LeftSide form1={form1} setState={setState} state={state} />
          </Col>
          {state.showFullTable ? null : (
            <Col
              {...(state.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
              span={12}
            >
              <RightSide
                id={id}
                form2={form2}
                form3={form3}
                form4={form4}
                form5={form5}
                setState={setState}
                state={state}
              />
            </Col>
          )}
        </Row>
        <div className="footer">
          {state.saveState ? (
            <Button onClick={onCancle} type="default" minWidth={100}>
              Hủy
            </Button>
          ) : (
            <Button onClick={onEdit} type="default" minWidth={100}>
              Sửa
            </Button>
          )}
          {state.saveState ? (
            <Button
              type="primary"
              minWidth={100}
              onClick={onSave}
              rightIcon={
                <img
                  style={{ marginLeft: 6 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              }
              iconHeight={15}
            >
              Lưu
            </Button>
          ) : (
            <Button
              type="primary"
              minWidth={100}
              onClick={() => onDayHoSoBaoHiem()}
            >
              Gửi giám định
            </Button>
          )}
        </div>
      </BaseDm2>
    </Main>
  );
};

export default DanhSachPhieu;
