import React, { useEffect, useMemo, useRef } from "react";
import { Checkbox, Input, InputNumber } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import TabPanel from "components/MultiLevelTab/TabPanel";
let timer = null;

const ChuongTrinh = ({
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  onReset,
  updateData,
  dataSearch,
  onEdit,
  dataSort,
  dataEditDefault,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  setEditStatus,
  layerId,
}) => {
  const refSelectRow = useRef();
  const {
    phimTat: { onRemoveLayer, onRegisterHotkey },
    maGiamGia: { getListMaGiamGia, getListMaGiamGiaDaSuDung },
  } = useDispatch();

  const { listMaGiamGia } = useSelector((state) => state.maGiamGia);
  const { listAllChuongTrinhGiamGia } = useSelector(
    (state) => state.chuongTrinhGiamGia
  );

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      onEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-2-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  useEffect(() => {
    const res = combineSort(dataSort);
    getListMaGiamGia({ page, size, sort: res });
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName != "INPUT")
              refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName != "INPUT")
              refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId });
    };
  }, []);

  const data = useMemo(() => {
    return listMaGiamGia.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listMaGiamGia]);

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    getListMaGiamGia({
      page: PAGE_DEFAULT,
      size: size,
      sort: res,
      ...dataSearch,
    });
  };

  const onChangeInputSearch = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListMaGiamGia({
        ...dataSearch,
        page: 0,
        size: size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 500);
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    onChangeInputSearch(value, key);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      setEditStatus(true);
      onEdit(record.action);
      getListMaGiamGiaDaSuDung({ maGiamGiaId: record.id });
    },
  });

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã voucher"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort.ma || 0}
          search={<Input placeholder="Tìm mã" onChange={onSearchInput("ma")} />}
        />
      ),
      width: 150,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Mô tả"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSort.moTa || 0}
          search={
            <Input placeholder="Tìm mô tả" onChange={onSearchInput("moTa")} />
          }
        />
      ),
      width: 120,
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSort.soLuong || 0}
          search={
            <InputNumber
              placeholder="Tìm số lượng"
              onChange={onSearchInput("soLuong")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  return (
    <TabPanel>
      <TableWrapper
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={
          checkRole([ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA_THEM])
            ? [
                {
                  content: (
                    <>
                      <Select
                        defaultValue={""}
                        data={listAllChuongTrinhGiamGia}
                        placeholder="Chọn chương trình giảm giá"
                        onChange={onSearchInput("chuongTrinhGiamGiaId")}
                      />
                    </>
                  ),
                },
                {
                  title: "Thêm mới [F1]",
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
              ]
            : [
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
              ]
        }
        columns={columns}
        dataSource={data}
        onRow={onRow}
        layerId={layerId}
        dataEditDefault={dataEditDefault}
        // rowClassName={(record, index) =>
        //   dataEditDefault?.id === record.id
        //     ? "row-actived row-id-2-" + record.id
        //     : "row-id-2-" + record.id
        // }
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
    </TabPanel>
  );
};

export default ChuongTrinh;
