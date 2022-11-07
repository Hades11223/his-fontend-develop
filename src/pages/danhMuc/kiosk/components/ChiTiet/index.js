import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  TimePicker,
  Checkbox,
  message,
} from "antd";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IcCreate from "assets/images/kho/IcCreate2.png";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import Carousel from "components/Carousel";
import CreatedWrapper from "components/CreatedWrapper";
import moment from "moment";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";

const ChiTiet = (props) => {
  const { form, collapseStatus, layerId } = props;
  const { t } = useTranslation();
  const {
    phong: { listAllPhong = [] },
    khoa: { listAllKhoa },
    utils: { listTrangThaiHienThi, listloaiQms },
    nhanVien: { listNhanVien },
    kiosk: { currentItem },
    template: { listAllTemplate },
    thietLap: { dataBAC_SI, dataKY_THUAT_Y, dataDIEU_DUONG, dataY_TA },
    quayTiepDon: { listAllQuayTiepDonTaiKhoan, listQuayTiepDon },
  } = useSelector((state) => state);

  const {
    phong: { getListAllPhong },
    khoa: { getListAllKhoa },
    utils: { getUtils },
    nhanVien: { getListNhanVien, getListDieuDuong, getListBacSi },
    kiosk: { createOrEdit, postVideo, onSearch: onSearchKiosk },
    template: { onChangeInputSearch, getListAllTemplate },
    thietLap: { getThietLap },
    vanBang: { getListAllVanBang },
    phimTat: { onRegisterHotkey },
    quayTiepDon: { searchQuayTiepDon },
  } = useDispatch();
  const refClickBtnSave = useRef();
  const refDieuDuongIds = useRef(null);
  const formatHour = "HH:mm";
  const refVideo = useRef(null);
  const listAllVanBang = useSelector((state) => state.vanBang.listAllVanBang);
  const listDieuDuong = useSelector((state) => state.nhanVien.listDieuDuong);
  const listBacSi = useSelector((state) => state.nhanVien.listBacSi);

  const [state, _setState] = useState({ currentIndex: -1 });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);
  const listTemplate = useMemo(() => {
    if (state.loaiQms) {
      return listAllTemplate.filter((item) => {
        return item.loaiQms === state.loaiQms;
      });
    } else {
      return listAllTemplate;
    }
  }, [state.loaiQms, listAllTemplate]);
  useEffect(() => {
    getListAllPhong({});
    getListAllKhoa({});
    getListNhanVien({});
    getListAllTemplate({});
    getUtils({ name: "TrangThaiHienThi" });
    getUtils({ name: "loaiQms" });
    getThietLap({ ma: "BAC_SI" });
    getThietLap({ ma: "KY_THUAT_Y" });
    getThietLap({ ma: "DIEU_DUONG" });
    getThietLap({ ma: "Y_TA" });
    getListAllVanBang({});
  }, []);

  useEffect(() => {
    let data = [];
    if (currentItem) {
      if (state.loaiQms !== 10) {
        data = listTrangThaiHienThi?.map((item) => {
          return {
            name: item?.id,
            isactive: (currentItem.dsTrangThai || []).includes(item?.id),
          };
        });
      } else {
        data = listTrangThaiHienThi
          ?.filter((item) => [10, 20, 60].includes(item.id))
          .map((item) => {
            return {
              name: item?.id,
              isactive: (currentItem.dsTrangThai || []).includes(item?.id),
            };
          });
      }
    } else {
      if (state.loaiQms === 10) {
        data = listTrangThaiHienThi
          ?.filter((item) => [10, 20, 60].includes(item.id))
          .map((item) => {
            return {
              name: item?.id,
              isactive: true,
            };
          });
      } else {
        data = listTrangThaiHienThi?.map((item) => {
          return { name: item?.id, isactive: true };
        });
      }
    }
    setState({ dataTable: data });
  }, [listTrangThaiHienThi, state.loaiQms, currentItem]);
  const onChangeInput = (key, index) => (e) => {
    state.dataTable[index][key] = e.target.checked;
    setState({
      dataTable: state.dataTable,
    });
  };

  const dieuDuongIds = useMemo(() => {
    if (dataDIEU_DUONG || dataY_TA) {
      let dieuDuong =
        listAllVanBang?.filter(
          (x) => x.ma == dataDIEU_DUONG || x.ma == dataY_TA
        ) || [];
      return dieuDuong.map((x) => x.id);
    }
    return [];
  }, [dataDIEU_DUONG, dataY_TA, listAllVanBang]);

  useEffect(() => {
    if (
      dieuDuongIds.length &&
      !isEqual(dieuDuongIds, refDieuDuongIds.current)
    ) {
      refDieuDuongIds.current = dieuDuongIds;
      getListDieuDuong({ dsVanBangId: dieuDuongIds });
    }
  }, [dieuDuongIds]);

  useEffect(() => {
    if (dataKY_THUAT_Y || dataBAC_SI) {
      let dsMaBacSi = dataBAC_SI.split(",");
      let bacSi =
        listAllVanBang?.filter(
          (x) => x.ma == dataKY_THUAT_Y || dsMaBacSi.some((i) => i == x.ma)
        ) || [];
      let bacSiIds = bacSi.map((x) => x.id);
      if (bacSiIds?.length) getListBacSi({ dsVanBangId: bacSiIds });
    }
  }, [listAllVanBang, dataBAC_SI, dataKY_THUAT_Y]);

  useEffect(() => {
    loadCurrentItem(currentItem);
  }, [currentItem]);

  const loadCurrentItem = (item) => {
    if (item) {
      const {
        mac,
        khoaId,
        dieuDuongId,
        ten,
        dsBacSiId,
        hoTroId,
        phongId,
        thoiGianChieuDen,
        thoiGianChieuTu,
        thoiGianSangDen,
        thoiGianSangTu,
        dsVideo,
        dsTrangThai,
        mauQmsId,
        loaiQms,
        id,
        active,
        quayTiepDonId,
      } = item || {};
      const data = {
        mac,
        khoaId,
        dieuDuongId,
        ten,
        dsBacSiId,
        hoTroId,
        phongId,
        dsVideo,
        mauQmsId,
        loaiQms,
        id,
        active,
        quayTiepDonId,
      };
      let bacSi = listNhanVien.filter((x) => (dsBacSiId || []).includes(x.id));
      searchQuayTiepDon({
        khoaId,
        page: 0,
        size: 500,
      });
      setState({
        currentId: id,
        currentData: item,
        currentIndex: -1,
        thoiGianChieuDen: thoiGianChieuDen
          ? moment(thoiGianChieuDen, formatHour)
          : null,
        thoiGianChieuTu: thoiGianChieuTu
          ? moment(thoiGianChieuTu, formatHour)
          : null,
        thoiGianSangDen: thoiGianSangDen
          ? moment(thoiGianSangDen, formatHour)
          : null,
        thoiGianSangTu: thoiGianSangTu
          ? moment(thoiGianSangTu, formatHour)
          : null,
        fileName: dsVideo?.map((item) => {
          return item?.split("/").pop();
        }),
        bacSi,
      });
      form.setFieldsValue(data);
      setState({ currentId: id, loaiQms: loaiQms });
    } else {
      form.resetFields();
      let dataTable = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });

      setState({
        currentId: null,
        currentData: null,
        currentIndex: -1,
        thoiGianChieuDen: null,
        thoiGianChieuTu: null,
        thoiGianSangDen: null,
        thoiGianSangTu: null,
        fileName: null,
        bacSi: null,
        dataTable,
      });
    }
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title="Tên trường trên MH Kiosk" />,
      width: 200,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (item) => {
        return listTrangThaiHienThi?.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Hiển thị" />,
      width: 30,
      dataIndex: "isactive",
      key: "isactive",
      align: "center",
      render: (item, data, index) => {
        if (
          state.loaiQms === 10 ||
          (state.currentIndex === index && state.loaiQms !== 10)
        ) {
          return (
            <Checkbox
              onChange={onChangeInput("isactive", index)}
              checked={item}
            ></Checkbox>
          );
        } else {
          return <Checkbox checked={item}></Checkbox>;
        }
      },
    },
  ];

  const onChangeField = (key) => (e) => {
    if (key === "khoaId") {
      getListNhanVien({ size: 500, khoaId: e });
      searchQuayTiepDon({
        khoaId: e,
        page: 0,
        size: 500,
      });
    }
    if (key === "loaiPhong") {
      getListAllPhong({ size: 500, loaiPhong: e });
      onChangeInputSearch({ loaiQms: e });
      setState({
        loaiQms: e,
      });
    }
  };

  const onSave = () => {
    form.submit();
  };
  refClickBtnSave.current = onSave;
  const onRow = (record = {}, index) => {
    if ([10, 20, 60].includes(record.name)) return null;
    return {
      onClick: (event) => {
        setState({
          currentIndex: index,
        });
      },
    };
  };
  const onHanldeSubmit = (values) => {
    let newData = state?.dataTable.filter((item) => {
      return item.isactive && item.name;
    });
    const {
      mac,
      khoaId,
      dieuDuongId,
      ten,
      dsBacSiId,
      hoTroId,
      phongId,
      mauQmsId,
      loaiQms,
      active,
      quayTiepDonId,
    } = values;
    const {
      thoiGianChieuDen,
      thoiGianChieuTu,
      thoiGianSangDen,
      thoiGianSangTu,
      video,
    } = state;
    const data = {
      quayTiepDonId,
      mac,
      khoaId,
      dieuDuongId,
      ten,
      dsBacSiId,
      hoTroId,
      phongId,
      dsTrangThai: (newData || []).map((item) => {
        return item.name;
      }),
      mauQmsId,
      loaiQms,
      thoiGianChieuDen: thoiGianChieuDen
        ? thoiGianChieuDen.format(formatHour)
        : null,
      thoiGianChieuTu: thoiGianChieuTu
        ? thoiGianChieuTu.format(formatHour)
        : null,
      thoiGianSangDen: thoiGianSangDen
        ? thoiGianSangDen.format(formatHour)
        : null,
      thoiGianSangTu: thoiGianSangTu ? thoiGianSangTu.format(formatHour) : null,
      dsVideo: video
        ? Array(video)
        : state?.currentData
        ? state?.currentData?.dsVideo
        : [null],
      id: state.currentId,
      active,
    };
    if (data.loaiQms === 10 && !data.dsTrangThai.length) {
      message.error(t("danhMuc.chonTruongTrenKiosk"));
      return;
    }
    createOrEdit(data).then((s) => {
      form.resetFields();
      let data = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });
      setState({
        dataTable: data,
        currentData: {},
        fileName: [],
        bacSi: [],
        currentId: null,
      });
      onSearchKiosk({});
    });
  };

  const onChangeInputHour = (key) => (e) => {
    setState({
      [key]: e,
    });
  };

  const onChangeBacSi = (e) => {
    let data = listNhanVien.filter((x) => e.includes(x.id));
    if (data) setState({ bacSi: data });
  };

  const handleUploadFile = (event) => {
    event.preventDefault();
    return refVideo.current.click();
  };

  const selectVideo = (data) => {
    let type =
      data.target &&
      data.target.files &&
      data.target.files[0] &&
      data.target.files[0].type;
    if (type === "video/mp4") {
      let fileUpload = "";
      let fileName = "";
      fileUpload = data.target.files[0] || {};
      fileName = fileUpload.name;
      setState({
        fileName,
        fileUpload,
      });
      postVideo(fileUpload).then((s) => {
        setState({ video: s?.data });
      });
    }
  };
  const handleHiddenButtonDependRole = () => {
    let roleSave = [ROLES["THIET_LAP"].KIOSK_THEM];
    let roleEdit = [ROLES["THIET_LAP"].KIOSK_SUA];
    if (roleEdit || roleSave) {
      if (props.stateParent.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };

  const onReset = () => {
    if (currentItem?.id) {
      loadCurrentItem(state.currentData);
    } else {
      loadCurrentItem();
      let data = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });
      setState({ dataTable: data, currentIndex: -1 });
    }
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if ((currentItem || currentItem === null) && refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  return (
    <Main collapseStatus={collapseStatus}>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onReset}
        cancelText="Hủy"
        onOk={onSave}
        okText="Lưu [F4]"
        roleSave={[ROLES["THIET_LAP"].KIOSK_THEM]}
        roleEdit={[ROLES["THIET_LAP"].KIOSK_SUA]}
        editStatus={props.stateParent.editStatus}
      >
        <div className="info">
          <fieldset
            disabled={
              props.stateParent.editStatus
                ? !checkRole([ROLES["THIET_LAP"].KIOSK_SUA])
                : !checkRole([ROLES["THIET_LAP"].KIOSK_THEM])
            }
          >
            <div className="content">
              <Form
                form={form}
                layout="vertical"
                className="form-custom"
                onFinish={onHanldeSubmit}
              >
                <Row style={{ width: "100%" }}>
                  <Col xs={8}>
                    <Form.Item
                      label="Tên thiết bị"
                      name="ten"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên thiết bị!",
                        },
                      ]}
                    >
                      <Input
                        ref={refAutoFocus}
                        // autoFocus={true}
                        placeholder="Nhập tên thiết bị"
                      ></Input>
                    </Form.Item>
                    <Form.Item
                      label="Khoa"
                      name="khoaId"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn khoa!",
                        },
                      ]}
                    >
                      <Select
                        data={listAllKhoa}
                        onChange={onChangeField("khoaId")}
                        placeholder="Chọn khoa"
                      ></Select>
                    </Form.Item>
                    <Form.Item
                      label="Template"
                      name="mauQmsId"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn template!",
                        },
                      ]}
                    >
                      <Select
                        data={listTemplate}
                        placeholder="Chọn template"
                      ></Select>
                    </Form.Item>
                    {state.loaiQms !== 10 && (
                      <>
                        <Form.Item label="Trợ lý y tá" name="dieuDuongId">
                          <Select
                            data={listDieuDuong}
                            placeholder="Chọn trợ lý y tá"
                          ></Select>
                        </Form.Item>
                        <Form.Item label="Thời gian làm việc">
                          <div className="time">
                            <label> Sáng từ</label>
                            <TimePicker
                              format={formatHour}
                              onChange={onChangeInputHour("thoiGianSangTu")}
                              value={state?.thoiGianSangTu}
                            ></TimePicker>
                          </div>
                          <div className="time">
                            <label> Chiều từ</label>
                            <TimePicker
                              format={formatHour}
                              onChange={onChangeInputHour("thoiGianChieuTu")}
                              value={state?.thoiGianChieuTu}
                            ></TimePicker>
                          </div>
                        </Form.Item>
                      </>
                    )}
                  </Col>

                  <Col xs={8}>
                    <Form.Item label="Địa chỉ Mac thiết bị" name="mac">
                      <Input placeholder="Nhập địa chỉ mac thiết bị"></Input>
                    </Form.Item>
                    {state.loaiQms !== 10 && (
                      <>
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
                          <Select
                            data={listAllPhong}
                            placeholder="Chọn phòng"
                          ></Select>
                        </Form.Item>
                        <Form.Item
                          label="Bác sĩ"
                          name="dsBacSiId"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn bác sĩ!",
                            },
                          ]}
                        >
                          <Select
                            data={listBacSi}
                            onChange={onChangeBacSi}
                            mode="multiple"
                            showArrow
                            placeholder="Chọn bác sĩ"
                          ></Select>
                        </Form.Item>
                      </>
                    )}
                    {state.loaiQms !== 10 && (
                      <Form.Item label="Hỗ trợ hướng dẫn" name="hoTroId">
                        <Select
                          data={listDieuDuong}
                          placeholder="Chọn hỗ trợ hướng dẫn"
                        ></Select>
                      </Form.Item>
                    )}
                    {state.loaiQms === 10 && (
                      <Form.Item
                        label="Quầy tiếp đón"
                        name="quayTiepDonId"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn quầy tiếp đón!",
                          },
                        ]}
                      >
                        <Select
                          data={listQuayTiepDon}
                          placeholder="Chọn quầy tiếp đón"
                        ></Select>
                      </Form.Item>
                    )}

                    {state.loaiQms !== 10 && (
                      <>
                        <Form.Item label=" ">
                          <div className="time">
                            <label> Đến</label>
                            <TimePicker
                              format={formatHour}
                              onChange={onChangeInputHour("thoiGianSangDen")}
                              value={state?.thoiGianSangDen}
                            ></TimePicker>
                          </div>
                          <div className="time">
                            <label> Đến</label>
                            <TimePicker
                              format={formatHour}
                              onChange={onChangeInputHour("thoiGianChieuDen")}
                              value={state?.thoiGianChieuDen}
                            ></TimePicker>
                          </div>
                        </Form.Item>
                      </>
                    )}
                  </Col>
                  <Col xs={8}>
                    <Form.Item
                      label="Loại QMS"
                      name="loaiQms"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại qms!",
                        },
                      ]}
                    >
                      <Select
                        data={listloaiQms}
                        onChange={onChangeField("loaiPhong")}
                        placeholder="Chọn loại Qms"
                      ></Select>
                    </Form.Item>
                    {state.loaiQms !== 10 && (
                      <Form.Item label="Ảnh bác sĩ">
                        <Carousel data={state.bacSi} />
                      </Form.Item>
                    )}

                    <Form.Item label="Video giới thiệu">
                      <div className="video">
                        <div className="left">
                          <a>{state.fileName}</a>
                        </div>
                        <div className="right">
                          <input
                            style={{ display: "none" }}
                            accept="video/*"
                            type="file"
                            onChange={(e) => selectVideo(e)}
                            ref={refVideo}
                          ></input>
                          <Button
                            onClick={handleUploadFile}
                            className="btn-upload"
                          >
                            <img src={IcCreate} />
                          </Button>
                        </div>
                      </div>
                    </Form.Item>
                    {state?.currentId && (
                      <Form.Item label="" name="active" valuePropName="checked">
                        <Checkbox>Có hiệu lực</Checkbox>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <div className="table">
                  <TableWrapper
                    columns={columns}
                    dataSource={state.dataTable}
                    rowKey={(record) => record.name}
                    onRow={(record, index) =>
                      onRow(record, index, state.loaiQms)
                    }
                  ></TableWrapper>
                </div>
              </Form>
            </div>
          </fieldset>
        </div>
      </CreatedWrapper>
    </Main>
  );
};

export default ChiTiet;
