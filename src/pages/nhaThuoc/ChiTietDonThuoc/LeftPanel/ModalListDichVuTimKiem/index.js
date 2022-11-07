import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";
import InputTimeout from "components/InputTimeout";
import { isEmpty } from "lodash";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import ModalRequest from "./ModalRequest";
import { ModalNotification2 } from "components/ModalConfirm";
import { THEO_SO_LUONG_TON_KHO } from "constants/index";

const ModalListDichVuTimKiem = (props, ref) => {
  const refModal = useRef(null);
  const refModalNotification = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickSearch = useRef();
  const refSelectRow = useRef();
  const refOk = useRef();
  const refCallback = useRef();
  const refModalRequest = useRef(null);
  const {
    thuocChiTiet: {
      listAllDichVuTonKho,
      dataEditDefault,
      page,
      size,
      totalElements,
      infoPatient,
      dsThuocTamThoi,
    },
  } = useSelector((state) => state);
  const {
    thuocChiTiet: { onSearchAllDichVuTonKho, onAddThuocVaoDon, updateData },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();
  const [state, _setState] = useState({
    dataSearch: {},
    dataSortColumnModal: { ten: 1 },
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [state.show]);

  const onClickSort = (key, value) => {
    setState({
      dataSortColumnModal: {
        ...(state.dataSortColumnModal || {}),
        [key]: value,
      },
    });
    onSearch({ page: 0 });
  };
  const onSearchInput = (key) => (value) => {
    const dataSearch = state.dataSearch || {};
    dataSearch[key] = value;
    state.dataSearch = dataSearch;
    onSearch({ page: 0 });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" isTitleCenter={true} />,
      key: "index",
      dataIndex: "index",
      width: "5%",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="ma"
          dataSort={state.dataSortColumnModal["ma"] || 0}
          onClickSort={onClickSort}
          isTitleCenter={true}
          search={
            <InputTimeout
              placeholder="Bấm F6 để focus chuột vào trường Nhập hoặc quét mã dịch vụ, tên dịch vụ - Hiển thị dạng ngoặc vuông trước text : [F6] Nhập hoặc quét mã dịch vụ, tên dịch vụ"
              onChange={onSearchInput("ma")}
              value={state.dataSearch["ma"]}
            />
          }
        />
      ),
      width: "15%",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="ten"
          dataSort={state.dataSortColumnModal["ten"] || 0}
          onClickSort={onClickSort}
          isTitleCenter={true}
          search={
            <InputTimeout
              placeholder="Bấm F6 để focus chuột vào trường Nhập hoặc quét mã dịch vụ, tên dịch vụ - Hiển thị dạng ngoặc vuông trước text : [F6] Nhập hoặc quét mã dịch vụ, tên dịch vụ"
              onChange={onSearchInput("ten")}
              ref={refClickSearch}
              value={state.dataSearch["ten"]}
            />
          }
        />
      ),
      width: "20%",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Tên hoạt chất"
          sort_key="tenHoatChat"
          dataSort={state.dataSortColumnModal["tenHoatChat"] || 0}
          onClickSort={onClickSort}
          isTitleCenter={true}
          search={
            <InputTimeout
              // ref={refClickSearch}
              placeholder="Bấm F6 để focus chuột vào trường Nhập hoặc quét mã dịch vụ, tên dịch vụ - Hiển thị dạng ngoặc vuông trước text : [F6] Nhập hoặc quét mã dịch vụ, tên dịch vụ"
              onChange={onSearchInput("tenHoatChat")}
              value={state.dataSearch["tenHoatChat"]}
            />
          }
        />
      ),
      width: "15%",
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="hamLuong"
          isTitleCenter={true}
        />
      ),
      width: "15%",
      dataIndex: "hamLuong",
      key: "hamLuong",
      // render: (item) => {
      //   const res = TRANG_THAI_KHAM_BN.find((el) => el.id === item) || {};
      //   return res.ten;
      // },
    },
    {
      title: <HeaderSearch title="ĐVT" isTitleCenter={true} />,
      width: "15%",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      // render: (item, record) => {
      //   return (
      //     <div className="action-group">
      //       {renderGoiButton(record)}
      //       {renderBoQuaButton(record)}
      //     </div>
      //   );
      // },
    },
    {
      title: <HeaderSearch title="Số lượng khả dụng" isTitleCenter={true} />,
      width: "15%",
      dataIndex: "soLuongKhaDung",
      key: "soLuongKhaDung",
      align: "right",
      // render: (item, record) => {
      //   return (
      //     <div className="action-group">
      //       {renderGoiButton(record)}
      //       {renderBoQuaButton(record)}
      //     </div>
      //   );
      // },
    },
  ];
  const onSearch = (options = {}) => {
    let payload = {
      khoId: state.khoId,
      dataSortColumnModal: state.dataSortColumnModal || {},
      ...options,
    };
    if (state.dataSearch && !isEmpty(state.dataSearch)) {
      payload = { ...payload, ...(state.dataSearch || {}) };
    } else payload.timKiem = state.keyword;
    onSearchAllDichVuTonKho({ ...payload, theoSoLuongTonKho: THEO_SO_LUONG_TON_KHO.CON_TON });
  };

  useEffect(() => {
    if (state.show) {
      onSearch({ page: 0 });
    }
  }, [state.show]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    onSearch({ size: size });
  };

  // const rowClassName = (record) => {
  //   // return record.id === infoNb?.id ? "active" : "";
  // };
  refSelectRow.current = (index) => {
    const indexNextItem =
      (listAllDichVuTonKho?.findIndex(
        (item) => item.ma === dataEditDefault?.ma
      ) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listAllDichVuTonKho.length) {
      updateData({ dataEditDefault: listAllDichVuTonKho[indexNextItem] });
      // form.setFieldsValue(data[indexNextItem]);
      document
        .getElementsByClassName(
          "row-id-" + listAllDichVuTonKho[indexNextItem]?.ma
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.ma;
    return record.ma === idDiff
      ? "row-actived row-id-" + record.ma
      : "row-id-" + record.ma;
  };
  useImperativeHandle(ref, () => ({
    show: ({ isThemMoi, khoId, keyword, ...payload }, onCallback) => {
      setState({
        show: true,
        khoId,
        keyword,
        dataSearch: {},
        page: 0,
        isThemMoi,
      });
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 117, //F6
            onEvent: () => {
              refClickSearch.current && refClickSearch.current.focus();
              // console.log('refClickSearch.current: ', refClickSearch.current);
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
          {
            keyCode: 13, //Enter
            onEvent: () => {
              refOk.current && refOk.current();
              // console.log("ds",dataEditDefault)
            },
          },
        ],
      });
      refCallback.current = onCallback;
      refModal.current && refModal.current.show();
    },
  }));

  const handleSubmitCondition = (record) => {
    if (!record) record = dataEditDefault;
    if (!record) return;
    let hanSuDungMoment = record?.ngayHanSuDungLonNhat
      ? moment(moment(record?.ngayHanSuDungLonNhat, "YYYY-MM-DD"))
      : moment(moment(record?.ngayHanSuDungNhoNhat, "DD-MM-YYYY"));
    if (record?.soLuongKhaDungConHsd == 0) {
      message.error(`Không thể kê thêm dịch vụ do có tồn khả dụng bằng 0`);
      return null;
    }
    if (hanSuDungMoment.isBefore(moment())) {
      message.error(
        `Dịch vụ đã hết hạn sử dụng ${hanSuDungMoment.format("DD/MM/YYYY")}`
      );
      return null;
    }
    if (record.soLuongKhaDungConHsd > 0) {
      if (record.nhapDotDung) {
        // yếu cầu nhập đợt dùng
        refModalRequest.current.show(
          {
            itemSelected: record,
          },
          (thuocId) => {
            setTimeout(() => {
              let itemInputJustCreated = document.getElementById(thuocId);
              itemInputJustCreated && itemInputJustCreated.focus();
            }, 500);
          }
        );
      } else {
        onAddThuocVaoDon({ isThemMoi: props.isThemMoi, thuoc: record }).then(
          (thuocId) => {
            setTimeout(() => {
              let itemInputJustCreated = document.getElementById(thuocId);
              itemInputJustCreated && itemInputJustCreated.focus();
            }, 500);
          }
        );
      }
    }
    onCancel();
  };

  const onSubmit = async (record) => {
    let listSelected = state.isThemMoi ? dsThuocTamThoi : infoPatient?.dsThuoc;
    let itemDuplicate = listSelected.find(
      (itemLoop) => itemLoop.nbDichVu.dichVuId === record.dichVuId
    );
    if (itemDuplicate && Object.keys(itemDuplicate)?.length > 0) {
      refModalNotification &&
        refModalNotification.current &&
        refModalNotification.current.show(
          {
            title: "",
            content: `Trùng thông tin hàng hóa. Tên hàng hóa: ${itemDuplicate?.nbDichVu?.dichVu?.ten}.<br/>Bạn có đồng ý tạo không?`,
            cancelText: "Đóng",
            okText: "Xác nhận",
            showBtnOk: true,
            typeModal: "warning",
          },
          () => {
            handleSubmitCondition(record);
          },
          () => {}
        );
      return null;
    }
    handleSubmitCondition(record);
  };
  refOk.current = onSubmit;

  const onCancel = () => {
    setState({ show: false });
    refModal.current && refModal.current.hide();
    refCallback.current && refCallback.current();
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        onSubmit(record);
      },
    };
  };
  return (
    <ModalTemplate ref={refModal} title="Danh sách dịch vụ" onCancel={onCancel}>
      <TableWrapper
        rowClassName={setRowClassName}
        columns={columns}
        onRow={onRow}
        dataSource={listAllDichVuTonKho}
        scroll={{ y: 450 }}
        rowKey={(record, index) =>
          `${record.id}${record.ma}${record.ten}${record.tenHoatChat}${index}`
        }
      />
      <Pagination
        listData={listAllDichVuTonKho}
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        onShowSizeChange={onSizeChange}
      />
      <ModalRequest ref={refModalRequest} closable={false} {...props} />
      <ModalNotification2 ref={refModalNotification} />
    </ModalTemplate>
  );
};

export default forwardRef(ModalListDichVuTimKiem);
