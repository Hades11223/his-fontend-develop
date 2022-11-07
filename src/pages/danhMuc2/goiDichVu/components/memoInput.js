import React, { useMemo } from "react";
import SelectLoadMore from "components/SelectLoadMore";

export const MemoSelectPhong = ({ dataSelect, ...props }) => {
  const addParam = useMemo(
    () => ({ dichVuId: dataSelect.dichVuId }),
    [dataSelect.dichVuId]
  );
  const addValue = useMemo(
    () => ({ value: dataSelect.phongId, label: dataSelect.phong?.ten }),
    [dataSelect.dichVuId]
  );
  return <SelectLoadMore {...props} addParam={addParam} addValue={addValue} />;
};

export const MemoSelectLieuDung = ({ dataSelect, ...props }) => {
  const addParam = useMemo(
    () => ({ dichVuId: dataSelect.dichVuId }),
    [dataSelect.dichVuId]
  );
  const addValue = useMemo(
    () => ({ value: dataSelect.lieuDungId, label: dataSelect.lieuDung?.ten }),
    [dataSelect.dichVuId]
  );
  return <SelectLoadMore {...props} addParam={addParam} addValue={addValue} />;
};

export const MemoSelectDv = ({ dataSelect, ...props }) => {
  const addValue = useMemo(
    () => ({ value: dataSelect.dichVuId, label: dataSelect.tenDichVu }),
    [dataSelect.dichVuId]
  );
  return <SelectLoadMore {...props} addValue={addValue} />;
};
