import React from "react";
import { Card, Button } from "components";
import { Main } from "./styled";
import { Col, Row, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;
const TIME_FORMAT = "DD/MM/YYYY HH:mm:ss";

const TrangThaiLienThongGPP = ({
  className,
  onDeleteLienThong,
  chiTietLienThong,
  listTrangThaiGpp,
  dayLienThong,
  onRefreshLienThong,
  capNhatLienThong,
}) => {
  //function
  function onDayLienThong() {
    dayLienThong({
      id: chiTietLienThong?.id,
      dsLoaiNhapXuat: [chiTietLienThong?.loaiNhapXuat],
    }).then(() => {
      onRefreshLienThong();
    });
  }

  const renderButton = () => {
    const ttLienThong =
      listTrangThaiGpp.find((x) => x.id === chiTietLienThong?.trangThaiGpp)
        ?.id || null;

    return (
      <div className="select-row-last">
        {[20, 40].includes(ttLienThong) && (
          <Button iconHeight={15} onClick={onDeleteLienThong}>
            Xóa liên thông
          </Button>
        )}

        {[20, 40].includes(ttLienThong) && (
          <Button type="primary" iconHeight={15} onClick={capNhatLienThong}>
            Cập nhật liên thông
          </Button>
        )}

        {(ttLienThong === null || [10, 30].includes(ttLienThong)) && (
          <Button type="primary" iconHeight={15} onClick={onDayLienThong}>
            Đẩy liên thông
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card className={`${className}`}>
      <Main md={24} xl={24} xxl={24} className="container">
        <div className="info">
          <Row>
            <Col span={8}>
              <label>Trạng thái:</label>
            </Col>
            <Col span={16} className="info-trang-thai">
              {listTrangThaiGpp.find(
                (x) => x.id === chiTietLienThong?.trangThaiGpp
              )?.ten || ""}
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <label>Mã GPP:</label>
            </Col>
            <Col span={16}>{chiTietLienThong?.maGpp}</Col>
          </Row>

          <Row>
            <Col span={8}>
              <label>Người đẩy GPP:</label>
            </Col>
            <Col span={16}>{chiTietLienThong?.nguoiDay}</Col>
          </Row>

          <Row>
            <Col span={8}>
              <label>Ngày đẩy:</label>
            </Col>
            <Col span={16}>
              {chiTietLienThong?.thoiGianLienThongGpp
                ? moment(chiTietLienThong?.thoiGianLienThongGpp).format(
                    TIME_FORMAT
                  )
                : ""}
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <label>Ngày cập nhật:</label>
            </Col>
            <Col span={16}>
              {moment(chiTietLienThong?.ngayPhat).format(TIME_FORMAT)}
            </Col>
          </Row>

          <Row>Thông tin cổng phản hồi:</Row>
          <Row>
            <TextArea
              className="info-phan-hoi"
              rows={4}
              value={chiTietLienThong?.ketQua}
            />
          </Row>
        </div>

        {renderButton()}
      </Main>
    </Card>
  );
};

export default TrangThaiLienThongGPP;
