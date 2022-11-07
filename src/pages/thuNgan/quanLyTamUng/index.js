import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import { Col } from "antd";
import DanhSach from "./DanhSach";
import TimKiemNb from "./TimKiemNb";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ModalChonToaNha, Page } from "components";
import cacheUtils from "utils/cache-utils";

const QuanLyTamUng = (props) => {
  const {
    toaNha: { getNhaTheoTaiKhoan },
  } = useDispatch();
  const refModalChonToaNha = useRef(null);
  const { t } = useTranslation();
  const { auth } = useSelector((state) => state.auth);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getNhaTheoTaiKhoan({});
  }, []);

  useEffect(() => {
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_TAM_UNG",
        "",
        null,
        false
      );
      if (!nhaTamUng) {
        if (auth?.dsToaNha?.length === 1) {
          cacheUtils.save("DATA_NHA_TAM_UNG", "", auth?.dsToaNha[0]?.id, false);
          setState({ nhaTamUng: auth?.dsToaNha[0]?.id });
        } else {
          refModalChonToaNha.current &&
            refModalChonToaNha.current.show({}, (e) => {
              setState({ nhaTamUng: e });
              cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
            });
        }
      } else {
        setState({ nhaTamUng });
      }
    }
    fetchData();
  }, [auth?.dsToaNha]);

  const onChangeSelect = (e) => {
    cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
    setState({ nhaTamUng: e });
  };
  return (
    <Page
      breadcrumb={[
        { link: "/thu-ngan", title: t("thuNgan.thuNgan") },
        {
          link: "/thu-ngan/quan-ly-tam-ung",
          title: t("thuNgan.quanLyTamUng.quanLyTamUng"),
        },
      ]}
    >
      <Main>
        <TimKiemNb
          nhaTamUng={state?.nhaTamUng}
          onChangeSelect={onChangeSelect}
        />
        <DanhSach nhaTamUng={state?.nhaTamUng} />
        <ModalChonToaNha ref={refModalChonToaNha} />
      </Main>
    </Page>
  );
};

export default QuanLyTamUng;
