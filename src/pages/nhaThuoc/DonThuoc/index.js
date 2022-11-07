import React, { useEffect, useRef, useState } from "react";
import { Main, MainPage } from "./styled";
import TimKiemDonThuoc from "pages/nhaThuoc/TimKiemDonThuoc";
import { useDispatch } from "react-redux";
import DanhSachDonThuoc from "../DanhSachDonThuoc";
import stringUtils from "mainam-react-native-string-utils";
import { Button, Select, ModalChonToaNha } from "components";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useHistory } from "react-router-dom";
import IcLocation from "assets/images/thuNgan/icLocation.png";
import IcGroup from "assets/images/template/icGroup.png";
import { useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import { Tooltip } from "antd";
const NhaThuoc = (props) => {
  const history = useHistory();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refSettings = useRef(null);

  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();
  const refModalChonToaNha = useRef(stringUtils.guid());

  const listNhaTheoTaiKhoan = useStore("toaNha.listNhaTheoTaiKhoan", []);
  const auth = useStore("auth.auth", {});

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            history.push("/nha-thuoc/them-moi");
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_THUOC_NHA_TAM_UNG",
        "",
        null,
        false
      );
      if (!nhaTamUng) {
        if (auth?.dsToaNha?.length === 1) {
          cacheUtils.save(
            "DATA_NHA_THUOC_NHA_TAM_UNG",
            "",
            auth?.dsToaNha[0]?.id,
            false
          );
          setState({ nhaTamUng: auth?.dsToaNha[0]?.id });
        } else {
          refModalChonToaNha.current &&
            refModalChonToaNha.current.show({}, (e) => {
              setState({ nhaTamUng: e });
              cacheUtils.save("DATA_NHA_THUOC_NHA_TAM_UNG", "", e, false);
            });
        }
      } else {
        setState({ nhaTamUng });
      }
    }
    fetchData();
  }, [auth?.dsToaNha]);

  const onChangeSelect = (e) => {
    cacheUtils.save("DATA_NHA_THUOC_NHA_TAM_UNG", "", e, false);
    setState({ nhaTamUng: e });
  };

  const onSettings = () => {
    refSettings && refSettings.current.onSettings();
  };
  return (
    <MainPage
      title={
        <>
          Danh sách đơn thuốc
          <Tooltip title="Sắp xếp cột trong bảng">
            <img
              src={IcGroup}
              alt="..."
              onClick={onSettings}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </>
      }
      breadcrumb={[
        { title: "Nhà thuốc", link: "/quan-ly-nha-thuoc" },
        { title: "Đơn thuốc", link: "/nha-thuoc" },
      ]}
      titleRight={
        <Button
          className="btn_new"
          type={"success"}
          onClick={() => {
            history.push("/nha-thuoc/them-moi");
          }}
          iconHeight={20}
          rightIcon={<img src={IcCreate} alt="..." />}
        >
          Thêm mới [F1]
        </Button>
      }
      rightBreadcrumbContent={
        <div className="boLoc">
          <img src={IcLocation} alt={IcLocation} />
          <Select
            data={listNhaTheoTaiKhoan}
            onChange={onChangeSelect}
            value={state?.nhaTamUng}
          />
        </div>
      }
    >
      <Main>
        <TimKiemDonThuoc layerId={refLayerHotKey.current} />
        <DanhSachDonThuoc ref={refSettings} layerId={refLayerHotKey.current} />
        <ModalChonToaNha ref={refModalChonToaNha} />
      </Main>
    </MainPage>
  );
};

export default NhaThuoc;
