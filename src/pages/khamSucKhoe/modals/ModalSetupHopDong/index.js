import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Row, Col, Radio, message } from "antd";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch, InputTimeout, ModalTemplate } from "components";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import ModalTimKiemDV from "../../modals/ModalTimKiemDV";
import { ModalNotification2 } from "components/ModalConfirm";
import { useParams } from "react-router-dom";
import { SaveOutlined } from "@ant-design/icons";
import { Button } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";
import { DS_TRANG_THAI_THEO_LOAI } from "./utils";

const ModalSetupHopDong = (props, ref) => {
  const { t } = useTranslation();
  const { id } = useParams();
  //ref
  const refModalTimKiemDV = useRef(null);
  const refModal = useRef(null);

  const [state, _setState] = useState({
    show: false,
  });
  const [discountBy, setDiscountBy] = useState(1);

  const {
    hopDongKSK: {
      postTrangThaiTTDV,
      updateTrangThaiTT,
      updateData: updateDataHopDong,
      getTrangThaiTT,
    },
    dichVuKSK: { getListGiamGia, postGiamGia, updateData },
    utils: { getUtils },
  } = useDispatch();

  const {
    hopDongKSK: { chiTietHopDong, listTrangThaiTT },
    dichVuKSK: { listGiamGiaByNhomDV },
    utils: { listtrangThaiDichVu },
  } = useSelector((state) => state);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    getUtils({ name: "trangThaiDichVu" });
  }, []);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
      });

      getListGiamGia({ hopDongKskId: id });
      getTrangThaiTTByLoaiDV(id);
    },
  }));

  //function
  async function getTrangThaiTTByLoaiDV(hopDongKskId) {
    await getTrangThaiTT({ hopDongKskId, loaiDichVu: 10 });
    await getTrangThaiTT({ hopDongKskId, loaiDichVu: 20 });
    await getTrangThaiTT({ hopDongKskId, loaiDichVu: 30 });
  }

  const onClose = () => {
    setState({ show: false });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  //function
  function onChangeTrangThaiTT(item) {
    return (e) => {
      let _listTrangThaiTT = cloneDeep(listTrangThaiTT);
      const index = _listTrangThaiTT.findIndex(
        (x) => x.loaiDichVu === item.loaiDichVu
      );
      if (index !== -1) {
        _listTrangThaiTT[index].trangThai = e;
        _listTrangThaiTT[index].isUpdated = true;

        updateDataHopDong({
          listTrangThaiTT: _listTrangThaiTT,
        });
      }
    };
  }

  function onChangePhanTramMienGiam(item, type) {
    return (e) => {
      if (type === "nhomDichVu") {
        let _listGiamGiaByNhomDV = cloneDeep(listGiamGiaByNhomDV);
        const index = _listGiamGiaByNhomDV.findIndex(
          (x) => x.index === item.index
        );
        if (index !== -1) {
          _listGiamGiaByNhomDV[index].phanTramMienGiam = e;
          _listGiamGiaByNhomDV[index].isUpdated = true;

          updateData({
            listGiamGiaByNhomDV: _listGiamGiaByNhomDV,
          });
        }
      }
    };
  }

  function onChange(e) {
    setDiscountBy(e.target.value);
  }

  function onSubmit() {
    const postBatchBody = {
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
    };

    Promise.all([
      postBatchBody.dsHdKskGiamGia.length > 0 && postGiamGia(postBatchBody),
      listTrangThaiTT
        .filter((x) => !(x.id && !x.isUpdated))
        .map((item) =>
          item.id
            ? updateTrangThaiTT({ id: item.id, trangThai: item.trangThai })
            : postTrangThaiTTDV({
                hopDongKskId: chiTietHopDong?.id,
                loaiDichVu: item?.loaiDichVu,
                trangThai: item.trangThai,
              })
        ),
    ]).then(() => {
      onClose();
    });
  }

  const trangThaiTTColumns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 80,
    },
    {
      title: <HeaderSearch title="Nhóm dịch vụ" />,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch title="Trạng thái" />,
      dataIndex: "trangThai",
      key: "trangThai",
      width: 200,
      render: (field, item, index) => {
        return (
          <Select
            placeholder={"Chọn trạng thái"}
            data={(listtrangThaiDichVu || []).filter((x) =>
              DS_TRANG_THAI_THEO_LOAI[item?.loaiDichVu].includes(x.id)
            )}
            value={field}
            disabled={chiTietHopDong?.trangThai === 20}
            onChange={onChangeTrangThaiTT(item)}
          />
        );
      },
    },
  ];

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
          <InputTimeout
            value={field}
            readOnly={chiTietHopDong?.trangThai === 20}
            onChange={onChangePhanTramMienGiam(item, "nhomDichVu")}
          />
        );
      },
    },
  ];

  return (
    <ModalTemplate
      width={"75%"}
      closable={false}
      title={<label className="modal-title">Thiết lập hợp đồng</label>}
      onCancel={onClose}
      ref={refModal}
      actionLeft={
        <Button.Text
          type="primary"
          leftIcon={<IcArrowLeft />}
          onClick={onClose}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          className="confirm-btn"
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          rightIcon={<SaveOutlined />}
        >
          Lưu
        </Button>
      }
    >
      <Main discountBy={discountBy}>
        <div>
          <Row>
            <Col span={24}>
              <div className="hopdong-table-title">
                Trạng thái chốt thanh toán DV trong hợp đồng
              </div>
              <TableWrapper
                bordered
                columns={trangThaiTTColumns}
                dataSource={listTrangThaiTT}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className="hopdong-table-title">
                Hình thức miễn giảm DV ngoài hợp đồng&emsp;
                <Radio.Group onChange={onChange} value={discountBy}>
                  <Radio value={1}>Theo nhóm DV</Radio>
                </Radio.Group>
              </div>

              <div className="table-content">
                <TableWrapper
                  bordered
                  columns={discountByNhomDichVuColumn}
                  dataSource={listGiamGiaByNhomDV}
                />
              </div>
            </Col>
          </Row>
        </div>

        <ModalTimKiemDV ref={refModalTimKiemDV} />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSetupHopDong);
