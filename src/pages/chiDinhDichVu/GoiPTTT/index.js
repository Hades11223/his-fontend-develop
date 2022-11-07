import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { Button, InputTimeout, ModalTemplate } from "components";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch, Pagination } from "components";
import { useDispatch, useSelector } from "react-redux";
import IcArrowRight from "assets/svg/noiTru/ic-arrow-right.svg";
import Icon from "@ant-design/icons";
import ModalBoSungDichVu from "./ModalBoSungDichVu";

const GoiPTTT = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refInputTen = useRef(null);
  const refModalBoSungDichVu = useRef(null);

  const { getDsGoiPTTT, getDsDvTrongGoi, chiDinhNbGoiPTTT, getAllDvTrongGoi } =
    useDispatch().chiDinhGoiPTTT;
  const {
    totalElements,
    page,
    size,
    listGoiPTTT,
    listDvTrongGoi,
    totalElementsDvTrongGoi,
    pageDvTrongGoi,
    sizeDvTrongGoi,
  } = useSelector((state) => state.chiDinhGoiPTTT);

  const [state, _setState] = useState({
    listSelectedDv: [],
    selectedGoi: null,
    searchParams: {
      page: 0,
      size: 10,
      sort: "dichVu.ten,asc",
    },
    searchDvTrongGoiParams: {
      page: 0,
      size: 10,
      chiDinhCungGoi: true,
    },
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      const {
        nbDotDieuTriId,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        khoaChiDinhId,
      } = data;
      setState({
        item: data,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        khoaChiDinhId,
        nbDotDieuTriId,
        searchParams: {
          page: 0,
          size: 10,
          sort: "dichVu.ten,asc",
        },
        searchDvTrongGoiParams: {
          page: 0,
          size: 10,
          chiDinhCungGoi: true,
          nbDotDieuTriId,
        },
      });

      getDsGoiPTTT({ page: 0, size: 10, sort: "dichVu.ten,asc" });

      refModal.current && refModal.current.show();
      refInputTen.current && refInputTen.current.setValue("");
    },
  }));

  useEffect(() => {
    const listDichVu = (listGoiPTTT || []).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id || "dv"}-${item.dichVuId}`,
    }));
    setState({
      listDichVu,
    });
  }, [listGoiPTTT]);

  const onCancel = () => {
    setState({
      show: false,
      selectedGoi: null,
    });
    refModal.current && refModal.current.hide();
  };

  const listGoiColumns = [
    {
      title: <HeaderSearch title="Mã dịch vụ" />,
      width: "100%",
      dataIndex: "ma",
      render: (value, currentRow, index) => {
        const giaKhongBaoHiem = (
          currentRow?.dichVu?.giaKhongBaoHiem || 0
        ).formatPrice();
        const tenDv = currentRow?.dichVu?.ten || "";

        return (
          <div className={"row-item"}>
            <div className="name">
              <b>{tenDv}</b>
            </div>
            <div className={"desc"}>
              {giaKhongBaoHiem}
              {currentRow.id === state.selectedGoi?.id && (
                <Icon className="ic-arrow" component={IcArrowRight} />
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const chooseColumns = [
    {
      title: <HeaderSearch title="STT" />,
      key: "stt",
      dataIndex: "stt",
      width: 40,
      align: "center",
    },
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={t("common.tenDichVu")} />
      ),
      dataIndex: "ten",
      key: "ten",
      render: (item, list, index) => {
        return <div>{item}</div>;
      },
    },
    {
      title: <HeaderSearch title="Đơn giá" />,
      render: (value, currentRow, index) => {
        const _dichVu = currentRow || {};

        const giaKhongBaoHiem = (_dichVu.giaKhongBaoHiem || 0).formatPrice();
        const giaBaoHiem = (_dichVu.giaBaoHiem || 0).formatPrice();
        const giaPhuThu = (_dichVu.giaPhuThu || 0).formatPrice();

        const donGia = `${giaKhongBaoHiem} | ${t(
          "khamBenh.chiDinh.BH"
        )}: ${giaBaoHiem} | ${t("khamBenh.chiDinh.phuThu")}: ${giaPhuThu}`;

        return <div>{donGia}</div>;
      },
    },
  ];

  const onSubmit = async () => {
    getAllDvTrongGoi({
      goiPtTtId: state.selectedGoi.id,
      nbDotDieuTriId: state.nbDotDieuTriId,
    }).then((res) => {
      let dsDichVuCanBoSung = [];
      let dsDichVuThoaDieuKien = [];

      res.forEach((element) => {
        if (
          element?.dsPhongThucHien?.length > 1 ||
          element?.yeuCauBenhPham ||
          element?.mucDichSuDung ||
          element?.nhapDotDung
        ) {
          dsDichVuCanBoSung.push(element);
        } else {
          dsDichVuThoaDieuKien.push({
            ...element,
            phongThucHienId: element.dsPhongThucHien[0]?.phongId || null,
          });
        }
      });

      if (dsDichVuCanBoSung.length > 0) {
        refModalBoSungDichVu.current &&
          refModalBoSungDichVu.current.show(
            {
              dsDichVuCanBoSung,
              dsDichVuThoaDieuKien,
              nbDotDieuTriId: state.nbDotDieuTriId,
              goiPtTtId: state.selectedGoi.id,
              chiDinhTuDichVuId: state.chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
              khoaChiDinhId: state.khoaChiDinhId,
            },
            () => {
              props.refreshList && props.refreshList();
              onCancel();
            }
          );
      } else {
        chiDinhNbGoiPTTT({
          dsDichVu: res.map((x) => ({
            ...x,
            phongThucHienId: x.dsPhongThucHien[0]?.phongId || null,
          })),
          nbDotDieuTriId: state.nbDotDieuTriId,
          goiPtTtId: state.selectedGoi.id,
          chiDinhTuDichVuId: state.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
          khoaChiDinhId: state.khoaChiDinhId,
        }).then(() => {
          props.refreshList && props.refreshList();
          onCancel();
        });
      }
    });
  };

  const onChangePage = (page) => {
    const searchParams = { ...state.searchParams, page: page - 1 };
    getDsGoiPTTT({ ...searchParams });

    setState({ searchParams });
  };

  const onChangePageDvTrongGoi = (page) => {
    const searchDvTrongGoiParams = {
      ...state.searchDvTrongGoiParams,
      page: page - 1,
    };
    getDsDvTrongGoi({ ...searchDvTrongGoiParams });
    setState({ searchDvTrongGoiParams });
  };

  const onSearchGoiPttt = (value, key) => {
    const searchParams = { ...state.searchParams, page: 0, [key]: value };
    getDsGoiPTTT({ ...searchParams });

    setState({ searchParams });
  };

  const handleSizeChange = (size) => {};

  const handleSizeChangeDvTrongGoi = (size) => {};

  const onSelectDichVu = (record) => (e) => {
    const searchDvTrongGoiParams = {
      ...state.searchDvTrongGoiParams,
      goiPtTtId: record?.id,
    };
    getDsDvTrongGoi({ ...searchDvTrongGoiParams });
    setState({ selectedGoi: record, searchDvTrongGoiParams });
  };

  const { listDichVu } = state;

  return (
    <ModalTemplate
      ref={refModal}
      width={"85%"}
      title="Chỉ định gói mổ 10 ngày"
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
        <div className="header-search">
          <span>Thêm gói</span>
          <InputTimeout
            refWrap={refInputTen}
            placeholder="Nhập tên gói mổ"
            onChange={(e) => onSearchGoiPttt(e, "dichVu.ten")}
          />
        </div>
        <div className="list-services">
          <div className="content-equal-w">
            <div className="danh-sach-dich-vu">
              <TableWrapper
                columns={listGoiColumns}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: onSelectDichVu(record),
                  };
                }}
                dataSource={listDichVu}
                showHeader={false}
                rowKey={(record) => record?.dichVuId}
                rowClassName={(record, index) => {
                  if (record.id === state.selectedGoi?.id)
                    return "seleted-item";
                  return index % 2 === 0 ? "table-row-even" : "table-row-odd";
                }}
                scroll={{ y: 450 }}
              />

              {!!totalElements && (
                <Pagination
                  onChange={onChangePage}
                  current={page + 1}
                  pageSize={size}
                  listData={listDichVu}
                  total={totalElements}
                  onShowSizeChange={handleSizeChange}
                  stylePagination={{
                    justifyContent: "flex-start",
                  }}
                />
              )}
            </div>
          </div>

          <div className="content-equal-w">
            <div className="title-table">{t("common.dichVu")}</div>

            <div className="content-body">
              <TableWrapper
                rowKey={(record) => {
                  return record.uniqueKey;
                }}
                columns={chooseColumns}
                dataSource={(listDvTrongGoi || []).map((x, idx) => ({
                  ...x,
                  stt: pageDvTrongGoi * sizeDvTrongGoi + idx + 1,
                }))}
                scroll={{ x: 450 }}
              />

              {!!totalElementsDvTrongGoi && (
                <Pagination
                  onChange={onChangePageDvTrongGoi}
                  current={pageDvTrongGoi + 1}
                  pageSize={sizeDvTrongGoi}
                  listData={listDvTrongGoi}
                  total={totalElementsDvTrongGoi}
                  onShowSizeChange={handleSizeChangeDvTrongGoi}
                  stylePagination={{
                    justifyContent: "flex-start",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <ModalBoSungDichVu ref={refModalBoSungDichVu} />
      </Main>
    </ModalTemplate>
  );
};
export default forwardRef(GoiPTTT);
