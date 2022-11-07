import React, { useState, useEffect,  useRef } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { TitleTable } from "../styled";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import { Form } from "antd";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { connect } from "react-redux";
import SuaThongTinThuoc from "./ThongTinThuoc/SuaThongTinThuoc";
import { useTranslation } from "react-i18next";

function Table(props) {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    visibleDelete: null,
    visibleEdit: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const ThongTinThuocRef = useRef(null);
  const {
    onDeleteDichVu,
    getListDichVuThuoc,
    listDvThuoc,
    nbDotDieuTriId,
    chiDinhTuDichVuId
  } = props;
  const [form] = Form.useForm();
  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      setState({
        visibleEdit: false,
      });
    });
  };

  useEffect(() => {
    setState({ dataThuoc: listDvThuoc });
  }, [listDvThuoc]);

  const onDelete = (record) => {
    onDeleteDichVu(record.id).then((s) => {
      setState({
        dataThuoc: state.dataThuoc.filter((item) => item !== record),
        visibleEdit: null,
        visibleDelete: null,
      })
      getListDichVuThuoc({nbDotDieuTriId, chiDinhTuDichVuId});
    });
  };

  const onCancel = () => {
    setState({
      visibleEdit: null,
      visibleDelete: null,
    });
  };
  const handleVisible = (type, idx) => (visible) => {
    const dataType = {
      edit: "visibleEdit",
      delete: "visibleDelete",
      info: "visibleInfo",
    };
    setState({
      [dataType[type]]: idx,
    });
  };

  const onEdit = (record) => {
    ThongTinThuocRef.current &&
      ThongTinThuocRef.current.show({ newTable: Array(record) });
  };
  const columns = [
    {
      title: (
        <HeaderSearch
          title={t("common.stt")}
          sort_key="index"
          // dataSort={dataSortColumn["stt"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "64px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, row, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
          sort_key="ten"
          // dataSort={dataSortColumn["tenThuoc"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "562px",
      dataIndex: "",
      key: "",
      colSpan: 1,
      render: (item, record) => {
        console.log("record", record)
        const ten = record?.tenDichVu || record?.thuocChiDinhNgoai?.tenDichVu
        const tenLieuDung = record?.tenLieuDung || record?.lieuDung?.ten
        return (
          <div>
            <span>{`${ten} ${record.tenHoatChat ? " (" + record.tenHoatChat + ")" : " "} ${record.hamLuong ? " - " + record.hamLuong : ""}`}</span>
            <br />
            <span style={{fontSize:"12px"}}>{`${tenLieuDung} ${record?.tenDuongDung ? "-" + record?.tenDuongDung : ""}`}.{t("common.luuY")}: {record.ghiChu}</span>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soLuong")}
          sort_key="soLuong"
          // dataSort={dataSortColumn["Số lượng"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "116px",
      dataIndex: "soLuong",
      key: "soLuong",
      colSpan: 1,
      render: (item) => {
        return item + ` ${t("common.vien")}`;
      },
    },
    {
      title: <HeaderSearch title={t("common.khac")} />,
      width: 110,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      render: (item, record, index) => {
        return (
          <div className="action-btn">
            <img
              style={{ objectFit: "contain" }}
              src={IconEdit}
              onClick={() => onEdit(record)}
              alt="..."
            />
            <CustomPopover
              icon={IconDelete}
              onSubmit={() => onDelete(record)}
              onCancel={onCancel}
              contentPopover={null}
              visible={state.visibleDelete === index}
              handleVisible={handleVisible("delete", index)}
              title={t("khamBenh.donThuoc.xacNhanXoaBanGhi")}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TitleTable>{props.title}:</TitleTable>
      <TableWrapper
        columns={columns}
        dataSource={state.dataThuoc || listDvThuoc}
        scroll={{ x: false, y: false }}
      />
      <SuaThongTinThuoc ref={ThongTinThuocRef} />
    </div>
  );
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = ({
  chiDinhDichVuTuTruc: { onDeleteDichVu, getListDichVuThuoc },
}) => ({
  onDeleteDichVu,
  getListDichVuThuoc,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
