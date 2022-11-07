import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, message, Tooltip } from "antd";
import { Main } from "./styled";
import { Button, HeaderSearch, ModalTemplate, TableWrapper } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { firstLetterWordUpperCase } from "utils";
import { useDispatch, useSelector } from "react-redux";

const { Column } = TableWrapper;

const ModalThemDichVuVaoGoi = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallBack = useRef(null);

  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});

  const { getDsDvNgoaiGoi, updateDichVuNbGoiPTTT, getChiTietDvTrongGoi } =
    useDispatch().chiDinhGoiPTTT;
  const { dsDvNgoaiGoi } = useSelector((state) => state.chiDinhGoiPTTT);

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: ({ nbGoiPtTtId, thoiGianThucHien }, callback) => {
      setState({ show: true, nbGoiPtTtId });

      refCallBack.current = callback;

      getChiTietDvTrongGoi({
        nbDotDieuTriId: infoPatient?.id,
        nbGoiPtTtId,
        sort: "thoiGianThucHien,asc",
      }).then((res) => {
        const dsDvPtTt = (res?.data || []).filter((x) => x.loaiDichVu == 40);
        let firstDay;
        if (dsDvPtTt && dsDvPtTt.length > 0) {
          firstDay = dsDvPtTt[0].thoiGianThucHien;
        } else {
          firstDay = thoiGianThucHien;
        }

        getDsDvNgoaiGoi({
          page: 0,
          size: 500,
          goiPtTt: false,
          nbDotDieuTriId: infoPatient?.id,
          tuThoiGianThucHien: moment(firstDay).format("YYYY-MM-DD HH:mm:ss"),
          denThoiGianThucHien: moment(firstDay)
            .add("days", 10)
            .format("YYYY-MM-DD HH:mm:ss"),
        });
      });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const gioiTinh =
    (listgioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};

  const onCancel = () => {
    setState({ show: false, selectedRowKeys: [], isCheckedAll: false });
  };
  const onSubmit = () => {
    if (!state.selectedRowKeys || state.selectedRowKeys.length == 0) {
      message.error("Vui lòng chọn dịch vụ");
      return;
    }

    updateDichVuNbGoiPTTT(
      state.selectedRowKeys.map((item) => ({
        id: item,
        nbGoiPtTtId: state.nbGoiPtTtId,
      }))
    ).then(() => {
      refCallBack.current && refCallBack.current();

      onCancel();
    });
  };

  let tuoi =
    infoPatient?.thangTuoi > 36 || infoPatient?.tuoi
      ? `${infoPatient?.tuoi} ${t("common.tuoi")}`
      : `${infoPatient?.thangTuoi} ${t("common.thang")}`;

  const columns = [
    Column({
      title: "Tên dịch vụ",
      width: "300px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "quanLyNoiTru.goiPttt.tenGoiPtTt",
    }),
    Column({
      title: "Thời gian thực hiện",
      width: "160px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "common.thoiGianThucHien",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("common.soLuong"),
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      i18Name: "common.soLuong",
    }),
    Column({
      title: "Khoa chỉ định",
      width: "200px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      i18Name: "common.khoaChiDinhId",
    }),
    Column({
      title: "Thời gian y lệnh",
      width: "160px",
      dataIndex: "thoiGianYLenh",
      key: "thoiGianYLenh",
      i18Name: "common.thoiGianYLenh",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
  ];

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? dsDvNgoaiGoi.map((x) => x.id) : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if (dsDvNgoaiGoi.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
      });
    }
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  return (
    <ModalTemplate
      width={"95%"}
      ref={refModal}
      zIndex={1001}
      title={"Chuyển DV ngoài gói vào trong gói"}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(infoPatient?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {tuoi && <span className="normal-weight">- {tuoi}</span>}
        </>
      }
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <TableWrapper
          columns={columns}
          dataSource={(dsDvNgoaiGoi || []).map((item, idx) => ({
            ...item,
            index: idx + 1,
          }))}
          rowKey={(record) => record.id}
          styleWrap={{ height: 300 }}
          rowSelection={rowSelection}
        />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThemDichVuVaoGoi);
