import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Select, Tooltip } from "antd";
import { Main } from "./styled";

const ThongTinDichVu = (props) => {
  const {
    danhSachDichVuKho: { selectedItem, cachXem },
    utils: { listKhoaDichVuKho },
    khoa: { listAllKhoa },
  } = useSelector((state) => state);

  const {
    utils: { getUtils },
    khoa: { getListAllKhoa },
    danhSachDichVuKho: { updateData },
    danhSachDichVuKhoChiTiet: { putKhoThietLapDv },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getUtils({ name: "KhoaDichVuKho" });
    getListAllKhoa({});
  }, []);
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  const handleChangeData = (key) => (values) => {
    setState({ [key]: values });
    updateData({
      selectedItem: {
        ...selectedItem,
        [key]: values,
      },
    });
  };

  const onSave = (editKey) => () => {
    putKhoThietLapDv({
      dsLoaiKhoaDichVu: selectedItem?.dsLoaiKhoaDichVu,
      dsKhoaDuocChiDinhId: selectedItem?.dsKhoaDuocChiDinhId,
      dichVuId: selectedItem?.dichVuId,
    }).then(() => {
      setState({ [editKey]: !state[editKey] });
    });
  };

  return (
    <Main className="info">
      <div className="body-info">
        <Row className="info-full">
          <Col span={24}>
            <div className="title">Thông tin dịch vụ: </div>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title">Mã DV:</div> &nbsp;
              <div className="detail">{selectedItem?.ma}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title">SL tồn thực tế : </div> &nbsp;
              <div className="detail">{selectedItem?.soLuong}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Tên hoạt chất : </div> &nbsp;
              <div className="detail last">{selectedItem?.tenHoatChat}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Phân loại thuốc : </div> &nbsp;
              <div className="detail last">
                {selectedItem?.tenPhanLoaiDvKho}
              </div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Tên DV : </div> &nbsp;
              <div className="detail last">{selectedItem?.ten}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">SL tồn khả dụng : </div> &nbsp;
              <div className="detail last">{selectedItem?.soLuongKhaDung}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Hàm lượng : </div> &nbsp;
              <div className="detail last">{selectedItem?.hamLuong}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">ĐVT : </div> &nbsp;
              <div className="detail last">{selectedItem?.tenDonViTinh}</div>
            </Row>
          </Col>
          {cachXem !== "3" && (
            <Col span={12} className="info">
              <Row className="">
                <div className="title last">Thiết lập khóa DV : </div> &nbsp;
                <div className="detail last" style={{ flex: 1 }}>
                  {state?.editKhoaDv ? (
                    <Select
                      allowClear
                      mode="multiple"
                      style={{ width: "90%" }}
                      value={(selectedItem?.dsLoaiKhoaDichVu || []).map(
                        (item) => item
                      )}
                      onChange={handleChangeData("dsLoaiKhoaDichVu")}
                      filterOption={filterOption}
                    >
                      {listKhoaDichVuKho.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  ) : (
                    <>
                      {(listKhoaDichVuKho || [])
                        .filter((item) =>
                          (selectedItem?.dsLoaiKhoaDichVu || []).includes(
                            item.id
                          )
                        )
                        ?.map((item2) => item2.ten + "; ")}
                    </>
                  )}
                  {!state?.editKhoaDv ? (
                    <Tooltip title="Thiết lập khóa DV">
                      <img
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        src={require(`assets/images/utils/edit.png`)}
                        alt="btn-collapse"
                        onClick={() =>
                          setState({ editKhoaDv: !state.editKhoaDv })
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Lưu thiết lập">
                      <img
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        src={require(`assets/images/utils/icon-save-blue.png`)}
                        alt="btn-collapse"
                        onClick={onSave("editKhoaDv")}
                      />
                    </Tooltip>
                  )}
                </div>
              </Row>
            </Col>
          )}
          {cachXem !== "3" && (
            <Col span={12} className="info">
              <Row className="">
                <div className="title last">Khoa được truy cập : </div> &nbsp;
                <div className="detail last" style={{ flex: 1 }}>
                  {state?.editKhoaTruyCap ? (
                    <Select
                      allowClear
                      mode="multiple"
                      style={{ width: "90%" }}
                      value={(selectedItem?.dsKhoaDuocChiDinhId || []).map(
                        (item) => item
                      )}
                      onChange={handleChangeData("dsKhoaDuocChiDinhId")}
                      filterOption={filterOption}
                    >
                      {listAllKhoa.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  ) : (
                    <>
                      {(listAllKhoa || [])
                        .filter((item) =>
                          (selectedItem?.dsKhoaDuocChiDinhId || []).includes(
                            item.id
                          )
                        )
                        ?.map((item2) => item2.ten + "; ")}
                    </>
                  )}
                  {!state?.editKhoaTruyCap ? (
                    <Tooltip title="Thiết lập khoa được truy cập">
                      <img
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        src={require(`assets/images/utils/edit.png`)}
                        alt="btn-collapse"
                        onClick={() =>
                          setState({ editKhoaTruyCap: !state.editKhoaTruyCap })
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Lưu thiết lập">
                      <img
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        src={require(`assets/images/utils/icon-save-blue.png`)}
                        alt="btn-collapse"
                        onClick={onSave("editKhoaTruyCap")}
                      />
                    </Tooltip>
                  )}
                </div>
              </Row>
            </Col>
          )}
          {cachXem === "3" && (
            <Col span={6} className="info">
              <Row className="">
                <div className="title last">Tổng SL nhập : </div> &nbsp;
                <div className="detail last"></div>
              </Row>
            </Col>
          )}
          {cachXem === "3" && (
            <Col span={6} className="info">
              <Row className="">
                <div className="title last"> SL giữ chỗ : </div> &nbsp;
                <div className="detail last"></div>
              </Row>
            </Col>
          )}
          {cachXem === "3" && (
            <Col span={6} className="info">
              <Row className="">
                <div className="title last">QĐ thầu : </div> &nbsp;
                <div className="detail last"></div>
              </Row>
            </Col>
          )}
          {cachXem === "3" && (
            <Col span={6} className="info">
              <Row className="">
                <div className="title last">Hiệu lực thầu : </div> &nbsp;
                <div className="detail last"></div>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </Main>
  );
};

export default ThongTinDichVu;
