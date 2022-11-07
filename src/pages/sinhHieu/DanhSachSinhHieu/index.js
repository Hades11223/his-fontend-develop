import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DanhSach from "./DanhSach";
import { MainPage, Main } from "./styled";
import TimKiem from "./TimKiem";
import IconEdit from "assets/images/noiTru/icEdit.png";
import cacheUtils from "utils/cache-utils";
import { useStore } from "hook";
import { useDispatch } from "react-redux";
import ModalKhoaLamViec from "pages/phauThuatThuThuat/DanhSachNguoiBenh/ModalKhoaLamViec";

const DanhSachSinhHieu = ({}) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);

  const {
    // danhSachNguoiBenhNoiTru: { onChangeInputSearch },
    khoa: { getKhoaTheoTaiKhoan },
  } = useDispatch();
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refKhoaLamViec = useRef();

  useEffect(() => {
    getKhoaTheoTaiKhoan({
      // active: true,
      dsTinhChatKhoa: 60,
    });
  }, []);

  async function fetchData() {
    let khoaNbId = (listKhoaTheoTaiKhoan || []).map((item) => item?.id);
    let khoaLamViec = await cacheUtils.read(
      "DATA_KHOA_LAM_VIEC",
      "",
      null,
      false
    );
    if (!khoaLamViec) {
      if (listKhoaTheoTaiKhoan.length > 1) {
        refKhoaLamViec.current &&
          refKhoaLamViec.current.show({}, (data) => {
            cacheUtils.save("DATA_KHOA_LAM_VIEC", "", data, false);
            setState({ khoaLamViec: data });
            // onChangeInputSearch({
            //   dsKhoaNbId: data?.id,
            //   dsTrangThai:
            //     dataSearch?.dsTrangThai === undefined
            //       ? dsTrangThaiMacDinh
            //       : dataSearch?.dsTrangThai,
            //   trangThaiTaiKhoa: 10,
            // });
          });
      } else {
        cacheUtils.save(
          "DATA_KHOA_LAM_VIEC",
          "",
          listKhoaTheoTaiKhoan[0],
          false
        );
        khoaNbId = listKhoaTheoTaiKhoan[0]?.id;
      }
    } else {
      setState({ khoaLamViec });
      khoaNbId = khoaLamViec?.id;
    }
    // onChangeInputSearch({
    //   dsKhoaNbId: khoaNbId,
    //   dsTrangThai:
    //     dataSearch?.dsTrangThai === undefined
    //       ? dsTrangThaiMacDinh
    //       : dataSearch?.dsTrangThai,
    //   trangThaiTaiKhoa: 10,
    // });
  }

  useEffect(() => {
    fetchData();
  }, [listKhoaTheoTaiKhoan]);

  const onShowKhoaLamViec = () => {
    refKhoaLamViec.current &&
      refKhoaLamViec.current.show(state?.khoaLamViec, (data) => {
        cacheUtils.save("DATA_KHOA_LAM_VIEC", "", data, false);
        setState({ khoaLamViec: data });
        // onChangeInputSearch({
        //   dsKhoaNbId: data
        //     ? data?.id
        //     : (listKhoaTheoTaiKhoan || []).map((item) => item?.id),
        // });
      });
  };

  return (
    <MainPage
      breadcrumb={[
        {
          link: "/quan-ly-sinh-hieu",
          title: "Quản lý sinh hiệu",
        },
        {
          link: "/sinh-hieu/ds-sinh-hieu",
          title: "Danh sách sinh hiệu",
        },
      ]}
      title={
        <div className="title">
          <label>Danh sách sinh hiệu</label>
          <div className="khoaLamViec">
            <span>{state?.khoaLamViec?.ten}</span>
            <img src={IconEdit} alt="" onClick={onShowKhoaLamViec} />
          </div>
        </div>
      }
    >
      <Main>
        <TimKiem />
        <DanhSach khoaLamViec={state.khoaLamViec} />
      </Main>
      <ModalKhoaLamViec ref={refKhoaLamViec} />
    </MainPage>
  );
};

export default DanhSachSinhHieu;
