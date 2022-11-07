import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { Main } from "./styled";
import IcCreate from "assets/images/kho/IcCreate.png";
import PrinterInfo from "./components/PrinterInfo";
import { SORT_DEFAULT } from "./configs";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  ROLES,
} from "constants/index";
import FormWraper from "components/FormWraper";
import { checkRole } from "utils/role-utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";

const MayIn = ({
  listData,
  onSizeChange,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearch,
  dataEditDefault,
  createOrEdit,
  getUtils,
  listkhoGiay,
  listhuongGiay,
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef([]);

  const [state, _setState] = useState({
    editStatus: false,
    manualPrinters: [],
    showFullTable: false,
  });
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (listData?.findIndex((item) => item.id === state.currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      const listMayIn = listData[indexNextItem].dsMayIn;
      let listIdx = [];
      listMayIn.forEach((item, index) => {
        if (item.dsKhoGiay?.length > 0) {
          listIdx.push(index);
        }
      });
      setState({
        manualPrinters: listIdx,
      });
      onShowAndHandleUpdate(listData[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    onSizeChange({ size: 10 });
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
  }, []);

  const onShowAndHandleUpdate = (data = {}) => {
    form.setFieldsValue({
      maSo: data.maSo,
    });
    setState({
      currentItem: { ...data },
      editStatus: true,
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        const listMayIn = record.dsMayIn;
        let listIdx = [];
        listMayIn.forEach((item, index) => {
          if (item.dsKhoGiay?.length > 0) {
            listIdx.push(index);
          }
        });
        setState({
          manualPrinters: listIdx,
        });
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const settingPrinter = (e) => {
    const { target } = e;
    let updatedList = state.manualPrinters.filter(
      (item) => item !== target.value
    );
    updatedList = [...updatedList, ...(target.checked ? [target.value] : [])];

    setState({
      manualPrinters: updatedList,
    });
  };

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleAdded = (e) => {
    e.preventDefault();
    const newDsMayIn = [];
    let formOrder = 1;
    if (formRef.current) {
      (state.currentItem?.dsMayIn || []).forEach((item, index) => {
        formRef.current[index]
          .validateFields()
          .then((info) => {
            newDsMayIn.push({
              ten: info.ten,
              dsKhoGiay: !state.manualPrinters.includes(info.dataKey)
                ? []
                : [
                    {
                      chieuDoc: info.chieuDoc,
                      chieuNgang: info.chieuNgang,
                      huongGiay: info.huongGiay,
                      khoGiay: info.khoGiay,
                    },
                  ],
            });
            if (formOrder === state.currentItem.dsMayIn.length) {
              const formattedData = {
                ...state.currentItem,
                dsMayIn: newDsMayIn,
              };

              createOrEdit(formattedData).then(() => {
                if (!state.editStatus) {
                  onSizeChange({ size: 10 });
                }
              });
            }
            formOrder++;
          })
          .catch((err) => {});
      });
    }
  };
  refClickBtnAdd.current = handleAdded;
  refClickBtnSave.current = handleAdded;

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "30px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã máy tính"
          sort_key="maSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maSo"] || 0}
          search={
            <Input
              placeholder="Tìm mã máy tính"
              onChange={onSearchInput("maSo")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "maSo",
      key: "maSo",
    },
    {
      title: (
        <HeaderSearch
          title="Tên máy in"
          search={
            <Input
              placeholder="Tìm tên máy in"
              onChange={onSearchInput("tenMayIn")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "dsMayIn",
      key: "dsMayIn",
      render: (item) => {
        const listPrinter = item.map((d) => d.ten);
        return <span>{listPrinter.toString()}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ IP"
          search={
            <Input
              placeholder="Tìm theo địa chỉ IP"
              onChange={onSearchInput("ip")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "dsIp",
      key: "dsIp",
      render: (item) => {
        const listIP = item.map((d) => d.ip);
        return (
          <span>
            {listIP
              .map((item, idx) =>
                idx !== listIP.length && idx !== 0 ? ` ${item}` : item
              )
              .toString()}
          </span>
        );
      },
    },
  ];
  const setRowClassName = (record) => {
    let idDiff = state.currentItem?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  return (
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Danh mục máy in"
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={[
              {
                title: "Thêm mới [F1]",
                onClick: handleAdded,
                buttonHeaderIcon: (
                  <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                ),
              },
              {
                className: `btn-change-full-table ${state?.showFullTable ? "small" : "large"}`,
                title: (
                  <Icon component={state.showFullTable ? thuNho : showFull} />
                ),
                onClick: handleChangeshowTable,
              },
              {
                className: "btn-collapse",
                title: (
                  <Icon
                    component={collapseStatus ? extendTable : extendChiTiet}
                  />
                ),
                onClick: handleCollapsePane,
              },
            ]}
            columns={columns}
            dataSource={listData}
            onRow={onRow}
            rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listData}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <CreatedWrapper
              title="Thông tin chi tiết"
              onCancel={handleCancel}
              cancelText="Hủy"
              onOk={handleAdded}
              okText="Lưu [F4]"
              overflowX
              roleEdit={[ROLES["DANH_MUC"].MAY_IN_SUA]}
              editStatus={state.currentItem?.id}
            >
              <div className="custom-w">
                <FormWraper
                  disabled={!checkRole([ROLES["DANH_MUC"].MAY_IN_SUA])}
                  form={form}
                  layout="vertical"
                >
                  {state.currentItem?.id && (
                    <Form.Item label="Mã máy tính" name="maSo">
                      <Input className="input-option" disabled />
                    </Form.Item>
                  )}
                  <div>
                    {(state?.currentItem?.dsMayIn || []).map((item, index) => {
                      return (
                        <div className="custom-checkbox">
                          <Checkbox
                            checked={state.manualPrinters.includes(index)}
                            value={index}
                            onChange={settingPrinter}
                          />
                          <PrinterInfo
                            manualPrint={state.manualPrinters.includes(index)}
                            dataKey={index}
                            key={`${index}-${item.ten}`}
                            listhuongGiay={listhuongGiay}
                            listkhoGiay={listkhoGiay}
                            data={item}
                            ref={(el) => (formRef.current[index] = el)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </FormWraper>
              </div>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = ({
  mayIn: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  utils: { listkhoGiay, listhuongGiay },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listhuongGiay,
    listkhoGiay,
  };
};
const mapDispatchToProps = ({
  mayIn: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  createOrEdit,
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(MayIn);
