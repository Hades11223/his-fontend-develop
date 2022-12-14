import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "antd";
import { useDispatch } from "react-redux";
import {
  Pagination,
  HeaderSearch,
  TableWrapper,
  Select,
  InputTimeout,
} from "components";
import Icon from "@ant-design/icons";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import { HIEU_LUC } from "constants/index";
import { GoiPtTtStyled } from "./styled";

const GoiPtTt = ({
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  handleChangeshowTable,
  setEditStatus,
  layerId,
  page,
  size,
  total,
  searchGoiPtTt,
  listGoiPtTt,
  onEditGoiPtTt,
  listAllPhong,
  onReset,
}) => {
  const [dataEditDefault, setDataEditDefault] = useState(null);
  const refSelectRow = useRef();
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  //state
  const [state, _setState] = useState({
    data: [],
    searchParams: {
      page: 0,
      size: 10,
    },
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
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
      onRemoveLayer({ layerId });
    };
  }, []);

  useEffect(() => {
    searchGoiPtTt({
      ...state.searchParams,
      // sort: combineSort(sortData),
    });
  }, []);

  const onPageChange = (page) => {
    searchGoiPtTt({
      ...state.searchParams,
      page: page - 1,
    });
  };

  const onSizeChange = (size) => {
    searchGoiPtTt({
      ...state.searchParams,
      size,
    });
  };

  const onClickSort = (key, value) => {};

  const onSearchInput = (value, name) => {
    const searchParams = { ...state.searchParams, [name]: value };
    searchGoiPtTt({
      ...searchParams,
    });

    setState({ searchParams });
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      setEditStatus(true);
      setDataEditDefault(record.action);
      onEditGoiPtTt(record.action);
    },
  });

  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? g??i"
          sort_key="ma"
          onClickSort={onClickSort}
          search={
            <InputTimeout
              placeholder="T??m m?? g??i"
              onChange={(e) => {
                onSearchInput(e, "ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu.ma",
      render: (item) => item?.ma || "",
    },
    {
      title: (
        <HeaderSearch
          title="T??n g??i"
          sort_key="ten"
          onClickSort={onClickSort}
          search={
            <InputTimeout
              placeholder="T??m t??n g??i"
              onChange={(e) => {
                onSearchInput(e, "ten");
              }}
            />
          }
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu.ten",
      render: (item) => item?.ten || "",
    },
    {
      title: (
        <HeaderSearch
          title="????n gi?? kh??ng BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu.giaKhongBaoHiem",
      render: (item) => {
        return (item?.giaKhongBaoHiem || 0).formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ph??ng th???c hi???n"
          sort_key="phongThucHienId"
          onClickSort={onClickSort}
        />
      ),
      width: 150,
      dataIndex: "phongThucHienId",
      key: "phongThucHienId",
      render: (item) => {
        return (listAllPhong || []).find((el) => el.id === item)?.ten || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m DV C???p 1"
          sort_key="nhomDichVuCap1"
          onClickSort={onClickSort}
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu.nhomDichVuCap1.ten",
      render: (item) => item?.nhomDichVuCap1?.ten || "",
    },
    {
      title: (
        <HeaderSearch
          title="Ghi ch??"
          sort_key="ghiChu"
          onClickSort={onClickSort}
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu.ghiChu",
      render: (item) => item?.ghiChu || "",
    },
    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 90,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const data = listGoiPtTt.map((item, index) => {
    return {
      ...item,
      action: item,
      stt: page * size + index + 1,
    };
  });

  return (
    <GoiPtTtStyled>
      <div className="table-content">
        <TableWrapper
          classNameRow={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
          buttonHeader={[
            {
              title: "Th??m m???i [F1]",
              onClick: onReset,
              buttonHeaderIcon: (
                <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
              ),
            },
            {
              className: `btn-change-full-table ${
                showFullTable ? "small" : "large"
              }`,
              title: <Icon component={showFullTable ? thuNho : showFull} />,
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
          columns={columnsService}
          dataSource={data}
          onRow={onRow}
          rowClassName={setRowClassName}
          styleWrap={{ height: "100%" }}
        />
        {total && (
          <Pagination
            onChange={onPageChange}
            current={page + 1}
            pageSize={size}
            total={total}
            listData={data}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>
    </GoiPtTtStyled>
  );
};
export default GoiPtTt;
