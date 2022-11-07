import React, { useState, useEffect, useRef, useContext } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { orderBy } from "lodash";
import { MODE } from "utils/editor-utils";
import EMRContext from "pages/editor/context/EMR";
const VatTuTieuHao = (props) => {
  const context = useContext(EMRContext);
  const patient = context.patient || {};
  const {
    mode,
    valuesHIS,
    form,
    dieuDuong,
    fieldName,
    numberDateInRow,
    numberLineInFirstPage,
    numberLineInNextPage,
    colDateWidth,
  } = props;
  const [state, _setState] = useState({
    objKhoa: {},
    arrayKeyVatTus: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    let objKhoa = {};
    const dataVatTu = (form || {})[fieldName] || [];
    const dataDieuDuong = (form || {})[dieuDuong] || [];
    dataVatTu.forEach((item) => {
      if (!objKhoa[item.khoaId]) {
        //nếu item này thuộc 1 khoa chưa có trong danh sách
        objKhoa[item.khoaId] = {
          //thì tạo mới khoa đó
          objVatTu: {}, //inti objVatTu
          item, //kèm theo 1 item mặc định, item này chưa thông tin khoa,
          objDate: {}, //init objDate
          objDieuDuong: {},
        };
      }

      const date = item.ngay.toDateObject();
      const ddmmyyyy = date.format("yyyyMMdd");
      if (!objKhoa[item.khoaId].objDate[item.toDieuTriId]) {
        //nếu tờ điều trị này chưa có trong danh sách ngày
        objKhoa[item.khoaId].objDate[item.toDieuTriId] = {
          date,
          key: ddmmyyyy,
        }; //thì tạo mới dữ liệu
      }
      const key = item.tenVatTu?.toLowerCase().createUniqueText();
      if (!objKhoa[item.khoaId].objVatTu[key]) {
        //nếu vật tư đó chưa có trong khoa
        objKhoa[item.khoaId].objVatTu[key] = {
          //thì thêm vật tư vào khoa
          vatTu: item,
          dataDate: {},
        };
      }
      objKhoa[item.khoaId].objVatTu[key].dataDate[item.toDieuTriId] = item; //thêm vật tư đó vào dữ liệu ngày của tờ điều trị
    });
    if (mode === MODE.config) {
      //ở mode config thì init dữ liệu mẫu
      objKhoa[0] = {
        objVatTu: {},
        item: {},
        objDate: {},
        objDieuDuong: {},
      };
      const str = new Date().format("yyyy/MM/");
      for (let i = 1; i < 15; i++) {
        const date = (str + i).toDateObject();
        const datestr = date.format("yyyyMMdd");
        objKhoa[0].objDate[i] = { date, key: datestr };
      }
      for (let i = 0; i < 5; i++) {
        objKhoa[0].objVatTu[i] = {
          vatTu: {
            tenVatTu: "Vật tư 0" + (i + 1),
          },
          dataDate: {},
        };
      }
    }

    for (let key in objKhoa) {
      if (Number.isInteger(+key)) {
        dataDieuDuong.forEach((item) => {
          if (item.khoaId != key) return;
          const date = item.ngay.toDateObject();
          const ddmmyyyy = date.format("yyyyMMdd");
          if (!objKhoa[key].objDate[item.id]) {
            objKhoa[key].objDate[item.id] = { date, key: ddmmyyyy };
          }
          objKhoa[key].objDieuDuong[item.id] = item;
        });

        const keyVatTus = orderBy(
          Object.keys(objKhoa[key].objVatTu),
          [],
          "asc"
        ); //sort ds vật tư trong khoa

        let arr = Object.keys(objKhoa[key].objDate).map((key2) => {
          return {
            key: key2,
            dateKey: objKhoa[key].objDate[key2].key,
            date: objKhoa[key].objDate[key2].date,
          };
        });

        const keyDates = orderBy(arr, "dateKey", "asc").map((item) => item.key);
        const arrayKeyDates = splitArray(keyDates, numberDateInRow || 10);

        const arrayKeyVatTus = splitArray(
          //paging danh sach vật tư
          keyVatTus,
          numberLineInFirstPage,
          numberLineInNextPage
        );
        objKhoa[key].arrayKeyVatTus = arrayKeyVatTus;
        objKhoa[key].arrayKeyDates = arrayKeyDates;
        setState({
          objKhoa,
        });
      }
    }
  }, [valuesHIS, form, fieldName, dieuDuong]);

  const splitArray = (arr, chunkSize, chunkNextSize) => {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    R.push(arr.slice(0, 0 + chunkSize));
    if (!chunkNextSize) chunkNextSize = chunkSize;
    for (var i = chunkSize, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkNextSize));
    return R;
  };

  const renderHeader = (khoa, page) => {
    return (
      <tr>
        <td className="col-header-stt">
          <div>{"STT"}</div>
        </td>
        <td className="col-header-name">
          <div>
            <div style={{ textAlign: "right" }}>{"Ngày"}</div>
            <div>{"Loại vật tư"}</div>
          </div>
          <svg viewBox="0 0 10 10" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="10"
              y2="10"
              stroke="black"
              strokeWidth="0.2"
            />
          </svg>
        </td>
        {khoa.arrayKeyDates[page]?.map((key, index) => {
          const date = khoa.objDate[key].date;
          return (
            <td key={index} className="col-header-date">
              <div>
                <div>{date.format("dd/MM")}</div>
              </div>
            </td>
          );
        })}
        {page === khoa.arrayKeyDates.length - 1 && (
          <td className="col-header-date">
            <div>{"Tổng"}</div>
          </td>
        )}
      </tr>
    );
  };

  const renderBody = (khoa, pageVatTu, pageDate) => {
    return khoa.arrayKeyVatTus[pageVatTu]?.map((key, index) => {
      const vatTu = khoa.objVatTu[key];
      const total = Object.keys(vatTu.dataDate).reduce((a, b) => {
        return a + vatTu.dataDate[b].soLuong;
      }, 0);
      return (
        <React.Fragment key={index}>
          <tr key={index}>
            <td className="col-stt">
              <div>{index + 1}</div>
            </td>

            <td className="col-name">
              <div>
                <span>{vatTu.vatTu.tenVatTu}</span>
              </div>
            </td>
            {khoa.arrayKeyDates[pageDate]?.map((key, index) => {
              return (
                <td key={index} className="col-soluong">
                  {vatTu.dataDate[key]?.soLuong}
                </td>
              );
            })}
            {pageDate === khoa.arrayKeyDates.length - 1 && (
              <td className="col-soluong">{total}</td>
            )}
          </tr>
        </React.Fragment>
      );
    });
  };

  const renderFooter = (khoa, pageDate) => {
    return (
      <tr>
        <td colSpan={2} className="col-dieu-duong">
          Điều Dưỡng
        </td>
        {khoa.arrayKeyDates[pageDate]?.map((key, index) => {
          const dieuDuong = khoa.objDieuDuong[key];
          return (
            <td key={index} className="col-dieu-duong-text">
              {dieuDuong?.dieuDuong}
            </td>
          );
        })}
        {pageDate === khoa.arrayKeyDates.length - 1 && (
          <td className="col-soluong"></td>
        )}
      </tr>
    );
  };

  const renderTable = (khoa = {}) => {
    const { arrayKeyVatTus = [] } = khoa;
    const tables = [];
    for (let pageVatTu = 0; pageVatTu < arrayKeyVatTus.length; pageVatTu++) {
      for (let pageDate = 0; pageDate < khoa.arrayKeyDates.length; pageDate++) {
        tables.push(
          <div className={"next-page"} key={pageDate + "_" + pageVatTu}>
            <div className="header-info">
              <div>
                Khoa: {khoa.item?.tenKhoa} {/*{JSON.stringify(khoa.item)}*/}
              </div>
              <div>
                Họ và tên: {patient?.tenNb} {/*{JSON.stringify(khoa.item)}*/}
              </div>
              <div>
                Mã hồ sơ: {patient?.maHoSo} {/*{JSON.stringify(khoa.item)}*/}
              </div>
            </div>
            <table key={pageDate + "_" + pageVatTu}>
              <tbody>
                {renderHeader(khoa, pageDate)}
                {renderBody(khoa, pageVatTu, pageDate)}
                {renderFooter(khoa, pageDate)}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return tables;
  };
  return (
    <Main
      data-type="table-vat-tu-tieu-hao"
      lineHeightText={props.lineHeightText}
      fontSize={props.fontSize}
      rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
      colDateWidth={colDateWidth}
    >
      {Object.keys(state.objKhoa).map((khoaId, index) => {
        return <div key={index}>{renderTable(state.objKhoa[khoaId])}</div>;
      })}
    </Main>
  );
};

VatTuTieuHao.defaultProps = {
  defaultData: {},
  dataSource: [],
};

VatTuTieuHao.propTypes = {
  defaultData: T.shape({}),
  dataSource: T.array,
};

export default VatTuTieuHao;
