import React, { useEffect, useState, memo, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useInterval } from "hook";
import IcThongKe from "assets/svg/tiep-don/iconThongKe.svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Box2 from "../../Box2";
import { TableWrapper, HeaderSearch, InputTimeout } from "components";
import IcSearch from "assets/svg/ic-search.svg";

const DaTiepDon = (props) => {
  const { t } = useTranslation();
  const { setStateParent } = props;
  const history = useHistory();
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { data, tenNb, maPhong } = state;
  const refTimeout = useRef(null);

  const quayTiepDonId = useSelector((state) => state.goiSo.quayTiepDonId);

  const {
    goiSo: { getListDaTiepDon },
    tiepDon: { getById, updateData: updateDataTiepDon },
  } = useDispatch();

  useInterval(() => {
    onSearch({ tenNb, maPhong });
  }, 10000);
  useEffect(() => {
    onSearch({ tenNb, maPhong });
  }, [quayTiepDonId]);

  const onSearch = (payload) => {
    if (!payload?.tenNb && !payload?.maPhong)
      payload.quayTiepDonId = quayTiepDonId;
    getListDaTiepDon({
      sort: "thoiGianVaoVien,desc",
      size: 5,
      active: true,
      ...payload,
    }).then((s) => {
      setState({
        data: (s?.data || []).map((item, index) => {
          item.stt = index + 1;
          return item;
        }),
      });
    });
  };
  const search = (value, variables) => {
    setState({ [`${variables}`]: value });
    let tenNbText = variables === "tenNb" ? value : tenNb;
    let maPhongText = variables === "maPhong" ? value : maPhong;
    if (refTimeout.current) {
      try {
        clearTimeout(refTimeout.current);
      } catch (error) {}
    }
    refTimeout.current = setTimeout(() => {
      onSearch({
        tenNb: tenNbText,
        maPhong: maPhongText,
      });
    }, 200);
  };
  const onClickRow = (data) => {
    if (!checkRole([ROLES["TIEP_DON"].CHI_TIET_NB_DA_TIEP_DON])) return;
    setStateParent({ isVisible: false });
    if (data?.id) {
      getById(data?.id);
      history.push(`/tiep-don/dich-vu/${data?.id}`);
    } else
      updateDataTiepDon({
        ngaySinh: {
          str: data?.ngaySinh && moment(data?.ngaySinh).format("DD/MM/YYYY"),
          date: data?.ngaySinh,
        },
        stt: data?.stt,
        tenNb: data?.tenNb,
      });
  };
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 12,
      dataIndex: "stt",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.hoTenTuoi")}
          sort_key="tenNb"
          dataSort={
            (props.dataSortColumn && props?.dataSortColumn["tenNb"]) || 0
          }
        />
      ),
      width: 50,
      dataIndex: "tenNb",
      // search: (
      //   <>
      //     <img
      //       src={require("assets/images/welcome/search.png")}
      //     ></img>
      //     <Input
      //       placeholder="Tìm tên NB"
      //       onChange={(e) => search(e.target.value, "tenNb")}
      //     />
      //   </>
      // ),
      render: (item, list) => {
        return <span>{`${item} - ${list?.tuoi}`}</span>;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.maPhong")} />,
      width: 35,
      dataIndex: "maPhong",
      // search: (
      //   <>
      //     <img
      //       src={require("assets/images/welcome/search.png")}
      //     ></img>
      //     <Input
      //       placeholder="Tìm mã phòng"
      //       onChange={(e) => search(e.target.value, "maPhong")}
      //     />
      //   </>
      // ),
    },
  ];
  const handleRedirect = () => {
    history.push("/quan-ly-tiep-don/danh-sach-nb-da-tiep-don");
  };
  return (
    <Box2
      title={
        <span>
          {t("tiepDon.timTenNguoiBenh")}
          <IcThongKe width={20} height={20} onClick={handleRedirect} />
        </span>
      }
      headerRight={
        <InputTimeout
          placeholder={t("tiepDon.timTenNguoiBenh")}
          onChange={(value) => {
            search(value, "tenNb");
          }}
          prefix={<IcSearch />}
        />
      }
      noPadding={true}
    >
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

export default memo(DaTiepDon);
