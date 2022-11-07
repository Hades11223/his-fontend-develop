import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
  useMemo,
} from "react";
import { Main } from "./styled";
import { Form, Row, Col, DatePicker, Checkbox, message } from "antd";
import { Button, ModalTemplate, InputTimeout } from "components";
import {
  SaveOutlined,
  CheckCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { Select, HeaderSearch } from "components";
import FormWraper from "components/FormWraper";
import TextField from "components/TextField";
import TableWrapper from "components/TableWrapper";
import moment from "moment";
import { cloneDeep, isEmpty } from "lodash";
// import InputTimeout from "components/InputTimeout";

const ModalLenLichKham = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refInputSearchTenNb = useRef(null);
  const refInputSearchNoiLamViec = useRef(null);
  const [form] = Form.useForm();
  //state
  const [state, _setState] = useState({
    show: false,
    dsId: [],
    isCheckedAll: false,
    tuStt: null,
    denStt: null,
    dsLoaiLich: [10, 20],
    tenNb: "",
    noiLamViec: "",
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  //redux
  const { chiTietHopDong } = useSelector((state) => state.hopDongKSK);
  const { listLoaiLichKham } = useSelector((state) => state.utils);
  const { dsNbLichKham } = useSelector((state) => state.nbKSK);

  const {
    utils: { getUtils },
    nbKSK: { onSearch, getNbLichKhamKSK, postLichKhamKSK, updateData },
    dichVuKSK: { getDsDichVuTheoGoi },
  } = useDispatch();

  //effect
  useEffect(() => {
    getUtils({ name: "LoaiLichKham" });
  }, []);

  useEffect(() => {
    if (chiTietHopDong?.id) {
      getDsDichVuTheoGoi({ hopDongKskId: chiTietHopDong.id, trongGoi: true });
    }
  }, [chiTietHopDong]);

  useEffect(() => {
    if (state.tuStt !== null && state.denStt !== null) {
      getNbLichKhamKSK({
        hopDongKskId: chiTietHopDong.id,
        tuStt: state.tuStt,
        denStt: state.denStt,
      });
    }
  }, [state.tuStt, state.denStt]);

  const dsNbLichKhamMemo = useMemo(() => {
    let dsNbLichKhamFilter = cloneDeep(dsNbLichKham);
    if (!isEmpty(state.tenNb)) {
      dsNbLichKhamFilter = dsNbLichKhamFilter.filter(
        (option) =>
          option?.tenNb?.toLowerCase().unsignText().indexOf(state.tenNb) >= 0
      );
    }

    if (!isEmpty(state.noiLamViec)) {
      dsNbLichKhamFilter = dsNbLichKhamFilter.filter(
        (option) =>
          option?.noiLamViec
            ?.toLowerCase()
            .unsignText()
            .indexOf(state.noiLamViec) >= 0
      );
    }

    return dsNbLichKhamFilter;
  }, [dsNbLichKham, state.tenNb, state.noiLamViec]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
        dsId: [],
        isCheckedAll: false,
        selectedRowKeys: [],
        tuStt: null,
        denStt: null,
        dsLoaiLich: [10, 20],
        tenNb: "",
        noiLamViec: "",
      });

      form.setFieldsValue({
        dsLoaiLich: [10, 20],
        tuThoiGianKham: moment().startOf("day"),
        denThoiGianKham: moment().endOf("day"),
        tuThoiGianLayMau: moment().startOf("day"),
        denThoiGianLayMau: moment().endOf("day"),
      });

      updateData({
        dsNbLichKham: [],
      });

      refInputSearchTenNb.current && refInputSearchTenNb.current.setValue("");
      refInputSearchNoiLamViec.current &&
        refInputSearchNoiLamViec.current.setValue("");
    },
  }));

  //function
  const onClose = () => {
    form.resetFields();
    onSearch({ page: 0 });
    setState({ show: false });
  };

  const onSave = () => {
    if (!state.dsId || state.dsId.length === 0) {
      message.error("Vui lòng chọn người bệnh");
      return;
    }

    form.validateFields().then((values) => {
      const {
        dsLoaiLich,
        tuThoiGianLayMau,
        denThoiGianLayMau,
        diaDiemLayMau,
        tuThoiGianKham,
        denThoiGianKham,
        diaDiemKham,
      } = values;

      postLichKhamKSK({
        dsLoaiLich,
        dsNbDotDieuTriId: state.dsId,
        tuThoiGianLayMau,
        denThoiGianLayMau,
        diaDiemLayMau,
        tuThoiGianKham,
        denThoiGianKham,
        diaDiemKham,
      }).then(() => {
        onClose();
      });
    });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onRow(record) {
    return {
      onClick: () => {
        const { id } = record;
      },
    };
  }

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? dsNbLichKham.map((x) => x.id) : [],
      isCheckedAll: e.target?.checked,
      dsId: e.target?.checked ? dsNbLichKham.map((x) => x.id) : [],
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    setState({
      isCheckedAll: dsNbLichKham.length === selectedRowKeys.length,
      dsId: selectedRowKeys,
      selectedRowKeys,
    });
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          />
        }
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onChange = (key) => (e) => {
    setState({
      [key]: e,
    });
  };

  function onValuesChange(changedValues, allValues) {
    if (changedValues.dsLoaiLich) {
      setState({
        dsLoaiLich: changedValues.dsLoaiLich,
      });
    }
  }

  const onSearchLocal = (key) => (value) => {
    setState({ [key]: (value || "")?.trim().toLowerCase().unsignText() });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("khamSucKhoe.lenLich.sttHd")} />,
      dataIndex: "stt",
      width: "100px",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("khamSucKhoe.lenLich.tenNb")}
          search={
            <InputTimeout
              refWrap={refInputSearchTenNb}
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearchLocal("tenNb")}
            />
          }
        />
      ),
      dataIndex: "tenNb",
      width: "250px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.lenLich.ngayKham")} />,
      width: "200px",
      render: (item, list, index) => {
        const { tuThoiGianKham, denThoiGianKham } = item;
        const _tuThoiGian = tuThoiGianKham
          ? moment(tuThoiGianKham).format("HH:mm:ss DD/MM/YYYY")
          : "";
        const _denThoiGian = denThoiGianKham
          ? moment(denThoiGianKham).format("HH:mm:ss DD/MM/YYYY")
          : "";
        const _middle = tuThoiGianKham && denThoiGianKham ? " - " : "";

        return `${_tuThoiGian}${_middle}${_denThoiGian}`;
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.lenLich.ngayLayMau")} />,
      width: "200px",
      render: (item, list, index) => {
        const { tuThoiGianLayMau, denThoiGianLayMau } = item;
        const _tuThoiGian = tuThoiGianLayMau
          ? moment(tuThoiGianLayMau).format("HH:mm:ss DD/MM/YYYY")
          : "";
        const _denThoiGian = denThoiGianLayMau
          ? moment(denThoiGianLayMau).format("HH:mm:ss DD/MM/YYYY")
          : "";
        const _middle = tuThoiGianLayMau && denThoiGianLayMau ? " - " : "";

        return `${_tuThoiGian}${_middle}${_denThoiGian}`;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamSucKhoe.lenLich.noiLamViec")}
          search={
            <InputTimeout
              refWrap={refInputSearchNoiLamViec}
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearchLocal("noiLamViec")}
            />
          }
        />
      ),
      dataIndex: "noiLamViec",
      width: "200px",
    },
  ];

  return (
    <ModalTemplate
      ref={refModal}
      width={"80%"}
      onCancel={onClose}
      title={t("khamSucKhoe.lenLichKhamLayMau")}
      closable={false}
    >
      <Main>
        <div className="form-nb">
          <Row>
            <Col span={8} className="form-nb-filter">
              <FormWraper
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout={"vertical"}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onValuesChange={onValuesChange}
                form={form}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label={t("khamSucKhoe.lenLich.loaiLenLich")}
                      name="dsLoaiLich"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại lên lịch!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue={state.dsLoaiLich}
                        data={listLoaiLichKham || []}
                        placeholder="Loại lên lịch"
                        mode="multiple"
                      />
                    </Form.Item>
                  </Col>

                  {state.dsLoaiLich.includes(10) && (
                    <>
                      <Col span={12}>
                        <Form.Item
                          label={t("khamSucKhoe.lenLich.tuThoiGianKham")}
                          name="tuThoiGianKham"
                        >
                          <DatePicker
                            showTime
                            placeholder="Chọn ngày"
                            format="DD/MM/YYYY HH:mm:ss"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={t("khamSucKhoe.lenLich.denThoiGianKham")}
                          name="denThoiGianKham"
                        >
                          <DatePicker
                            showTime
                            placeholder="Chọn ngày"
                            format="DD/MM/YYYY HH:mm:ss"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={t("khamSucKhoe.lenLich.diaDiemKham")}
                          name="diaDiemKham"
                        >
                          <TextField
                            // html={phanLoaiDaLieu}
                            // onChange={handleSetData(["nbKSK", "phanLoaiDaLieu"])}
                            maxLength={2000}
                            // refsChild={refElement}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}

                  {state.dsLoaiLich.includes(20) && (
                    <>
                      <Col span={12}>
                        <Form.Item
                          label={t("khamSucKhoe.lenLich.tuThoiGianLayMau")}
                          name="tuThoiGianLayMau"
                        >
                          <DatePicker
                            showTime
                            placeholder="Chọn ngày"
                            format="DD/MM/YYYY HH:mm:ss"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={t("khamSucKhoe.lenLich.denThoiGianLayMau")}
                          name="denThoiGianLayMau"
                        >
                          <DatePicker
                            showTime
                            placeholder="Chọn ngày"
                            format="DD/MM/YYYY HH:mm:ss"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={t("khamSucKhoe.lenLich.diaDiemLayMau")}
                          name="diaDiemLayMau"
                        >
                          <TextField
                            // html={phanLoaiDaLieu}
                            // onChange={handleSetData(["nbKSK", "phanLoaiDaLieu"])}
                            maxLength={2000}
                            // refsChild={refElement}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
              </FormWraper>
            </Col>

            <Col span={16} className="form-nb-table">
              <div className="form-nb-table-header">
                <div>
                  <CheckCircleOutlined /> {t("khamSucKhoe.lenLich.daChon")}{" "}
                  {(state.dsId || []).length}
                </div>
                <div className="form-nb-table-header-right">
                  {`${t("khamSucKhoe.lenLich.lenLichSTTHopDong")} ${t(
                    "khamSucKhoe.lenLich.tu"
                  )}`}
                  <InputTimeout
                    type="number"
                    value={state.tuStt}
                    placeholder="Nhập số"
                    onChange={onChange("tuStt")}
                  />
                  {t("khamSucKhoe.lenLich.den")}
                  <InputTimeout
                    type="number"
                    value={state.denStt}
                    placeholder="Nhập số"
                    onChange={onChange("denStt")}
                  />
                </div>
              </div>

              <div className="form-nb-table-content">
                <TableWrapper
                  bordered
                  columns={columns}
                  dataSource={dsNbLichKhamMemo || []}
                  rowSelection={rowSelection}
                  onRow={onRow}
                  rowKey={(record) => record.id}
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<IcArrowLeft />}
            onClick={onClose}
          >
            {t("common.quayLai")}
          </Button.Text>

          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            rightIcon={<SaveOutlined />}
          >
            {t("common.luu")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalLenLichKham);
