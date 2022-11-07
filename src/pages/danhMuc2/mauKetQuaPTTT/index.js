import { Checkbox, Form, Input } from "antd";
import { Select, TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import { ROLES } from "constants/index";
import useListAll from "hook/useListAll";
import React from "react";

const nameScreen = "mẫu kết quả PT - TT";
const LoaiBuaAn = ({}) => {
  const [listAllPhuongPhapGayMe] = useListAll("phuongPhapGayMe", {
    active: true,
  });

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label={`Mã ${nameScreen}`}
          name="ma"
          rules={[
            {
              required: true,
              message: `Vui lòng nhập mã ${nameScreen}!`,
            },
            {
              max: 20,
              message: `Vui lòng nhập mã ${nameScreen} không quá 20 ký tự!`,
            },
            {
              whitespace: true,
              message: `Vui lòng nhập mã ${nameScreen}!`,
            },
          ]}
        >
          <Input
            autoFocus={autoFocus}
            className="input-option"
            placeholder={`Vui lòng nhập mã ${nameScreen}`}
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label={`Tên ${nameScreen}`}
          name="ten"
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${nameScreen}!`,
            },
            {
              max: 1000,
              message: `Vui lòng nhập ${nameScreen} không quá 1000 ký tự!`,
            },
            {
              whitespace: true,
              message: `Vui lòng nhập ${nameScreen}!`,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={`Vui lòng nhập ${nameScreen}`}
          />
        </Form.Item>
        <Form.Item label={`Phương pháp gây mê`} name="phuongPhapGayMeId">
          <Select
            data={listAllPhuongPhapGayMe}
            className="input-option"
            placeholder={`Vui lòng chọn phương pháp`}
          />
        </Form.Item>
        <Form.Item label={`Kết luận`} name="ketLuan">
          <Input
            className="input-option"
            placeholder={`Vui lòng nhập kết luận`}
          />
        </Form.Item>

        <Form.Item
          label={`Chẩn đoán sau PTTT`}
          className="w100"
          name="chanDoan"
        >
          <Input
            className="input-option"
            placeholder={`Vui lòng nhập chẩn đoán`}
          />
        </Form.Item>
        <Form.Item
          label={`Phương pháp PTTT`}
          className="w100"
          name="phuongThuc"
        >
          <Input.TextArea
            rows={3}
            className="input-option"
            placeholder={`Vui lòng nhập phương pháp`}
          />
        </Form.Item>
        <Form.Item label={`Cách thức PTTT`} className="w100" name="cachThuc">
          <Input.TextArea
            rows={3}
            className="input-option"
            placeholder={`Vui lòng nhập cách thức`}
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  const mapToBody = (data) => ({ ...data, loaiDichVu: 40 });

  return (
    <BaseDmWrap
      titleTable="Danh mục mẫu kết quả phẫu thuật - thủ thuật"
      titleMain={nameScreen}
      renderForm={renderForm}
      roleSave={ROLES["DANH_MUC"].MAU_KQ_PT_TT_THEM}
      roleEdit={ROLES["DANH_MUC"].MAU_KQ_PT_TT_SUA}
      storeName="mauKetQuaPTTT"
      mapToBody={mapToBody}
    />
  );
};

export default LoaiBuaAn;
