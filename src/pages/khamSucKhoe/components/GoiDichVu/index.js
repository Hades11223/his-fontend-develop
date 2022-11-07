import React, { useEffect, useMemo, useRef, useState } from "react";
import GoiDichVuItem from "./GoiDichVuItem";
import { Main } from "./styled";
import { Collapse, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalThemMoiGoiDichVu from "../../modals/ModalThemMoiGoiDichVu";
import { InboxOutlined } from "@ant-design/icons";
import { formatDecimal } from "../../../../utils";
import { groupBy } from "lodash";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcEdit from "assets/images/khamBenh/edit.png";
import IcDelete from "assets/images/khamBenh/delete.png";
import { refConfirm } from "app";

const { Panel } = Collapse;

const GoiDichVu = (props) => {
  const { id } = useParams();

  //ref
  const refModalThemMoiGoiDichVu = useRef(null);

  //redux
  const {
    dichVuKSK: {
      getDsDichVuTheoGoi,
      getDsDichVu,

      deleteDichVuChiTiet,
      deleteGoiDichVu,
      patchSoLuongGoiDichVu,
      updateData,
    },
  } = useDispatch();

  const {
    dichVuKSK: { dsGoi = [] },
  } = useSelector((state) => state);

  //state
  const [selectedGoiDV, setSelectedGoiDV] = useState({
    id: null,
    ma: null,
  });

  //effect
  useEffect(() => {
    if (id) {
      getDsDichVuTheoGoi({ hopDongKskId: id, trongGoi: true });
    }
  }, [id]);

  const callback = (key) => {
    console.log(key);
  };

  const listGoiDVMemo = useMemo(() => {
    return groupBy(dsGoi, "boChiDinhId");
  }, [dsGoi]);

  const addGoiDichVu = () => {
    setSelectedGoiDV({
      id: null,
      ma: null,
    });
    updateData({
      listChooseDV: [],
    });

    refModalThemMoiGoiDichVu.current && refModalThemMoiGoiDichVu.current.show();
  };

  const onEditGoiDichVu = (item) => (e) => {
    e.stopPropagation();
    setSelectedGoiDV({
      id: item[0]?.boChiDinhId,
      ma: item[0]?.maBoChiDinh,
    });

    refModalThemMoiGoiDichVu.current && refModalThemMoiGoiDichVu.current.show();
  };

  const onDeleteItem = (id) => {
    deleteDichVuChiTiet(id).then(() => {
      refreshListGoiDichVu({ trongGoi: true });
    });
  };

  const onUpdateSoLuong = (id) => (value) => {
    patchSoLuongGoiDichVu({
      id,
      soLuong: value,
    });
  };

  const onDeleteGoiDichVu = (item) => (e) => {
    e.stopPropagation();

    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xoá dữ liệu",
          content: `Bạn chắc chắn muốn xóa ${item[0]?.tenBoChiDinh}?`,
          cancelText: "Quay lại",
          okText: "Đồng ý",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          deleteGoiDichVu(item[0]?.boChiDinhId).then(() =>
            getDsDichVuTheoGoi({ hopDongKskId: id, trongGoi: true })
          );
        },
        () => {}
      );
  };

  const renderPanelHeader = (item, tongTien) => {
    const _maBoChiDinh = item[0]?.maBoChiDinh;
    const _tenGoiDV = item[0]?.tenBoChiDinh;
    const _soLuongDV = item?.length;

    return (
      <div>
        <span className="uppper-text">{`${_maBoChiDinh} - ${_tenGoiDV}`}</span>
        {`(${_soLuongDV} DV - Tổng tiền ${formatDecimal(tongTien)})`}
        <img src={IcEdit} alt="..." onClick={onEditGoiDichVu(item)}></img>
        <img src={IcDelete} alt="..." onClick={onDeleteGoiDichVu(item)}></img>
      </div>
    );
  };

  const refreshListGoiDichVu = (trongGoi) => {
    if (id) {
      getDsDichVuTheoGoi({ hopDongKskId: id, ...trongGoi });
      getDsDichVu({ hopDongKskId: id });
      setSelectedGoiDV({
        id: null,
        ma: null,
      });
    }
  };

  return (
    <Main>
      <div className="goidv-title">
        <label>Danh sách gói dịch vụ</label>
        {!!id && (
          <Button
            type="primary"
            onClick={addGoiDichVu}
            iconHeight={15}
            className={"button-header"}
          >
            Thêm mới
            <img src={IcCreate} alt="IcCreate" />
          </Button>
        )}
      </div>

      {listGoiDVMemo && Object.keys(listGoiDVMemo).length > 0 ? (
        Object.keys(listGoiDVMemo).map((x) => {
          const tongTien = listGoiDVMemo[x].reduce(
            (s, { giaKhongBaoHiem }) => s + giaKhongBaoHiem,
            0
          );

          return (
            <Collapse key={x} defaultActiveKey={[x]} onChange={callback}>
              <Panel
                className="goidv-panel"
                header={renderPanelHeader(listGoiDVMemo[x], tongTien)}
                key={x}
              >
                <GoiDichVuItem
                  data={listGoiDVMemo[x]}
                  onDeleteItem={onDeleteItem}
                  onUpdateSoLuong={onUpdateSoLuong(x)}
                  tongTien={tongTien}
                />
              </Panel>
            </Collapse>
          );
        })
      ) : (
        <div className="empty-list">
          <div className="icon">
            <InboxOutlined />
          </div>
          <div>Chưa có gói dịch vụ</div>
          {!!id && (
            <div>
              <Button type="primary" onClick={addGoiDichVu}>
                Thêm mới gói dịch vụ
              </Button>
            </div>
          )}
        </div>
      )}

      <ModalThemMoiGoiDichVu
        ref={refModalThemMoiGoiDichVu}
        refreshList={refreshListGoiDichVu}
        goiDV={selectedGoiDV}
        hopDongKskId={id}
      />
    </Main>
  );
};

export default GoiDichVu;
