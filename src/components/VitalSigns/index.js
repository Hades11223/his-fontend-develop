import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { VitalSigns } from "./components";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

const VitalSignsMain = (props) => {
  const { id } = useParams();
  const { isEdit } = props;
  const {
    vitalSigns: { getDataVitalSigns, updateData },
    chiSoSong: { _getListTongHop: getAllChiSoSong },
    pttt: { onSearch: onSearchPttt },
  } = useDispatch();
  const {
    vitalSigns: { isLoading = false },
  } = useSelector((state) => state);
  useEffect(() => {
    getDataVitalSigns({ nbDotDieuTriId: id });
    getAllChiSoSong();
    onSearchPttt({ dataSearch: { nbDotDieuTriId: id }, page: 0, size: 100 });
    return () => {
      updateData({ values: null, moreValueIds: null });
    };
  }, []);

  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <Spin spinning={isLoading}>
            <VitalSigns isEdit={isEdit} />
          </Spin>
        </div>
      </div>
    </Main>
  );
};

export default VitalSignsMain;
