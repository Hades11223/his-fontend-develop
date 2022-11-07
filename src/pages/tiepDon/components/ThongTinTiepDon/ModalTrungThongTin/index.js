import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { ModalTemplate, Button, TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { Input, Radio } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";

const ModalTrungThongTin = ({ ...props }, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const {
    tiepDon: { kiemTraThanhToan },
  } = useDispatch();
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    data,
    checked,
    maNb,
    soDienThoai,
    tenNb,
    sdtNguoiBaoLanh,
    maSoGiayToTuyThan,
    diaChi,
    clearTimeOutAffterRequest,
    dataIndex,
  } = state;
  // console.log('dataIndex: ', dataIndex);
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      let dataCheck = item?.data?.map((option) => {
        return {
          ...option,
          // diaChi: `${option?.soNha ? `${option?.soNha}, `
          //   : ''}${option?.xaPhuong ? `${option?.xaPhuong}, `
          //     : ""}${option?.quanHuyen ? `${option?.quanHuyen}, `
          //       : ''}${option?.tinhThanhPho ? option?.tinhThanhPho : ''}`
        };
      });
      setState({
        data: [...dataCheck],
        dataIndex: [...dataCheck],
        show: item.show,
        checked: "",
        dataBVE: item?.dataBVE,
      });
      refCallback.current = callback;
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const onSearch = (value, variables) => {
    setState({ [`${variables}`]: value });
    let soDienThoaiSearch =
      variables === "soDienThoai" ? value : soDienThoai ? soDienThoai : "";
    let maNbSearch = variables === "maNb" ? value : maNb ? maNb : "";
    let tenNbSearch = variables === "tenNb" ? value : tenNb ? tenNb : "";
    let sdtNguoiBaoLanhSearch =
      variables === "sdtNguoiBaoLanh"
        ? value
        : sdtNguoiBaoLanh
        ? sdtNguoiBaoLanh
        : "";
    let maSoGiayToTuyThanSearch =
      variables === "maSoGiayToTuyThan"
        ? value
        : maSoGiayToTuyThan
        ? maSoGiayToTuyThan
        : "";
    let diaChiSearch = variables === "diaChi" ? value : diaChi ? diaChi : "";
    if (clearTimeOutAffterRequest) {
      try {
        clearTimeout(clearTimeOutAffterRequest);
      } catch (error) {}
    }
    let timer = setTimeout(() => {
      let dataSearchText = (data || []).filter((item) => {
        return (
          (item.soDienThoai || "").indexOf(soDienThoaiSearch) !== -1 &&
          (item.maNb || "").indexOf(maNbSearch) !== -1 &&
          (item.tenNb || "")
            .toLocaleLowerCase()
            .unsignText()
            .indexOf(tenNbSearch?.toLocaleLowerCase().unsignText()) !== -1 &&
          (item.sdtNguoiBaoLanh || "").indexOf(sdtNguoiBaoLanhSearch) !== -1 &&
          (item.maSoGiayToTuyThan || "").indexOf(maSoGiayToTuyThanSearch) !==
            -1 &&
          (item.diaChi || "")
            .toLocaleLowerCase()
            .unsignText()
            .indexOf(diaChiSearch?.toLocaleLowerCase().unsignText()) !== -1
        );
      });
      setState({ dataIndex: dataSearchText });
    }, 300);
    setState({ clearTimeOutAffterRequest: timer });
  };
  const onBack = (data, code) => {
    setState({
      show: false,
      data: {},
    });
    if (refCallback.current) refCallback.current(data, code);
  };

  const onClickRow = (value) => {
    setState({ checked: value?.id?.toString() });
    onThanhToan(value?.maNb)();
  };
  const onThanhToan = (value) => () => {
    kiemTraThanhToan(
      {
        maNb: value,
        nguonNbId: state?.dataBVE?.nbNguonNb?.nguonNbId,
        doiTuong: state?.dataBVE?.doiTuong,
        capCuu: state?.dataBVE?.capCuu,
      },
      state?.dataBVE
    ).then((s) => {
      if (s?.code === 0) {
        onBack(s);
      } else if (
        s?.code === 7921 ||
        s?.code === 7922 ||
        s?.code === 7923 ||
        s?.code === 7924 ||
        s?.code === 7968
      ) {
        refConfirm.current.show(
          {
            title: t("common.thongBao"),
            content: s?.message,
            okText: t("common.dongY"),
            showImg: false,
            showBtnOk: true,
            showBtnCancel: false,
            typeModal: "warning",
          },
          () => {
            onBack(s);
          }
        );
      } else if (s?.code === 7920 || s?.code === 7925) {
        refConfirm.current &&
          refConfirm.current.show(
            {
              title: t("common.thongBao"),
              content: s?.message,
              cancelText: t("common.huy"),
              okText: t("common.dongY"),
              showImg: false,
              showBtnOk: true,
              showBtnCancel: true,
              typeModal: "warning",
            },
            () => {
              onBack(s, true);
            },
            () => {
              onBack(s);
            }
          );
      }
    });
  };
  return (
    <ModalTemplate
      ref={refModal}
      title={t("tiepDon.danhSachNguoiBenhTrungThongTinHanhChinh")}
      onCancel={onCancel}
      width={1260}
    >
      <Main>
        <TableWrapper
          columns={[
            {
              title: <HeaderSearch title="" />,
              width: "50px",
              dataIndex: "action",
              key: "action",
              align: "center",
              fixed: "left",
              render: (item, list) => {
                return (
                  <>
                    <Radio
                      value={list?.id}
                      checked={checked === list?.id?.toString()}
                      onClick={(e) => {
                        setState({
                          checked: e.target.value,
                          maNb: list?.maNb,
                        });
                      }}
                    />
                  </>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={t("common.sdt")}
                  search={
                    <Input
                      placeholder={t("tiepDon.timSDT")}
                      onChange={(e) => onSearch(e.target.value, "soDienThoai")}
                      value={soDienThoai}
                    />
                  }
                />
              ),
              width: "120px",
              dataIndex: "soDienThoai",
              key: "soDienThoai",
            },
            {
              title: (
                <HeaderSearch
                  title={t("common.maNb")}
                  search={
                    <Input
                      placeholder={t("tiepDon.timMaNb")}
                      onChange={(e) => onSearch(e.target.value, "maNb")}
                      value={maNb}
                    />
                  }
                />
              ),
              width: "120px",
              dataIndex: "maNb",
              key: "maNb",
            },
            {
              title: (
                <HeaderSearch
                  title={t("tiepDon.tenNb")}
                  search={
                    <Input
                      placeholder={t("tiepDon.timTenNb")}
                      onChange={(e) => onSearch(e.target.value, "tenNb")}
                      value={tenNb}
                    />
                  }
                />
              ),
              width: "180px",
              dataIndex: "tenNb",
              key: "tenNb",
            },
            {
              title: (
                <HeaderSearch
                  title={t("common.sdtNguoiBaoLanh")}
                  search={
                    <Input
                      placeholder={t("tiepDon.timSdtNguoiBaoLanh")}
                      onChange={(e) =>
                        onSearch(e.target.value, "sdtNguoiBaoLanh")
                      }
                      value={sdtNguoiBaoLanh}
                    />
                  }
                />
              ),
              width: "120px",
              dataIndex: "sdtNguoiBaoLanh",
              key: "sdtNguoiBaoLanh",
            },
            {
              title: (
                <HeaderSearch
                  title={t("tiepDon.cmtHc")}
                  search={
                    <Input
                      placeholder={t("tiepDon.timCmtHc")}
                      onChange={(e) =>
                        onSearch(e.target.value, "maSoGiayToTuyThan")
                      }
                      value={maSoGiayToTuyThan}
                    />
                  }
                />
              ),
              width: "100px",
              dataIndex: "maSoGiayToTuyThan",
              key: "maSoGiayToTuyThan",
            },
            {
              title: (
                <HeaderSearch
                  title={t("common.diaChi")}
                  search={
                    <Input
                      placeholder={t("tiepDon.timDiaChi")}
                      onChange={(e) => onSearch(e.target.value, "diaChi")}
                      value={diaChi}
                    />
                  }
                />
              ),
              width: "250px",
              dataIndex: "diaChi",
              key: "diaChi",
            },
            {
              title: (
                <HeaderSearch title={t("tiepDon.thoiGianChuaBenhGanNhat")} />
              ),
              width: "180px",
              dataIndex: "thoiGianVaoVien",
              key: "thoiGianVaoVien",
              render: (item) => {
                return (
                  <div>
                    {item && moment(item).format("DD/MM/YYYY HH:mm:ss")}
                  </div>
                );
              },
            },
            {
              title: <HeaderSearch title={t("common.khoa")} />,
              width: "200px",
              dataIndex: "tenKhoa",
              key: "tenKhoa",
            },
            {
              title: <HeaderSearch title={t("common.chuyenKhoa")} />,
              width: "120px",
              dataIndex: "tenChuyenKhoa",
              key: "tenChuyenKhoa",
            },
          ]}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                onClickRow(record);
              },
            };
          }}
          dataSource={dataIndex}
          // scroll={{ y: 400, x: 700 }}
        ></TableWrapper>
        <div className="footer-action">
          <Button type="default" onClick={() => onBack()} minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button type="primary" onClick={onThanhToan(maNb)} minWidth={100}>
            {t("common.xacNhan")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrungThongTin);
