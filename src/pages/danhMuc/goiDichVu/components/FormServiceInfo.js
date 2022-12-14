import React, { useState, useEffect, useRef, useMemo } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import { Form, Input, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import FormWraper from "components/FormWraper";
import { Main } from "../styled";
import ModalSaoChepDichVu from "./ModalSaoChepDichVu";
import { useEnum, useListAll } from "hook";
function FormServiceInfo(props, ref) {
  const refAutoFocus = useRef();
  const [state, _setState] = useState({
    isCoppy: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { currentItem, refCallbackSave, refTab } = props;
  const refSaoChepDichVu = useRef(null);

  const {
    goiDichVu: { createOrEdit },
  } = useDispatch();
  const [listloaiDichVu] = useEnum(ENUM.LOAI_DICH_VU);
  const [listdoiTuongSuDung] = useEnum(ENUM.DOI_TUONG_SU_DUNG);
  const listAllNhanVien = useListAll("nhanVien");

  useEffect(() => {
    loadCurrentItem(currentItem);
    if (!currentItem?.id && refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
    refTab.current &&
      refTab.current.setKhoaChiDinh(!!currentItem?.hanCheKhoaChiDinh);
  }, [currentItem]);

  const [form] = Form.useForm();

  const loadCurrentItem = (goiDichVu) => {
    if (goiDichVu) {
      const {
        ma,
        ten,
        dichVu: { khongTinhTien } = {},
        covid,
        dsLoaiDichVu,
        active,
        thuocChiDinhNgoai,
        hanCheKhoaChiDinh,
        id,
        dsDoiTuongSuDung,
        dsBacSiChiDinhId,
      } = goiDichVu || {};
      const data = {
        id,
        ma,
        ten,
        dsLoaiDichVu: dsLoaiDichVu || [],
        khongTinhTien,
        covid,
        active,
        thuocChiDinhNgoai,
        hanCheKhoaChiDinh,
        dsDoiTuongSuDung: dsDoiTuongSuDung || [],
        dsBacSiChiDinhId: dsBacSiChiDinhId || [],
      };
      form.setFieldsValue(data);
      setState({
        data: data,
        isCoppy: true,
      });
    } else {
      form.resetFields();
      setState({
        data: null,
        isCoppy: false,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
  };

  const onCancel = () => {
    loadCurrentItem(currentItem);
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const {
          ma,
          ten,
          dsLoaiDichVu,
          hanCheKhoaChiDinh,
          active,
          thuocChiDinhNgoai,
          khongTinhTien,
          covid,
          dsDoiTuongSuDung,
          dsBacSiChiDinhId,
        } = values;
        values = {
          dsLoaiDichVu: dsLoaiDichVu || [],
          ten,
          ma,
          dichVu: { khongTinhTien: khongTinhTien || false },
          covid: covid || false,
          hanCheKhoaChiDinh,
          active,
          thuocChiDinhNgoai,
          id: state.data?.id,
          dsDoiTuongSuDung: dsDoiTuongSuDung || [],
          dsBacSiChiDinhId: dsBacSiChiDinhId || [],
        };
        createOrEdit(values).then((s) => {
          form.resetFields();
          if (state?.isCoppy && !state?.data?.id) {
            refSaoChepDichVu.current &&
              refSaoChepDichVu.current.show({
                boChiDinhSaoChep: currentItem,
                boChiDinhId: s?.id,
              });
          }
        });
      })
      .catch((error) => {});
  };
  refCallbackSave.current = onSave;
  const onChangeHanCheKhoaChiDinh = (e) => {
    refTab.current && refTab.current.setKhoaChiDinh(!!e.target.checked);
  };

  const customNhanVien = useMemo(
    () =>
      listAllNhanVien?.map((item) => ({
        ...item,
        ten: `${item.ma} - ${item.ten}`,
      })),
    [listAllNhanVien]
  );
  const isSaoChep = () => {
    form.setFieldsValue({ ...currentItem, ma: null, ten: null });
    setState({ data: null });
  };
  return (
    <Main>
      <EditWrapper
        title="Th??ng tin b??? ch??? ?????nh"
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        showAdded={false}
        isHiddenButtonAdd={true}
        roleSave={[ROLES["DANH_MUC"].GOI_DICH_VU_THEM]}
        roleEdit={[ROLES["DANH_MUC"].GOI_DICH_VU_SUA]}
        editStatus={state.data?.id}
        isShowCoppyButton={state?.isCoppy}
        onCoppy={isSaoChep}
      >
        <FormWraper
          disabled={
            state.data?.id
              ? !checkRole([ROLES["DANH_MUC"].GOI_DICH_VU_SUA])
              : !checkRole([ROLES["DANH_MUC"].GOI_DICH_VU_THEM])
          }
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item label="M?? b??? ch??? ?????nh" name="ma">
            <Input disabled ref={refAutoFocus} className="input-option" />
          </Form.Item>
          <Form.Item
            label="T??n b???"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n b??? ch??? ?????nh!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n b??? ch??? ?????nh kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n b??? ch??? ?????nh!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n b??? ch??? ?????nh"
            />
          </Form.Item>
          <Form.Item
            label="Lo???i d???ch v???"
            name="dsLoaiDichVu"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n lo???i d???ch v???!",
              },
            ]}
          >
            <Select
              data={listloaiDichVu}
              placeholder="Ch???n lo???i d???ch v???"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item
            label="Tr?????ng h???p k?? DV"
            name="dsDoiTuongSuDung"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n k?? d???ch v???!",
              },
            ]}
          >
            <Select
              data={listdoiTuongSuDung}
              placeholder="Ch???n h???p k?? DV"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item label="T??i kho???n ch??? ?????nh b???" name="dsBacSiChiDinhId">
            <Select
              data={customNhanVien || []}
              placeholder="Ch???n t??i kho???n ch??? ?????nh b???"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item label=" " name="hanCheKhoaChiDinh" valuePropName="checked">
            <Checkbox onChange={onChangeHanCheKhoaChiDinh}>
              H???n ch??? khoa ch??? ?????nh
            </Checkbox>
          </Form.Item>

          <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
            <Checkbox>Kh??ng t??nh ti???n</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="covid" valuePropName="checked">
            <Checkbox>D??ng cho Covid</Checkbox>
          </Form.Item>
          {state.data?.id && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
            </Form.Item>
          )}
          <Form.Item label=" " name="thuocChiDinhNgoai" valuePropName="checked">
            <Checkbox>B??? thu???c k?? ngo??i</Checkbox>
          </Form.Item>
        </FormWraper>
      </EditWrapper>
      <ModalSaoChepDichVu ref={refSaoChepDichVu} />
    </Main>
  );
}

export default FormServiceInfo;
