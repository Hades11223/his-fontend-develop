import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const NhomHoaChat = ({}) => {
  const mapToBody = (data) => ({ ...data, loaiDichVu: 110 });

  return (
    <BaseDmWrap
      titleMain="nhóm hóa chất"
      roleName="NHOM_HOA_CHAT"
      storeName="nhomHoatChat"
      classNameForm={"form-custom--one-line"}
      mapToBody={mapToBody}
    />
  );
};

export default NhomHoaChat;
