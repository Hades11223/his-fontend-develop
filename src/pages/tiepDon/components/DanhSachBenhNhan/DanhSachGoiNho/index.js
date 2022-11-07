import React, { useState, useEffect, memo } from "react";
import { checkRole } from "utils/role-utils";
import orderBy from "lodash/orderBy";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "hook";
import { useTranslation } from "react-i18next";
import Box2 from "../../Box2";
import { TableWrapper, HeaderSearch } from "components";

const DanhSachGoiNho = (props) => {
  const { t } = useTranslation();
  const quayTiepDonId = useSelector((state) => state.goiSo.quayTiepDonId);
  const readOnlyDsGoiNho = useSelector((state) => state.goiSo.readOnlyDsGoiNho);
  const auth = useSelector((state) => state.auth.auth);
  const getNbTiepTheo = useDispatch().goiSo.getNbTiepTheo;
  const getListGoiNho = useDispatch().goiSo.getListGoiNho;
  const [state, _setState] = useState({
    data: [],
    dataSearch: [],
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { data } = state;
  useInterval(() => {
    onSearch();
  }, [10000]);
  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    getListGoiNho().then((s) => {
      let array = orderBy(s?.data, "stt", "asc") || [];
      setState({
        data: array,
        dataSearch: array,
      });
    });
  };

  const onClickRow = (nbGoiNho) => {
    if (!checkRole(["tiepDon_tiepDonLai_nbNho"])) return;
    if (!readOnlyDsGoiNho)
      getNbTiepTheo({
        id: quayTiepDonId,
        data: { nbTiepTheoId: nbGoiNho?.id ? nbGoiNho?.id : null },
        goiNho: nbGoiNho,
      });
  };
  const columns = [
    {
      key: "stt",
      title: <HeaderSearch title={t("common.stt")} />,
      width: 12,
      dataIndex: "stt",
      hideSearch: true,
    },
    {
      key: "tenNb",
      title: (
        <HeaderSearch
          title={t("tiepDon.hoTenTuoi")}
          sort_key="tenNb"
          // onClickSort={onClickSort}
          dataSort={
            (props.dataSortColumn && props?.dataSortColumn["tenNb"]) || 0
          }
        />
      ),
      width: 120,
      dataIndex: "tenNb",
      hideSearch: true,
      // search: (<>
      //     <img src={require("assets/images/welcome/search.png")}></img>
      //     <Input
      //         placeholder="Tìm tên NB hoặc STT"
      //         onChange={(e) => search(e.target.value)}
      //     />
      // </>),
      render: (item, list) => {
        return <span>{`${item} - ${list?.tuoi}`}</span>;
      },
    },
  ];
  return (
    <Box2 title={t("tiepDon.danhSachGoiNho")} noPadding={true}>
      <TableWrapper
        headerMinHeight={"35px"}
        scroll={{ y: 110 }}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              onClickRow(record);
            },
          };
        }}
        dataSource={data}
      />
    </Box2>
  );
};

export default memo(DanhSachGoiNho);
