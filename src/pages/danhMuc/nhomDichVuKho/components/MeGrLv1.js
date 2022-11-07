import React, { useEffect, useState } from "react";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { combineSort } from "utils";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { Checkbox, Input } from "antd";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
let timer = null;

const MeGrLv1 = (props) => {
  const {
    listMeGrLv1,
    page,
    size,
    total,
    sortData,
    searchData,
    dataSearch,
    updateData,
    getListMeGrLv1,
    formMeGrLv1Ref,
    setEditStatus,
    handleChangeshowTable,
    showFullTable,
    collapseStatus,
    handleCollapsePane,
  } = props;
  const [dataEdit, setDataEdit] = useState({});
  // // const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);

  useEffect(() => {
    const sort = combineSort(sortData);
    const params = { page, size, sort, loaiDichVu: 90 };
    getListMeGrLv1(params);
  }, []);

  useEffect(() => {
    const data = listMeGrLv1.map((item, index) => {
      return { ...item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listMeGrLv1, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...sortData, [key]: value };
    updateData({ sortMeGrLv1: sort });
    const res = combineSort(sort);
    getListMeGrLv1({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...searchData,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
          search={
            <Input
              placeholder="Tìm mã nhóm thuốc cấp 1"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm thuốc cấp 1"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm thuốc cấp 1"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ten",
      key: "ten",
    },

    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={sortData.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 9,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearchMeGrLv1: { ...searchData, [name]: value } });
      getListMeGrLv1({
        loaiDichVu: 90,
        ...searchData,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(sortData),
      });
    }, 500);
  };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListMeGrLv1({
      loaiDichVu: 90,
      ...params,
      ...searchData,
      sort: combineSort(sortData),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListMeGrLv1({
      loaiDichVu: 90,
      ...params,
      ...dataSearch,
      sort: combineSort(sortData),
    });
  };

  const onClick = () => {};

  // const handleAdded = (e) => {
  //   e.preventDefault();
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       if (editStatus) {
  //         values = { ...values, id: dataEditDefault.id };
  //       }
  //       createOrEdit(values).then(() => {
  //         const params = {
  //           page,
  //           size,
  //           ...dataSearch,
  //           sort: combineSort(sortData),
  //         };
  //         if (!editStatus) {
  //           params.page = PAGE_DEFAULT;
  //           form.resetFields();
  //         }
  //         getListMeGrLv(params);
  //       });
  //     })
  //     .catch((error) => {});
  // };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditMeGrLv1Default: data, editStatusMeGrLv1: true });
    formMeGrLv1Ref.current.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setDataEdit(record);
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    formMeGrLv1Ref.current.resetFields();
    updateData({ dataEditMeGrLv1Default: {}, editStatusMeGrLv1: false });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  return (
    <div>
      <TableWrapper
        classNameRow={"custom-header"}
        scroll={{ x: 1100 }}
        styleMain={{ marginTop: 0 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={
          checkRole([ROLES["DANH_MUC"].NHOM_THUOC_THEM])
            ? [
                {
                  title: "Thêm mới",
                  onClick: handleClickedBtnAdded,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
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
                  className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
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
        rowClassName={setRowClassName}
      ></TableWrapper>
      {total && (
        <Pagination
          listData={data}
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          listData={data}
          total={total}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

export default MeGrLv1;
