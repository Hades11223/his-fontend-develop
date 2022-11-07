import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Main, ModalStyled } from "./styled";
import { Form, Row, Col, DatePicker, Checkbox } from "antd";
import { Button } from "components";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import FormWraper from "components/FormWraper";
import { Select } from "components";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useLoading } from "hook";

const ModalThemMoiPhongGiuong = (props, ref) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showLoading, hideLoading } = useLoading();

  //state
  const [state, _setState] = useState({
    show: false,
    currentItem: null,
    dsLoaiGiuong: [],
    bnDaNghiDieuTri: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  //redux
  const { dsPhong, dsGiuong, dsDVGiuong, dsNb, dsMucDichSuDung } = useSelector(
    (state) => state.phanPhongGiuong
  );
  const { dataSearch } = useSelector((state) => state.soDoPhongGiuong);

  const {
    phanPhongGiuong: {
      getDsPhongTheoKhoa,
      getSoHieuGiuongByPhong,
      getDsDVGiuong,
      getDsNbTheoKhoa,
      phanGiuong,
      getDsMucDichSuDungByDVGiuong,
    },
    noiTruPhongGiuong: { onSearch: getDsPhongGiuong },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      const { khoaId, phongId, id: giuongId } = data;
      getDsNbTheoKhoa({
        dsKhoaNbId: [khoaId],
        page: 0,
        size: 500,
        dsTrangThai: [20, 40, 30, 110, 100],
        trangThaiTaiKhoa: 10, //người bệnh đang ở trong khoa
      });
      getDsPhongTheoKhoa({ khoaId });
      getSoHieuGiuongByPhong({ phongId, page: 0, size: "" });
      getDsDVGiuong({ phongId }).then((res) => {
        const _listGiuongThuong =
          (res || []).filter((x) => x.phanLoai === 20) || [];

        if (_listGiuongThuong.length === 0) {
          getDsDVGiuong({ khoaChiDinhId: khoaId });
        }
        if (_listGiuongThuong.length === 1) {
          form.setFieldsValue({ dvGiuongId: _listGiuongThuong[0].dichVuId });
          onUpdateDvGiuongId(_listGiuongThuong[0].dichVuId);
        }
      });

      form.setFieldsValue({
        phongId,
        giuongId,
        nbDotDieuTriId: dataSearch?.nbDotDieuTriId || null,
      });

      setState({
        show: true,
        currentItem: data,
        readOnlyTuThoiGian: false,
        minTuThoiGian: null,
      });
    },
  }));

  useEffect(() => {
    if (state.currentItem) {
      if (dsGiuong && dsGiuong.length > 0 && state.currentItem.id) {
        const selectGiuong = dsGiuong.find(
          (x) => x.id === state.currentItem.id
        );
        setState({
          dsLoaiGiuong: selectGiuong?.dsLoaiGiuong,
        });
        if (
          selectGiuong?.dsLoaiGiuong &&
          selectGiuong?.dsLoaiGiuong.length == 1
        ) {
          form.setFieldsValue({
            loaiGiuongId: selectGiuong?.dsLoaiGiuong[0].id,
          });
        }
      }
    }
  }, [state.currentItem, dsGiuong]);

  useEffect(() => {
    if (state.currentItem) {
      if (dsNb && dsNb.length > 0 && dataSearch.nbDotDieuTriId) {
        updateValidate(dataSearch.nbDotDieuTriId);
      }
    }
  }, [state.currentItem, dsNb, dataSearch.nbDotDieuTriId]);

  function kiemTraNghiDieuTri(_nbDotDieuTriId) {
    getDsPhongGiuong({
      nbDotDieuTriId: _nbDotDieuTriId,
      sort: "tuThoiGian,asc",
    }).then((res) => {
      if (res?.data && res.data.length > 0) {
        const newestPG = res?.data[res?.data.length - 1];

        if (newestPG.loai == 30) {
          setState({
            bnDaNghiDieuTri: true,
            minTuThoiGian: newestPG.tuThoiGian,
          });
        } else {
          setState({
            bnDaNghiDieuTri: false,
          });
        }
      } else {
        setState({
          bnDaNghiDieuTri: false,
        });
      }
    });
  }

  useEffect(() => {
    if (state.show && dataSearch.nbDotDieuTriId) {
      kiemTraNghiDieuTri(dataSearch.nbDotDieuTriId);
    }
  }, [dataSearch.nbDotDieuTriId, state.show]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //function
  const onClose = () => {
    form.resetFields();
    setState({ show: false, currentItem: null });
  };

  const onSave = () => {
    showLoading();

    form
      .validateFields()
      .then((values) => {
        const {
          dvGiuongId,
          dvGiuongTuChonId,
          nbDotDieuTriId,
          giuongId,
          phongId,
          tuThoiGian,
          denThoiGian,
          loaiGiuongId,
          tuTra,
        } = values;

        phanGiuong({
          dvGiuongId,
          dvGiuongTuChonId,
          nbDotDieuTriId,
          giuongId,
          phongId,
          loaiGiuongId,
          tuThoiGian: moment(tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
          denThoiGian: denThoiGian
            ? moment(denThoiGian).format("DD-MM-YYYY HH:mm:ss")
            : undefined,
          tuTra,
        })
          .then(() => {
            // updateDataSearch({
            //   tuThoiGian: moment().startOf("day"),
            //   denThoiGian: moment().endOf("day").add(1, "days"),
            // });
            // onClose();
            setTimeout(() => {
              hideLoading();
              history.go();
            }, 500);
          })
          .catch(() => {
            hideLoading();
          });
      })
      .catch(() => {
        hideLoading();
      });
  };

  const onUpdateGiuongId = (_giuongId, res) => {
    const selectGiuong = (res || dsGiuong).find((x) => x.id === _giuongId);
    setState({
      dsLoaiGiuong: selectGiuong?.dsLoaiGiuong,
    });
    if (selectGiuong?.dsLoaiGiuong && selectGiuong?.dsLoaiGiuong.length == 1) {
      form.setFieldsValue({ loaiGiuongId: selectGiuong?.dsLoaiGiuong[0].id });
    }
  };

  const onUpdateDvGiuongId = (_dvGiuongId) => {
    getDsMucDichSuDungByDVGiuong({
      page: 0,
      size: 500,
      active: true,
      dichVuId: _dvGiuongId,
    }).then((res) => {
      if (res && res.length == 1) {
        form.setFieldsValue({ dvGiaId: res[0].id });
      } else {
        form.setFieldsValue({ dvGiaId: null });
      }
    });
  };

  function onValuesChange(changedValues, allValues) {
    if (changedValues["phongId"]) {
      getSoHieuGiuongByPhong({ phongId: changedValues["phongId"] }).then(
        (res) => {
          if (res && res.length === 1) {
            form.setFieldsValue({
              giuongId: res[0].id,
            });
            onUpdateGiuongId(res[0].id, res);
          } else {
            form.setFieldsValue({
              giuongId: null,
              loaiGiuongId: null,
            });
            setState({
              dsLoaiGiuong: [],
            });
          }
        }
      );

      getDsDVGiuong({ phongId: changedValues["phongId"] }).then((res) => {
        if (res.length === 0) {
          getDsDVGiuong({ khoaChiDinhId: dataSearch?.khoaId });
        }

        const _listGiuongThuong = (res || []).filter((x) => x.phanLoai === 20);
        if (_listGiuongThuong.length === 1) {
          form.setFieldsValue({
            dvGiuongId: _listGiuongThuong[0].dichVuId,
          });
          onUpdateDvGiuongId(_listGiuongThuong[0].dichVuId);
        } else {
          form.setFieldsValue({ dvGiaId: null });
        }
      });
    }

    if (changedValues["nbDotDieuTriId"]) {
      updateValidate(changedValues["nbDotDieuTriId"]);

      kiemTraNghiDieuTri(changedValues["nbDotDieuTriId"]);
    }

    if (changedValues["giuongId"]) {
      onUpdateGiuongId(changedValues["giuongId"]);
    }

    if (changedValues["dvGiuongId"]) {
      onUpdateDvGiuongId(changedValues["dvGiuongId"]);
    }
  }

  function updateValidate(_nbDotDieuTriId) {
    const infoNb = (dsNb || []).find((x) => x.id == _nbDotDieuTriId);

    if (!infoNb) return;
    const { tuThoiGianSdGiuong, giuongId, denThoiGianSdGiuong } = infoNb;
    console.log("infoNb", tuThoiGianSdGiuong, giuongId, denThoiGianSdGiuong);
    // giuongId = null -> từ ngày lấy trường tuThoiGianSdGiuong, k cho người dùng sửa
    // giuongId khác null, denThoiGianSdGiuong khác null -> từ ngày lấy trường denThoiGianSdGiuong, k cho người dùng sửa
    // giuongId khác null, denThoiGianSdGiuong = null -> từ ngày để null, người dùng phải chọn th.g lớn hơn tuThoiGianSdGiuong
    if (!giuongId) {
      setState({ readOnlyTuThoiGian: true });
      form.setFieldsValue({ tuThoiGian: moment(tuThoiGianSdGiuong) });
    } else {
      if (denThoiGianSdGiuong) {
        setState({ readOnlyTuThoiGian: true });
        form.setFieldsValue({ tuThoiGian: moment(denThoiGianSdGiuong) });
      } else {
        setState({
          readOnlyTuThoiGian: false,
          minTuThoiGian: tuThoiGianSdGiuong,
        });
      }
    }
  }

  function onDisabledDate(time) {
    if (state.minTuThoiGian) {
      return moment(time) < moment(state.minTuThoiGian);
    }

    return false;
  }

  return (
    <ModalStyled
      width={"55%"}
      visible={state.show}
      footer={null}
      closable={false}
      title={"Thêm mới phòng - giường"}
      onCancel={onClose}
    >
      <Main>
        <div className="form-nb">
          <FormWraper
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout={"vertical"}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            onValuesChange={onValuesChange}
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Phòng"
                  name="phongId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phòng!",
                    },
                  ]}
                >
                  <Select data={dsPhong || []} placeholder="Chọn phòng" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Giường"
                  name="giuongId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giường!",
                    },
                  ]}
                >
                  <Select data={dsGiuong || []} placeholder="Chọn giường" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Mã hồ sơ/Mã bệnh án"
                  name="nbDotDieuTriId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mã hồ sơ/Mã bệnh án!",
                    },
                  ]}
                >
                  <Select
                    data={(dsNb || []).map((x) => ({
                      id: x.id,
                      ten: `${x.maHoSo || ""}/${x.maBenhAn || ""}`,
                    }))}
                    placeholder="Chọn mã hồ sơ/Mã bệnh án"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Họ và tên NB"
                  name="nbDotDieuTriId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn họ và tên NB!",
                    },
                  ]}
                >
                  <Select
                    data={(dsNb || []).map((x) => ({
                      id: x.id,
                      ten: x.tenNb,
                    }))}
                    placeholder="Chọn họ và tên NB"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Nằm từ ngày"
                  name="tuThoiGian"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian!",
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    disabled={
                      state.readOnlyTuThoiGian && !state.bnDaNghiDieuTri
                    }
                    disabledDate={onDisabledDate}
                    placeholder="Chọn ngày"
                    format="DD/MM/YYYY HH:mm:ss"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Nằm đến ngày"
                  name="denThoiGian"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Vui lòng chọn thời gian!",
                  //   },
                  // ]}
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
                  label="Tên dịch vụ giường thường"
                  name="dvGiuongId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giường!",
                    },
                  ]}
                >
                  <Select
                    data={(dsDVGiuong || [])
                      .filter((x) => x.phanLoai === 20)
                      .map((x) => ({
                        id: x.dichVuId,
                        ten: x.ten,
                      }))}
                    placeholder="Chọn giường"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Loại giường"
                  name="loaiGiuongId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại giường!",
                    },
                  ]}
                >
                  <Select
                    data={state.dsLoaiGiuong || []}
                    placeholder="Chọn loại giường"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Tên dịch vụ giường tự chọn NB đăng kí thêm"
                  name="dvGiuongTuChonId"
                >
                  <Select
                    data={(dsDVGiuong || [])
                      .filter((x) => x.phanLoai === 10)
                      .map((x) => ({
                        id: x.dichVuId,
                        ten: x.ten,
                      }))}
                    placeholder="Chọn giường"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Mục đích sử dụng giường" name="dvGiaId">
                  <Select
                    data={dsMucDichSuDung || []}
                    placeholder="Chọn phòng"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="" name="tuTra" valuePropName="checked">
                  <Checkbox>Tự trả</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </FormWraper>
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
    </ModalStyled>
  );
};

export default forwardRef(ModalThemMoiPhongGiuong);
