import { Row, Col, Tooltip } from "antd";
import React from "react";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { CardStyled } from "./styled";

const GItem = ({ data, dsNb, phongId, khoaId, onShowDsNb, onThemMoiPG }) => {
  const { soHieu } = data;

  function getOnlyName(fullName) {
    if (fullName) {
      const nameArr = fullName.split(" ");

      if (nameArr && nameArr.length > 0) {
        return nameArr[nameArr.length - 1];
      }
    }

    return "";
  }

  function replaceTuoi(tuoi) {
    if (!tuoi) return "";

    return `(${tuoi.replace(" tuổi", "T")})`;
  }

  return (
    <CardStyled>
      {dsNb.length === 0 ? (
        <Row className="g-nb-empty">
          <div className="circle">Trống</div>
        </Row>
      ) : (
        <Row className="g-nb">
          <Col span={10} className="avatar-circle">
            <div
              className="avatar-icon"
              onClick={onShowDsNb({ ...dsNb[0], phongId, khoaId })}
            >
              <UserOutlined style={{ fontSize: 30 }} />
            </div>
          </Col>
          <Col span={14} className="nb-ten">
            {dsNb.map((item) => {
              const showTxt = `${getOnlyName(item.tenNb)} ${replaceTuoi(
                item.tuoi2
              )}`;

              return (
                <Tooltip title={showTxt}>
                  <div key={item.nbDotDieuTriId} className="text-1-line">
                    {showTxt}
                  </div>
                </Tooltip>
              );
            })}
          </Col>
        </Row>
      )}
      <Row className="g-nb-info">
        <div className="g-nb-info-left">
          <Tooltip className="g-label" title={soHieu}>
            <span>{soHieu}</span>
          </Tooltip>
          {dsNb.length > 0 && <span className="g-nb-sl">{dsNb.length} BN</span>}
        </div>

        <div className="g-nb-info-right">
          <PlusCircleOutlined
            style={{ color: "#049254", fontSize: 20 }}
            onClick={onThemMoiPG({ ...data, phongId, khoaId })}
          />
        </div>
      </Row>
    </CardStyled>
  );
};

export default GItem;
