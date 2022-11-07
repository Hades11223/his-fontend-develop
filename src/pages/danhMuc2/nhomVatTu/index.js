import BaseDmWrap from "components/BaseDmWrap";
import { LOAI_DICH_VU } from "constants/index";
import React from "react";

const NhomVatTu = ({}) => {
  const mapToBody = (data) => ({ ...data, loaiDichVu: LOAI_DICH_VU.VAT_TU });

  return (
    <BaseDmWrap
      titleMain="nhóm vật tư"
      roleName="NHOM_VAT_TU"
      storeName="nhomVatTu"
      classNameForm={"form-custom--one-line"}
      mapToBody={mapToBody}
    />
  );
};

export default NhomVatTu;
