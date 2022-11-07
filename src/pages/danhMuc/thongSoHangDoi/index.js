import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { MUC_DO_UU_TIEN, ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
import BaseDmWrap from "components/BaseDmWrap";
import { HeaderSearch, Select, TableWrapper } from "components";
import { Checkbox, Form, InputNumber, Row, Tooltip } from "antd";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useEnum } from "hook";
import { cloneDeep } from "lodash";

const { ColumnDm, ColumnSelect } = TableWrapper;

const defaultHangCho = (listDoiTuongHangDoi) => {
  const dataTable = listDoiTuongHangDoi.map((item, index) => {
    return {
      key: "key" + index,
      id: `${item?.id}_${item?.uuTien}_${item?.hieuLuc}`,
      doiTuong: item?.id,
      uuTien: item?.id,
      hieuLuc: true,
    };
  });

  return {
    dataTable,
    dataTableDefault: cloneDeep(dataTable),
  };
};

const ThongSoHangDoi = (props) => {
  const { t } = useTranslation();
  const [listLoaiPhongHangDoi] = useEnum("loaiPhong", []);
  const [listDoiTuongHangDoi] = useEnum("DoiTuongHangDoi", []);

  const [state, _setState] = useState({
    editStatus: false,
    addedDisabledOk: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (listDoiTuongHangDoi?.length > 0)
      setState(defaultHangCho(listDoiTuongHangDoi));
  }, [listDoiTuongHangDoi]);

  const getColumns = ({ baseColumns = {}, handleDeleteItem, ...rest }) => [
    baseColumns.stt,
    ColumnSelect({
      ...rest,
      title: "Loại phòng",
      dataIndex: "loaiPhong",
      dataSelect: listLoaiPhongHangDoi,
    }),
    ColumnDm({
      ...rest,
      title: "SL NB tối đa ô đang khám/ thực hiện",
      dataIndex: "slDangThucHien",
    }),
    ColumnDm({
      ...rest,
      title: "SL NB tối đa ô tiếp theo",
      dataIndex: "slTiepTheo",
    }),
    ColumnDm({
      ...rest,
      title: "Tiện ích",
      width: 30,
      align: "center",
      render: (_, data) => (
        <>
          <Tooltip title="Xóa thông số" placement="bottom">
            <img
              src={IconDelete}
              alt="..."
              onClick={() => handleDeleteItem(data)}
            />
          </Tooltip>
        </>
      ),
    }),
  ];

  const onChangeInputData = (key, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.checked;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    const dataTable = [...state.dataTable];
    dataTable[index][key] = value;
    setState({
      dataTable,
      addedDisabledOk:
        JSON.stringify(state.dataTableDefault) === JSON.stringify(dataTable),
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title="Loại đối tượng" />,
      width: 200,
      dataIndex: "doiTuong",
      key: "doiTuong",
      align: "left",
      render: (item) => {
        return listDoiTuongHangDoi.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Mức độ ưu tiên" />,
      width: 60,
      dataIndex: "uuTien",
      key: "uuTien",
      align: "center",
      render: (item, data, index) => {
        if (state.currentIndex === index) {
          return (
            <Select
              onChange={onChangeInputData("uuTien", index)}
              defaultValue={item}
              data={MUC_DO_UU_TIEN}
            ></Select>
          );
        } else {
          return MUC_DO_UU_TIEN.find((x) => x.id == item)?.ten;
        }
      },
    },
    {
      title: <HeaderSearch title="Sắp xếp vào QMS" />,
      width: 70,
      dataIndex: "hieuLuc",
      key: "hieuLuc",
      align: "center",
      render: (item, data, index) => {
        if (state.currentIndex === index) {
          return (
            <Checkbox
              onChange={onChangeInputData("hieuLuc", index)}
              defaultValue={item}
            ></Checkbox>
          );
        } else {
          return <Checkbox checked={item}></Checkbox>;
        }
      },
    },
  ];

  const onRow = (record = {}, index) => ({
    onClick: (event) => {
      setState({ currentIndex: index, dataEditDefault: record });
    },
  });

  const renderForm = ({ refAutofocus }) => {
    return (
      <>
        <Form.Item
          label="Loại phòng:"
          name="loaiPhong"
          className="w100"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại phòng",
            },
          ]}
        >
          <Select
            autoFocus={true}
            data={listLoaiPhongHangDoi}
            placeholder="Chọn loại phòng"
            refSelect={refAutofocus}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Số lượng NB tối đa hiển thị ở ô Đang khám/ thực hiện:"
          name="slDangThucHien"
          className="w100"
          rules={[
            {
              required: true,
              message:
                "Vui lòng nhập số lượng NB tối đa hiển thị ở ô Đang khám/ thực hiện!",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]*$/),
              message: "SL cần nhập phải là số nguyên có giá trị từ 1 - 100",
            },
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (Number(value) > 100) {
                    callback(
                      new Error(
                        "SL cần nhập phải là số nguyên có giá trị từ 1 - 100"
                      )
                    );
                  } else {
                    callback();
                  }
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <InputNumber
            type="number"
            style={{ width: "100%" }}
            defaultValue={1}
            className="input-option"
          />
        </Form.Item>
        <Form.Item
          label="Số lượng NB tối đa hiển thị ở ô tiếp theo:"
          name="slTiepTheo"
          className="w100"
          rules={[
            {
              required: true,
              message:
                "Vui lòng nhập số lượng NB tối đa hiển thị ở ô tiếp theo!",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]*$/),
              message: "SL cần nhập phải là số nguyên có giá trị từ 1 - 100",
            },
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (Number(value) > 100) {
                    callback(
                      new Error(
                        "SL cần nhập phải là số nguyên có giá trị từ 1 - 100"
                      )
                    );
                  } else {
                    callback();
                  }
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <InputNumber
            type="number"
            style={{ width: "100%" }}
            defaultValue={1}
            className="input-option"
          />
        </Form.Item>

        <h1>Thiết lập gọi loại đối tượng vào hàng chờ</h1>
        <div>
          <TableWrapper
            columns={columns}
            dataSource={state.dataTable}
            dataEditDefault={state.dataEditDefault}
            rowKey={(record) => record.doiTuong}
            onRow={onRow}
          ></TableWrapper>
        </div>
      </>
    );
  };

  const onShowUpdate = ({}, item) => {
    const cloneItem = cloneDeep(item);
    let dataTable = cloneItem.dsDoiTuong
      ? cloneItem.dsDoiTuong.map((item, index) => {
          return {
            ...item,
            key: "key" + index,
            id: `${item?.id}_${item?.uuTien}_${item?.hieuLuc}`,
          };
        })
      : listDoiTuongHangDoi.map((item, index) => {
          return {
            key: "key" + index,
            id: `${item?.id}_${item?.uuTien}_${item?.hieuLuc}`,
            doiTuong: item?.id,
            uuTien: item?.id,
            hieuLuc: true,
          };
        });
    setState({
      dataTableDefault: cloneDeep(dataTable),
      dataTable,
      currentIndex: -1,
      addedDisabledOk: true,
    });
  };

  const beforeSubmit = (data) => {
    return { ...data, dsDoiTuong: state.dataTable };
  };
  const onReset = () => {
    setState({
      ...defaultHangCho(listDoiTuongHangDoi),
      addedDisabledOk: true,
      currentIndex: null,
    });
  };

  const onClickCancel = () => {
    setState({
      dataTable: cloneDeep(state.dataTableDefault),
      currentIndex: -1,
    });
  };

  return (
    <Main>
      <BaseDmWrap
        listLink={[
          { title: t("thietLap.thietLap"), link: "/thiet-lap" },
          {
            title: t("thietLap.thongSoHangDoi"),
            link: "/thiet-lap/thong-so-hang-doi",
          },
        ]}
        titleTable="Thông số hàng đợi theo loại phòng"
        getColumns={getColumns}
        renderForm={renderForm}
        roleSave={ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM}
        roleEdit={ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_SUA}
        storeName="thietLapHangDoi"
        classNameForm={"form-custom--one-line"}
        onShowUpdate={onShowUpdate}
        beforeSubmit={beforeSubmit}
        onReset={onReset}
        onCancel={onClickCancel}
        addedDisabledOk={state.addedDisabledOk}
      />
    </Main>
  );
};

export default ThongSoHangDoi;
