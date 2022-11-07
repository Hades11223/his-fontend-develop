import React, { useEffect } from "react";
import { Main } from "./styled";
import Button from "pages/kho/components/Button";
import { pdfGenerator } from "utils/editor-utils";
import Line from "./Line";
import Page from "./Page";
import Grid from "./Grid";
import { pageType } from "../../../utils/editor-utils";
import { HOST } from "client/request";
/**
 * BaoCao
 *
 */

const BaoCao = (props) => {
  const mock = {
    tenNb: "MAI NGỌC NAM",
    diaChi: "Nga Hải, Nga Sơn, Thanh Hóa",
    tenKhoaNb: "Khoa khám bệnh",
    maKhoaNb: "K01",
    maNb: "NB01",
    maHoSo: "3035345034",
    maTheBhyt: "HT3010500105540",
    tuNgayTheBhyt: new Date().getTime(),
    denNgayTheBhyt: new Date().getTime(),
    thoiGianVaoVien: new Date().getTime(),
    tuNgayMienCungChiTra: new Date().getTime(),
    thoiGianDu5Nam: new Date().getTime(),
    ngaySinh: new Date().getTime(),
    gioiTinh: "Nam",
    soNgayDieuTri: 10,
    tenNoiGioiThieu: "Bệnh viện đa khoa Thanh Hóa",
    cdKemTheo: "Chẩn đoán kèm theo",
    cdChinh: "Chẩn đoán chính",
    maNoiDangKy: "00001",
    tenNoiDangKy: "Bệnh viện Thanh Hóa",
    mucHuongTheBhyt: 80,
    emailBenhVien: "mainam.ctk33@gmail.com",
    webBenhVien: "https://ngocnam.info",
    sdtBenhVien: "0981111300",
    diaChiBv: "313 Trường Chinh, Thanh Xuân, Hà Nội",
    tenBenhVien: "TRUNG TÂM TIM MẠCH",
    tieuDeTrai1: "BỘ Y TẾ",
    tenNguoiIn: "Mai Ngọc Nam",
    thoiGianIn: new Date().getTime(),
    thanhTienKhac: 1000000,
    thanhTienNbTuTra: 1000000,
    thanhTienNbCungChiTra: 1000000,
    thanhTienQuyBhyt: 1000000,
    thanhTienBangChu: "Thành tiền bằng chữ",
    thanhTien: 1000000,
  };
  const onClick = () => {
    pdfGenerator(pageType.A4.h).then((s) => {
      if (s.pdfUrls[0]) window.open(s.pdfUrls[0]);
    });
  };
  return (
    <Main layout={pageType.A4.h}>
      <div>
        <Button type="success" onClick={onClick}>
          In
        </Button>
      </div>
      <div className="editing-box" id="scrollBox">
        <Page layout={pageType.A4.h} top={20} left={5} right={5} bottom={10}>
          <Grid>
            <Line>
              <div className="flex border-bottom pb5">
                <div className="center w150">
                  <img
                    className="logo-header"
                    src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
                  />
                  <p className="bold">{mock.tieuDeTrai1}</p>
                </div>
                <div className="flex1 align-right">
                  <p className="bold mt20 mb5">{mock.tenBenhVien}</p>
                  <p className="mb10">{mock.diaChiBv}</p>
                  <div className="flex">
                    <p className="flex1">
                      <img
                        className="header-ic"
                        src={require("./images/phone.png")}
                      />
                      {mock.sdtBenhVien}
                    </p>
                    <p className="flex1">
                      <img
                        className="header-ic"
                        src={require("./images/web.png")}
                      />
                      {mock.webBenhVien}
                    </p>
                    <p className="flex1">
                      <img
                        className="header-ic"
                        src={require("./images/email.png")}
                      />
                      {mock.emailBenhVien}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="c001f60 bold ml30 mt10 mb20 fz18">
                  BẢNG KÊ CHI PHÍ KHÁM BỆNH
                </p>
                <div className="flex">
                  <span className="w100 bold">Khoa:</span>
                  <span className="bold">{mock.tenKhoaNb}</span>
                  <div className="flex1 align-right">
                    Ngày đăng ký:
                    <span className="block bold ml5">
                      {mock.thoiGianVaoVien
                        ?.toDateObject()
                        .format("dd/MM/yyyy HH;mm;ss")}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <span className="w100 bold">Mã khoa:</span>
                  <span className="bold">{mock.maKhoaNb}</span>
                  <div className="flex1 align-right">Mã NB: {mock.maNb}</div>
                </div>
                <div className="flex ">
                  <span className="w100 bold">Mẫu số:</span>
                  <div className="flex1 align-right"> Mã HS: {mock.maHoSo}</div>
                </div>
              </div>
              <div>
                <p className="c001f60 bold mt10 mb5">I. THÔNG TIN HÀNH CHÍNH</p>
                <div className="flex">
                  <span className="w100">Họ và tên:</span>
                  <span className="block bold w300">{mock.tenNb}</span>
                  Ngày tháng năm sinh:
                  <span className="block ml5 w250">
                    {mock.ngaySinh?.toDateObject().format("dd/MM/yyyy")}
                  </span>
                  Giới tính:
                  <span className="block bold ml5 w100">{mock.gioiTinh}</span>
                  Mã khu vực: <span className="block bold ml5"></span>
                </div>
                <div className="flex">
                  <span className="w100">Địa chỉ:</span>
                  <span className="block">{mock.diaChi}</span>
                </div>
                <div className="flex">
                  <span className="w100">Mã thẻ BHYT:</span>
                  <span className="block bold">{mock.maTheBhyt}</span>
                </div>
                <div className="flex">
                  <span className="w100">Giá trị từ ngày:</span>
                  <span className="w300">
                    {mock.tuNgayTheBhyt?.toDateObject().format("dd/MM/yyyy")}
                  </span>
                  Giá trị đến ngày:
                  <span className="ml5">
                    {mock.denNgayTheBhyt?.toDateObject().format("dd/MM/yyyy")}
                  </span>
                </div>
                <p>
                  Nơi đăng ký KCB ban đầu:
                  <span className="block bold ml5">
                    {mock.maNoiDangKy} - {mock.tenNoiDangKy}
                  </span>
                </p>
                <div className="flex">
                  <div className="w400">
                    Thời điểm đủ 05 năm liên tục từ ngày:
                    <span className="ml5">
                      {mock.thoiGianDu5Nam?.toDateObject().format("dd/MM/yyyy")}
                    </span>
                  </div>
                  Miễn cùng chi trả trong năm từ ngày:
                  <span className="ml5">
                    {mock.tuNgayMienCungChiTra
                      ?.toDateObject()
                      .format("dd/MM/yyyy")}
                  </span>
                </div>
                <div className="flex">
                  <div className="w200">Đến khám:</div>
                  <span>
                    {mock.thoiGianVaoVien
                      ?.toDateObject()
                      .format("HH giờ mm phút ngày dd tháng MM năm yyyy")}
                  </span>
                </div>
                <div className="flex">
                  <div className="w200">Điều trị ngoại trú/nội trú từ:</div>
                  <span className="">
                    {mock.thoiGianVaoVien
                      ?.toDateObject()
                      .format("HH giờ mm phút ngày dd tháng MM năm yyyy")}
                  </span>
                </div>
                <div className="flex">
                  <div className="w200">Kết thúc khám/điều trị:</div>
                  <span className="">
                    {mock.thoiGianVaoVien
                      ?.toDateObject()
                      .format("HH giờ mm phút ngày dd tháng MM năm yyyy")}
                  </span>
                </div>

                <div className="flex">
                  <div className="w200">Tổng số ngày điều trị:</div>
                  <span className="block w200">{mock.soNgayDieuTri}</span>
                  Tình trạng ra viện:
                </div>
                <div className="flex">
                  <div className="w200">Cấp cứu: </div>
                  <div className="w200">Đúng tuyến: </div>
                  <div className="w200">Thông tuyến:</div>
                  <div className="w200">Trái tuyến:</div>
                </div>
                <div className="flex">
                  <div className="w200">Nơi chuyến đến từ:</div>
                  <span className="">{mock.tenNoiGioiThieu}</span>
                </div>
                <div className="flex">
                  <div className="w200">Nơi chuyển đi:</div>
                  <span className=""></span>
                </div>
                <div className="flex">
                  <div className="w200">Chẩn đoán xác định:</div>
                  <span className="">{mock.cdChinh}</span>
                </div>
                <div className="flex">
                  <div className="w200">Chẩn đoán kèm theo:</div>
                  <span className="">{mock.cdKemTheo}</span>
                </div>
              </div>
              <div>
                <p className="c001f60 bold mt10 mb5">
                  II. CHI PHÍ KHÁM BỆNH, CHỮA BỆNH
                </p>
                <div className="flex mb10">
                  Mã thẻ BHYT:
                  <span className="block bold ml5">{mock.maTheBhyt}</span>
                  <span className="ml10">Giá trị từ ngày:</span>
                  <span className="block bold ml5">
                    {mock.tuNgayTheBhyt?.toDateObject().format("dd/MM/yyyy")}
                  </span>
                  <span className="ml10">đến ngày</span>
                  <span className="block bold ml5">
                    {mock.denNgayTheBhyt?.toDateObject().format("dd/MM/yyyy")}
                  </span>
                  <span className="ml10">Mức hưởng:</span>
                  <span className="block bold ml5">{mock.mucHuongTheBhyt}</span>
                </div>
              </div>
            </Line>
            <Line>
              <table>
                <thead>
                  <tr className="bold center vam">
                    <td rowSpan={2} className="w150">
                      Nội dung
                    </td>
                    <td rowSpan={2} className={"w80"}>
                      DVT
                    </td>
                    <td rowSpan={2} className={"w80"}>
                      SL
                    </td>
                    <td rowSpan={2} className={"w90"}>
                      Đơn giá BV (đồng)
                    </td>
                    <td rowSpan={2} className={"w90"}>
                      Đơn giá BH (đồng)
                    </td>
                    <td rowSpan={2} className={"w90"}>
                      Tỷ lệ thanh toán theo dịch vụ(%)
                    </td>
                    <td rowSpan={2} className={"w90"}>
                      Thành tiền BV (đồng)
                    </td>
                    <td rowSpan={2} className={"w90"}>
                      Tỷ lệ thanh toán BHYT (%)
                    </td>
                    <td rowSpan={2} className={"w90"}>
                      Thành tiền BH (đồng)
                    </td>
                    <td colSpan={4}>Nguồn thanh toán (đồng) </td>
                  </tr>
                  <tr className="bold center vam">
                    <td className="border-left w90">Quỹ BHYT</td>
                    <td className={"w90"}>NB cùng chi trả</td>
                    <td className={"w90"}>Khác</td>
                    <td className={"w90"}>NB tự trả</td>
                  </tr>
                  <tr>
                    {Array(13)
                      .fill({})
                      .map((item, index) => {
                        return (
                          <td key={index} className="center bold">
                            ({index + 1})
                          </td>
                        );
                      })}
                  </tr>
                </thead>
                <tbody>
                  {[                   
                    {
                      tenNhomDichVuCap1: "tenNhomDichVuCap1",
                      thanhTien: 1000000,
                      thanhTienBh: 1000000,
                      tienBhThanhToan: 10000000,
                      tienNbCungChiTra: 10000000,
                      tienNguonKhac: 100000,
                      tienNbTuTra: 10000,
                      dv: [{ tenDichVu: "1" }],
                    },
                    {
                      tenNhomDichVuCap1: "tenNhomDichVuCap1",
                      thanhTien: 1000000,
                      thanhTienBh: 1000000,
                      tienBhThanhToan: 10000000,
                      tienNbCungChiTra: 10000000,
                      tienNguonKhac: 100000,
                      tienNbTuTra: 10000,
                      dv: [{ tenDichVu: "1" }],
                    },
                    {
                      tenNhomDichVuCap1: "tenNhomDichVuCap1",
                      thanhTien: 1000000,
                      thanhTienBh: 1000000,
                      tienBhThanhToan: 10000000,
                      tienNbCungChiTra: 10000000,
                      tienNguonKhac: 100000,
                      tienNbTuTra: 10000,
                      dv: [{ tenDichVu: "1" }],
                    },
                    {
                      tenNhomDichVuCap1: "tenNhomDichVuCap1",
                      thanhTien: 1000000,
                      thanhTienBh: 1000000,
                      tienBhThanhToan: 10000000,
                      tienNbCungChiTra: 10000000,
                      tienNguonKhac: 100000,
                      tienNbTuTra: 10000,
                      dv: [{ tenDichVu: "1" }],
                    },
                    {
                      tenNhomDichVuCap1: "tenNhomDichVuCap1",
                      thanhTien: 1000000,
                      thanhTienBh: 1000000,
                      tienBhThanhToan: 10000000,
                      tienNbCungChiTra: 10000000,
                      tienNguonKhac: 100000,
                      tienNbTuTra: 10000,
                      dv: [{ tenDichVu: "1" }],
                    },
                    {
                      tenNhomDichVuCap1: "tenNhomDichVuCap1",
                      thanhTien: 1000000,
                      thanhTienBh: 1000000,
                      tienBhThanhToan: 10000000,
                      tienNbCungChiTra: 10000000,
                      tienNguonKhac: 100000,
                      tienNbTuTra: 10000,
                      dv: [{ tenDichVu: "1" }],
                    },
                  ].map((nhom, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="bg-ddebf7">
                          <td colSpan={6} className="bold">
                            {nhom.tenNhomDichVuCap1}
                          </td>
                          <td colSpan={1} className="bold center">
                            {nhom.thanhTien}
                          </td>
                          <td></td>
                          <td colSpan={1} className="bold center">
                            {nhom.thanhTienBh}
                          </td>
                          <td colSpan={1} className="bold center">
                            {nhom.tienBhThanhToan}
                          </td>
                          <td colSpan={1} className="bold center">
                            {nhom.tienNbCungChiTra}
                          </td>
                          <td colSpan={1} className="bold center">
                            {nhom.tienNguonKhac}
                          </td>
                          <td colSpan={1} className="bold center">
                            {nhom.tienNbTuTra}
                          </td>
                        </tr>
                        {nhom.dv.map((dv, index2) => {
                          return (
                            <tr key={index2}>
                              <td colSpan={1}>{dv.tenDichVu}</td>
                              <td colSpan={1}>{dv.tenDonViTinh}</td>
                              <td colSpan={1}>{dv.soLuong}</td>
                              <td colSpan={1}>{dv.donGia}</td>
                              <td colSpan={1}>{dv.giaBaoHiem}</td>
                              <td colSpan={1}>{dv.tyLeTtDv}</td>
                              <td colSpan={1}>{dv.thanhTien}</td>
                              <td colSpan={1}>{dv.tyLeBhTt}</td>
                              <td colSpan={1}>{dv.thanhTienBh}</td>
                              <td colSpan={1}>{dv.tienBhThanhToan}</td>
                              <td colSpan={1}>{dv.tienNbCungChiTra}</td>
                              <td colSpan={1}>{dv.tienNguonKhac}</td>
                              <td colSpan={1}>{dv.tienNbTuTra}</td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="bold center" colSpan={6}>
                      Tổng cộng:
                    </td>
                    <td className="bold">{mock.thanhTien}</td>
                    <td className="bold"></td>
                    <td className="bold">{mock.thanhTienBh}</td>
                    <td className="bold">{mock.tienBhThanhToan}</td>
                    <td className="bold">{mock.tienNbCungChiTra}</td>
                    <td className="bold">{mock.tienNguonKhac}</td>
                    <td className="bold">{mock.tienNbTuTra}</td>
                  </tr>
                </tfoot>
              </table>
              {/* <footer>
                This is the text that goes at the bottom of every page.
              </footer> */}
            </Line>
            <Line>
              <div className="flex mt20">
                <span className="bold w300">
                  Tổng chi phí lần khám bệnh/cả đợt điều trị:
                </span>
                <span className="w200 bold align-right">{mock.thanhTien}</span>
              </div>
              <p className="bold">(Viết bằng chữ:{mock.thanhTienBangChu} )</p>
              <p className="bold">Trong đó, số tiền do:</p>
              <div className="flex">
                <span className="bold w300">- Qũy BHYT thanh toán:</span>
                <span className="w200 bold align-right">
                  {mock.thanhTienQuyBhyt}
                </span>
              </div>
              <div className="flex">
                <span className="bold w300">- Qũy BHYT thanh toán:</span>
                <span className="w200 bold align-right">
                  {mock.thanhTienQuyBhyt}
                </span>
              </div>
              <p className="bold">- Người bệnh trả, trong đó:</p>
              <div className="flex">
                <span className="bold bold w300">
                  + Cùng trả trong phạm vi BHYT:
                </span>
                <span className="w200 bold align-right">
                  {mock.thanhTienNbCungChiTra}
                </span>
              </div>
              <div className="flex">
                <span className="bold w300">+ Các khoản phải trả khác:</span>
                <span className="w200 bold align-right">
                  {mock.thanhTienNbTuTra}
                </span>
              </div>
              <div className="flex">
                <span className="bold w300">- Nguồn khác:</span>
                <span className="w200 bold align-right">
                  {mock.thanhTienKhac}
                </span>
              </div>
              <div className="flex">
                <div className="flex1 center">
                  <p className="bold mt25">NGƯỜI LẬP BẢNG KÊ</p>
                  <p className="mb80">(Ký, họ tên)</p>
                  <p>{mock.tenNguoiIn}</p>
                </div>
                <div className="flex1 center">
                  <p className="italic h25">
                    {mock.thoiGianIn
                      ?.toDateObject()
                      .format("Ngày dd tháng MM năm yyyy")}
                  </p>
                  <p className="bold">KẾ TOÁN VIỆN PHÍ</p>
                  <p>(Ký, họ tên)</p>
                </div>
              </div>
              <div className="flex mt15">
                <div className="flex1 center">
                  <p className="bold mt25">XÁC NHẬN CỦA NGƯỜI BỆNH</p>
                  <p>(Ký, họ tên)</p>
                  <p className="bold">(Tôi đã nhận … phim ….Xquang/CT/MRI)</p>
                </div>
                <div className="flex1 center">
                  <p className="italic h25">Ngày …. Tháng …. Năm 20…</p>
                  <p className="bold">GIÁM ĐỊNH BHYT</p>
                  <p>(Ký, họ tên)</p>
                </div>
              </div>
            </Line>
          </Grid>
        </Page>
      </div>
    </Main>
  );
};

export default BaoCao;
