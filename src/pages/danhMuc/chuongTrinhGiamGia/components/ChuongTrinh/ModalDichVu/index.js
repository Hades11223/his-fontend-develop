import React, { useState, useEffect, useRef, forwardRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Select } from "components";
import { Main, MainTitle, ButtonWrapper } from "./styled";
import IconSave from "assets/images/thuNgan/icSave.png";
import ModalCheckout from "components/ModalCheckout";
import DichVu from "./DichVu";

const Index = (
  { chuongTrinhId, modalCheckoutRef, onSaveModal, dsDichVu, ...props },
  ref
) => {
  const listAllDichVu = useSelector((state) => state.dichVu.listAllDichVu);

  const {
    dichVu: { getAllDichVu },
  } = useDispatch();

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dsDichVu);
  }, [dsDichVu]);
  const refTimeout = useRef();

  const onSubmit = () => {
    onSaveModal(data);
    onCancel();
  };

  const onCancel = () => {
    if (modalCheckoutRef.current) {
      modalCheckoutRef.current.close();
    }
  };

  const onChange = (_, option) => {
    if (option && data?.indexOf(option?.lists) === -1) {
      setData([option.lists, ...data]);
    }
  };

  const onSearch = (ten) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(() => {
      console.log("callref");
      getAllDichVu({ ten, size: 99 });
    }, 500);
  };

  const updateListService = (data) => {
    let services = data.map((e) => e.action);
    setData(services);
  };

  return (
    <ModalCheckout
      titleHeader="Chọn dịch vụ áp dụng giảm giá"
      titleBtnNext={
        <ButtonWrapper>
          Lưu [F4] <img src={IconSave} alt="iconSave" />
        </ButtonWrapper>
      }
      titleBtnBack="Quay lại"
      ref={modalCheckoutRef}
      width={800}
      destroyOnClose
      onClickBack={onCancel}
      onClickNext={onSubmit}
    >
      <Main>
        <MainTitle>Thêm dịch vụ</MainTitle>
        <Select
          data={listAllDichVu}
          style={{ width: "100%" }}
          placeholder="Vui lòng chọn dịch vụ"
          onChange={(value, option) => onChange(value, option)}
          onSearch={onSearch}
        />

        <DichVu
          listService={data || []}
          updateListService={updateListService}
        />
      </Main>
    </ModalCheckout>
  );
};

export default forwardRef(Index);
