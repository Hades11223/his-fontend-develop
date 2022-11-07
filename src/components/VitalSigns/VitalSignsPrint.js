import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import Page from "./Page";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useThietLap } from "hook";
import { THIET_LAP_CHUNG } from "constants/index";

const VitalSignsPrint = (props) => {
  const { id } = useParams();
  const {
    pttt: { listDsPttt = [] },
    chiSoSong: { _listDataTongHop },
  } = useSelector((state) => state);
  const [dataTIEU_DE_TRAI_1] = useThietLap(THIET_LAP_CHUNG.TIEU_DE_TRAI_1);
  const [dataTIEU_DE_TRAI_2] = useThietLap(THIET_LAP_CHUNG.TIEU_DE_TRAI_2);
  const {
    vitalSigns: { getDataToPrint },
    chiSoSong: { _getListTongHop: getAllChiSoSong },
    pttt: { onSearch: onSearchPttt },
  } = useDispatch();
  useEffect(() => {
    let nbDotDieuTriId = props.match?.params?.nbDotDieuTriId;
    getDataToPrint({ nbDotDieuTriId });
    getAllChiSoSong();
    onSearchPttt({
      dataSearch: { nbDotDieuTriId: nbDotDieuTriId },
      page: 0,
      size: 100,
    });
  }, []);
  useEffect(() => {
    if (props.patient && props.values) {
      setTimeout(() => {
        window.print();
        window.close();
      }, 500);
    }
  }, [props.values, props.patient]);

  let newValues = [];
  props.values.forEach((item, index) => {
    let _index = parseInt(index / 9);
    if (!newValues[_index]) newValues[_index] = [];
    newValues[_index].push(item);
  });
  if (newValues.length === 0) newValues = [[]];
  if (!props.patient) return null;
  return (
    <Main>
      <Spin spinning={props.isLoadingPrint}>
        {newValues.map((values, index) => {
          return (
            <Page
              tieuDeTrai1={dataTIEU_DE_TRAI_1}
              tieuDeTrai2={dataTIEU_DE_TRAI_2}
              moreValueIds={props.moreValueIds}
              vitalSignsCategories={_listDataTongHop}
              key={index}
              data={props.patient}
              values={values}
              style={{}}
            />
          );
        })}
      </Spin>
    </Main>
  );
};

const mapState = (state) => {
  let dataPrint = state.vitalSigns.dataPrint || {};
  return {
    isLoadingPrint: state.vitalSigns.isLoadingPrint,
    values: dataPrint.values || [],
    patient: dataPrint.patient,
    moreValueIds: dataPrint.moreValueIds || [],
  };
};

const mapDispatch = ({ vitalSigns: { getDataToPrint } }) => ({
  getDataToPrint,
});

export default connect(mapState, mapDispatch)(VitalSignsPrint);
