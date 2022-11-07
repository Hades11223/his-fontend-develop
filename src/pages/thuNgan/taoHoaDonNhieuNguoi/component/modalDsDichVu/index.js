import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Main } from "./styled";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { HeaderSearch, TableWrapper } from "components";
import { useTranslation } from "react-i18next";

const ModalDsDichVu = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
    dsDichVu: [],
    test: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const dispatch = useDispatch();
  const { getDsDichVuDefault } = dispatch.dsHoaDonDienTu;
  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        data,
        dataSortColumn: {},
        dataSearch: {},
      });
    },
  }));
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  const onClickSort = (key, value) => {
    let data = [...state.dsDichVu];
    if (key === "tenDichVu") {
      data = data.sort((a, b) => {
        if (value == 1) {
          return a.tenDichVu.localeCompare(b.tenDichVu);
        } else {
          return b.tenDichVu.localeCompare(a.tenDichVu);
        }
      });
    } else {
      data = data.sort((a, b) => {
        if (value == 1) {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      });
    }

    const sort = { [key]: value };
    setState({
      dataSortColumn: sort,
      dsDichVu: data,
    });
  };

  const onSearch = () => {
    getDsDichVuDefault({
      nbDotDieuTriId: state?.data?.nbDotDieuTriId,
      phieuThuId: state?.data.id,
    }).then((s) => {
      const tongTien = s.data.reduce((a, b) => {
        return (a += b?.thanhTien);
      }, 0);
      setState({
        allDsDichVu: s.data,
        dsDichVu: s.data,
        totalElements: s.totalElements,
        tongTien,
        selectedRowKeys: s.data.map((item, index) => index + 1),
      });
    });
  };
  useEffect(() => {
    if (state?.data?.nbDotDieuTriId) {
      onSearch({});
    }
  }, [state.data]);
  const onSelectChange = (selectedRowKeys, selectedRows) => {};
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };
  const onSearchInput = (e) => {
    const textSearch = (e.target.value || "").toLowerCase().createUniqueText();
    const newData = state.allDsDichVu.filter((item) =>
      item.tenDichVu.toLowerCase().createUniqueText().includes(textSearch)
    );
    setState({
      dsDichVu: newData,
    });
  };
  const columnsGroup = [
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.tenDichVu || 0}
          search={<Input placeholder={t("common.timKiem")} onChange={onSearchInput} />}
        />
      ),
      width: 300,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soLuong")}
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.soLuong || 0}
        />
      ),
      width: 150,
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },

    {
      title: (
        <HeaderSearch
          title={t("common.thanhTien")}
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.thanhTien || 0}
        />
      ),
      width: 150,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (text) => text?.formatPrice(),
    },
  ];
  return (
    <Main
      title={
        <>
          <div>{t("thuNgan.danhSachDichVuCuaPhieuThu")}</div>
          <div>
            <span>{state?.data?.tenNb}</span>-
            <span className="fNormal">
              {state?.data?.gioiTinh == 1 ? t("common.nam") : t("common.nu")}
            </span>
            <span className="fNormal">-{state?.data?.tuoi} {t("common.tuoi")}</span>
          </div>
        </>
      }
      centered
      visible={state.show}
      footer={null}
      onCancel={() => {
        setState({
          show: false,
        });
      }}
      closable={false}
      width={1000}
    >
      <div className="header">
        <span>
          <span>{t("thuNgan.soPhieuThu")} : </span>
          <span className="bold">{state?.data?.soPhieu}</span>
        </span>
        <span>
          <span style={{ marginRight: "20px" }}>
            <span>{t("thuNgan.soLuongDichVu")} : </span>
            <span className="bold">{state?.totalElements}</span>
          </span>
          <span>
            <span>{t("common.tongTien")} : </span>
            <span className="bold">{state?.tongTien?.formatPrice()}</span>
          </span>
        </span>
      </div>
      <div className="body">
        <TableWrapper
          rowSelection={rowSelection}
          columns={columnsGroup}
          dataSource={state?.dsDichVu || []}
          scroll={{ x: 200 }}
        />
      </div>
      <div className="footer">
        <p className="button-cancel" onClick={handleCancel}>
          <ArrowLeftOutlined /> {t("common.quayLai")}
        </p>
        <Button className="button-ok" onClick={handleCancel}>
          {t("common.xacNhan")}
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/save.png")}
            alt=""
          ></img>
        </Button>
      </div>
    </Main>
  );
};

export default React.memo(forwardRef(ModalDsDichVu));
