import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Checkbox,
  Input,
  message,
  Row,
  Select as SelectAntd,
  Tooltip,
} from "antd";
import { Button, TableWrapper, Select } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { GlobalStyle, WrapperInput, WrapperSelect } from "./styled";
import { BoxWrapper } from "../TableThuocKeNgoai/styled";
import { cloneDeep, debounce } from "lodash";
import { openInNewTab, sortString } from "utils";
import Pagination from "components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import PopupThemLieuDung from "../PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import { useTranslation } from "react-i18next";

const { Option } = SelectAntd;
let enableEnterKey = false;

const TableDonThuoc = (props) => {
  const { t } = useTranslation();
  const {
    onSelected,
    thanhTien,
    khoId,
    loaiDonThuoc,
    visible,
    layerId,
    keyWord,
    theoSoLuongTonKho,
    nbDotDieuTriId,
  } = props;
  const refPopupThemLieuDung = useRef(null);
  const refInput = useRef(null);
  const refSelectLieuDung = useRef(null);
  const refBtnThemNhanh = useRef(null);
  const { nhanVienId } = useSelector((state) => state.auth.auth);
  const refLieuDung = useRef({});
  const {
    listDvTonKhoNhaThuoc,
    listDvTonKho,
    pageTonKho,
    sizeTonKho,
    totalElementsTonKho,
    pageTonKhoNhaThuoc,
    sizeTonKhoNhaThuoc,
    totalElementsTonKhoNhaThuoc,
  } = useSelector((state) => state.chiDinhDichVuKho);
  const { boChiDinh } = useSelector((state) => state.boChiDinh);

  const {
    lieuDung: { createOrEdit: createOrEditLieuDung },
    lieuDungThuoc: { createOrEdit: createOrEditLieuDungThuoc },
    chiDinhDichVuKho: { getListDichVuTonKho, getListDichVuTonKhoNhaThuoc },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  const listAllBoChiDinh = useMemo(() => {
    const listAllBoChiDinh = (boChiDinh?.data || []).map((item) => {
      item.id = item.dichVuId;
      return item;
    });
    return listAllBoChiDinh;
  }, [boChiDinh]);

  const [state, _setState] = useState({
    listServiceSelected: [],
    elementKey: 1,
    keySelected: [],
    dataSelected: [],
    searchLieuDungWord: "",
    boChiDinhSelected: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (visible) {
      //khi bật lên thì mặc đinh reset popup
      setState({
        selectedRowKeys: [],
        listServiceSelected: [],
        dataSelected: [],
        keySelected: [],
        boChiDinhSelected: null,
      });
      // getDataThuoc();
    }
  }, [loaiDonThuoc, visible]); // khi thay đổi về visible hoặc loại đơn thuốc thì load lại bộ chỉ định, reset lại thông tin filter

  const getDataThuoc = (
    value,
    boChiDinhId,
    theoSoLuongTonKho,
    page = 0,
    size = 10
  ) => {
    let objSearch = {
      timKiem: value,
      boChiDinhId,
      khoId,
      page,
      size,
      dataSortColumn: { ten: 1 },
      theoSoLuongTonKho,
      nbDotDieuTriId: nbDotDieuTriId,
    };
    if (khoId && (loaiDonThuoc === 20 || loaiDonThuoc === 30)) {
      //  thuốc bảo hiểm y tế , thuốc tủ trực
      getListDichVuTonKho(objSearch);
    } else {
      getListDichVuTonKhoNhaThuoc(objSearch);
    }
  };

  const debounceFunc = useCallback(debounce(getDataThuoc, 500), [
    loaiDonThuoc,
    khoId,
  ]);

  useEffect(() => {
    if (visible) {
      onRegisterHotkey({
        layerId,
        hotKeys: [
          {
            keyCode: 40, //key arrow down
            onEvent: () => {
              refBtnThemNhanh.current &&
                refBtnThemNhanh.current.firstChild.focus();
              enableEnterKey = true;

              onRegisterHotkey({
                layerId,
                hotKeys: [
                  {
                    keyCode: 13, //key enter
                    onEvent: () => {
                      enableEnterKey &&
                        refBtnThemNhanh.current.firstChild.firstChild.click();
                      enableEnterKey = false;
                    },
                  },
                ],
              });
            },
          },
        ],
      });
      setTimeout(() => {
        refInput.current && refInput.current.focus();
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      debounceFunc(keyWord, state.boChiDinhSelected?.id, theoSoLuongTonKho);
    }
  }, [keyWord, visible, khoId, state.boChiDinhSelected, theoSoLuongTonKho]);

  const onSelectChangeLeft = async (selectedRowKeys, data) => {
    let selectedRowKeysService = data;
    // khi search thì selected data bị mất giá trị soLuong
    // => xử lý giữ lại giá trị số lượng đã nhập
    data.forEach((item1) => {
      state.dataSelected.forEach((item2) => {
        if (
          item1.dichVuId &&
          item2.dichVuId &&
          item1.dichVuId === item2.dichVuId
        ) {
          item1.soLuong = item2.soLuong;
          item1.lieuDungId = item2.lieuDungId;
        }
      });
    });

    Promise.all(
      data.map((item) => {
        return new Promise(async (resolve, reject) => {
          if (!item.listLieuDung) {
            if (refLieuDung.current[item.id || item.dichVuId]) {
              //check trong ref có liều dùng cho dv này chưa, nếu có rồi thì lôi ra dùng
              //còn chưa có thì gọi api
              item.listLieuDung = refLieuDung.current[item.id || item.dichVuId];
            } else {
              const listLieuDung = await lieuDungProvider
                .searchAll({
                  bacSiId: nhanVienId,
                  dichVuId: item.id || item.dichVuId,
                  page: "",
                  size: "",
                })
                .then((s) => {
                  return s?.data || [];
                });
              refLieuDung.current[item.id || item.dichVuId] = listLieuDung;
              item.listLieuDung = listLieuDung;
            }
            resolve(item);
          } else resolve(item);
        });
      })
    ).then((data) => {
      setState({
        selectedRowKeys: selectedRowKeys,
        listServiceSelected: data,
        keySelected: selectedRowKeys,
        dataSelected: data,
      });
    });
    onSelected(selectedRowKeysService);
  };
  const onSelectChangeRight = (selectedRowKeys, data, item) => {
    setState({
      listServiceSelected: data,
      keySelected: selectedRowKeys,
      dataSelected: data,
    });
    // onSelectedNoPayment(selectedRowKeysService);
    onSelected(data);
  };
  const onChangePage = (page) => {
    getDataThuoc(
      keyWord,
      state.boChiDinhSelected?.id,
      theoSoLuongTonKho,
      page - 1,
      size
    );
  };
  const onSizeChange = (value) => {
    getDataThuoc(
      keyWord,
      state.boChiDinhSelected?.id,
      theoSoLuongTonKho,
      1,
      value
    );
  };

  const rowSelectionLeft = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onSelectChangeLeft,
    selectedRowKeys: state.keySelected,
    preserveSelectedRowKeys: true,
  };
  const rowSelectionRight = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onSelectChangeRight,
    selectedRowKeys: state.keySelected,
    preserveSelectedRowKeys: true,
  };
  const refTimeout = useRef();
  const onChangeInput = (type, data) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "tuTra" || type === "khongTinhTien") {
      value = e.target.checked;
    }
    state.dataSelected.map((item) => {
      if (item.dichVuId === data.dichVuId) {
        if (type === "soLuong" && Number(value) <= 0 && value) {
          item.soLuong = null;
          message.error(t("khamBenh.donThuoc.nhapSoLuongLonHon0"));
        } else {
          item[type] = value;
        }
        if (type === "tuTra" && value) {
          item["khongTinhTien"] = false;
        }

        if (type === "khongTinhTien" && value) {
          item["tuTra"] = false;
        }
      }
    });
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(
      (values) => {
        onSelected(values, type);
      },
      300,
      state.dataSelected
    );
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const columnsTableLeft = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
        />
      ),
      dataIndex: "",
      key: "",
      width: "65%",
      render: (item, data) => {
        return `${data.ten} ${
          data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "
        } ${data.hamLuong ? " - " + data.hamLuong : ""}`;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.donThuoc.donGiaDVT")}
        />
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
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.donThuoc.slTon")}
        />
      ),
      dataIndex: "soLuongKhaDungConHsd",
      key: "soLuongKhaDungConHsd",
      width: "15%",
      align: "right",
      render: (item, data) => {
        return item;
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
              onClick={() => openInNewTab("/danh-muc/thuoc")}
            >
              {t("khamBenh.donThuoc.tenThuocHamLuong")}
            </div>
          }
        />
      ),
      dataIndex: "",
      key: "",
      width: "47%",
      render: (item, data) => {
        return (
          <div clickcheckbox="true">{`${data.ten} ${
            data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "
          } ${data.hamLuong ? " - " + data.hamLuong : ""}`}</div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} isTitleCenter={true} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: "25%",
      align: "right",
      render: (item, data, index) => {
        return (
          <WrapperInput className="form-item">
            <Input
              // defaultValue="1"
              style={{
                border: !data.soLuong ? "1px solid red" : "unset",
                marginRight: 5,
              }}
              type="number"
              onChange={onChangeInput("soLuong", data)}
              onKeyDown={blockInvalidChar}
            ></Input>
            <Tooltip title={data.tenDonViTinh}>
              <span>{data.tenDonViTinh}</span>
            </Tooltip>
          </WrapperInput>
        );
      },
    },
    {
      title: <HeaderSearch title={t("vatTu.tuTra")} isTitleCenter={true} />,
      width: 50,
      align: "center",
      dataIndex: "tuTra",
      render: (item, data, index) => {
        return (
          <Checkbox
            defaultChecked={false}
            checked={item}
            onChange={onChangeInput("tuTra", data)}
            disabled={data?.dsMucDich?.length}
          />
        );
      },
    },
    {
      title: (
        <HeaderSearch title={t("common.khongTinhTien")} isTitleCenter={true} />
      ),
      width: 80,
      align: "center",
      dataIndex: "khongTinhTien",
      render: (item, data, index) => {
        return (
          <Checkbox
            defaultChecked={false}
            checked={item}
            onChange={onChangeInput("khongTinhTien", data)}
            disabled={data?.dsMucDich?.length}
          />
        );
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/lieu-dung")}
            >
              {t("khamBenh.donThuoc.lieuDungCachDung")}
            </div>
          }
        />
      ),
      dataIndex: "lieuDung",
      key: "lieuDung",
      width: "45%",
      render: (item, data, index) => {
        const newDataRender = Object.assign([], data?.listLieuDung);
        newDataRender.sort(sortString("ten", 1));

        return (
          <WrapperSelect>
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <SelectAntd
              ref={refSelectLieuDung}
              showSearch={true}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", data)}
              onSearch={(value) =>
                setState({ searchLieuDungWord: value || "" })
              }
              filterOption={filterOption}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}>
                    <small>{t("common.khongCoDuLieuPhuHop")}</small>
                  </div>
                  <Row justify="center" ref={refBtnThemNhanh}>
                    <Button
                      style={{
                        border: "1px solid",
                        borderRadius: "10px",
                        width: "215px",
                        margin: "auto",
                        lineHeight: 0,
                        // boxShadow: "-1px 3px 1px 1px #d9d9d9",
                        cursor: "pointer",
                      }}
                      onClick={async (e) => {
                        refSelectLieuDung.current.blur();
                        return (
                          refPopupThemLieuDung &&
                          refPopupThemLieuDung.current.show(
                            {
                              visible: true,
                              data,
                              tenLieuDung: state.searchLieuDungWord,
                            },
                            (res) => {
                              const { values } = res;
                              values.bacSiId = nhanVienId;
                              createOrEditLieuDung(values).then(async (s) => {
                                const dataCustom = {
                                  lieuDung: {
                                    ...s,
                                  },
                                  lieuDungId: s.id,
                                  dichVuId: data?.id || data?.dichVuId,
                                };
                                await createOrEditLieuDungThuoc(dataCustom);
                                await reRenderListLieuDungDependDichVu();

                                const listLieuDung = await lieuDungProvider
                                  .searchAll({
                                    bacSiId: nhanVienId,
                                    dichVuId: data?.id || data?.dichVuId,
                                    page: "",
                                    size: "",
                                  })
                                  .then((s) => {
                                    return s?.data || [];
                                  });

                                let updateDataSelected = cloneDeep(
                                  state.dataSelected
                                );
                                let _row = updateDataSelected.find(
                                  (x) =>
                                    x.dichVuId === (data?.id || data?.dichVuId)
                                );
                                if (_row) {
                                  _row.listLieuDung = listLieuDung;

                                  setState({
                                    dataSelected: updateDataSelected,
                                  });
                                }
                              });
                            },
                            (err) => {
                              // setState({...state})
                            }
                          )
                        );
                      }}
                    >
                      {t("khamBenh.donThuoc.themNhanhLieuDungBS")}
                    </Button>
                  </Row>
                </div>
              }
            >
              {newDataRender?.map((option) => {
                return (
                  <Option
                    lists={option}
                    key={
                      option[`${props.id}`] ? option[`${props.id}`] : option.id
                    }
                    value={
                      option[`${props.id}`] ? option[`${props.id}`] : option.id
                    }
                    ref={option}
                  >
                    {option[`${props.ten}`]
                      ? option[`${props.ten}`]
                      : option.ten}
                  </Option>
                );
              })}
            </SelectAntd>
          </WrapperSelect>
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.luuY")} isTitleCenter={true} />,
      width: 150,
      align: "center",
      dataIndex: "ghiChu",
      render: (item, data, index) => {
        return (
          <Input onChange={onChangeInput("ghiChu", data)} value={item}></Input>
        );
      },
    },
  ];

  const renderEmptyTextLeftTable = () => {
    return (
      <div style={{ marginTop: 130 }}>
        <div style={{ color: "#c3c3c3", fontSize: 14 }}>
          {!khoId && loaiDonThuoc !== 10
            ? t("khamBenh.donThuoc.vuiLongChonKho")
            : t("common.khongCoDuLieuPhuHop")}
        </div>
      </div>
    );
  };

  const dataSource = useMemo(() => {
    return (
      (loaiDonThuoc === 10
        ? listDvTonKhoNhaThuoc
        : khoId
        ? listDvTonKho
        : []) || []
    ).map((item, index) => {
      item.key = item.id || item.dichVuId + item.khoId || index;
      return item;
    });
  }, [khoId, listDvTonKhoNhaThuoc, listDvTonKho, loaiDonThuoc]);

  const { page, size, totalElements } = useMemo(() => {
    return loaiDonThuoc === 10
      ? {
          page: pageTonKhoNhaThuoc || 0,
          size: sizeTonKhoNhaThuoc || 10,
          totalElements: totalElementsTonKhoNhaThuoc || 0,
        }
      : {
          page: pageTonKho || 0,
          size: sizeTonKho || 10,
          totalElements: totalElementsTonKho || 0,
        };
  }, [
    loaiDonThuoc,
    pageTonKho,
    sizeTonKho,
    totalElementsTonKho,
    pageTonKhoNhaThuoc,
    sizeTonKhoNhaThuoc,
    totalElementsTonKhoNhaThuoc,
  ]);
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...state.listServiceSelected];
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider
          .searchAll({ bacSiId: nhanVienId, dichVuId: item.dichVuId })
          .then((s) => {
            return s?.data;
          });
        item.listLieuDung = listLieuDungDependDichVu;
      });
    })();

    setState({
      listServiceSelected: [...list],
    });
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  const onChangeBoChiDinh = (value, item) => {
    if (value && item?.lists?.id !== state.boChiDinhSelected?.id) {
      setState({ boChiDinhSelected: item.lists });
    } else {
      setState({ boChiDinhSelected: null });
    }
  };

  return (
    <BoxWrapper>
      <GlobalStyle />
      <div className="content-left">
        <Row justify="space-between" align="middle">
          <Select
            placeholder={t("khamBenh.donThuoc.chonBoChiDinh")}
            data={listAllBoChiDinh}
            onChange={onChangeBoChiDinh}
            style={{ width: "100%" }}
          ></Select>
        </Row>

        <div className="content-left-header-table">
          <TableWrapper
            rowKey={(record) => {
              return record.ma;
            }}
            columns={columnsTableLeft}
            dataSource={dataSource}
            rowSelection={rowSelectionLeft}
            // showHeader={false}
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
          />
          {!!dataSource.length && (
            <Pagination
              listData={dataSource}
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
      <div className="content-right">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" /> {t("common.daChon")}
          </div>
          <div className="title__right">
            {t("khamBenh.donThuoc.tongTien")}: {(thanhTien || 0).formatPrice()}{" "}
            đ
          </div>
        </div>
        <div className="content-right_table">
          <TableWrapper
            rowKey={(record) => {
              return record.ma;
            }}
            rowSelection={rowSelectionRight}
            className="table-right"
            columns={columnsTableRight}
            dataSource={
              state.dataSelected?.length > 0 ? state.dataSelected : []
            }
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
    </BoxWrapper>
  );
};

export default TableDonThuoc;
