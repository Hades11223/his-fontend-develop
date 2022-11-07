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
        title="Thông tin bộ chỉ định"
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
          <Form.Item label="Mã bộ chỉ định" name="ma">
            <Input disabled ref={refAutoFocus} className="input-option" />
          </Form.Item>
          <Form.Item
            label="Tên bộ"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên bộ chỉ định!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên bộ chỉ định không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên bộ chỉ định!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên bộ chỉ định"
            />
          </Form.Item>
          <Form.Item
            label="Loại dịch vụ"
            name="dsLoaiDichVu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại dịch vụ!",
              },
            ]}
          >
            <Select
              data={listloaiDichVu}
              placeholder="Chọn loại dịch vụ"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item
            label="Trường hợp kê DV"
            name="dsDoiTuongSuDung"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn kê dịch vụ!",
              },
            ]}
          >
            <Select
              data={listdoiTuongSuDung}
              placeholder="Chọn hợp kê DV"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item label="Tài khoản chỉ định bộ" name="dsBacSiChiDinhId">
            <Select
              data={customNhanVien || []}
              placeholder="Chọn tài khoản chỉ định bộ"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item label=" " name="hanCheKhoaChiDinh" valuePropName="checked">
            <Checkbox onChange={onChangeHanCheKhoaChiDinh}>
              Hạn chế khoa chỉ định
            </Checkbox>
          </Form.Item>

          <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
            <Checkbox>Không tính tiền</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="covid" valuePropName="checked">
            <Checkbox>Dùng cho Covid</Checkbox>
          </Form.Item>
          {state.data?.id && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
          <Form.Item label=" " name="thuocChiDinhNgoai" valuePropName="checked">
            <Checkbox>Bộ thuốc kê ngoài</Checkbox>
          </Form.Item>
        </FormWraper>
      </EditWrapper>
      <ModalSaoChepDichVu ref={refSaoChepDichVu} />
    </Main>
  );
}

export default FormServiceInfo;
