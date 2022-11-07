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

const MeGrLv2 = (props) => {
  const {
    listSelectMeGrLv1,
    listMeGrLv2,
    page,
    size,
    total,
    sortData,
    searchData,
    dataSearch,
    updateData,
    getListMeGrLv2,
    getListMeGrLv1,
    formMeGrLv2Ref,
    dataEditMeGrLv1Default,
    setEditStatus,
    handleChangeshowTable,
    showFullTable,
    collapseStatus,
    handleCollapsePane,
  } = props;
  // const [editStatus, setEditStatus] = useState(false);
  // // const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [dataEdit, setDataEdit] = useState({});
  const [data, setData] = useState([]);
  const [valueFilter, setValueFilter] = useState("");

  useEffect(() => {
    const sort = combineSort(sortData);
    const params = { page, size, sort };
    getListMeGrLv2(params);
    getListMeGrLv1({
      ...params,
      size: 1000,
      isShowSelect: true,
      loaiDichVu: 90,
    });
  }, []);

  useEffect(() => {
    const data = listMeGrLv2.map((item, index) => {
      return { ...item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listMeGrLv2, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...sortData, [key]: value };
    updateData({ sortMeGrLv2: sort });
    const res = combineSort(sort);
    getListMeGrLv2({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...searchData,
    });
  };

  useEffect(() => {
    if (dataEditMeGrLv1Default?.id) {
      setValueFilter(dataEditMeGrLv1Default.id);
      updateData({
        dataSearchMeGrLv2: {
          ...dataSearch,
          nhomDvKhoCap1Id: dataEditMeGrLv1Default.id,
        },
      });
      onSearchInput(dataEditMeGrLv1Default.id, "nhomDvKhoCap1Id");
    }
  }, [dataEditMeGrLv1Default?.id]);

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
              placeholder="Tìm mã nhóm thuốc cấp 2"
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
          title="Nhóm thuốc cấp 2"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm thuốc cấp 2"
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
      updateData({ dataSearchMeGrLv2: { ...searchData, [name]: value } });
      getListMeGrLv2({
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
    getListMeGrLv2({
      ...params,
      ...searchData,
      sort: combineSort(sortData),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListMeGrLv2({
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
    updateData({ dataEditMeGrLv2Default: data, editStatusMeGrLv2: true });
    formMeGrLv2Ref.current.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setDataEdit(record);
        onShowAndHandleUpdate(record);
      },
    };
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    formMeGrLv2Ref.current.resetFields();
    updateData({ dataEditMeGrLv2Default: {}, editStatusMeGrLv2: false });
  };

  return (
    <div className="me-gr-lv2">
      {/* {checkRole([ROLES["DANH_MUC"].NHOM_THUOC_THEM]) && (
        <div className="drop-list">
          <span>Lọc theo nhóm thuốc cấp 1</span>
          <Select
            value={valueFilter}
            style={{ width: 200 }}
            data={[{ id: "", ten: "Tất cả" }, ...listSelectMeGrLv1]}
            placeholder="Chọn nhóm thuốc cấp 1"
            onChange={(value) => {
              setValueFilter(value);
              onSearchInput(value, "nhomDvKhoCap1Id");
            }}
          />
        </div>
      )} */}
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
          checkRole([ROLES["DANH_MUC"].NHOM_THUOC_THEM])
            ? [
                {
                  content: (
                    <>
                      <Select
                        value={valueFilter}
                        data={[{ id: "", ten: "Tất cả" }, ...listSelectMeGrLv1]}
                        placeholder="Chọn tỉnh"
                        onChange={(value) => {
                          setValueFilter(value);
                          onSearchInput(value, "nhomDvKhoCap1Id");
                        }}
                        // style={customeSelect}
                      />
                    </>
                  ),
                },
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
                  content: (
                    <>
                      <Select
                        value={valueFilter}
                        data={[{ id: "", ten: "Tất cả" }, ...listSelectMeGrLv1]}
                        placeholder="Chọn tỉnh"
                        onChange={(value) => {
                          setValueFilter(value);
                          onSearchInput(value, "nhomDvKhoCap1Id");
                        }}
                        // style={customeSelect}
                      />
                    </>
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

export default MeGrLv2;
