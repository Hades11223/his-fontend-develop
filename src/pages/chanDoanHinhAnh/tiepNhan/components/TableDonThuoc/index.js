import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Checkbox, Col, Input, message, Row, Form, Popover, Select as SelectAntd } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { BoxWrapper, ContentWrapper, GlobalStyle, WrapperInput, WrapperSelect } from "./styled";
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
import { debounce } from "lodash";
import arrowRight from "assets/images/khamBenh/next-arrrow.png";
import Select from "components/Select";
import { openInNewTab } from "utils";
import Pagination from "components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import PopupThemLieuDung from "../../DonThuoc/components/PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import imgSearch from "assets/images/template/icSearch.png";
import { useTranslation } from "react-i18next";

const { Option } = SelectAntd
const TableDonThuoc = (props) => {
  const {
    data = [],
    onSelected,
    thanhTien,
    boChiDinh = {},
    onSelectedBoChiDinh,
    loaiDichVu,
    khoId,
    loaiDonThuoc,
    listSelected
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refPopupThemLieuDung = useRef(null)
  const refSelectLieuDung = useRef(null)
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)

  const createOrEditLieuDung = useDispatch().lieuDung.createOrEdit
  const getListAllLieuDung = useDispatch().lieuDung.getListAllLieuDung
  const createOrEditLieuDungThuoc = useDispatch().lieuDungThuoc.createOrEdit
  const searchDv = useDispatch().chiDinhDichVuKho.searchDv
  const updateDataChiDinhDichVuKho = useDispatch().chiDinhDichVuKho.updateData
  const getBoChiDinh = useDispatch().boChiDinh.getBoChiDinh
  const getListDichVuTonKho = useDispatch().chiDinhDichVuKho.getListDichVuTonKho

  const [state, _setState] = useState({ page: 1, size: 20, listServiceSelected: [], elementKey: 1 });
  console.log('state: ', state);
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    setState({
      selectedRowKeys: [],
      listServiceSelected: [],
    });
  }, [loaiDonThuoc]);
  useEffect(() => {
    if (listSelected?.length === 0) {
      setState({
        selectedRowKeys: [],
        listServiceSelected: [],
      });
    }
  }, [listSelected]);
  const onSelectChange = async (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    let selectedRowKeysService = data;
    await (() => {
      data.forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: item.id || item.dichVuId }).then((s) => {
          return s?.data
        })
        item.listLieuDung = listLieuDungDependDichVu
      })
    })()
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
      listData: data.slice(
        (state.page - 1) * state.size,
        (state.page - 1) * state.size + state.size
      ).map((item) => {
        return { ...item, soLuong: 1 }
      })
    });
  }, [state.page, state.size, data]);

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
      message.error(t("cdha.vuiLongNhapSoLuongLon0"));
    } else {
      state.listServiceSelected[index][type] = value;
    }
    onSelected(state?.listServiceSelected);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const columnsTableLeft = [
    {
      title: <Input className="input-header" placeholder={t("cdha.nhapTenThuoc")} />,
      dataIndex: "",
      key: "",
      width: "65%",
      render: (item, data) => {
        return `${data.ten} ${data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "} ${data.hamLuong ? " - " + data.hamLuong : ""}`;
      },
    },
    {
      title: <Input className="input-header" placeholder={t("cdha.nhapGiaThuoc")} />,
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
  
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...state?.listServiceSelected]
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: item.id }).then((s) => {
          return s?.data
        })
        item.listLieuDung = listLieuDungDependDichVu
      })
    })()
    setState({
      listServiceSelected: [...list]
    })
  }
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  const columnsTableRight = [
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={(
          <div
            className="pointer"
            onClick={() => openInNewTab("/danh-muc/thuoc")}
          >
            {t("khamBenh.donThuoc.tenThuocHamLuong")}
          </div>
        )}
        />
      ),
      dataIndex: "",
      key: "",
      width: "55%",
      render: (item, data) => {
        return `${data.ten} ${data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "} ${data.hamLuong ? " - " + data.hamLuong : ""}`
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} isTitleCenter={true} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: "17%",
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
            <span>{data.tenDonViTinh}</span>
          </WrapperInput>
        );
      },
    },
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={(
          <div
            className="pointer"
            onClick={() => openInNewTab("/danh-muc/lieu-dung")}
          >
            {t("khamBenh.donThuoc.lieuDungCachDung")}
          </div>
        )}
        />
      ),
      dataIndex: "lieuDung",
      key: "lieuDung",
      width: "45%",
      render: (item, data, index) => {
        return (
          <WrapperSelect>
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <SelectAntd
              ref={refSelectLieuDung}
              showSearch={true}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", index)}
              filterOption={filterOption}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}><small>{t("common.khongCoDuLieuPhuHop")}</small></div>
                  <Row justify="center">
                    <Button style={{
                      border: "1px solid",
                      borderRadius: "10px",
                      width: "215px",
                      margin: "auto",
                      lineHeight: 0,
                      // boxShadow: "-1px 3px 1px 1px #d9d9d9",
                      cursor: "pointer"
                    }} onClick={async (e) => {
                      console.log('e: ', e);
                      console.log('refSelectLieuDung: ', refSelectLieuDung.current);
                      refSelectLieuDung.current.blur()
                      return refPopupThemLieuDung && refPopupThemLieuDung.current.show({ visible: true , data}, (res) => {
                        const { values } = res
                        values.bacSiId = nhanVienId
                        createOrEditLieuDung(values).then(async (s) => {
                          const dataCustom = {
                            lieuDung: {
                              ...s,
                            },
                            lieuDungId: s.id,
                            dichVuId: data?.id || data?.dichVuId
                          }
                          await createOrEditLieuDungThuoc(dataCustom)
                          await reRenderListLieuDungDependDichVu()
                          getListAllLieuDung({});
                        });
                      },(err) => {
                        // setState({...state})
                      })
                    }}>{t("khamBenh.donThuoc.themNhanhLieuDungBS")}</Button>
                  </Row>
                </div>
              }
            >
              {data?.listLieuDung?.map((option) => {
                return (
                  <Option
                    lists={option}
                    key={option[`${props.id}`] ? option[`${props.id}`] : option.id}
                    value={option[`${props.id}`] ? option[`${props.id}`] : option.id}
                    ref={option}
                  >
                    {option[`${props.ten}`] ? option[`${props.ten}`] : option.ten}
                  </Option>
                );
              })}
            </SelectAntd>
          </WrapperSelect>
        );
      },
    },
  ];

  const debounceFunc = useCallback(
    debounce((value, boChiDinhId) => {
      if (khoId && (loaiDonThuoc == 20 || loaiDonThuoc == 30)) { //  thuốc bảo hiểm y tế , thuốc tủ trực 
        getListDichVuTonKho({ ten: value, boChiDinhId, khoId })
      } else {
        searchDv({ loaiDichVu: 90, ten: value, boChiDinhId, notCallBoChiDinh: true })
      }
    }
      , 500),
    [loaiDonThuoc, khoId]
  );
  const debounceFuncBoChiDinh = useCallback(
    debounce((value) => {
      getBoChiDinh({ dsLoaiDichVu: loaiDichVu, ten: value })
      // if (!state.boChiDinhSelected) {
      //   updateDataChiDinhDichVuKho({ listDvKho: [] })
      // }
    }
      , 500),
    []
  );
  const renderEmptyTextLeftTable = () => {
    if (boChiDinh?.data?.length <= 0 && state?.isBoChiDinh) {
      // condition : click bộ chỉ định => search => không có bộ chỉ định => hiện
      return (
        <div style={{ marginTop: 130 }}>
          <div style={{ color: "#c3c3c3", fontSize: 14 }}>{t("common.khongCoDuLieuPhuHop")}</div>
          <Button style={{ borderRadius:"8px" }} onClick={() => openInNewTab(`/danh-muc/bo-chi-dinh`)}>{t("khamBenh.donThuoc.themMoiBoChiDinh")}</Button>
        </div>
      )
    } else if ((state?.isBoChiDinh && !state?.boChiDinhSelected) || (state?.isBoChiDinh && Object.keys(state?.boChiDinhSelected)?.length <= 0)) {

      // condition : click bộ chỉ định => chưa chọn bộ chỉ định => hiện
      return (
        <div style={{ marginTop: 130 }}>
          <div style={{ color: "#c3c3c3" }}>
            {t("khamBenh.donThuoc.chonBoChiDinhDeHienThiThuoc")}
          </div>
        </div>
      )
    }
    return (
      <div style={{ marginTop: 130 }}>
        <div style={{ color: "#c3c3c3", fontSize: 14 }}>{t("common.khongCoDuLieuPhuHop")}</div>
      </div>
    )
  }
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
              placeholder={t("khamBenh.donThuoc.nhapTenThuocHoacBoChiDinh")}
              value={state?.keyWord}
              onChange={(e) => {
                if (state.isBoChiDinh) {
                  debounceFuncBoChiDinh(e.target.value)
                } else {
                  debounceFunc(e.target.value, state?.boChiDinhSelected?.id)
                }
                setState({
                  keyWord: e.target.value
                })
              }}
            />
          </div>
          <Checkbox
            checked={state.isBoChiDinh}
            onChange={(e) => {
              setState({ isBoChiDinh: !state.isBoChiDinh, keyWord: "" })
              updateDataChiDinhDichVuKho({ listDvKho: [], listDvTonKho: [] })
              if (!state?.boChiDinhSelected?.id) {
                debounceFunc("")
              }
            }}>
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
                    horizontal: true
                  })
                }}>
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
                    <Element name={`${index}`} key={index} id={`element-${index}`}>
                      <Col>
                        <Button
                          key={item}
                          className={`button-group-service ${item.id === state?.boChiDinhSelected?.id ? "active" : ""
                            }`}
                          onClick={(e) => {
                            e.target.scrollIntoView({ behavior: 'smooth' })
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
                    horizontal: true
                  })
                }}>
                <img src={arrowRight} alt="btn-collapse" />
              </div>
            </Col>
          </div>
          <TableWrapper
            columns={columnsTableLeft}
            dataSource={((state?.isBoChiDinh && !state?.boChiDinhSelected) || (state?.isBoChiDinh && Object.keys(state?.boChiDinhSelected)?.length <= 0)) ? [] : (state.listData || data)}
            rowSelection={rowSelection}
            showHeader={false}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
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
          />
          {state?.listData?.length > 0 || data?.length > 0 ?
            <Pagination
              listData={state?.listData}
              onChange={onChangePage}
              current={state.page}
              pageSize={state.size}
              total={data?.length}
              onShowSizeChange={handleSizeChange}
              stylePagination={{ flex: 1, justifyContent: "flex-start" }}
            />
            : <div style={{ height: 38 }} />}
        </div>
      </div>
      <div className="content-right">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" /> {t("common.daChon")}
          </div>
          <div className="title__right">
            {t("khamBenh.chiDinh.tongTien")}: {(thanhTien || 0).formatPrice()} đ
          </div>
        </div>
        <div className="content-right_table">
          <TableWrapper
            rowSelection={rowSelectionRight}
            className="table-right"
            columns={columnsTableRight}
            dataSource={state?.listServiceSelected}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? `table-row-even ${index == state?.listServiceSelected?.length - 1 ? "add-border" : ""}` : `table-row-odd ${index == state?.listServiceSelected?.length - 1 ? "add-border" : ""}`
            }}
            locale={{
              emptyText: (
                <div style={{ height: 297 }}>
                  <div style={{ color: "#c3c3c3", lineHeight: "297px" }}>{t("khamBenh.donThuoc.khongCoDuLieuThuocDaChon")}</div>
                </div>
              )
            }}
          />
        </div>
      </div>
    </BoxWrapper>
  );
};

export default TableDonThuoc;
