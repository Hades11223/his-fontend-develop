import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Checkbox } from "antd";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import imgSearch from "assets/images/template/icSearch.png";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ModalTemplate,
  Pagination,
  InputTimeout,
  TableWrapper,
  Select,
} from "components";
const DichVuKyThuat = (props, ref) => {
  const { dataNb, listLoaiChiDinh, dsDoiTuongSuDung, dsLoaiDichVu } = props;
  const { t } = useTranslation();
  const refIsSubmit = useRef(null);
  const refInput = useRef(null);
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const [state, _setState] = useState({
    show: false,
    listSelectedDv: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    chiDinhKhamBenh: { onSearchDichVu },
    nbBienBanHoiChan: { tuVanDichVu },
  } = useDispatch();
  const { listDvKham, page, size, totalElements } = useSelector(
    (state) => state.chiDinhKhamBenh
  );
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);
  useImperativeHandle(ref, () => ({
    show: (listNguoiTuVan = [], callback) => {
      setState({
        show: true,
        keyword: "",
        listNguoiTuVan: listNguoiTuVan,
      });
      refIsSubmit.current = false;
      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show({});
      setTimeout(() => {
        refInput.current && refInput.current.focus();
      }, 1000);
    } else {
      refModal.current && refModal.current.hide({});
    }
  }, [state.show]);

  const onSelect = (listSelectedDv) => {
    setState({
      listSelectedDv: listSelectedDv,
      selectedRowKeys: (listSelectedDv || []).map((item) => item.dichVuId),
    });
  };

  const { listSelectedDv, keyword, loaiDichVu } = state;

  const onSelectServiceType = (value = "") => {
    setState({
      loaiDichVu: value,
      keyword: "",
    });
    onSearchDichVu2({ page, size, keyword: "", loaiDichVu: value });
  };
  const onSubmit = async () => {
    try {
      if (refIsSubmit.current) return; //nếu đang submit thì bỏ qua
      const { listSelectedDv } = state;
      setState({
        filterText: "",
      });
      let payload = listSelectedDv.map((item) => ({
        nbDotDieuTriId: dataNb?.nbDotDieuTriId,
        bienBanHoiChanId: dataNb?.id,
        loaiDichVu: item?.loaiDichVu,
        dichVuId: item?.dichVuId,
        nguoiTuVanId: item?.nguoiTuVanId,
      }));
      refIsSubmit.current = true;
      tuVanDichVu(payload)
        .then(() => {
          refIsSubmit.current = false;
          refCallback.current && refCallback.current();
          onCancel();
        })
        .catch((e) => {
          refIsSubmit.current = false;
        });
    } catch (error) {
      refIsSubmit.current = false;
    }
  };
  const onCancel = () => {
    setState({
      show: false,
      listSelectedDv: [],
      selectedRowKeys: [],
    });
  };

  const onSearch = (keyword) => {
    setState({
      keyword: keyword,
    });
    onSearchDichVu2({ keyword, page, size, loaiDichVu: state.loaiDichVu });
  };

  const columnsDichVu = [
    {
      title: <HeaderSearch isTitleCenter={true} />,
      dataIndex: "ten",
      key: "ten",
      width: "100%",
      render: (value) => {
        return <b>{value}</b>;
      },
    },
    {
      title: <HeaderSearch isTitleCenter={true} />,
      dataIndex: "",
      key: "",
      width: "100%",
      render: (value, currentRow, index) => {
        const giaKhongBaoHiem = (currentRow.giaKhongBaoHiem || 0).formatPrice();
        const giaBaoHiem = (currentRow.giaBaoHiem || 0).formatPrice();
        const giaPhuThu = (currentRow.giaPhuThu || 0).formatPrice();
        const donGia = `${giaKhongBaoHiem} | ${t(
          "khamBenh.chiDinh.BH"
        )}: ${giaBaoHiem} | ${t("khamBenh.chiDinh.phuThu")}: ${giaPhuThu}`;
        return <div className="desc">{donGia}</div>;
      },
    },
  ];

  const onSelectChangeRight = (selectedRowKeys, data, item) => {
    setState({
      listSelectedDv: data,
      selectedRowKeys: selectedRowKeys,
    });
  };

  const rowSelectionRight = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onSelectChangeRight,
    selectedRowKeys: state.selectedRowKeys,
    preserveSelectedRowKeys: true,
  };

  const onChange = (data, e) => {
    let _listSelectedDv = Object.assign([], listSelectedDv);
    const _findDvIndex = _listSelectedDv.findIndex(
      (x) => x.dichVuId === data?.dichVuId
    );
    if (_findDvIndex !== -1) {
      _listSelectedDv[_findDvIndex].nguoiTuVanId = e;
      setState({ listSelectedDv: _listSelectedDv });
    }
  };
  const columnsTableRight = [
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.stt")} />,
      dataIndex: "",
      key: "",
      width: "10%",
      align: "center",
      render: (item, data, index) => {
        return <div clickcheckbox="true">{index + 1}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={<div className="pointer">{t("common.tenDichVu")}</div>}
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "55%",
      render: (item, data) => {
        return <div clickcheckbox="true">{item}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={<div className="pointer">{t("quanLyNoiTru.nguoiTuVan")}</div>}
        />
      ),
      dataIndex: "",
      key: "",
      width: "35%",
      render: (item, data) => {
        return (
          <Select
            data={state?.listNguoiTuVan}
            onChange={(e) => onChange(data, e)}
          ></Select>
        );
      },
    },
  ];
  const onSelectChangeLeft = async (selectedRowKeys, data) => {
    data.forEach((item1) => {
      (state.listSelectedDv || []).forEach((item2) => {
        if (
          item1.dichVuId &&
          item2.dichVuId &&
          item1.dichVuId === item2.dichVuId
        ) {
          item1.soLuong = item2.soLuong;
        }
      });
    });
    onSelect(data);
  };

  const checkAllDichVu = (e) => {
    const checked = e.target.checked;

    let updatedListDv = [];

    if (checked) {
      updatedListDv = [
        ...listDvKham
          .filter(
            (x1) =>
              listSelectedDv.findIndex((x2) => x1.dichVuId === x2.dichVuId) ===
              -1
          )
          .map((x) => ({ ...x, soLuong: x.soLuong || 1 })),
        ...listSelectedDv,
      ];
    } else {
      updatedListDv = listSelectedDv.filter(
        (x1) => listDvKham.findIndex((x2) => x1.dichVuId === x2.dichVuId) === -1
      );
    }

    onSelect(updatedListDv);
  };

  const rowSelectionLeft = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={checkAllDichVu}
            checked={listDvKham.every(
              (x1) =>
                listSelectedDv.findIndex(
                  (x2) => x1.dichVuId === x2.dichVuId
                ) !== -1
            )}
          />
        }
      />
    ),
    columnWidth: 50,
    onChange: onSelectChangeLeft,
    selectedRowKeys: state.selectedRowKeys,
    preserveSelectedRowKeys: true,
  };

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
      loaiDichVu: loaiDichVu === 150 ? null : loaiDichVu,
    });
  };
  const onSizeChange = (value) => {
    onSearchDichVu2({
      page: 0,
      size: value,
      keyword: keyword,
      loaiDichVu: loaiDichVu === 150 ? null : loaiDichVu,
    });
  };
  const onSearchDichVu2 = ({ keyword, page = 0, size = 10, loaiDichVu }) => {
    onSearchDichVu({
      ten: keyword,
      page: page || 0,
      size: size || 10,
      khoaChiDinhId: dataNb?.khoaChiDinhId,
      bacSiChiDinhId: nhanVienId,
      dsDoiTuongSuDung: dsDoiTuongSuDung,
      ...(loaiDichVu
        ? { loaiDichVu: loaiDichVu }
        : {
            dsLoaiDichVu: dsLoaiDichVu,
          }),
    });
  };
  return (
    <ModalTemplate
      width={1366}
      ref={refModal}
      title={t("quanLyNoiTru.toDieuTri.chiDinhDichVuKyThuat")}
      onCancel={onCancel}
      actionRight={
        <>
          <Button minWidth={100} onClick={onCancel}>
            {t("common.huy")}
          </Button>

          <Button type="primary" minWidth={100} onClick={onSubmit}>
            {t("common.dongY")}
          </Button>
        </>
      }
    >
      <Main>
        <div className="content-title">
          <span className="text">{t("khamBenh.donThuoc.themChiDinh")}</span>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <Select
            data={listLoaiChiDinh}
            value={state?.loaiDichVu}
            onChange={onSelectServiceType}
          ></Select>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div className="input-box">
            <img src={imgSearch} alt="imgSearch" />
            <InputTimeout
              placeholder={t("common.timKiem")}
              onChange={onSearch}
              value={state.keyword}
              ref={refInput}
            />
          </div>
        </div>
        <div className="content">
          <div className="content-equal-w">
            <div className="title-table">{t("common.dichVu")}</div>
            <div className="danh-sach-dich-vu">
              <TableWrapper
                rowKey={(record) => {
                  return record.dichVuId;
                }}
                columns={columnsDichVu}
                dataSource={listDvKham}
                rowSelection={rowSelectionLeft}
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? "table-row-even" : "table-row-odd";
                }}
                showHeader={listDvKham && listDvKham.length > 0}
                onRow={() => {
                  return {
                    onClick: (row) => {
                      row.currentTarget.firstChild.firstElementChild.firstElementChild.firstElementChild.click();
                    },
                  };
                }}
                locale={{
                  emptyText: renderEmptyTextLeftTable(),
                }}
                scroll={{ y: 350 }}
              />
              {!!listDvKham.length && (
                <Pagination
                  listData={listDvKham}
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
            </div>
            <div className="content-body">
              <TableWrapper
                rowKey={(record) => {
                  return record.dichVuId;
                }}
                rowSelection={rowSelectionRight}
                className="table-right"
                columns={columnsTableRight}
                dataSource={listSelectedDv}
                rowClassName={(record, index) => {
                  return index % 2 === 0
                    ? `table-row-even ${
                        index === state.listServiceSelected?.length - 1
                          ? "add-border"
                          : ""
                      }`
                    : `table-row-odd ${
                        index === state.listServiceSelected?.length - 1
                          ? "add-border"
                          : ""
                      }`;
                }}
                onRow={() => {
                  return {
                    onClick: (row) => {
                      if (
                        row?.target?.firstElementChild?.hasAttribute(
                          "clickcheckbox"
                        ) ||
                        row?.target?.hasAttribute("clickcheckbox")
                      ) {
                        row.currentTarget.firstChild.firstElementChild.firstElementChild.firstElementChild.click();
                      }
                    },
                  };
                }}
                locale={{
                  emptyText: (
                    <div style={{ height: 297 }}>
                      <div style={{ color: "#c3c3c3", lineHeight: "297px" }}>
                        {t("khamBenh.donThuoc.khongCoDuLieuThuocDaChon")}
                      </div>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(DichVuKyThuat);
