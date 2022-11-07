import React, { useMemo, useRef, useEffect } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch } from "components";
import { useDispatch, useSelector } from "react-redux";
import { formatDecimal } from "../../../../utils";
import { InboxOutlined } from "@ant-design/icons";
import ModalThemDichVu from "../../modals/ModalThemDichVu";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcDelete from "assets/images/khamBenh/delete.png";
import { refConfirm } from "app";

const DichVuNgoaiHopDong = (props) => {
  const { id } = useParams();

  //ref
  const refModalThemDichVu = useRef(null);

  //redux
  const {
    dichVuKSK: { dsDichVuLe = [] },
  } = useSelector((state) => state);

  const {
    dichVuKSK: {
      deleteDichVuChiTiet,
      getDsDichVuTheoGoi,
      updateData,
      getDsDichVu,
    },
  } = useDispatch();

  //memo
  const listDVLeMemo = useMemo(() => {
    return dsDichVuLe.map((item, index) => {
      return { ...item, index: index + 1 };
    });
  }, [dsDichVuLe]);

  useEffect(() => {
    if (id) {
      getDsDichVuTheoGoi({ hopDongKskId: id, trongGoi: false });
    }
  }, [id]);

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      width: "50px",
    },
    {
      title: <HeaderSearch title="Mã DV" />,
      width: 120,
      dataIndex: "maDichVu",
    },
    {
      title: <HeaderSearch title="Dịch vụ" />,
      width: 400,
      dataIndex: "tenDichVu",
    },
    {
      title: <HeaderSearch title="Số lượng" />,
      dataIndex: "soLuong",
      width: 80,
      render: (item) => {
        return item || 0;
      },
    },
    {
      title: <HeaderSearch title="Phòng thực hiện" />,
      dataIndex: "phongId",
      width: 150,
      render: (item, list, index) => {
        return (list?.dsPhong || []).find((x) => x.phongId === item)?.ten || "";
      },
    },
    {
      title: <HeaderSearch title="Đơn giá" />,
      dataIndex: "giaKhongBaoHiem",
      width: 80,
      render: (item) => {
        return formatDecimal(String(item));
      },
    },
    {
      title: <HeaderSearch title="% Miễn giảm" />,
      dataIndex: "phanTramMienGiam",
      width: 80,
      render: (item) => {
        return item || 0;
      },
    },
    {
      title: <HeaderSearch title="Tiền miễn giảm" />,
      dataIndex: "tienMienGiam",
      width: 80,
      render: (item) => {
        return item ? formatDecimal(String(item)) : 0;
      },
    },
    {
      title: <HeaderSearch title="ĐG sau giảm" />,
      width: 80,
      render: (item) => {
        const _value = item.phanTramMienGiam
          ? item.giaKhongBaoHiem -
            (item.giaKhongBaoHiem * item.phanTramMienGiam) / 100
          : item.giaKhongBaoHiem - item.tienMienGiam || 0;

        return formatDecimal(_value);
      },
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: "100px",
      align: "center",
      render: (item) => {
        return (
          <img src={IcDelete} alt="..." onClick={onDeleteDichVu(item)}></img>
        );
      },
    },
  ];

  //function
  function onAddDichVu() {
    // updateData({
    //   listChooseDV: listDVLeMemo.map((x) => {
    //     return { ...x, ten: x.tenDichVu };
    //   }),
    // });
    updateData({ listChooseDV: [] });
    refModalThemDichVu.current && refModalThemDichVu.current.show();
  }

  function onRow(record) {
    return {
      onClick: () => {
        const { id } = record;
      },
    };
  }

  function refreshList(trongGoi) {
    if (id) {
      getDsDichVuTheoGoi({ hopDongKskId: id, ...trongGoi });
      getDsDichVu({ hopDongKskId: id });
    }
  }

  function onDeleteDichVu(item) {
    return () => {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: "Xoá dữ liệu",
            content: `Bạn chắc chắn muốn xóa ${item?.tenDichVu}?`,
            cancelText: "Quay lại",
            okText: "Đồng ý",
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
          },
          () => {
            deleteDichVuChiTiet(item.id).then((s) => {
              refreshList({ trongGoi: false });
            });
          },
          () => {}
        );
    };
  }

  return (
    <Main>
      <div className="title">
        <label>Danh sách dịch vụ lẻ</label>
        <Button
          type="primary"
          onClick={onAddDichVu}
          iconHeight={15}
          className={"button-header"}
        >
          Thêm mới
          <img src={IcCreate} alt="IcCreate" />
        </Button>
      </div>

      {listDVLeMemo && listDVLeMemo.length > 0 ? (
        <div className="table-content">
          <TableWrapper
            bordered
            columns={columns}
            dataSource={listDVLeMemo || []}
            onRow={onRow}
            rowKey={(record) => `${record.id}`}
            styleWrap={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="empty-list">
          <div className="icon">
            <InboxOutlined />
          </div>
          <div>Chưa có dịch vụ</div>
          {!!id && (
            <div>
              <Button type="primary" onClick={onAddDichVu}>
                Thêm mới dịch vụ
              </Button>
            </div>
          )}
        </div>
      )}

      <ModalThemDichVu
        ref={refModalThemDichVu}
        refreshList={refreshList}
        data={listDVLeMemo}
        goiDV={null}
        hopDongKskId={id}
      />
    </Main>
  );
};

export default DichVuNgoaiHopDong;
