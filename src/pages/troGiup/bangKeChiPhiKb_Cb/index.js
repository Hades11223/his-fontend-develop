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
          MẪU BẢNG KÊ CHI PHÍ KHÁM BỆNH, CHỮA BỆNH
        </div>
        <div className="bkcp-header-description">
          (Ban hành kèm theo Quyết định số 6556/QĐ-BYT ngày 30 tháng 10 năm 2018
          của Bộ trưởng BộY tế)
        </div>
        <div className="bkcp-header-departments">
          <div className="department-left">
            <div className="line-info">
              <div className="line-info-title">
                Bộ Y tế/Sở Y tế/ Y tế ngành:
              </div>
              <div className="line-info-content"></div>
            </div>
            <div className="line-info">
              <div className="line-info-title">Cơ sở khám chữa bệnh: </div>
              <div className="line-info-content"></div>
            </div>
            <div className="line-info">
              <div className="line-info-title">Khoa: </div>
              <div className="line-info-content">{chiPhiKb_Cb?.tenKhoaNb}</div>
            </div>
            <div className="line-info">
              <div className="line-info-title">Mã khoa: </div>
              <div className="line-info-content">{chiPhiKb_Cb?.maKhoaNb}</div>
            </div>
          </div>
          <div className="department-right">
            <div className="line-info">
              <div className="line-info-title">Mẫu số: 01/KBCB</div>
              <div className=""></div>
            </div>
            <div className="line-info">
              <div className="line-info-title">Mã số người bệnh: </div>
              <div className="line-info-content">{chiPhiKb_Cb?.maNb}</div>
            </div>
            <div className="line-info">
              <div className="line-info-title">Số khám bệnh: </div>
              <div className="line-info-content"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bkcp-body">
        <div className="bkcp-body-title">
          BẢNG KÊ CHI PHÍ ...
          <div className="box-input"></div>
        </div>
        <div className="bkcp-body-part1">
          <div className="bkcp-body-header">I. Phần Hành chính:</div>
          <div className="bkcp-body-content">
            <div className="box-input">
              <div className="box-input-name">(1) Họ tên người bệnh: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.tenNb}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Ngày, tháng, năm sinh: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.ngaySinh}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Giới tính: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.gioiTinh}</div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(2) Địa chỉ hiện tại: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.diaChi}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(3) Mã khu vực (K1/K2/K3) </div>
              <div className="box-input-box"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(4) Mã thẻ BHYT </div>
              <div className="box-input-text">{chiPhiKb_Cb?.maTheBhyt}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Giá trị từ </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.tuNgayTheBhyt).format("DD/MM/YYYY")}
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name"> đến </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.denNgayTheBhyt).format("DD/MM/YYYY")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(5) Nơi ĐK KCB ban đầu: </div>
              <div className="box-input-text">{`${chiPhiKb_Cb?.maNoiDangKy} - ${chiPhiKb_Cb?.tenNoiDangKy}`}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(6) Mã </div>
              <div className="box-input-box">{chiPhiKb_Cb?.maNoiDangKy}</div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(7) Đến khám </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.thoiGianVaoVien).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">
                (8) Điều trị ngoại trú/ nội trú từ
              </div>
              <div className="box-input-text"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name">
                (9) Kết thúc khám/ điều trị:{" "}
              </div>
              <div className="box-input-text"></div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Tổng số ngày điều trị: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.soNgayDieuTri}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(10) Tình trạng ra viện: </div>
              <div className="box-input-box"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(11) Cấp cứu: </div>
              <div className="box-input-checkbox">
                <Checkbox checked={chiPhiKb_Cb?.capCuu}></Checkbox>
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(12) Đúng tuyến: </div>
              <div className="box-input-checkbox">
                <Checkbox checked={chiPhiKb_Cb?.dungTuyen}></Checkbox>
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Nơi chuyển từ: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.noiGioiThieu}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">Nơi chuyển đi: </div>
              <div className="box-input-text">{chiPhiKb_Cb?.vienChuyenDen}</div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(13) Thông tuyến: </div>
              <div className="box-input-checkbox">
                <Checkbox></Checkbox>
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(14) Trái tuyến: </div>
              <div className="box-input-checkbox">
                <Checkbox></Checkbox>
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(15) Chẩn đoán xác định: </div>
              <div className="box-input-text">
                {chiPhiKb_Cb?.dsCdChinh?.map((item) => item.ten).join(",")}
              </div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(16) Mã bệnh: </div>
              <div className="box-input-text">
                {chiPhiKb_Cb?.dsCdChinh?.map((item) => item.ma).join(",")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">(17) Bệnh kèm theo: </div>
              <div className="box-input-text"></div>
            </div>

            <div className="box-input">
              <div className="box-input-name"></div>
              <div className="box-input-text"></div>
            </div>
            <div className="box-input">
              <div className="box-input-name">(18) Mã bệnh kèm theo: </div>
              <div className="box-input-box">
                {chiPhiKb_Cb?.dsCdKemTheo?.map((item) => item.ma).join(",")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">
                (19) Thời điểm đủ 05 năm liên tục từ ngày
              </div>
              <div className="box-input-text">
                {moment(chiPhiKb_Cb?.thoiGianDu5Nam).format("DD/MM/YYYY")}
              </div>
            </div>

            <div className="box-input">
              <div className="box-input-name">
                (20) Miễn cùng chi trả trong năm từ ngày
              </div>
              <div className="box-input-text">
                {chiPhiKb_Cb?.tuNgayMienCungChiTra}
              </div>
            </div>
          </div>
        </div>
        <div className="bkcp-body-part2">
          <div className="bkcp-body-header">
            II. Phần Chi phí khám bệnh, chữa bệnh:{" "}
            <span className="bkcp-body-header-note">
              (Mỗi mã thẻ BHYT thống kê phần chi khi khám bệnh, chữa bệnh phát
              sinh tương ứng theo mã thẻ đó)
            </span>
          </div>

          {data.map((group, idx) => (
            <div key={idx + 1} className="bkcp-body-content">
              <div className="box-input">
                <div className="box-input-name">Mã thẻ BHYT:</div>
                <div className="box-input-text">{group?.maTheBhyt}</div>
              </div>
              <div className="box-input">
                <div>
                  <b>Giá trị từ: </b>
                  {moment(group?.tuNgayTheBhyt).format("DD/MM/YYYY")}
                  <b> đến: </b>
                  {moment(group?.denNgayTheBhyt).format("DD/MM/YYYY")}
                </div>
              </div>
              <div className="box-input">
                <div className="box-input-name">Mức hưởng: </div>
                <div className="box-input-text">{group?.mucHuongBhyt}</div>
              </div>

              <div className="box-input">
                <div className="box-input-name">
                  (Chi phí KBCB tính từ ngày ..../ ..../ ... đến ngày .../ .../
                  ...)
                </div>
                <div className="box-input-text"></div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th rowSpan={2}>Nội dung</th>
                      <th rowSpan={2}>Đơn vị tính</th>
                      <th rowSpan={2}>Số lượng</th>
                      <th rowSpan={2}>
                        Đơn giá BV <span className="unit">(Đồng)</span>
                      </th>
                      <th rowSpan={2}>
                        Đơn giá BH <span className="unit">(Đồng)</span>
                      </th>
                      <th rowSpan={2}>
                        Tỷ lệ thanh toán theo dịch vụ{" "}
                        <span className="unit">(%)</span>
                      </th>
                      <th rowSpan={2}>
                        Thành tiền BV <span className="unit">(Đồng)</span>
                      </th>
                      <th rowSpan={2}>
                        Tỷ lệ thanh toán BHYT <span className="unit">(%)</span>
                      </th>
                      <th rowSpan={2}>
                        Thành tiền BH <span className="unit">(Đồng)</span>
                      </th>

                      <th colSpan={4}>
                        Nguồn thanh toán <span className="unit">(Đồng)</span>
                      </th>
                    </tr>
                    <tr>
                      <th>Quỹ BHYT</th>
                      <th>Người bệnh cùng chi trả</th>
                      <th>Khác</th>
                      <th>Người bệnh tự trả</th>
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
              Tổng chi phí lần khám bệnh/cả đợt điều trị
              <i> (làm tròn đến đơn vị đồng):</i>
            </div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.thanhTien?.formatPrice()}
            </div>
            đồng
          </div>
          <div className="box-input w80">
            <div className="box-input-name-n">
              <i>(Viết bằng chữ: </i>
            </div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.thanhTienBangChu}
            </div>
            )
          </div>
          <div>
            <b>Trong đó,</b> số tiền do:
          </div>
          <div className="box-input">
            <div className="box-input-name-n">- Quỹ BHYT thanh toán:</div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienBhThanhToan?.formatPrice()}
            </div>
          </div>

          <div className="box-input">
            <div className="box-input-name-n">- Người bệnh trả, trong đó:</div>
            <div className="box-input-text">{}</div>
          </div>
          <div className="box-input">
            <div className="box-input-name-n">
              + Cùng trả trong phạm vi BHYT:{" "}
            </div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienNbCungChiTra?.formatPrice()}
            </div>
          </div>
          <div className="box-input">
            <div className="box-input-name-n">+ Các khoản phải trả khác:</div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienNbTuTra?.formatPrice()}
            </div>
          </div>

          <div className="box-input">
            <div className="box-input-name-n">- Nguồn khác:</div>
            <div className="box-input-text">
              {chiPhiKb_Cb?.tienNguonKhac?.formatPrice()}
            </div>
          </div>
        </div>
      </div>
      <div className="bkcp-footer">
        <div className="bkcp-footer-signature">
          <div className="sign-item">
            <div className="sign-item-title">NGƯỜI LẬP BẢNG KÊ</div>
            <div>
              <i>(ký, ghi rõ họ tên)</i>
            </div>
          </div>
          <div className="sign-item">
            <div className="sign-item-date">Ngày.... tháng... năm...</div>
            <div className="sign-item-title">KẾ TOÁN VIỆN PHÍ</div>
            <div>
              <i>(ký, ghi rõ họ tên)</i>
            </div>
          </div>
        </div>

        <div className="bkcp-footer-signature">
          <div className="sign-item">
            <div className="sign-item-title">XÁC NHẬN CỦA NGƯỜI BỆNH</div>
            <div>
              <i>(ký, ghi rõ họ tên)</i>
            </div>
            <div className="sign-item-title">
              (Tôi đã nhận ... phim ... Xquang/CT/MRl)
            </div>
          </div>
          <div className="sign-item">
            <div className="sign-item-date">Ngày.... tháng... năm...</div>
            <div className="sign-item-title">GIÁM ĐỊNH BHYT</div>
            <div>
              <i>(ký, ghi rõ họ tên)</i>
            </div>
          </div>
        </div>

        <div className="bkcp-footer-note">
          <div className="note-header">Ghi chú</div>
          <p>
            - Trường hợp khám bệnh, chữa bệnh tại Trạm y tếtuyến xã và tương
            đương: Thay thế chữ ký, họ tên của Kế toán viện phí bằng chữ ký, họ
            tên của người phụ trách đơn vị và phần ký xác nhận của Giám định
            BHYT không bắt buộc.
          </p>
          <p>
            - Trường hợp KBCB ngoại trú, người bệnh đã được nhận phim chụp
            (Xquang, Ct, MRI,...) thì thực hiện theo quy định tại Điều 1 Thông
            tư số 50/2017/TT-BYT ngày 29/12/2017 của Bộ Y tế: Người bệnh ghi số
            lượng từng loại phim đã nhận vào ô “Xác nhận của người bệnh” và ký
            xác nhận, ghi rõ họ tên. Trường hợp cơ sở KBCB giữ lại phim để phục
            vụ công tác nghiên cứu khoa học, đào tạo... thì phải tổng hợp và
            thông báo để cơ quan BHXH biết. Quy định này không áp dụng đối với
            các cơ sở KBCB đã tham gia Đề án thí điểm không in phim và KCB nội
            trú và KCB nội trú ban ngày.
          </p>
          <p>
            - Trường hợp phần ký xác nhận chuyển sang trang khác thì cơ sở khám
            bệnh, chữa bệnh có trách nhiệm căn chỉnh mẫu bảng kê để đảm bảo chữ
            ký gắn với nội dung bảng kê./.
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
