import React, { useState, useRef, useMemo, useEffect } from "react";
import { Main } from "./styled";
import { Row, Col, Input, Select as AntSelect, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import ThongTinThemCongTy from "./ThongTinThemCongTy";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import ThongTinSoTien from "./ThongTinSoTien";

const { Option } = AntSelect;

const ThongTinHopDong = (props) => {
  const { onEditHopDong } = props;
  const [showMoreInfo, setShowMoreInfo] = useState(true);
  const refTen = useRef();
  const { id } = useParams();
  const [listTrangThaiHopDong] = useEnum(ENUM.TRANG_THAI_HOP_DONG);

  const {
    doiTac: { getListAllDoiTac },
    hopDongKSK: { updateData },
  } = useDispatch();

  const { listAllDoiTac } = useSelector((state) => state.doiTac);
  const { ttHopDong, validTTHopDong, chiTietHopDong } = useSelector(
    (state) => state.hopDongKSK
  );

  useEffect(() => {
    getListAllDoiTac({ dsLoaiDoiTac: 40, active: true, page: "", size: "" });
  }, []);

  const isThemMoi = useMemo(() => {
    return id === undefined;
  }, [id]);

  const optionsDoiTac = useMemo(() => {
    let options = listAllDoiTac?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item?.ma}-${item?.ten}`}
      </Option>
    ));
    return options;
  }, [listAllDoiTac]);

  const [state, _setState] = useState({
    ten: "",
    doiTacId: null,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const update = (value, variables) => {
    setState({ [`${variables}`]: value });

    updateData({
      ttHopDong: {
        ...ttHopDong,
        [`${variables}`]: value,
      },
    });
  };

  const onBlur = (value, variables) => {};

  const onChange = (type) => (e) => {
    const value = e?.target ? e.target?.value : e;

    update(value, type);
  };

  const { ten, doiTacId } = state;

  return (
    <Main>
      <div>
        <Row>
          {!isThemMoi && (
            <Col md={3} xl={3} xxl={3} style={{ alignItems: "center" }}>
              <div className="ma-bg">
                <div className="label ellipsisTxt">Mã thanh toán HĐ</div>
                <div className="value ellipsisTxt">{chiTietHopDong?.ma}</div>
              </div>
            </Col>
          )}

          <Col md={18} xl={18} xxl={18}>
            <div className="ten-bg">
              <div className="item ellipsisTxt">
                <label>
                  Tên hợp đồng:
                  {isThemMoi && <span className="error">*</span>}
                </label>
                {isThemMoi ? (
                  <Input
                    ref={refTen}
                    placeholder={`Nhập tên hợp đồng`}
                    value={ten}
                    readOnly={!isThemMoi}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) => update(e.target.value, "ten")}
                    onBlur={(e) => onBlur(e.target.value, "ten")}
                  />
                ) : (
                  <span>{chiTietHopDong?.ten}</span>
                )}
              </div>
              {!validTTHopDong.ten && (
                <div className="error">Vui lòng nhập tên hợp đồng!</div>
              )}

              <div className="item ellipsisTxt">
                <label>Tên công ty:</label>
                {isThemMoi ? (
                  <AntSelect
                    placeholder="Nhập tên công ty cần tạo hợp đồng"
                    value={doiTacId}
                    readOnly={!isThemMoi}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onSelect={onChange("doiTacId")}
                  >
                    {optionsDoiTac}
                  </AntSelect>
                ) : (
                  <span>{chiTietHopDong?.doiTac?.ten}</span>
                )}
                {!validTTHopDong.doiTacId && (
                  <div className="error">Vui lòng chọn công ty!</div>
                )}
              </div>

              {!isThemMoi && (
                <div className="item ellipsisTxt">
                  <label>Địa chỉ:</label>
                  <Tooltip
                    className="ellipsisTxt"
                    placement="topLeft"
                    title={chiTietHopDong?.doiTac?.diaChi || ""}
                  >
                    {chiTietHopDong?.doiTac?.diaChi || ""}
                  </Tooltip>
                </div>
              )}
            </div>
          </Col>

          {!isThemMoi && (
            <Col md={3} xl={3} xxl={3}>
              <div className="tt-bg">
                <div>
                  <EyeOutlined onClick={() => setShowMoreInfo(!showMoreInfo)} />
                  <EditOutlined onClick={onEditHopDong} />
                </div>
                <div
                  className="ellipsisTxt"
                  style={{ whiteSpace: "break-spaces" }}
                >
                  <b>Trạng thái: </b>
                  {
                    listTrangThaiHopDong.find(
                      (x) => x.id === chiTietHopDong?.trangThai
                    )?.ten
                  }
                </div>
              </div>
            </Col>
          )}
        </Row>

        <Row>
          <Col md={3} xl={3} xxl={3}></Col>
          <Col md={21} xl={21} xxl={21}>
            {showMoreInfo && !isThemMoi && (
              <>
                <ThongTinThemCongTy ttHopDong={chiTietHopDong} />
                <ThongTinSoTien ttHopDong={chiTietHopDong} />
                <div style={{ height: 10 }}></div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ThongTinHopDong;
