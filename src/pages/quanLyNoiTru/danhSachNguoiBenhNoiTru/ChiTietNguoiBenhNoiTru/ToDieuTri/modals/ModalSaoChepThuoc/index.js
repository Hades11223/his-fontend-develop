import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { Form, TreeSelect } from "antd";
import { Main } from "./styled";
import { Button, ModalTemplate, Select } from "components";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormWraper from "components/FormWraper";
import moment from "moment";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { orderBy } from "lodash";
import { useHistory } from "react-router-dom";
import { useLoading } from "hook";
import { LOAI_DICH_VU } from "constants/index";

const ModalSaoChepThuoc = (props, ref) => {
  const { t } = useTranslation();
  const { hideLoading, showLoading } = useLoading();
  const history = useHistory();
  const [form] = Form.useForm();
  const refModal = useRef(null);

  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});

  const {
    toDieuTri: { getToDieuTri, saoChepThuoc },
    thietLapChonKho: { getListThietLapChonKhoTheoTaiKhoan },
  } = useDispatch();
  const { listToDieuTri, currentToDieuTri } = useSelector(
    (state) => state.toDieuTri
  );

  const { id: nbDotDieuTriId } = infoPatient || {};

  const [state, _setState] = useState({
    show: false,
    toDieuTriId: null,
    dsKhoThuoc: [],
    dsKhoVatTu: [],
    dsLoaiDichVu: [90],
    disabledKho: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useEffect(() => {
    form.setFieldsValue({});
  }, [listToDieuTri]);

  const dsKhoMemo = useMemo(() => {
    let _dsKho = [];

    if (state.dsLoaiDichVu.includes(90))
      _dsKho = [..._dsKho, ...state.dsKhoThuoc];

    if (state.dsLoaiDichVu.includes(100))
      _dsKho = [..._dsKho, ...state.dsKhoVatTu];

    return _dsKho;
  }, [state.dsLoaiDichVu, state.dsKhoThuoc, state.dsKhoVatTu]);

  const listToDieuTriMemo = useMemo(() => {
    console.log("currentToDieuTri", currentToDieuTri);
    const listToDieuTriOrder = orderBy(
      listToDieuTri || [],
      "thoiGianYLenh",
      "desc"
    )
      .filter(
        (x) =>
          x.id != state.toDieuTriId &&
          x.khoaChiDinhId == currentToDieuTri?.khoaChiDinhId
      )
      .map((x) => ({
        id: x.id,
        ten: moment(x.thoiGianYLenh).isValid
          ? moment(x.thoiGianYLenh).format("DD/MM/YYYY HH:mm")
          : "",
      }));

    if (listToDieuTriOrder && listToDieuTriOrder.length > 0)
      form.setFieldsValue({
        tuToDieuTriId: listToDieuTriOrder[0].id,
      });

    return listToDieuTriOrder;
  }, [listToDieuTri, state.toDieuTriId]);

  useImperativeHandle(ref, () => ({
    show: ({ toDieuTriId }) => {
      setState({ show: true, toDieuTriId });

      getToDieuTri({ nbDotDieuTriId });
      let payload = {
        khoaNbId: infoPatient?.khoaNbId,
        khoaChiDinhId: currentToDieuTri?.khoaChiDinhId,
        doiTuong: infoPatient?.doiTuong,
        loaiDoiTuongId: infoPatient?.loaiDoiTuongId,
        capCuu: infoPatient?.capCuu,
        phongId: infoPatient?.phongId,
        noiTru: true,
        canLamSang: false,
      };
      getListThietLapChonKhoTheoTaiKhoan({ ...payload, loaiDichVu: 90 }).then(
        (res) => {
          setState({ dsKhoThuoc: res?.payload?.listThietLapChonKho || [] });
        }
      );

      getListThietLapChonKhoTheoTaiKhoan({ ...payload, loaiDichVu: 100 }).then(
        (res) => {
          setState({ dsKhoVatTu: res?.payload?.listThietLapChonKho || [] });
        }
      );

      form.setFieldsValue({
        dsLoaiDichVu: [90],
        denToDieuTriId: toDieuTriId,
        disabledKho: false,
      });
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({ show: false });
  };

  const onSaoChepThuocVT = () => {
    form.validateFields().then((values) => {
      const { tuToDieuTriId, denToDieuTriId, dsLoaiDichVu, dsKhoId } = values;

      showLoading();
      saoChepThuoc({
        tuToDieuTriId,
        denToDieuTriId,
        dsLoaiDichVu,
        dsKhoId,
        nbDotDieuTriId,
      })
        .then(() => {
          hideLoading();
          return setTimeout(() => {
            history.go();
          }, 300);
        })
        .catch(() => {
          hideLoading();
        });
    });
  };

  const handleValuesChange = (changedValues, allValues) => {
    if (changedValues.dsLoaiDichVu)
      setState({
        dsLoaiDichVu: changedValues.dsLoaiDichVu,
        disabledKho: !changedValues.dsLoaiDichVu.some((x) =>
          [90, 100].includes(x)
        ),
      });
  };

  return (
    <ModalTemplate
      width={500}
      closable={true}
      ref={refModal}
      title={t("quanLyNoiTru.toDieuTri.saoChepDichVu")}
      onCancel={onClose}
      actionLeft={
        <Button.Text
          className={"mr-auto"}
          type="primary"
          onClick={() => {
            onClose();
          }}
          leftIcon={<IcArrowLeft />}
        >
          Quay l???i
        </Button.Text>
      }
      actionRight={
        <Button type="primary" onClick={onSaoChepThuocVT}>
          X??c nh???n
        </Button>
      }
    >
      <Main>
        <div className="content">
          <FormWraper
            form={form}
            style={{ width: "100%" }}
            labelAlign={"left"}
            layout="vertical"
            onValuesChange={handleValuesChange}
          >
            <Form.Item
              label="Lo???i DV"
              name="dsLoaiDichVu"
              rules={[{ required: true, message: "Vui l??ng ch???n lo???i DV!" }]}
            >
              <TreeSelect
                treeData={[
                  {
                    title: "Thu???c",
                    value: LOAI_DICH_VU.THUOC,
                    key: LOAI_DICH_VU.THUOC,
                    children: [],
                  },
                  {
                    title: "V???t t??",
                    value: LOAI_DICH_VU.VAT_TU,
                    key: LOAI_DICH_VU.VAT_TU,
                    children: [],
                  },
                  {
                    title: "D???ch v??? k??? thu???t",
                    value: 0,
                    key: "0",
                    children: [
                      {
                        title: "Kh??m",
                        value: LOAI_DICH_VU.KHAM,
                        key: LOAI_DICH_VU.KHAM,
                      },
                      {
                        title: "X??t nghi???m",
                        value: LOAI_DICH_VU.XET_NGHIEM,
                        key: LOAI_DICH_VU.XET_NGHIEM,
                      },
                      {
                        title: "C??HA",
                        value: LOAI_DICH_VU.CDHA,
                        key: LOAI_DICH_VU.CDHA,
                      },
                      {
                        title: "Ph???u thu???t - th??? thu???t",
                        value: LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
                        key: LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
                      },
                    ],
                  },
                  {
                    title: "Su???t ??n",
                    value: LOAI_DICH_VU.SUAT_AN,
                    key: LOAI_DICH_VU.SUAT_AN,
                    children: [],
                  },
                ]}
                treeCheckable={true}
                placeholder="Ch???n lo???i d???ch v???"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Sao ch??p t??? t??? ??i???u tr??? ng??y"
              name="tuToDieuTriId"
              rules={[
                { required: true, message: "Vui l??ng ch???n t??? ??i???u tr???!" },
              ]}
            >
              <Select
                data={listToDieuTriMemo}
                placeholder={"Ch???n t??? ??i???u tr???"}
              />
            </Form.Item>

            <Form.Item
              label="?????n t??? ??i???u tr??? ng??y"
              name="denToDieuTriId"
              rules={[
                { required: true, message: "Vui l??ng ch???n t??? ??i???u tr???!" },
              ]}
            >
              <Select
                disabled={true}
                data={listToDieuTri.map((x) => ({
                  id: x.id,
                  ten: moment(x.thoiGianYLenh).isValid
                    ? moment(x.thoiGianYLenh).format("DD/MM/YYYY HH:mm")
                    : "",
                }))}
                placeholder={"Ch???n t??? ??i???u tr???"}
                valueNumber={true}
              />
            </Form.Item>

            <Form.Item
              label="Kho"
              name="dsKhoId"
              rules={[
                { required: !state.disabledKho, message: "Vui l??ng ch???n kho!" },
              ]}
            >
              <Select
                mode="multiple"
                data={dsKhoMemo}
                disabled={state.disabledKho}
                placeholder={"Ch???n kho"}
              />
            </Form.Item>
          </FormWraper>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSaoChepThuoc);
