import { Checkbox } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getIdFromUrl } from "utils";
import { mapTable } from "./const";
import { WrapperStyled } from "./styled";

const BangKeCPKB_CB = ({ getBangKeChiPhiKb_Cb, chiPhiKb_Cb }) => {
  const [data, setData] = useState([]);

  const handleData = (data) => {
    return (data || []).map((item) => ({
      ...item,
      dsNhomDv: mapTable.map((groupDv, idx) => ({
        idx,
        ...groupDv,
        ...(item.dsNhomDv.find(
          (nhom) => nhom.tenNhomDichVuCap1 === groupDv.key
        ) || {}),
      })),
    }));
  };

  useEffect(() => {
    if (chiPhiKb_Cb) {
      setData(handleData(chiPhiKb_Cb?.dsDvTheoBhyt));
    }
  }, [chiPhiKb_Cb]);

  useEffect(() => {
    const id = getIdFromUrl();
    if (id) getBangKeChiPhiKb_Cb(id);
  }, []);

  const renderGroup = (values, colSpan = 6, numLineEmpty = 2, note) => {
    return (
      <>
        <tr>
          <td className="td-title" colSpan={colSpan}>
            {`${values.idx + 1}. ${values.key}`}
            {values.note && <span className="note">{values.note}</span>}
          </td>
          <td>{values.thanhTien?.formatPrice()}</td>
          <td>{}</td>
          <td>{values.thanhTienBh?.formatPrice()}</td>
          <td>{}</td>
          <td>{values.tienNbCungChiTra?.formatPrice()}</td>
          <td>{values.tienNguonKhac?.formatPrice()}</td>
          <td>{values.tienNbTuTra?.formatPrice()}</td>
        </tr>
        {values.dsDv
          ? values.dsDv.map((dv, idx) => (
              <tr key={idx} className="tr-empty">
                <td>{dv.tenDichVu}</td>
                <td>{dv.tenDonViTinh}</td>
                <td>{dv.soLuong}</td>
                <td>{dv.donGia?.formatPrice()}</td>
                <td>{dv.tienBhThanhToan?.formatPrice()}</td>
                <td>{dv.tyLeTtDv}</td>
                <td>{dv.thanhTien?.formatPrice()}</td>
                <td>{dv.tyLeBhTt}</td>
                <td>{dv.thanhTienBh?.formatPrice()}</td>
                <td>{}</td>
                <td>{dv.tienNbCungChiTra?.formatPrice()}</td>
                <td>{dv.tienNguonKhac?.formatPrice()}</td>
                <td>{dv.tienNbTuTra?.formatPrice()}</td>
              </tr>
            ))
          : Array.from(Array(numLineEmpty).keys()).map((item) => (
              <tr key={item} className="tr-empty">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
                  <td key={item}></td>
                ))}
              </tr>
            ))}
      </>
    );
  };

  return (
    <WrapperStyled>
      <div className="bkcp-header">
        <div className="bkcp-header-name">
          M???U B???NG K?? CHI PH?? KH??M B???NH, CH???A B???NH
        </div>
        <div className="bkcp-header-description">
          (Ban h??nh k??m theo Quy???t ?????nh s??? 6556/Q??-BYT ng??y 30 th??ng 10 n??m 2018
          c???a B??? tr?????ng B???Y t???)
        </div>
        <div className="bkcp-header-departments">
          <div className="department-left">
            <div className="line-info">
              <div className="line-info-title">
                B??? Y t???/S??? Y t???/ Y t??? ng??nh:
              </div>
              <div className="line-info-content"></div>
            </div>
            <div className="line-info">
              <div className="line-info-title">C?? s??? kh??m ch???a b???nh: </div>
              <div className="line-info-content"></div>
            </div>
            <div className="line-info">
              <div className="line-info-title">Khoa: </div>
              <div className="line-info-content">{chiPhiKb_Cb?.tenKhoaNb}</div>
            </div>
            <div className="line-info">
              <div className="line-info-title">M?? khoa: </div>
              <div className="line-info-content">{chiPhiKb_Cb?.maKhoaNb}</div>
            </div>
          </div>
          <div className="department-right">
            <div className="line-info">
              <div className="line-info-title">M???u s???: 01/KBCB</div>
              <div className=""></div>
            </div>
            <div className="line-info">
              <div className="line-info-title">M?? s??? ng?????i b???nh: </div>
              <div className="line-info-content">{chiPhiKb_Cb?.maNb}</div>
            </div>
            <div className="line-info">
              <div className="line-info-title">S??? kh??m b???nh: </div>
              <div className="line-info-content"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bkcp-body">
        <div className="bkcp-body-title">
          B???NG K?? CHI PH?? ...
          <div className="box-input"></div>
        </div>
        <div className="bkcp-body-part1">
          <div className="bkcp-body-header">I. Ph???n H??nh ch??nh:</div>
          <div className="bkcp-body-content">
            <div className="box-input">
              <div className="box-input-name">(1) H??? t??n ng?????i b???nh: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.tenNb}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Ng??y, th??ng, n??m sinh: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.ngaySinh}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Gi???i t??nh: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.gioiTinh}</div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(2) ?????a ch??? hi???n t???i: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.diaChi}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(3) M?? khu v???c (K1/K2/K3) </div>
              <div className="box-input-box"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(4) M?? th??? BHYT </div>
              <div className="box-input-text">{chiPhiKb_Cb?.maTheBhyt}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Gi?? tr??? t??? </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.tuNgayTheBhyt).format("DD/MM/YYYY")}
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name"> ?????n </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.denNgayTheBhyt).format("DD/MM/YYYY")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(5) N??i ??K KCB ban ?????u: </div>
              <div className="box-input-text">{`${chiPhiKb_Cb?.maNoiDangKy} - ${chiPhiKb_Cb?.tenNoiDangKy}`}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(6) M?? </div>
              <div className="box-input-box">{chiPhiKb_Cb?.maNoiDangKy}</div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(7) ?????n kh??m </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.thoiGianVaoVien).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">
                (8) ??i???u tr??? ngo???i tr??/ n???i tr?? t???
              </div>
              <div className="box-input-text"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name">
                (9) K???t th??c kh??m/ ??i???u tr???:{" "}
              </div>
              <div className="box-input-text"></div>
            </div>
            <div className="box-input">
              <div className="box-input-name">T???ng s??? ng??y ??i???u tr???: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.soNgayDieuTri}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(10) T??nh tr???ng ra vi???n: </div>
              <div className="box-input-box"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(11) C???p c???u: </div>
              <div className="box-input-checkbox">
                <Checkbox checked={chiPhiKb_Cb?.capCuu}></Checkbox>
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(12) ????ng tuy???n: </div>
              <div className="box-input-checkbox">
                <Checkbox checked={chiPhiKb_Cb?.dungTuyen}></Checkbox>
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">N??i chuy???n t???: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.noiGioiThieu}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">N??i chuy???n ??i: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.vienChuyenDen}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(13) Th??ng tuy???n: </div>
              <div className="box-input-checkbox">
                <Checkbox></Checkbox>
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(14) Tr??i tuy???n: </div>
              <div className="box-input-checkbox">
                <Checkbox></Checkbox>
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(15) Ch???n ??o??n x??c ?????nh: </div>
              <div className="box-input-text">
                {chiPhiKb_Cb?.dsCdChinh?.map((item) => item.ten).join(",")}
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(16) M?? b???nh: </div>
              <div className="box-input-text">
                {chiPhiKb_Cb?.dsCdChinh?.map((item) => item.ma).join(",")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(17) B???nh k??m theo: </div>
              <div className="box-input-text"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name"></div>
              <div className="box-input-text"></div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(18) M?? b???nh k??m theo: </div>
              <div className="box-input-box">
                {chiPhiKb_Cb?.dsCdKemTheo?.map((item) => item.ma).join(",")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">
                (19) Th???i ??i???m ????? 05 n??m li??n t???c t??? ng??y
              </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.thoiGianDu5Nam).format("DD/MM/YYYY")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">
                (20) Mi???n c??ng chi tr??? trong n??m t??? ng??y
              </div>
              <div className="box-input-text">
                {chiPhiKb_Cb?.tuNgayMienCungChiTra}
              </div>
            </div>
          </div>
        </div>
        <div className="bkcp-body-part2">
          <div className="bkcp-body-header">
            II. Ph???n Chi ph?? kh??m b???nh, ch???a b???nh:{" "}
            <span className="bkcp-body-header-note">
              (M???i m?? th??? BHYT th???ng k?? ph???n chi khi kh??m b???nh, ch???a b???nh ph??t
              sinh t????ng ???ng theo m?? th??? ????)
            </span>
          </div>

          {data.map((group, idx) => (
            <div key={idx + 1} className="bkcp-body-content">
              <div className="box-input">
                <div className="box-input-name">M?? th??? BHYT:</div>
                <div className="box-input-text">{group?.maTheBhyt}</div>
              </div>
              <div className="box-input">
                <div>
                  <b>Gi?? tr??? t???: </b>
                  {moment(group?.tuNgayTheBhyt).format("DD/MM/YYYY")}
                  <b> ?????n: </b>
                  {moment(group?.denNgayTheBhyt).format("DD/MM/YYYY")}
                </div>
              </div>
              <div className="box-input">
                <div className="box-input-name">M???c h?????ng: </div>
                <div className="box-input-text">{group?.mucHuongBhyt}</div>
              </div>

              <div className="box-input">
                <div className="box-input-name">
                  (Chi ph?? KBCB t??nh t??? ng??y ..../ ..../ ... ?????n ng??y .../ .../
                  ...)
                </div>
                <div className="box-input-text"></div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th rowSpan={2}>N???i dung</th>
                      <th rowSpan={2}>????n v??? t??nh</th>
                      <th rowSpan={2}>S??? l?????ng</th>
                      <th rowSpan={2}>
                        ????n gi?? BV <span className="unit">(?????ng)</span>
                      </th>
                      <th rowSpan={2}>
                        ????n gi?? BH <span className="unit">(?????ng)</span>
                      </th>
                      <th rowSpan={2}>
                        T??? l??? thanh to??n theo d???ch v???{" "}
                        <span className="unit">(%)</span>
                      </th>
                      <th rowSpan={2}>
                        Th??nh ti???n BV <span className="unit">(?????ng)</span>
                      </th>
                      <th rowSpan={2}>
                        T??? l??? thanh to??n BHYT <span className="unit">(%)</span>
                      </th>
                      <th rowSpan={2}>
                        Th??nh ti???n BH <span className="unit">(?????ng)</span>
                      </th>

                      <th colSpan={4}>
                        Ngu???n thanh to??n <span className="unit">(?????ng)</span>
                      </th>
                    </tr>
                    <tr>
                      <th>Qu??? BHYT</th>
                      <th>Ng?????i b???nh c??ng chi tr???</th>
                      <th>Kh??c</th>
                      <th>Ng?????i b???nh t??? tr???</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="count-top">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
                        (item) => (
                          <td key={item}>({item})</td>
                        )
                      )}
                    </tr>
                    {group.dsNhomDv?.map((item) =>
                      renderGroup(item, undefined, undefined, item.note)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="box-input w80">
            <div className="box-input-name-n">
              T???ng chi ph?? l???n kh??m b???nh/c??? ?????t ??i???u tr???
              <i> (l??m tr??n ?????n ????n v??? ?????ng):</i>
            </div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.thanhTien?.formatPrice()}
            </div>
            ?????ng
          </div>
          <div className="box-input w80">
            <div className="box-input-name-n">
              <i>(Vi???t b???ng ch???: </i>
            </div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.thanhTienBangChu}
            </div>
            )
          </div>
          <div>
            <b>Trong ????,</b> s??? ti???n do:
          </div>
          <div className="box-input">
            <div className="box-input-name-n">- Qu??? BHYT thanh to??n:</div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienBhThanhToan?.formatPrice()}
            </div>
          </div>

          <div className="box-input">
            <div className="box-input-name-n">- Ng?????i b???nh tr???, trong ????:</div>
            <div className="box-input-text">{}</div>
          </div>
          <div className="box-input">
            <div className="box-input-name-n">
              + C??ng tr??? trong ph???m vi BHYT:{" "}
            </div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienNbCungChiTra?.formatPrice()}
            </div>
          </div>
          <div className="box-input">
            <div className="box-input-name-n">+ C??c kho???n ph???i tr??? kh??c:</div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienNbTuTra?.formatPrice()}
            </div>
          </div>

          <div className="box-input">
            <div className="box-input-name-n">- Ngu???n kh??c:</div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienNguonKhac?.formatPrice()}
            </div>
          </div>
        </div>
      </div>
      <div className="bkcp-footer">
        <div className="bkcp-footer-signature">
          <div className="sign-item">
            <div className="sign-item-title">NG?????I L???P B???NG K??</div>
            <div>
              <i>(k??, ghi r?? h??? t??n)</i>
            </div>
          </div>
          <div className="sign-item">
            <div className="sign-item-date">Ng??y.... th??ng... n??m...</div>
            <div className="sign-item-title">K??? TO??N VI???N PH??</div>
            <div>
              <i>(k??, ghi r?? h??? t??n)</i>
            </div>
          </div>
        </div>

        <div className="bkcp-footer-signature">
          <div className="sign-item">
            <div className="sign-item-title">X??C NH???N C???A NG?????I B???NH</div>
            <div>
              <i>(k??, ghi r?? h??? t??n)</i>
            </div>
            <div className="sign-item-title">
              (T??i ???? nh???n ... phim ... Xquang/CT/MRl)
            </div>
          </div>
          <div className="sign-item">
            <div className="sign-item-date">Ng??y.... th??ng... n??m...</div>
            <div className="sign-item-title">GI??M ?????NH BHYT</div>
            <div>
              <i>(k??, ghi r?? h??? t??n)</i>
            </div>
          </div>
        </div>

        <div className="bkcp-footer-note">
          <div className="note-header">Ghi ch??</div>
          <p>
            - Tr?????ng h???p kh??m b???nh, ch???a b???nh t???i Tr???m y t???tuy???n x?? v?? t????ng
            ??????ng: Thay th??? ch??? k??, h??? t??n c???a K??? to??n vi???n ph?? b???ng ch??? k??, h???
            t??n c???a ng?????i ph??? tr??ch ????n v??? v?? ph???n k?? x??c nh???n c???a Gi??m ?????nh
            BHYT kh??ng b???t bu???c.
          </p>
          <p>
            - Tr?????ng h???p KBCB ngo???i tr??, ng?????i b???nh ???? ???????c nh???n phim ch???p
            (Xquang, Ct, MRI,...) th?? th???c hi???n theo quy ?????nh t???i ??i???u 1 Th??ng
            t?? s??? 50/2017/TT-BYT ng??y 29/12/2017 c???a B??? Y t???: Ng?????i b???nh ghi s???
            l?????ng t???ng lo???i phim ???? nh???n v??o ?? ???X??c nh???n c???a ng?????i b???nh??? v?? k??
            x??c nh???n, ghi r?? h??? t??n. Tr?????ng h???p c?? s??? KBCB gi??? l???i phim ????? ph???c
            v??? c??ng t??c nghi??n c???u khoa h???c, ????o t???o... th?? ph???i t???ng h???p v??
            th??ng b??o ????? c?? quan BHXH bi???t. Quy ?????nh n??y kh??ng ??p d???ng ?????i v???i
            c??c c?? s??? KBCB ???? tham gia ????? ??n th?? ??i???m kh??ng in phim v?? KCB n???i
            tr?? v?? KCB n???i tr?? ban ng??y.
          </p>
          <p>
            - Tr?????ng h???p ph???n k?? x??c nh???n chuy???n sang trang kh??c th?? c?? s??? kh??m
            b???nh, ch???a b???nh c?? tr??ch nhi???m c??n ch???nh m???u b???ng k?? ????? ?????m b???o ch???
            k?? g???n v???i n???i dung b???ng k??./.
          </p>
        </div>
      </div>
    </WrapperStyled>
  );
};

export default connect(
  ({ nbDotDieuTri: { chiPhiKb_Cb } }) => ({ chiPhiKb_Cb }),
  ({ nbDotDieuTri: { getBangKeChiPhiKb_Cb } }) => ({ getBangKeChiPhiKb_Cb })
)(BangKeCPKB_CB);
