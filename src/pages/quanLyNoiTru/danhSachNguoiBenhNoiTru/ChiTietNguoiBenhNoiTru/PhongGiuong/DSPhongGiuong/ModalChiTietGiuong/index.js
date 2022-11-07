import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { Main, GlobalStyle } from "./styled";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  TableWrapper,
  HeaderSearch,
  Pagination,
  ModalTemplate,
  Select,
} from "components";
import { Checkbox, DatePicker, Input, InputNumber, message } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { refConfirm } from "app";
import IcDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/noiTru/icEdit.png";
import IconTick from "assets/images/his-core/iconTick.png";
import icHoanDv from "assets/images/khamBenh/icHoanDv.png";

const ModalChiTietGiuong = (props, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();
  const { refreshList, isReadonly } = props;

  const {
    noiTruPhongGiuong: {
      getChiTietDvGiuong,
      deleteChiTietDvGiuong,
      tinhTienDvGiuong,
      getDsDVGiuong,
      postChiTietDvGiuong,
      patchChiTietDvGiuong,
      onSizeChange,
      updateData,
    },
  } = useDispatch();
  const {
    noiTruPhongGiuong: {
      dsChiTietGiuong,
      dsDVGiuong,
      dataTinhTien,
      page,
      size,
      totalElements,
    },
  } = useSelector((state) => state);

  const onChangePage = (page) => {
    updateData({ page: page - 1 });
  };

  const handleOnSizeChange = (size) => {
    onSizeChange({ size });
  };

  //state
  const [state, _setState] = useState({
    show: false,
    loaiDichVu: 10,
    dataSortColumn: {},
    data: [],
    nbChuyenKhoaInfo: {},
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const { dataSortColumn } = state;

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        nbChuyenKhoaInfo: data,
      });

      const { nbDotDieuTriId, id } = data;

      getDsDVGiuong({ active: true });
      getChiTietDvGiuong({
        nbDotDieuTriId,
        nbChuyenKhoaId: id,
      }).then((res) =>
        tinhTienDvGiuong(
          res.map((item) => ({
            nbChuyenKhoaId: id,
            nbDotDieuTriId: item.nbDotDieuTriId,
            nbDichVu: {
              dichVuId: item.dichVuId,
              chiDinhTuDichVuId: item.nbDotDieuTriId,
              chiDinhTuLoaiDichVu: 201,
              soLuong: item.soLuong,
            },
          }))
        )
      );
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useEffect(() => {
    if (
      dsChiTietGiuong &&
      dsChiTietGiuong.length > 0 &&
      dataTinhTien &&
      dataTinhTien.length > 0
    ) {
      let data = dsChiTietGiuong.map((item, index) => {
        let {
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          thanhTien,
          thanhTienBh,
          thanhTienKhongBh,
        } = dataTinhTien[index]?.nbDichVu;
        return {
          ...item,
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          thanhTien,
          thanhTienBh,
          thanhTienKhongBh,
        };
      });
      setState({
        data,
      });
    }
  }, [dataTinhTien, dsChiTietGiuong]);

  //function
  function onClose() {
    refreshList();
    setState({ show: false, currentItem: {}, currentIndex: -1 });
  }

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const handleDelete = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xóa dữ liệu",
          content: `Bạn chắc chắn muốn xóa ${item?.tenDichVu} ?`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
          typeModal: "error",
        },
        () => {
          deleteChiTietDvGiuong(item?.id).then(() => {
            const { nbDotDieuTriId, id } = state.nbChuyenKhoaInfo || {};

            getChiTietDvGiuong({
              nbDotDieuTriId,
              nbChuyenKhoaId: id,
            });
          });
        }
      );
  };

  const validateOnSave = () => {
    if (!state.currentItem?.dichVuId) {
      message.error("Vui lòng chọn tên dịch vụ giường!");
      return false;
    }

    if (!state.currentItem?.thoiGianThucHien) {
      message.error("Vui lòng chọn thời gian nằm!");
      return false;
    }

    return true;
  };

  const onSaveChiTietGiuong = () => {
    if (!validateOnSave()) return;

    if (!state.currentItem?.id) {
      postChiTietDvGiuong([
        {
          nbChuyenKhoaId: state.nbChuyenKhoaInfo?.id,
          nbDotDieuTriId: state.nbChuyenKhoaInfo?.nbDotDieuTriId,
          nbDichVu: {
            dichVuId: state.currentItem?.dichVuId,
            soLuong: state.currentItem?.soLuong,
            khoaChiDinhId: state.nbChuyenKhoaInfo?.khoaId,
            thoiGianThucHien: state.currentItem?.thoiGianThucHien,
            tuTra: state.currentItem?.tuTra,
            khongTinhTien: state.currentItem?.khongTinhTien,
          },
        },
      ]).then(() => {
        setState({
          currentItem: {},
          currentIndex: -1,
        });
        getChiTietDvGiuong({
          nbDotDieuTriId: state.nbChuyenKhoaInfo?.nbDotDieuTriId,
          nbChuyenKhoaId: state.nbChuyenKhoaInfo?.id,
        });
      });
    } else {
      patchChiTietDvGiuong([
        {
          id: state.currentItem?.id,
          nbDichVu: {
            dichVuId: state.currentItem?.dichVuId,
            soLuong: state.currentItem?.soLuong,
            thoiGianThucHien: state.currentItem?.thoiGianThucHien,
            tuTra: state.currentItem?.tuTra,
            khongTinhTien: state.currentItem?.khongTinhTien,
          },
        },
      ]).then(() => {
        setState({
          currentItem: {},
          currentIndex: -1,
        });
        getChiTietDvGiuong({
          nbDotDieuTriId: state.nbChuyenKhoaInfo?.nbDotDieuTriId,
          nbChuyenKhoaId: state.nbChuyenKhoaInfo?.id,
        });
      });
    }
  };

  const onAddNewRow = () => {
    if (state.currentIndex === 0) {
      onSaveChiTietGiuong();
      return;
    }

    let item = {
      soLuong: 1,
      soHieu: state.nbChuyenKhoaInfo?.soHieuGiuong,
      tenPhong: state.nbChuyenKhoaInfo?.tenPhong,
      tenKhoaChiDinh: state.nbChuyenKhoaInfo?.tenKhoa,
    };

    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
    });
  };

  const onEditRow = (item, index) => () => {
    setState({
      currentItem: item,
      currentIndex: index,
    });
  };

  const onCancelItem = () => {
    setState({
      currentItem: {},
      currentIndex: -1,
      data: state.data.filter((x) => !!x.id),
    });
  };

  const onChange = (key) => (e) => {
    let value = e;
    if (key == "tuTra" || key == "khongTinhTien") {
      value = e.target?.checked;
    }
    setState({ currentItem: { ...state.currentItem, [key]: value } });
  };

  //column
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ giường"
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDichVu || 0}
        />
      ),
      width: 300,
      dataIndex: "tenDichVu",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              defaultValue={state.currentItem?.dichVuId}
              data={dsDVGiuong}
              placeholder="Chọn dịch vụ giường"
              onChange={onChange("dichVuId")}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuong || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "soLuong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              defaultValue={item}
              step={0.5}
              min={0.5}
              max={1}
              placeholder="Nhập số lượng"
              onChange={onChange("soLuong")}
            />
          );
        } else return item;
      },
    },
    // {
    //   title: (
    //     <HeaderSearch
    //       title="Là giường tự chọn NB đăng kí thêm"
    //       sort_key="tuChon"
    //       onClickSort={onClickSort}
    //       dataSort={dataSortColumn.tuChon || 0}
    //     />
    //   ),
    //   dataIndex: "tuChon",
    //   align: "center",
    //   render: (item) => <Checkbox checked={item} />,
    // },
    {
      title: (
        <HeaderSearch
          title="Số hiệu giường"
          sort_key="soHieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soHieu || 0}
        />
      ),
      dataIndex: "soHieu",
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="tenPhong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenPhong || 0}
        />
      ),
      dataIndex: "tenPhong",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          sort_key="tenKhoaChiDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenKhoaChiDinh || 0}
        />
      ),
      dataIndex: "tenKhoaChiDinh",
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian nằm"
          sort_key="thoiGianThucHien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianThucHien || 0}
        />
      ),
      dataIndex: "thoiGianThucHien",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <DatePicker
              showTime
              placeholder="Chọn ngày"
              defaultValue={item ? moment(item) : null}
              disabledDate={onDisabledDate}
              onChange={onChange("thoiGianThucHien")}
              format="DD/MM/YYYY HH:mm:ss"
            />
          );
        }
        return item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "";
      },
    },
    {
      title: <HeaderSearch title="Tự trả" />,
      dataIndex: "tuTra",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("tuTra")} />
          );
        }
        return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title="Không tính tiền" />,
      dataIndex: "khongTinhTien",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox
              defaultChecked={item}
              onChange={onChange("khongTinhTien")}
            />
          );
        }
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaKhongBaoHiem || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "giaKhongBaoHiem",
      render: (item, list, index) => (item ? (item + "").formatPrice() : ""),
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaBaoHiem || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "giaBaoHiem",
      render: (item, list, index) => (item || 0).formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title="Giá phụ thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaPhuThu || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "giaPhuThu",
      render: (item, list, index) => (item ? (item + "").formatPrice() : 0),
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền không BH"
          sort_key="thanhTienKhongBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thanhTienKhongBh || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "thanhTienKhongBh",
      render: (item, list, index) => (item ? (item + "").formatPrice() : 0),
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền BH"
          sort_key="thanhTienBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thanhTienBh || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "thanhTienBh",
      render: (item, list, index) => (item ? (item + "").formatPrice() : 0),
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thanhTien || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "thanhTien",
      render: (item, list, index) => (item ? (item + "").formatPrice() : 0),
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: "100px",
      align: "center",
      render: (item, list, index) => {
        return (
          <div className="tool-btn">
            {index === state.currentIndex ? (
              <img src={IconTick} onClick={onSaveChiTietGiuong} alt="..."></img>
            ) : (
              <img
                src={IconEdit}
                alt="..."
                onClick={onEditRow(item, index)}
              ></img>
            )}
            {index === state.currentIndex ? (
              <img src={icHoanDv} alt="..." onClick={onCancelItem}></img>
            ) : (
              <img src={IcDelete} alt="..." onClick={handleDelete(item)}></img>
            )}
          </div>
        );
      },
    },
  ];

  function onDisabledDate(time) {
    if (state.nbChuyenKhoaInfo) {
      if (
        state.nbChuyenKhoaInfo?.tuThoiGian &&
        moment(time).isBefore(state.nbChuyenKhoaInfo?.tuThoiGian)
      )
        return true;

      if (
        state.nbChuyenKhoaInfo?.denThoiGian &&
        moment(time).isAfter(state.nbChuyenKhoaInfo?.denThoiGian)
      )
        return true;
    }

    return false;
  }

  console.log(page, size);
  // console.log("dsChiTietGiuong", dsChiTietGiuong);

  return (
    <ModalTemplate
      ref={refModal}
      wrapClassName="modal-chi-tiet-giuong"
      onCancel={onClose}
      title={
        <div className="header">
          <div className="header-title">Chi tiết giường</div>
          {!isReadonly && (
            <PlusCircleOutlined
              style={{ color: "#049254" }}
              onClick={onAddNewRow}
            />
          )}
        </div>
      }
    >
      <GlobalStyle />
      <Main>
        <div className="table-content">
          <TableWrapper
            scroll={{ y: 500, x: 1800 }}
            bordered
            columns={columns}
            dataSource={state.data.slice(size * page, size * (page + 1))}
            rowKey={(record) => `${record.id}`}
          />
        </div>

        <Pagination
          listData={state.data}
          onChange={onChangePage}
          current={page + 1}
          total={state.data.length}
          onShowSizeChange={handleOnSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          pageSize={size}
          styleVersion={2}
        />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChiTietGiuong);
