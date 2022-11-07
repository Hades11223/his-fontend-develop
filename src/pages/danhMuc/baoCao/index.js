import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import { HOST } from "client/request";
import BaseDm3 from "../BaseDm3";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";

import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
  ENUM,
} from "constants/index";
import { checkRole } from "utils/role-utils";
import { IN_NHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import BaoCaoChiTiet from "./BaoCaoChiTiet";
import ThietLapChanKy from "./ThietLapChanKy";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
import { useEnum, useStore } from "hook";
const getUploadedFileName = (url = "") => {
  const indexSlash = url?.lastIndexOf("/");
  let updatedName = url?.slice(indexSlash + 1);

  return `${updatedName}`;
};

const BaoCao = () => {
  const [form] = Form.useForm();

  const {
    baoCao: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      updateData,
      getByBaoCaoId,
    },
  } = useDispatch();

  const { totalElements, page, size, dataSortColumn, dataEditDefault } =
    useSelector((state) => state.baoCao);
  const listBaoCao = useStore("baoCao.listBaoCao", []);

  const [listHuongGiay] = useEnum(ENUM.HUONG_GIAY);
  const [listKhoGiay] = useEnum(ENUM.KHO_GIAY);
  const [listDinhDangBaoCao] = useEnum(ENUM.DINH_DANG_BAO_CAO);
  const [collapseStatus, setCollapseStatus] = useState(false);

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    isSelected: false,
    showFullTable: false,
    activeKeyTab: "1",
  });
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSave1 = useRef();
  const refSave2 = useRef();
  const refSelectRow = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
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
      (listBaoCao?.findIndex((item) => item.id === dataEditDefault?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listBaoCao.length) {
      updateData({ dataEditDefault: listBaoCao[indexNextItem] });
      getByBaoCaoId(listBaoCao[indexNextItem].id);
      setState({
        mauBaoCao: listBaoCao[indexNextItem].mauBaoCao,
        editStatus: true,
        isSelected: true,
        defaultFileList: listBaoCao[indexNextItem]?.mauBaoCao
          ? [
              {
                uid: "1",
                name: getUploadedFileName(listBaoCao[indexNextItem].mauBaoCao),
                url: `${HOST}/api/his/v1/files/${listBaoCao[indexNextItem]?.mauBaoCao}`,
              },
            ]
          : [],
      });
      form.setFieldsValue(listBaoCao[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + listBaoCao[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;
    if (activeKeyTab === "1" && refSave1.current) refSave1.current(e);
    if (activeKeyTab === "6" && refSave2.current) refSave2.current(e);
  };
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onSizeChange({ size: 10 });
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      mauBaoCao: null,
      defaultFileList: [],
      invalidMauBaoCao: false,
      isSelected: true,
    });
    form.resetFields();
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    getByBaoCaoId(data.id);
    setState({
      mauBaoCao: data.mauBaoCao,
      editStatus: true,
      isSelected: true,
      defaultFileList: data?.mauBaoCao
        ? [
            {
              uid: "1",
              name: getUploadedFileName(data.mauBaoCao),
              url: `${HOST}/api/his/v1/files/${data?.mauBaoCao}`,
            },
          ]
        : [],
    });
    form.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
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

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "70px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã báo cáo"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã báo cáo"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên báo cáo"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên báo cáo"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Khổ giấy"
          sort_key="khoGiay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoGiay"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listKhoGiay || [])]}
              placeholder="Chọn khổ giấy"
              onChange={onSearchInput("khoGiay")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "khoGiay",
      key: "khoGiay",
      render: (record) => {
        const currentName = (listKhoGiay || []).find(
          (item) => item.id === record
        );
        return <span>{currentName?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Kích thước chiều dọc(mm)"
          sort_key="chieuDoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["chieuDoc"] || 0}
          search={
            <Input
              placeholder="Tìm theo kích thước chiều dọc"
              onChange={onSearchInput("chieuDoc")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "chieuDoc",
      key: "chieuDoc",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Kích thước chiều ngang(mm)"
          sort_key="chieuNgang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["chieuNgang"] || 0}
          search={
            <Input
              placeholder="Tìm theo kích thước chiều ngang"
              onChange={onSearchInput("chieuNgang")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "chieuNgang",
      key: "chieuNgang",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Hướng giấy"
          sort_key="huongGiay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["huongGiay"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listHuongGiay || [])]}
              placeholder="Chọn hướng giấy"
              onChange={onSearchInput("huongGiay")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "huongGiay",
      key: "huongGiay",
      render: (record) => {
        const currentName = (listHuongGiay || []).find(
          (item) => item.id === record
        );
        return <span>{currentName?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Định dạng xuất file"
          sort_key="dinhDang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dinhDang"] || 0}
          searchSelect={
            <Select
              defaultValue={null}
              data={[
                { id: null, ten: "Tất cả" },
                ...(listDinhDangBaoCao || []),
              ]}
              placeholder="Chọn định dạng"
              onChange={onSearchInput("dinhDang")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "dinhDang",
      key: "dinhDang",
      render: (record) => {
        const dinhDangBC =
          (listDinhDangBaoCao || []).find((element) => element.id === record) ||
          {};
        return <span>{dinhDangBC.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="In nhanh"
          sort_key="inNhanh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["inNhanh"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={IN_NHANH_KYSO}
              placeholder="Chọn in nhanh"
              onChange={onSearchInput("inNhanh")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "inNhanh",
      key: "inNhanh",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ký số"
          sort_key="kySo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["kySo"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={IN_NHANH_KYSO}
              placeholder="Chọn ký số"
              onChange={onSearchInput("kySo")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "kySo",
      key: "kySo",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: "100px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return (
          <BaoCaoChiTiet
            stateParent={state}
            setStateParent={setState}
            refCallbackSave={refSave1}
          />
        );
      },
    },
    {
      key: 6,
      title: "THIẾT LẬP CHÂN KÝ",
      render: () => {
        return (
          <ThietLapChanKy
            stateParent={state}
            setStateParent={setState}
            refCallbackSave={refSave2}
          />
        );
      },
    },
  ];
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
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  return (
    <BaseDm3
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục báo cáo",
          link: "/danh-muc/bao-cao",
        },
      ]}
    >
      <Col
        {...(!state.showFullTable
          ? collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        span={state.showFullTable ? 24 : null}
        className={`pr-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
      >
        <TableWrapper
          title="DANH MỤC BÁO CÁO"
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
            checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM])
              ? [
                  {
                    title: "Thêm mới [F1]",
                    onClick: handleClickedBtnAdded,
                    buttonHeaderIcon: (
                      <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                    ),
                  },
                  {
                    className: `btn-change-full-table ${
                      state?.showFullTable ? "small" : "large"
                    }`,
                    title: (
                      <Icon
                        component={state.showFullTable ? thuNho : showFull}
                      />
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
                ]
              : [
                  {
                    className: `btn-change-full-table ${
                      state?.showFullTable ? "small" : "large"
                    }`,
                    title: (
                      <Icon
                        component={state.showFullTable ? thuNho : showFull}
                      />
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
                ]
          }
          columns={columns}
          dataSource={listBaoCao}
          onRow={onRow}
          rowClassName={setRowClassName}
        />
        {totalElements ? (
          <Pagination
            listData={listBaoCao}
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
          />
        ) : null}
      </Col>
      {!state.showFullTable && (
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <MultiLevelTab
            listPanel={listPanel}
            isBoxTabs={true}
            activeKey={state.activeKeyTab}
            onChange={(activeKeyTab) => setState({ activeKeyTab })}
          ></MultiLevelTab>
        </Col>
      )}
    </BaseDm3>
  );
};

export default BaoCao;
