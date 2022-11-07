import React, { useEffect, useState, useRef } from "react";
import { Main } from "./styled";
import { Row, Radio, Input, message } from "antd";
import Select from "components/Select";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch, Button } from "components";
import { SaveOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalTimKiemDV from "../../modals/ModalTimKiemDV";
import { cloneDeep } from "lodash";
import { ModalNotification2 } from "components/ModalConfirm";

const MienGiamNgoaiHopDong = () => {
  const { id } = useParams();
  const refModalTimKiemDV = useRef(null);
  const refModalNotificationDeleted = useRef(null);

  //state
  const [discountBy, setDiscountBy] = useState(1);

  //redux
  const {
    dichVuKSK: { getListGiamGia, updateData, postGiamGia },
    khamSucKhoe: { updatePhieuBaoGia },
  } = useDispatch();

  const {
    khamSucKhoe: { chiTietPhieu },
    dichVuKSK: { listGiamGiaByNhomDV },
  } = useSelector((state) => state);

  useEffect(() => {
    getListGiamGia({ hopDongKskId: id });
  }, [id]);

  //function
  function onChange(e) {
    setDiscountBy(e.target.value);
  }

  function onChangePhanTramMienGiam(item, type) {
    return (e) => {
      let _listGiamGiaByNhomDV = cloneDeep(listGiamGiaByNhomDV);
      const index = _listGiamGiaByNhomDV.findIndex(
        (x) => x.index === item.index
      );
      if (index !== -1) {
        _listGiamGiaByNhomDV[index].phanTramMienGiam = e.target.value;

        updateData({
          listGiamGiaByNhomDV: _listGiamGiaByNhomDV,
        });
      }
    };
  }

  function onSave() {
    if (
      !listGiamGiaByNhomDV
        .filter((x) => x.id)
        .every((x) => x.phanTramMienGiam > 0)
    ) {
      message.error("Vui lòng nhập phần trăm giảm giá > 0");
      return;
    }

    postGiamGia({
      id,
      hinhThucMienGiam: 20,
      dsHdKskGiamGia: listGiamGiaByNhomDV
        .filter((x) => x.phanTramMienGiam > 0)
        .map((x) => {
          return {
            dichVuId: null,
            loaiDichVu: x.loaiDichVu,
            phanTramMienGiam: x.phanTramMienGiam,
          };
        }),
    }).then(() => {
      getListGiamGia({ hopDongKskId: id });
    });
  }

  function onChangeHinhThucTtDvNgoaiHd(e) {
    updatePhieuBaoGia({
      id,
      hinhThucTtDvNgoaiHd: e,
    });
  }

  const discountByNhomDichVuColumn = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 80,
    },
    {
      title: <HeaderSearch title="Nhóm dịch vụ" />,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch title="% miễn giảm" />,
      dataIndex: "phanTramMienGiam",
      key: "phanTramMienGiam",
      width: 200,
      render: (field, item, index) => {
        return (
          <Input
            value={field}
            onChange={onChangePhanTramMienGiam(item, "nhomDichVu")}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Main>
        <div className="title">Miễn giảm dịch vụ ngoài hợp đồng</div>

        <div>
          <Row>
            <label>Hình thức thanh toán DV ngoài hợp đồng</label>&emsp;
            <div>
              <Select
                placeholder={"Chọn trạng thái"}
                data={[
                  { id: 10, ten: "Thanh toán theo hợp đồng" },
                  { id: 20, ten: "Tự thanh toán" },
                ]}
                onChange={onChangeHinhThucTtDvNgoaiHd}
                value={chiTietPhieu?.hinhThucTtDvNgoaiHd}
              />
            </div>
          </Row>

          <Row>
            <label>Hình thức miễn giảm DV ngoài hợp đồng</label>&emsp;
            <div className="">
              <Radio.Group onChange={onChange} value={discountBy}>
                <Radio value={1}>Theo nhóm DV</Radio>
              </Radio.Group>
            </div>
          </Row>

          <Row className="table">
            <TableWrapper
              bordered
              columns={discountByNhomDichVuColumn}
              dataSource={listGiamGiaByNhomDV}
            />
          </Row>
        </div>

        <div className="button-save">
          <Button
            type="primary"
            minWidth={"100px"}
            onClick={onSave}
            rightIcon={<SaveOutlined />}
          >
            Lưu [F4]
          </Button>
        </div>
      </Main>

      <ModalTimKiemDV ref={refModalTimKiemDV} />
      <ModalNotification2 ref={refModalNotificationDeleted} />
    </div>
  );
};

export default MienGiamNgoaiHopDong;
