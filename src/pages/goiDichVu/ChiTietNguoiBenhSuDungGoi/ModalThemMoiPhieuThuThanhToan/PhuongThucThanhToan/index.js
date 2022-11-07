import React, { forwardRef, useState, useMemo, useEffect, useRef } from "react";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { sortBy } from "lodash";
const PhuongThucThanhToan = forwardRef(
  ({ dsPhuongThucTt, onChange, ...props }, ref) => {
    const { t } = useTranslation();
    const [state, _setState] = useState({
      dsPhuongThucTt: {},
    });
    const setState = (data = {}) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };
    const { listAllPhuongThucThanhToan } = useSelector(
      (state) => state.phuongThucTT
    );
    const listPhuongThucThanhToan = useMemo(() => {
      if (!listAllPhuongThucThanhToan) return [];
      return sortBy(listAllPhuongThucThanhToan, ["uuTien"], "asc");
    }, [listAllPhuongThucThanhToan]);

    useEffect(() => {
      setState({ dsPhuongThucTt: dsPhuongThucTt || {} });
    }, [dsPhuongThucTt]);

    const onChangeValue = (id, type) => (value) => {
      const dsPhuongThucTt = state.dsPhuongThucTt || {};
      if (!dsPhuongThucTt[id]) {
        dsPhuongThucTt[id] = { phuongThucTtId: id };
      }
      dsPhuongThucTt[id][type] = value;
      setState({ dsPhuongThucTt: { ...dsPhuongThucTt } });
      onChange && onChange(dsPhuongThucTt);
    };

    return (
      <Main>
        {(listPhuongThucThanhToan || []).map((item, index) => {
          return (
            <Row className="row-box" key={index}>
              <Col span={12}>
                <div className="row-label">{`${item.ten}`}</div>
                <InputTimeout
                  type="number"
                  formatPrice={true}
                  min={0}
                  value={state.dsPhuongThucTt[item.id]?.tongTien}
                  placeholder={t("common.nhapSoTien")}
                  onChange={onChangeValue(item.id, "tongTien")}
                />
              </Col>
              {/* https://jira.isofh.com.vn/browse/SAKURA-10726 */}
              {item.loaiPhuongThucTt == 32 && (
                <Col span={12}>
                  <div className="row-label">{t("goiDichVu.maChuanChi")}</div>
                  <InputTimeout
                    value={state.dsPhuongThucTt[item.id]?.maChuanChi}
                    placeholder={t("goiDichVu.nhapMaChuanChi")}
                    onChange={onChangeValue(item.id, "maChuanChi")}
                  />
                </Col>
              )}
            </Row>
          );
        })}
      </Main>
    );
  }
);
export default React.memo(PhuongThucThanhToan);
