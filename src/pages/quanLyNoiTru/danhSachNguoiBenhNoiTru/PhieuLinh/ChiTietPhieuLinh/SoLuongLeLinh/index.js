import { Checkbox, DatePicker, Tooltip } from "antd";
import { InputTimeout, TableWrapper, HeaderSearch } from "components";
import { useStore } from "hook";
import useWindowSize from "hook/useWindowSize";
import moment from "moment";
import TableEmpty from "pages/kho/components/TableEmpty";
import React, { memo, useState } from "react";
import { Main, WrapperPopup } from "./styled";
import { useTranslation } from "react-i18next";

const SoLuongLeLinh = ({
  renderColumns = () => [],
  onFocusSearchHangHoa,
  isEdit,
  onSearch = () => {},
  ...props
}) => {
  const dsNbDvKho = useStore("nbDvKho.dsNbDvKho", []);
  const [state, _setState] = useState({ dataSortColumn: {}, listCheckId: [] });
  const { dataSortColumn } = state;
  const { t } = useTranslation();
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const size = useWindowSize();

  const clickCheckbox = (id) => (e) => {
    if (e.target.checked) {
      setState({ listCheckId: [...state.listCheckId, id] });
    } else {
      setState({ listCheckId: state.listCheckId.filter((i) => i != id) });
    }
  };

  const onClickAll = (e) => {
    if (e.target.checked) {
      setState({ listCheckId: dsNbDvKho.map((i) => i.id) });
    } else {
      setState({ listCheckId: [] });
    }
  };

  const renderTitlePop = (item) => (
    <WrapperPopup>
      <div className="title-pop">
        {item?.maDichVu} - {item?.tenDichVu}
      </div>
      <div className="pop-content">
        <div className="item-pop">Số lượng khả dụng: {item.soLuong}</div>
        <div className="item-pop">Đường dùng: {item.tenDuongDung}</div>
        <div className="item-pop">Số lượng còn lại: {item.soLuongYeuCau}</div>
        <div className="item-pop">Nhà sản xuất: {item.tenNhaSanXuat}</div>
        <div className="item-pop">Hàm lượng: {item.hamLuong}</div>
        <div className="item-pop">Quy cách: {"Không có"}</div>
        <div className="item-pop">Tên hoạt chất: {item.tenHoatChat}</div>
      </div>
    </WrapperPopup>
  );
  const commonCol = {
    check: {
      title: (
        <HeaderSearch
          title={
            <Checkbox
              checked={state.listCheckId.length === dsNbDvKho.length}
              onClick={onClickAll}
            ></Checkbox>
          }
          //   sort_key="soPhieuLinh"
          //   onClickSort={onClickSort}
          //   dataSort={dataSortColumn.soPhieuLinh || 0}
          //   search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "index",
      width: "50px",
      align: "center",
      render: (_, item) => (
        <Checkbox
          checked={state.listCheckId.includes(item?.id)}
          onClick={clickCheckbox(item?.id)}
        ></Checkbox>
      ),
    },
    stt: {
      title: <HeaderSearch title="STT" />,
      width: size.width <= 1400 ? 50 : 50,
      dataIndex: "index",
      key: "index",
      hideSearch: true,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    maBenhAn: {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maBenhAn || 0}
          search={
            <InputTimeout
              placeholder="Tìm mã"
              onChange={(maHoSo) => onSearch({ maHoSo })}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "maHoSo",
      key: "maHoSo",
      type: true,
      hideSearch: false,
    },
    tenNb: {
      title: (
        <HeaderSearch
          title="Tên người bệnh"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenNb || 0}
          search={
            <InputTimeout
              placeholder="Tìm tên người bệnh"
              onChange={(tenNb) => onSearch({ tenNb })}
            />
          }
        />
      ),
      width: 250,
      dataIndex: "tenNb",
      key: "tenNb",
      type: true,
      hideSearch: false,
    },
    tenHangHoa: {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDichVu || 0}
          search={
            <InputTimeout
              placeholder="Tìm kiếm theo tên hàng hóa"
              onChange={(tenDichVu) => onSearch({ tenDichVu })}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      type: true,
      hideSearch: false,
      render: (value, item, index) => (
        <Tooltip
          overlayInnerStyle={{ width: 400 }}
          overlay={renderTitlePop(item)}
          color={"white"}
        >
          {item?.tenDichVu}
        </Tooltip>
      ),
    },
    slKeChuaLenPhieu: {
      title: (
        <HeaderSearch
          title="SL kê chưa lên phiếu lĩnh"
          sort_key="slKeChuaLenPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.slKeChuaLenPhieu || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "soLuongYeuCau",
      key: "slKeChuaLenPhieu",
      hideSearch: true,
    },
    slLeLinhBuChoLanTruoc: {
      title: (
        <HeaderSearch
          title="SL lẻ lĩnh bù cho lần trước"
          sort_key="slChoLanTruoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.slChoLanTruoc || 0}
        />
      ),
      width: 100,
      align: "right",
      dataIndex: "soLuongYeuCau",
      key: "slChoLanTruoc",
      hideSearch: true,
    },
    slKe: {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.slChiDinh")}
          sort_key="soLuongYeuCau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongYeuCau || 0}
        />
      ),
      key: "soLuongYeuCau",
      width: size.width <= 1400 ? 70 : 70,
      dataIndex: "soLuongYeuCau",
      hideSearch: true,
      align: "right",
    },
    ngayThucHien: {
      title: (
        <HeaderSearch
          title="Ngày thực hiện"
          sort_key="thoiGianThucHien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianThucHien || 0}
          searchDate={
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
              onChange={(value) =>
                onSearch({
                  thoiGianThucHien: value?.format("YYYY-MM-DD HH:mm:ss"),
                })
              }
            />
          }
        />
      ),
      width: 150,
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      // hideSearch: true,
      render: (value, _, __) =>
        value ? moment(value)?.format("DD/MM/YYYY") : "",
    },
    ngayKe: {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.ngayChiDinh")}
          sort_key="thoiGianChiDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianChiDinh || 0}
          searchDate={
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
              onChange={(value) =>
                onSearch({
                  thoiGianChiDinh: value?.format("YYYY-MM-DD HH:mm:ss"),
                })
              }
            />
          }
        />
      ),
      width: 150,
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      // hideSearch: true,
      render: (value, _, __) =>
        value ? moment(value)?.format("DD/MM/YYYY") : "",
    },
  };
  return (
    <Main className="main">
      <TableWrapper
        scroll={{ y: 453, x: "auto" }}
        rowKey={"key"}
        columns={renderColumns({
          commonCol,
        })}
        dataSource={dsNbDvKho}
        locale={{
          emptyText: (
            <TableEmpty
              onClickButton={onFocusSearchHangHoa}
              showButton={isEdit}
            />
          ),
        }}
      />

      {/* <Pagination
        // onChange={onChangePage}
        current={1}
        pageSize={10}
        listData={dsNbDvKho}
        total={100}
        // onShowSizeChange={handleSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      /> */}
    </Main>
  );
};

export default memo(SoLuongLeLinh);
