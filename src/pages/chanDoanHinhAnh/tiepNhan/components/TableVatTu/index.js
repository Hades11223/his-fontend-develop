import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Row,
  Select as SelectAntd,
} from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { BoxWrapper, GlobalStyle, WrapperInput } from "./styled";
import { Element, animateScroll as scroll } from "react-scroll";
import { debounce } from "lodash";
import arrowRight from "assets/images/khamBenh/next-arrrow.png";
import { openInNewTab } from "utils";
import Pagination from "components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import imgSearch from "assets/images/template/icSearch.png";
import { useTranslation } from "react-i18next";

const { Option } = SelectAntd;
const TableVatTu = (props) => {
  const {
    data = [],
    onSelected,
    thanhTien,
    boChiDinh = {},
    boChiDinhSelected,
    onSelectedBoChiDinh,
    loaiDichVu,
    khoId,
    listSelected,
  } = props;

  const { t } = useTranslation();
  const updateDataChiDinhDichVuKho = useDispatch().chiDinhDichVuKho.updateData;
  const getBoChiDinh = useDispatch().boChiDinh.getBoChiDinh;
  const getListDichVuTonKho =
    useDispatch().chiDinhDichVuKho.getListDichVuTonKho;

  const [state, _setState] = useState({
    page: 1,
    size: 20,
    listServiceSelected: [],
    selectedRowKeys: [],
    elementKey: 1,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (listSelected?.length === 0) {
      setState({
        selectedRowKeys: [],
        listServiceSelected: [],
      });
    }
  }, [listSelected]);
  const onSelectChange = async (selectedRowKeys, data) => {
    console.log("data", data);
    //Check điều kiện vật tư Kỹ thuật cao= True hoặc Stent phủ thuốc= True
    if (data.some((x) => x.kyThuatCao || x.stentPhuThuoc)) {
      const vatTuKTC = data
        .filter((x) => x.kyThuatCao || x.stentPhuThuoc)
        .map((x) => x.ten)
        .join(", ");
      message.error(`Không được chỉ định dịch vụ vật tư KTC ${vatTuKTC}`);
      return;
    }

    let updatedSelectedKeys = selectedRowKeys;
    let selectedRowKeysService = data;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    selectedRowKeysService = [...new Set(selectedRowKeysService)];
    setState({
      selectedRowKeys: updatedSelectedKeys,
      listServiceSelected: selectedRowKeysService,
    });
    onSelected(selectedRowKeysService);
  };

  const onChangePage = (page) => {
    setState({ page: page });
  };
  const handleSizeChange = (value) => {
    setState({ size: value });
  };

  useEffect(() => {
    setState({
      listData: data
        .slice(
          (state.page - 1) * state.size,
          (state.page - 1) * state.size + state.size
        )
        .map((item) => {
          return { ...item, soLuong: 1 };
        }),
    });
  }, [state.page, state.size, data]);

  console.log("state.selectedRowKeys", state.selectedRowKeys);
  const rowSelection = {
    columnTitle: <HeaderSearch title={<Checkbox />} />,
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const rowSelectionRight = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onChangeInput = (type, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "soLuong" && Number(value) <= 0 && value) {
      state.listServiceSelected[index][type] = null;
      message.error(t("khamBenh.donThuoc.nhapSoLuongLonHon0"));
    } else {
      state.listServiceSelected[index][type] = value;
    }
    onSelected(state?.listServiceSelected);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const columnsTableLeft = [
    {
      title: (
        <Input className="input-header" placeholder={t("hsba.nhapTenVatTu")} />
      ),
      dataIndex: "",
      key: "",
      width: "65%",
      render: (item, data) => {
        return data.ten;
      },
    },
    {
      title: (
        <Input className="input-header" placeholder={t("hsba.nhapGiaVatTu")} />
      ),
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      width: "30%",
      align: "right",
      render: (item, data) => {
        return data.giaKhongBaoHiem?.formatPrice() + " " + data.tenDonViTinh
          ? data.tenDonViTinh
          : "";
      },
    },
  ];

  const columnsTableRight = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/vat-tu")}
            >
              {t("hsba.tenVatTu")}
            </div>
          }
        />
      ),
      dataIndex: "",
      key: "",
      width: "75%",
      render: (item, data) => {
        return data.ten;
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} isTitleCenter={true} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: "20%",
      align: "right",
      render: (item, data, index) => {
        return (
          <WrapperInput className="form-item">
            <Input
              defaultValue="1"
              type="number"
              onChange={onChangeInput("soLuong", index)}
              onKeyDown={blockInvalidChar}
            ></Input>
          </WrapperInput>
        );
      },
    },
  ];

  const debounceFunc = useCallback(
    debounce((value, boChiDinhId) => {
      getListDichVuTonKho({ ten: value, boChiDinhId, khoId, loaiDichVu: 100 });
    }, 500),
    [khoId]
  );
  const debounceFuncBoChiDinh = useCallback(
    debounce((value) => {
      getBoChiDinh({ dsLoaiDichVu: loaiDichVu, ten: value });
    }, 500),
    []
  );
  const renderEmptyTextLeftTable = () => {
    if (boChiDinh?.data?.length <= 0 && state?.isBoChiDinh) {
      return (
        <div style={{ marginTop: 130 }}>
          <div style={{ color: "#c3c3c3", fontSize: 14 }}>
            {t("common.khongCoDuLieuPhuHop")}
          </div>
          <Button
            style={{ borderRadius: "8px" }}
            onClick={() => openInNewTab(`/danh-muc/bo-chi-dinh`)}
          >
            {t("khamBenh.donThuoc.themMoiBoChiDinh")}
          </Button>
        </div>
      );
    } else if (
      (state?.isBoChiDinh && !state?.boChiDinhSelected) ||
      (state?.isBoChiDinh && Object.keys(state?.boChiDinhSelected)?.length <= 0)
    ) {
      // condition : click bộ chỉ định => chưa chọn bộ chỉ định => hiện
      return (
        <div style={{ marginTop: 130 }}>
          <div style={{ color: "#c3c3c3" }}>
            {t("khamBenh.donThuoc.chonBoChiDinhDeHienThiDanhSachVatTuCuaBo")}
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: 130 }}>
        <div style={{ color: "#c3c3c3", fontSize: 14 }}>
          {t("common.khongCoDuLieuPhuHop")}
        </div>
      </div>
    );
  };
  return (
    <BoxWrapper>
      <GlobalStyle />
      <div className="content-left">
        <Row justify="space-between" align="middle">
          <div className="input-box">
            <img src={imgSearch} alt="imgSearch" />
            <Input
              style={{ width: 450, height: 32, marginLeft: 0 }}
              className="input-header"
              placeholder={t("hsba.nhapTenVatTuHoacTenBoChiDinh")}
              value={state?.keyWord}
              onChange={(e) => {
                if (state.isBoChiDinh) {
                  debounceFuncBoChiDinh(e.target.value);
                } else {
                  debounceFunc(e.target.value, state?.boChiDinhSelected?.id);
                }
                setState({
                  keyWord: e.target.value,
                });
              }}
            />
          </div>
          <Checkbox
            checked={state.isBoChiDinh}
            onChange={(e) => {
              setState({ isBoChiDinh: !state.isBoChiDinh, keyWord: "" });
              updateDataChiDinhDichVuKho({ listDvKho: [], listDvTonKho: [] });
              if (!state?.boChiDinhSelected?.id) {
                debounceFunc("");
              }
            }}
          >
            {t("khamBenh.donThuoc.timBoChiDinh")}
          </Checkbox>
        </Row>
        <div className="content-left-header-table">
          <div className="header">
            <Col span={1} className="navigation-left">
              <div
                onClick={(event) => {
                  scroll.scrollMore(-151, {
                    containerId: "containerElementBoChiDinh",
                    duration: 100,
                    smooth: true,
                    horizontal: true,
                  });
                }}
              >
                <img src={arrowRight} alt="btn-collapse" />
              </div>
            </Col>
            <Element
              name="tableLoaiDV"
              className="element section-body group-service"
              id="containerElementBoChiDinh"
            >
              {boChiDinh &&
                (boChiDinh?.data || []).map((item, index) => {
                  return (
                    <Element
                      name={`${index}`}
                      key={index}
                      id={`element-${index}`}
                    >
                      <Col>
                        <Button
                          key={item}
                          className={`button-group-service ${
                            item.id === state?.boChiDinhSelected?.id
                              ? "active"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.target.scrollIntoView({ behavior: "smooth" });
                            if (item.id !== state.boChiDinhSelected?.id) {
                              //nếu item không giống thì sẽ thêm vào
                              setState({ boChiDinhSelected: item });
                              onSelectedBoChiDinh(item);
                            } else {
                              setState({ boChiDinhSelected: {} });
                              onSelectedBoChiDinh({});
                              // updatedDataThuocKeNgoai({ listData: [] })
                            }
                          }}
                        >
                          {item.ten}
                        </Button>
                      </Col>
                    </Element>
                  );
                })}
            </Element>
            <Col className="navigation-right" span={1}>
              <div
                onClick={(event) => {
                  scroll.scrollMore(151, {
                    containerId: "containerElementBoChiDinh",
                    duration: 100,
                    smooth: true,
                    horizontal: true,
                  });
                }}
              >
                <img src={arrowRight} alt="btn-collapse" />
              </div>
            </Col>
          </div>
          <TableWrapper
            columns={columnsTableLeft}
            dataSource={
              (state?.isBoChiDinh && !state?.boChiDinhSelected) ||
              (state?.isBoChiDinh &&
                Object.keys(state?.boChiDinhSelected)?.length <= 0)
                ? []
                : state.listData || data
            }
            rowSelection={rowSelection}
            showHeader={false}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? "table-row-even" : "table-row-odd";
            }}
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
            styleWrap={{ height: 400 }}
          />
          {state?.listData?.length > 0 || data?.length > 0 ? (
            <Pagination
              listData={state?.listData}
              onChange={onChangePage}
              current={state.page}
              pageSize={state.size}
              total={data?.length}
              onShowSizeChange={handleSizeChange}
              stylePagination={{ flex: 1, justifyContent: "flex-start" }}
            />
          ) : (
            <div style={{ height: 38 }} />
          )}
        </div>
      </div>
      <div className="content-right">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" /> {t("common.daChon")}
          </div>
          <div className="title__right">
            {t("common.tongTien")}: {(thanhTien || 0).formatPrice()}{" "}
            {t("common.vnd")}
          </div>
        </div>
        <div className="content-right_table">
          <TableWrapper
            rowSelection={rowSelectionRight}
            className="table-right"
            columns={columnsTableRight}
            dataSource={state?.listServiceSelected}
            rowClassName={(record, index) => {
              return index % 2 === 0
                ? `table-row-even ${
                    index == state?.listServiceSelected?.length - 1
                      ? "add-border"
                      : ""
                  }`
                : `table-row-odd ${
                    index == state?.listServiceSelected?.length - 1
                      ? "add-border"
                      : ""
                  }`;
            }}
            locale={{
              emptyText: (
                <div style={{ height: 297 }}>
                  <div style={{ color: "#c3c3c3", lineHeight: "297px" }}>
                    {t("hsba.khongCoDuLieuVatTuDaChon")}
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </BoxWrapper>
  );
};

export default TableVatTu;
