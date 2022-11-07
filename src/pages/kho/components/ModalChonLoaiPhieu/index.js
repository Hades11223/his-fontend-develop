import IcLoaiPhieuXuat from "assets/images/kho/ic-loai-phieu-xuat.svg";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Main } from "./styled";

/**
 * data:
 * [{
 *      id: 1, // bắt buộc
 *      title: "",
 *      description: ""
 * }]
 */
const ModalChonLoaiPhieu = forwardRef(
  ({ data = [], title = "", onClick = () => {} }, ref) => {
    const refModal = useRef(null);
    useImperativeHandle(ref, () => ({
      show: () => {
        if (refModal.current) refModal.current.show();
      },
    }));

    const _onClick = (id) => () => {
      if (refModal.current) refModal.current.hide();
      onClick(id);
    };

    return (
      <ModalTemplate ref={refModal} width={376} title={title}>
        <Main>
          {data.map((item, index) => (
            <div key={index} className="item" onClick={_onClick(item.id)}>
              <IcLoaiPhieuXuat className="item-icon" width={100} />
              <div className="item-content">
                <div className="item-title">{item.title?.toUpperCase()}</div>
                <div className="item-description">{item.description}</div>
              </div>
            </div>
          ))}
        </Main>
      </ModalTemplate>
    );
  }
);

export default ModalChonLoaiPhieu;
