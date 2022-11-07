import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main, BlankContentWrapper } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import {
  Select,
  Button,
  InputTimeout,
  TableWrapper,
  Pagination,
  ModalTemplate,
} from "components";
import { message } from "antd";
import { refConfirm } from "app";
import { LOAI_DICH_VU } from "constants/index";
import { RightOutlined } from "@ant-design/icons";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Checkbox } from "antd";
import { useStore } from "hook";
import moment from "moment";

const now = moment().format("DDMMYY");

export const ModalThemMoiGoi = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refIsSubmit = useRef(null);
  const refOption = useRef({});
  const refInput = useRef(null);
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const [state, _setState] = useState({
    show: false,
    tenGoiDv: "",
    listSelectedDv: [],
    listDichVu: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { listGoiDv, listDvKham, page, size, totalElements } = useSelector(
    (state) => state.chiDinhDvGoi
  );

  const dsDichVuChiDinhKham = useStore("chiDinhDvGoi.dsDichVuChiDinhKham", []);
  const dsDichVuChiDinhXN = useStore("chiDinhDvGoi.dsDichVuChiDinhXN", []);
  const dsDichVuChiDinhCls = useStore("chiDinhDvGoi.dsDichVuChiDinhCls", []);
  const dsDichVuNgoaiDieuTri = useStore(
    "chiDinhDvGoi.dsDichVuNgoaiDieuTri",
    []
  );
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);

  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    chiDinhDvGoi: {
      updateData,
      onSearchDichVu,
      onSearchGoiDichVu,
      tamTinhTien,
      onThemMoiGoi,
      onThemDvVaoGoi,
    },
    dichVuTrongGoi: { themDvVaoGoi },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (
      {
        loaiDichVu,
        dsLoaiDichVu = [
          LOAI_DICH_VU.KHAM,
          LOAI_DICH_VU.XET_NGHIEM,
          LOAI_DICH_VU.CDHA,
          LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
        ],
        dsDoiTuongSuDung,
        nbThongTinId,
        nbDotDieuTriId,
        khoaChiDinhId,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu = LOAI_DICH_VU.KHAM, //MẶC ĐỊNH LÀ KHÁM BỆNH
        listLoaiChiDinhDV = [],
        currentItem,
        maNb,
        tenNb,
      },
      callBack
    ) => {
      setState({
        show: true,
        keyword: "",
        tenGoiDv:
          "Gói dịch vụ" +
          (maNb ? ` ${maNb}` : "") +
          (tenNb ? ` ${tenNb}` : "") +
          ` ${now}`,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        listLoaiChiDinhDV,
        currentItem,
      });
      refOption.current = {
        dsLoaiDichVu: dsLoaiDichVu.join(","),
        nbDotDieuTriId,
        dsDoiTuongSuDung,
        khoaChiDinhId,
        nbThongTinId,
        listLoaiChiDinhDV,
      };
      refIsSubmit.current = false;

      onSelectServiceType(loaiDichVu);
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
      });

      refCallback.current = callBack;
    },
  }));

  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
    if (state.show) {
      refModal.current && refModal.current.show({});
      setTimeout(() => {
        refInput.current.focus();
      }, 1000);
    } else {
      refModal.current && refModal.current.hide({});
    }
  }, [state.show]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    const listDichVu = (listDvKham || []).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id || "dv"}-${item.dichVuId}`,
    }));
    setState({
      listDichVu,
    });
  }, [listDvKham]);
  const onTamTinhTien = (listSelectedDv) => {
    const payload = listSelectedDv.map((item) => ({
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item.ten,
          ma: item.ma,
        },
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong || 1,
        loaiDichVu: item?.loaiDichVu,
        khoaChiDinhId: refOption.current.khoaChiDinhId,
        nbGoiDvId: item?.nbGoiDvId || undefined,
      },
      nbDvKyThuat: {
        phongId: item.phongId,
      },
      boChiDinhId: item.boChiDinhId || undefined,
    }));

    tamTinhTien({
      khoaChiDinhId: refOption.current.khoaChiDinhId,
      chiDinhTuDichVuId: state.chiDinhTuDichVuId,
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
      dsDichVu: payload,
    }).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );
      setState({
        thanhTien: thanhTien,
        listSelectedDv: listSelectedDv,
        indeterminate:
          listSelectedDv.length &&
          listSelectedDv.length < state.listDichVu.length,
      });
    });
  };

  const onChangeSoLuong = (_uniqueKey, key) => {
    return (value) => {
      let _value = value;

      if (key == "mienGiamGoiDv") _value = value?.target?.checked;
      if (key == "phongId") _value = value;
      let _listSelectedDv = Object.assign([], listSelectedDv);
      const _findDvIndex = _listSelectedDv.findIndex(
        (x) => x.uniqueKey === _uniqueKey
      );
      if (_findDvIndex !== -1) {
        _listSelectedDv[_findDvIndex][key] = _value;
        setState({ listSelectedDv: _listSelectedDv });

        onTamTinhTien(_listSelectedDv);
      }
    };
  };

  const { listDichVu, listSelectedDv, thanhTien, keyword, loaiDichVu } = state;

  useEffect(() => {
    if (state.show) {
      onChangePage(1);
    } else {
      updateData({
        listDvKham: [],
      });
    }
  }, [state.show]);

  const onSelectServiceType = (value = "") => {
    updateData({
      listLoaiDichVu: value ? [value] : [],
    });

    setState({
      loaiDichVu: value,
      indeterminate: false,
      keyword: "",
      listDichVu: [],
      boChiDinhId: null,
    });

    if (value == LOAI_DICH_VU.GOI_DICH_VU) {
      onSearchGoiDichVu({
        page: 0,
        size: 500,
        ten: "",
        khoaChiDinhId: refOption.current.khoaChiDinhId,
        dsBacSiChiDinhId: nhanVienId,
        dsDoiTuongSuDung: refOption.current.dsDoiTuongSuDung,
        dsLoaiDichVu: refOption.current.dsLoaiDichVu,
      });
    } else {
      onSearchDichVu2({ page: 0, keyword: "", loaiDichVu: value });
    }
  };

  const onSubmit = async () => {
    try {
      if (refIsSubmit.current) return; //nếu đang submit thì bỏ qua

      const { listSelectedDv, tenGoiDv } = state;
      if (
        state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU &&
        !listSelectedDv.every((x) => x.soLuong > 0)
      ) {
        message.error(t("khamBenh.vuiLongNhapSoLuongLon0"));
        return;
      }
      if (!listSelectedDv.length) {
        message.error(t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu"));
        return;
      }
      const _dsLoaiDichVu = listSelectedDv.map((x) => x.loaiDichVu);

      if (state.currentItem) {
        themDvVaoGoi({
          nbGoiDvId: state.currentItem.id,
          dsDv: (listSelectedDv || []).map((item) => ({
            dichVuId: item.dichVuId,
            soLuong: item.soLuong,
            soLuongMacDinh: 1,
            mienGiamGoiDv: item.mienGiamGoiDv,
            phongId: item?.phongId,
          })),
        }).then(() => {
          refCallback.current && refCallback.current(state.currentItem?.id);
          onCancel();
        });
      } else {
        //thêm mới danh mục gói
        onThemMoiGoi({
          phanTramGiamGia: null,
          tienGiamGia: null,
          ten: tenGoiDv,
          dsLoaiDichVu: [...new Set(_dsLoaiDichVu)],
        }).then((res) => {
          onThemDvVaoGoi(
            (listSelectedDv || []).map((item) => ({
              dichVuId: item.dichVuId,
              active: true,
              goiDvId: res?.id,
              soLuong: item.soLuong,
              tienGiamGia: null,
              soLuongMacDinh: 1,
              mienGiamGoiDv: item.mienGiamGoiDv,
              phongId: item?.phongId,
            }))
          ).then(() => {
            refCallback.current && refCallback.current(res?.id);
            onCancel();
          });
        });
      }

      setState({
        filterText: "",
      });
    } catch (error) {
      console.log("error", error);
      refIsSubmit.current = false;
    }
  };

  const onCancel = () => {
    setState({
      show: false,
      thanhTien: 0,
      listDichVu:
        state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU ? [] : state.listDichVu,
      indeterminate: false,
      listSelectedDv: [],
      filterText: "",
    });
    refModal.current && refModal.current.hide();
  };

  const onSearch = (keyword) => {
    setState({
      keyword: keyword,
    });
    if (state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU) {
      onSearchGoiDichVu({
        ten: keyword,
        page: 0,
        size: 500,
        khoaChiDinhId: refOption.current.khoaChiDinhId,
        dsBacSiChiDinhId: nhanVienId,
      });
    } else
      onSearchDichVu2({ keyword, page: 0, size, loaiDichVu: state.loaiDichVu });
  };

  const onSelectGoiDichVu = (item) => (e) => {
    setState({ activeLink: item.dichVuId });
    onSearchDichVu2({
      page: 0,
      size: 50,
      loaiDichVu: null,
      boChiDinhId: item.dichVuId,
    });
    e.preventDefault();
  };

  const listDichVuDaKe = useMemo(() => {
    return [
      ...dsDichVuChiDinhCls,
      ...dsDichVuChiDinhKham,
      ...dsDichVuChiDinhXN,
      ...dsDichVuNgoaiDieuTri,
    ];
  }, [
    dsDichVuChiDinhCls,
    dsDichVuChiDinhKham,
    dsDichVuChiDinhXN,
    dsDichVuNgoaiDieuTri,
  ]);

  const onSelectDichVu = (record) => (e) => {
    if (e.target.hasAttribute("type")) {
      const checked = e.target.checked;

      const { listSelectedDv } = state;
      let updatedListDv = [];
      if (checked) {
        updatedListDv = [
          {
            ...record,
            soLuong: record?.soLuongMacDinh || record.soLuong || 10,
            mienGiamGoiDv: true,
            phongId: record?.dsPhongThucHien[0]?.phongId,
          },
          ...listSelectedDv,
        ];

        //check và hiện thị cảnh báo nếu dịch vụ đã tồn tại
        const _searchIndex = (listSelectedDv || []).findIndex(
          (x) => x.dichVuId == record.dichVuId
        );
        if (_searchIndex != -1) {
          message.error(`Dịch vụ ${record.ten} đã tồn tại!`);
        }
      } else {
        updatedListDv = listSelectedDv.filter(
          (item) => item.uniqueKey !== record.uniqueKey
        );
      }

      if (listDichVuDaKe.length > 0 && checked) {
        //kiểm tra mở popup khi dịch vụ trùng
        let objDupplicate = listDichVuDaKe.find(
          (item1) => item1.dichVuId == record.dichVuId
        );
        if (objDupplicate) {
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.canhBao"),
                content: t("khamBenh.chiDinh.canhBaoKeTrung")
                  .replace("{0}", objDupplicate.tenDichVu)
                  .replace("{1}", objDupplicate.tenNb),
                cancelText: t("common.huy"),
                okText: t("common.xacNhan"),
                showImg: false,
                showBtnOk: true,
                typeModal: "warning",
              },
              () => {
                onTamTinhTien(updatedListDv);
              }
            );
          return false;
        }
      }
      onTamTinhTien(updatedListDv);
    } else {
      e.currentTarget.firstElementChild.firstElementChild.firstElementChild.firstElementChild.click();
    }
  };

  const checkAllDichVu = (e) => {
    const checked = e.target.checked;
    let updatedListDv = [];

    if (checked) {
      updatedListDv = [
        ...listDichVu
          .filter(
            (x1) =>
              listSelectedDv.findIndex((x2) => x1.dichVuId == x2.dichVuId) == -1
          )
          .map((x) => ({ ...x, soLuong: x.soLuong || 1 })),
        ...listSelectedDv,
      ];
    } else {
      updatedListDv = listSelectedDv.filter(
        (x1) => listDichVu.findIndex((x2) => x1.dichVuId == x2.dichVuId) == -1
      );
    }

    onTamTinhTien(updatedListDv);
  };

  useEffect(() => {
    if (state.loaiDichVu !== 150) {
      setState({ activeLink: -1 });
    }
  }, [state.loaiDichVu]);

  const onRemoveItem = (value) => () => {
    const listUpdatedTag = listSelectedDv.filter(
      (item) => item.uniqueKey !== value
    );

    setState({
      listSelectedDv: listUpdatedTag,
    });
    onTamTinhTien(listUpdatedTag);
  };

  const columnsDichVu = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={!(state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU)}
          title={
            state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU ? (
              <div style={{ marginLeft: 6, width: "100%", textAlign: "left" }}>
                {listDichVu && listDichVu.length > 0 && (
                  <Checkbox
                    onChange={checkAllDichVu}
                    checked={listDichVu.every(
                      (x1) =>
                        listSelectedDv.findIndex(
                          (x2) => x1.dichVuId == x2.dichVuId
                        ) != -1
                    )}
                  >
                    {t("common.chonTatCa")}
                  </Checkbox>
                )}
              </div>
            ) : (
              t("khamBenh.donThuoc.tenThuocHamLuong")
            )
          }
        />
      ),
      dataIndex: "",
      key: "",
      width: "100%",
      render: (value, currentRow, index) => {
        const giaKhongBaoHiem = (currentRow.giaKhongBaoHiem || 0).formatPrice();
        const donGia = `${giaKhongBaoHiem}`;
        return (
          <div className="row-item">
            <div className="left-box">
              <Checkbox
                checked={
                  !!listSelectedDv.find(
                    (item) => item.uniqueKey === currentRow.uniqueKey
                  )
                }
              />
            </div>

            <div className="right-box">
              <div className="name">
                <b>{currentRow?.ten}</b>
              </div>
              <div className="desc">{donGia}</div>
            </div>
          </div>
        );
      },
    },
  ];
  const columnsGoiDichVu = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
        />
      ),
      dataIndex: "",
      key: "",
      width: "100%",
      render: (value, currentRow, index) => {
        return (
          <div>
            {currentRow?.ten} <RightOutlined className="arrow-icon" />
          </div>
        );
      },
    },
  ];

  const columnsChooseDv = [
    {
      title: <HeaderSearch isTitleCenter={true} title={<Checkbox checked />} />,
      key: "key",
      width: 40,
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked onChange={onRemoveItem(list.uniqueKey)} />
      ),
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.stt")} />,
      dataIndex: "stt",
      key: "stt",
      width: 40,
      align: "center",
    },
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={t("common.tenDichVu")} />
      ),
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.soLuong")} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: 80,
      render: (item, list, index) => {
        const soLuong = item || 1;

        return (
          <div className="soluong" onClick={(event) => event.stopPropagation()}>
            <InputTimeout
              type="number"
              value={soLuong}
              style={{ width: 65 }}
              min={1}
              step={1}
              onChange={onChangeSoLuong(list.uniqueKey, "soLuong")}
            />
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("goiDichVu.phongThucHien")}
        />
      ),
      dataIndex: "phongId",
      key: "phongId",
      width: 150,
      render: (item, list, index) => {
        const dataPhongThucHien = (list?.dsPhongThucHien || []).map((item) => ({
          id: item?.phongId,
          ten: item?.ten,
        }));
        return (
          <div className="soluong" onClick={(event) => event.stopPropagation()}>
            <Select
              data={dataPhongThucHien}
              onChange={onChangeSoLuong(list.uniqueKey, "phongId")}
              value={item}
            />
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch title={"Thuộc miễn giảm cả gói"} isTitleCenter={true} />
      ),
      dataIndex: "mienGiamGoiDv",
      key: "mienGiamGoiDv",
      align: "center",
      width: "20%",
      render: (item, list, index) => {
        return (
          <div className="soluong" onClick={(event) => event.stopPropagation()}>
            <Checkbox
              defaultChecked={item}
              onChange={onChangeSoLuong(list.uniqueKey, "mienGiamGoiDv")}
            />
          </div>
        );
      },
    },
  ];

  const renderEmptyTextLeftTable = () => {
    return (
      <div style={{ marginTop: 130 }}>
        <div style={{ color: "#c3c3c3", fontSize: 14 }}>
          {t("common.khongCoDuLieuPhuHop")}
        </div>
      </div>
    );
  };
  const onChangePage = (page) => {
    onSearchDichVu2({
      page: page - 1,
      size,
      keyword,
      loaiDichVu: loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU ? null : loaiDichVu,
    });
  };
  const onSizeChange = (value) => {
    onSearchDichVu2({
      page: 0,
      size: value,
      keyword: keyword,
      loaiDichVu: loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU ? null : loaiDichVu,
    });
  };
  const onSearchDichVu2 = ({
    keyword,
    page = 0,
    size = 10,
    loaiDichVu,
    boChiDinhId,
  }) => {
    onSearchDichVu({
      ten: keyword,
      page: page || 0,
      size: size || 10,
      khoaChiDinhId: refOption.current.khoaChiDinhId,
      bacSiChiDinhId: nhanVienId,
      // boChiDinhId: state.boChiDinhSelected?.id,
      boChiDinhId: boChiDinhId,
      ...(loaiDichVu
        ? { loaiDichVu: loaiDichVu }
        : {
            dsLoaiDichVu: refOption.current.dsLoaiDichVu,
          }),
      dsDoiTuongSuDung: refOption.current.dsDoiTuongSuDung,
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={1447}
      layerId={refLayerHotKey.current}
      title={
        !state.currentItem ? "Thêm mới gói dịch vụ" : "Thêm dịch vụ vào gói"
      }
      onCancel={onCancel}
      actionRight={
        <>
          <Button
            minWidth={100}
            type="default"
            onClick={onCancel}
            iconHeight={15}
          >
            {t("common.huy")}
          </Button>
          <Button minWidth={100} type="primary" onClick={onSubmit}>
            {t("common.dongY")}
          </Button>
        </>
      }
    >
      <Main>
        {!state.currentItem && (
          <div className="name-box">
            <label>Tên gói: </label>
            <InputTimeout
              className="name-item"
              placeholder={"Nhập tên gói dịch vụ"}
              onChange={(e) => {
                setState({ tenGoiDv: e || "" });
              }}
              value={state.tenGoiDv}
            />
          </div>
        )}
        <div className="filter-box">
          <label>Thêm chỉ định: </label>
          <Select
            value={state.loaiDichVu}
            className="filter-item"
            data={state.listLoaiChiDinhDV}
            placeholder={t("khamBenh.chiDinh.chonLoaiDV")}
            onChange={onSelectServiceType}
          ></Select>
          <InputTimeout
            className="filter-item"
            ref={refInput}
            placeholder={t("khamBenh.chiDinh.chonDichVu")}
            onChange={onSearch}
            value={state.keyword}
          />
        </div>
        <div className="list-services">
          {state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU && (
            <div className="content-equal-w bundle-services">
              <div className="danh-sach-goi-dich-vu">
                <TableWrapper
                  rowKey={(record) => {
                    return record.ma;
                  }}
                  columns={columnsGoiDichVu}
                  dataSource={listGoiDv}
                  rowClassName={(record, index) => {
                    return `goi-dich-vu-item ${
                      record.dichVuId == state.activeLink
                        ? "selected-goi-dich-vu"
                        : ""
                    }`;
                  }}
                  showHeader={false}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: onSelectGoiDichVu(record),
                    };
                  }}
                  locale={{
                    emptyText: renderEmptyTextLeftTable(),
                  }}
                  scroll={{ y: 350 }}
                />
              </div>
            </div>
          )}
          <div className="content-equal-w">
            <div className="title-table">{t("common.dichVu")}</div>
            <div className="danh-sach-dich-vu">
              <TableWrapper
                rowKey={(record) => {
                  return record.id || record.dichVuId;
                }}
                columns={columnsDichVu}
                dataSource={listDichVu}
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? "table-row-even" : "table-row-odd";
                }}
                showHeader={
                  state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU &&
                  listDichVu &&
                  listDichVu.length > 0
                }
                headerMinHeight={"30px"}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: onSelectDichVu(record),
                  };
                }}
                locale={{
                  emptyText: renderEmptyTextLeftTable(),
                }}
                scroll={{ y: 350 }}
              />
              {!!listDichVu.length && (
                <Pagination
                  listData={listDichVu}
                  onChange={onChangePage}
                  current={page + 1}
                  pageSize={size}
                  total={totalElements}
                  onShowSizeChange={onSizeChange}
                  stylePagination={{ justifyContent: "flex-start" }}
                />
              )}
            </div>
          </div>
          <div className="content-equal-w">
            <div className="title">
              <div className="title__left">
                <img src={CircleCheck} alt="" /> {t("common.daChon")}
              </div>
              <div className="title__right">
                {t("khamBenh.chiDinh.tongTien")}:{" "}
                {(thanhTien || 0).formatPrice()} đ
              </div>
            </div>
            <div className="content-body">
              {!listSelectedDv.length || listSelectedDv.length === 0 ? (
                <BlankContentWrapper>
                  <div>{t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu")}</div>
                </BlankContentWrapper>
              ) : (
                <>
                  <TableWrapper
                    rowKey={(record) => {
                      return record.uniqueKey;
                    }}
                    columns={columnsChooseDv}
                    dataSource={(listSelectedDv || []).map((x, idx) => ({
                      ...x,
                      stt: idx + 1,
                    }))}
                    scroll={{ x: 450 }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Main>
    </ModalTemplate>
  );
});

export default ModalThemMoiGoi;
