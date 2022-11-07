import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main, GlobalStyle } from "./styled";
import { Button, AuthWrapper, DatePicker } from "components";
import moment from "moment";
import { ROLES } from "constants/index";
import IconList from "assets/images/thuNgan/icList.svg";
import { TIME_FORMAT } from "../configs";
import locale from "antd/es/date-picker/locale/de_DE";
import fileUtils from "utils/file-utils";
import { useTranslation } from "react-i18next";
import { message, Popover } from "antd";
import { useLoading } from "hook";
import IcFilter from "assets/images/kho/icFilter.png";
import { useQueryString } from "hook";
import { setQueryStringValue } from "hook/useQueryString/queryString";

const PhieuThuHeader = ({ layerId }) => {
  const [tuThoiGianThanhToan] = useQueryString("tuThoiGianThanhToan", null);
  const [denThoiGianThanhToan] = useQueryString("denThoiGianThanhToan", null);
  const [tuThoiGianVaoVien] = useQueryString("tuThoiGianVaoVien", null);
  const [denThoiGianVaoVien] = useQueryString("denThoiGianVaoVien", null);
  const { t } = useTranslation();
  const refDatePicker = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const { chuaThanhToan, daThanhToan, tongSo, dataSearch } = useSelector(
    (state) => state.danhSachPhieuThu
  );

  const {
    danhSachPhieuThu: { onChangeInputSearch, getStatistical, exportExcel },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [timePayment, setTimePayment] = useState({
    tuThoiGianThanhToan: tuThoiGianThanhToan
      ? moment(tuThoiGianThanhToan.toDateObject())
      : null,
    denThoiGianThanhToan: denThoiGianThanhToan
      ? moment(denThoiGianThanhToan.toDateObject())
      : null,
    tuThoiGianVaoVien: tuThoiGianVaoVien
      ? moment(tuThoiGianVaoVien.toDateObject())
      : moment().startOf("day"),
    denThoiGianVaoVien: denThoiGianVaoVien
      ? moment(denThoiGianVaoVien.toDateObject())
      : moment().endOf("day"),
  });
  
  //effect
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 9, //Tab
          onEvent: () => {
            refDatePicker.current && refDatePicker.current.focus();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (fileUrl) {
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(fileUrl) })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", `${fileUrl}`); //or any other extension
          document.body.appendChild(link);

          link.click();
        });
    }
  }, [fileUrl]);

  useEffect(() => {
    getStatistical(dataSearch);
  }, [dataSearch]);

  const handleChangeDate = (key) => (date) => {
    setQueryStringValue(key, date);
    setTimePayment({ ...timePayment, [key]: date });
    onChangeInputSearch({
      [key]: date ? moment(date).format("YYYY-MM-DDTHH:mm:ss") : "",
    });
  };

  const handleStartDate = (time) => {
    return moment(time) > moment();
  };

  const handleEndDate = (key) => (time) => {
    if (key === "denThoiGianThanhToan") {
      return moment(time) < moment(timePayment.tuThoiGianThanhToan);
    } else {
      return moment(time) < moment(timePayment.tuThoiGianVaoVien);
    }
  };

  function onClickXuatDS() {
    showLoading();

    exportExcel(dataSearch)
      .then((data) => {
        if (data.file.doc) {
          setFileUrl(data.file?.doc);
        }
      })
      .catch((e) => {
        message.error(e?.message);
      })
      .finally(() => {
        hideLoading();
      });
  }
  const group = (
    <>
      <div className="filter">
        <div className="title">{t("thuNgan.ngayThanhToan")}</div>
        <div>
          <DatePicker
            ref={refDatePicker}
            format={TIME_FORMAT}
            disabledDate={handleStartDate}
            placeholder={t("common.tuNgay")}
            value={timePayment.tuThoiGianThanhToan}
            showTime={{ defaultValue: moment().startOf("day") }}
            onChange={handleChangeDate("tuThoiGianThanhToan")}
            locale={{
              ...locale,
              lang: {
                ...locale.lang,
                now: t("common.hienTai"),
              },
            }}
          />
          <span className="spread">-</span>
          <DatePicker
            format={TIME_FORMAT}
            placeholder={t("common.denNgay")}
            disabledDate={handleEndDate("denThoiGianThanhToan")}
            showTime={{ defaultValue: moment().endOf("day") }}
            value={timePayment.denThoiGianThanhToan}
            onChange={handleChangeDate("denThoiGianThanhToan")}
            locale={{
              ...locale,
              lang: {
                ...locale.lang,
                now: t("common.hienTai"),
              },
            }}
          />{" "}
        </div>
      </div>
      <div className="filter" style={{ paddingTop: "20px" }}>
        <div className="title"> {t("thuNgan.ngayDangKy")} </div>
        <div>
          <DatePicker
            ref={refDatePicker}
            format={TIME_FORMAT}
            disabledDate={handleStartDate}
            placeholder={t("common.tuNgay")}
            value={timePayment.tuThoiGianVaoVien}
            showTime={{ defaultValue: moment().startOf("day") }}
            onChange={handleChangeDate("tuThoiGianVaoVien")}
            locale={{
              ...locale,
              lang: {
                ...locale.lang,
                now: t("common.hienTai"),
              },
            }}
          />
          <span className="spread">-</span>
          <DatePicker
            format={TIME_FORMAT}
            placeholder={t("common.denNgay")}
            disabledDate={handleEndDate("denThoiGianVaoVien")}
            showTime={{ defaultValue: moment().endOf("day") }}
            value={timePayment.denThoiGianVaoVien}
            onChange={handleChangeDate("denThoiGianVaoVien")}
            locale={{
              ...locale,
              lang: {
                ...locale.lang,
                now: t("common.hienTai"),
              },
            }}
          />
        </div>
      </div>
    </>
  );

  return (
    <Main>
      <GlobalStyle />
      <div className="left">
        <Popover
          trigger="click"
          content={group}
          placement="bottomLeft"
          overlayClassName="popover-thungan"
        >
          <Button
            className="filter"
            leftIcon={<img src={IcFilter} alt="..." />}
            iconHeight={15}
          >
            <span> {t("thuNgan.locPhieuThu")}</span>
          </Button>
        </Popover>
      </div>
      <div className="right">
        <span>
          {t("thuNgan.tongPhieuThu")}:{" "}
          <span className="bold">{tongSo || 0}</span>
        </span>
        <span>
          {t("thuNgan.chuaThanhToan")}:{" "}
          <span className="bold">{chuaThanhToan || 0}</span>
        </span>
        <span>
          {t("thuNgan.daThanhToan")}:{" "}
          <span className="bold">{daThanhToan || 0}</span>
        </span>
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]}>
          <Button
            rightIcon={<IconList />}
            iconHeight={15}
            type="primary"
            onClick={onClickXuatDS}
          >
            {t("thuNgan.xuatDS")}
          </Button>
        </AuthWrapper>
      </div>
    </Main>
  );
};

export default PhieuThuHeader;
