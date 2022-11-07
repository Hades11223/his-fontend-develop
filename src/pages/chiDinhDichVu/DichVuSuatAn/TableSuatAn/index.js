import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Checkbox, Input, message, Tooltip } from "antd";
import { TableWrapper, Select } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { GlobalStyle, WrapperInput, WrapperSelect, BoxWrapper } from "./styled";
import { formatDecimal, openInNewTab } from "utils";
import Pagination from "components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

let enableEnterKey = false;

const TableSuatAn = (props, ref) => {
  const { t } = useTranslation();
  const { onSelected, thanhTien, visible, layerId } = props;
  const refInput = useRef(null);
  const refBtnThemNhanh = useRef(null);
  const { listDvTonKho, page, size, totalElements } = useSelector(
    (state) => state.chiDinhSuatAn
  );
  const listAllLoaiBuaAn = useStore("loaiBuaAn.listAllLoaiBuaAn", []);

  const {
    phimTat: { onRegisterHotkey },
    chiDinhSuatAn: { getListDichVuSuatAn },
  } = useDispatch();

  const [state, _setState] = useState({
    listServiceSelected: [],
    elementKey: 1,
    keySelected: [],
    dataSelected: [],
    loaiDonVatTu: 10,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onShow = () => {
    //khi bật lên thì mặc đinh reset popup
    setState({
      selectedRowKeys: [],
      listServiceSelected: [],
      dataSelected: [],
      keySelected: [],
      keyWord: "",
      boChiDinhSelected: null,
      isCheckAll: false,
    });
    setTimeout(() => {
      refInput.current && refInput.current.focus();
    }, 500);
  };

  useImperativeHandle(ref, () => ({
    onShow,
  }));

  useEffect(() => {
    if (visible) {
      onShow();
    }
  }, [visible]); // khi thay đổi về visible hoặc loại đơn thuốc thì load lại bộ chỉ định, reset lại thông tin filter

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
    }
  }, [visible]);

  const onCheckAll = async (e) => {
    if (e?.target?.checked) {
      let selectedRowKeys = (dataSource || []).map((x) => x.ma);
      let selectedRowKeysService = dataSource;
      // khi search thì selected data bị mất giá trị soLuong
      // => xử lý giữ lại giá trị số lượng đã nhập
      dataSource.forEach((item1) => {
        state.dataSelected.forEach((item2) => {
          if (
            item1.dichVuId &&
            item2.dichVuId &&
            item1.dichVuId == item2.dichVuId
          ) {
            item1.soLuong = item2.soLuong;
          }
        });
      });

      Promise.all(
        dataSource.map((item) => {
          return new Promise(async (resolve, reject) => {
            resolve(item);
          });
        })
      ).then((data) => {
        setState({
          selectedRowKeys: selectedRowKeys,
          listServiceSelected: data,
          keySelected: selectedRowKeys,
          dataSelected: data,
          isCheckAll: true,
        });
      });
      onSelected(selectedRowKeysService);
    } else {
      setState({
        selectedRowKeys: [],
        listServiceSelected: [],
        keySelected: [],
        dataSelected: [],
        isCheckAll: false,
      });
    }
  };

  const onSelectChangeLeft = async (selectedRowKeys, data) => {
    let selectedRowKeysService = data;
    // khi search thì selected data bị mất giá trị soLuong
    // => xử lý giữ lại giá trị số lượng đã nhập
    data.forEach((item1) => {
      state.dataSelected.forEach((item2) => {
        if (
          item1.dichVuId &&
          item2.dichVuId &&
          item1.dichVuId == item2.dichVuId
        ) {
          item1.soLuong = item2.soLuong || 1;
        }
      });

      if (!item1.soLuong) {
        item1.soLuong = 1;
      }
    });

    setState({
      selectedRowKeys: selectedRowKeys,
      listServiceSelected: data,
      keySelected: selectedRowKeys,
      dataSelected: selectedRowKeysService,
    });

    onSelected(selectedRowKeysService);
  };
  const onSelectChangeRight = (selectedRowKeys, data, item) => {
    setState({
      listServiceSelected: [...data].filter((i) => i),
      keySelected: selectedRowKeys,
      dataSelected: [...data].filter((i) => i),
    });
    // onSelectedNoPayment(selectedRowKeysService);
    onSelected(data);
  };
  const onChangePage = (page) => {
    getListDichVuSuatAn({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    getListDichVuSuatAn({ page: 0, size });
  };

  const rowSelectionLeft = {
    columnTitle: (
      <HeaderSearch
        // title={<Checkbox onChange={onCheckAll} checked={state?.isCheckAll} />}
        title=""
        isTitleCenter={true}
      />
    ),
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

  const onChangeInput = (type, data) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "dotXuat") {
      value = e.target.checked;
    }

    state.dataSelected.map((item) => {
      if (item.dichVuId == data.dichVuId) {
        if (type === "soLuong" && Number(value) <= 0 && value) {
          item.soLuong = null;
          message.error(t("khamBenh.donThuoc.nhapSoLuongLonHon0"));
        } else {
          item[type] = value;
        }
      }
    });

    onSelected(state.dataSelected);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const columnsTableLeft = [
    {
      title: <HeaderSearch isTitleCenter={true} title={"Tên dịch vụ"} />,
      dataIndex: "ten",
      key: "ten",
      width: 200,
    },
    // {
    //   title: <HeaderSearch isTitleCenter={true} title={"ĐVT"} />,
    //   dataIndex: "dvt",
    //   key: "dvt",
    //   width: 50,
    //   align: "right",
    // },
    {
      title: <HeaderSearch isTitleCenter={true} title={"Đơn giá"} />,
      dataIndex: "donGia",
      key: "donGia",
      width: 250,
      align: "right",
      render: (item, list, index) => {
        return `${formatDecimal(list?.giaKhongBaoHiem)} | BH: ${formatDecimal(
          list?.giaBaoHiem
        )} | Phụ thu: ${formatDecimal(list?.giaPhuThu)}`;
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
              onClick={() => openInNewTab("/danh-muc/dich-vu-an")}
            >
              {"Tên dịch vụ"}
            </div>
          }
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "47%",
      render: (item, data) => {
        return <div clickcheckbox="true">{item}</div>;
      },
    },
    {
      title: <HeaderSearch title={"SL"} isTitleCenter={true} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: 60,
      align: "right",
      render: (item, data, index) => {
        return (
          <WrapperInput className="form-item">
            <Input
              style={{
                border: !data.soLuong ? "1px solid red" : "unset",
                marginRight: 5,
              }}
              type="number"
              defaultValue={item}
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
      title: <HeaderSearch isTitleCenter={true} title={"Loại bữa ăn"} />,
      dataIndex: "loaiBuaAnId",
      key: "loaiBuaAnId",
      width: 120,
      render: (item, data, index) => {
        return (
          <WrapperSelect>
            <Select
              showSearch={true}
              onChange={onChangeInput("loaiBuaAnId", data)}
              data={listAllLoaiBuaAn}
              value={item}
            ></Select>
          </WrapperSelect>
        );
      },
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={"Đột xuất"} />,
      dataIndex: "dotXuat",
      key: "dotXuat",
      width: 60,
      align: "center",
      render: (item, data) => (
        <Checkbox checked={item} onChange={onChangeInput("dotXuat", data)} />
      ),
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

  const dataSource = useMemo(() => {
    return (listDvTonKho || []).map((item, index) => {
      item.key = item.dichVuId + "_" + index;
      return item;
    });
  }, [listDvTonKho]);

  return (
    <BoxWrapper>
      <GlobalStyle />
      <div className="content-left">
        <div className="title">
          <div className="title__left">{"Dịch vụ"}</div>
        </div>

        <div className="content-left-header-table">
          <TableWrapper
            rowKey={(record) => {
              return record.ma;
            }}
            columns={columnsTableLeft}
            dataSource={dataSource}
            rowSelection={rowSelectionLeft}
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
                    index == state.listServiceSelected?.length - 1
                      ? "add-border"
                      : ""
                  }`
                : `table-row-odd ${
                    index == state.listServiceSelected?.length - 1
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
                    {t("quanLyNoiTru.suatAn.khongCoDuLieuThuocDaChon")}
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

export default forwardRef(TableSuatAn);
