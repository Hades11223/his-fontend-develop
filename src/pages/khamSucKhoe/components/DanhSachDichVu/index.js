import React, { useEffect, useMemo, useState } from "react";
import { Main } from "./styled";
import { Checkbox } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { HeaderSearch, TableWrapper, InputTimeout } from "components";
import { useDispatch, useSelector } from "react-redux";
import { formatDecimal } from "../../../../utils";
import { groupBy, isEmpty } from "lodash";

const DanhSachDichVu = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [dataSearch, setDataSearch] = useState({
    maDichVu: "",
    tenDichVu: "",
    maBoChiDinh: "",
  });

  //redux
  const {
    dichVuKSK: { getDsDichVu, postKetLuanKham },
  } = useDispatch();

  const {
    dichVuKSK: { dsDichVu = [] },
  } = useSelector((state) => state);

  //effect
  useEffect(() => {
    if (id) {
      getDsDichVu({ hopDongKskId: id });
    }
  }, [id]);

  const listDVMemo = useMemo(() => {
    let dsDichVuFilter = dsDichVu;
    if (!isEmpty(dataSearch?.maDichVu)) {
      dsDichVuFilter = dsDichVuFilter.filter(
        (option) =>
          option?.maDichVu
            ?.toLowerCase()
            .unsignText()
            .indexOf(dataSearch?.maDichVu) >= 0
      );
    }

    if (!isEmpty(dataSearch?.tenDichVu)) {
      dsDichVuFilter = dsDichVuFilter.filter(
        (option) =>
          option?.tenDichVu
            ?.toLowerCase()
            .unsignText()
            .indexOf(dataSearch?.tenDichVu) >= 0
      );
    }

    if (!isEmpty(dataSearch?.maBoChiDinh)) {
      dsDichVuFilter = dsDichVuFilter.filter(
        (option) =>
          option?.maBoChiDinh
            ?.toLowerCase()
            .unsignText()
            .indexOf(dataSearch?.maBoChiDinh) >= 0
      );
    }

    let listCap1 = groupBy(dsDichVuFilter, "maNhomDichVuCap1");

    return Object.keys(listCap1).map((x) => {
      const _tenNhomDv = listCap1[x][0]?.tenNhomDichVuCap1;

      return {
        tenNhomDv: _tenNhomDv,
        key: `${x} - ${_tenNhomDv}`,
        id: x,
        children: listCap1[x].map((item, idx) => ({
          ...item,
          index: idx + 1,
          key: item.id,
        })),
      };
    });
  }, [dsDichVu, dataSearch]);

  const sharedOnCell = (row, index) => {
    if (row.children) {
      return { colSpan: 0 };
    }
  };

  const onSearch = (key) => (value) => {
    const valueText = value?.trim().toLowerCase().unsignText();

    setDataSearch({
      ...dataSearch,
      [key]: valueText,
    });
  };

  function onChangeKetLuanKham(item) {
    return (e) => {
      postKetLuanKham({
        hopDongKskId: id,
        dichVuId: item?.id,
        ketLuanKham: e?.target?.checked || false,
      }).then(() => {
        getDsDichVu({ hopDongKskId: id, trongGoi: true });
      });
    };
  }

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "tenNhomDv",
      width: "100px",
      render: (text, row, index) => (row.children ? <b>{text}</b> : row?.index),
      onCell: (row, index) => ({
        colSpan: row.children ? 9 : 1,
      }),
    },
    {
      title: (
        <HeaderSearch
          title="Mã DV"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearch("maDichVu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "maDichVu",
      onCell: sharedOnCell,
      render: (text, row, index) => (
        <div className="block-name">
          <div className="name">{text}</div>
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearch("tenDichVu")}
            />
          }
        />
      ),
      width: 300,
      dataIndex: "tenDichVu",
      onCell: sharedOnCell,
      render: (text, row, index) => (
        <div className="block-name">
          <div className="name">{text}</div>
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title="Gói dịch vụ"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearch("maBoChiDinh")}
            />
          }
        />
      ),
      width: 300,
      dataIndex: "maBoChiDinh",
      onCell: sharedOnCell,
    },
    {
      title: <HeaderSearch title="% Miễn giảm" />,
      dataIndex: "phanTramMienGiam",
      onCell: sharedOnCell,
      width: "100px",
      render: (item) => {
        return item || 0;
      },
    },
    {
      title: <HeaderSearch title="Tiền miễn giảm" />,
      dataIndex: "tienMienGiam",
      onCell: sharedOnCell,
      width: "100px",
      render: (item) => {
        return item ? formatDecimal(String(item)) : 0;
      },
    },
    {
      title: <HeaderSearch title="Đơn giá" />,
      dataIndex: "giaKhongBaoHiem",
      width: "100px",
      onCell: sharedOnCell,
      render: (item) => {
        return formatDecimal(String(item));
      },
    },
    {
      title: <HeaderSearch title="ĐG sau giảm" />,
      onCell: sharedOnCell,
      width: "100px",
      render: (item) => {
        const _value = item.phanTramMienGiam
          ? item.giaKhongBaoHiem -
            (item.giaKhongBaoHiem * item.phanTramMienGiam) / 100
          : item.giaKhongBaoHiem - item.tienMienGiam || 0;

        return formatDecimal(_value);
      },
    },
    {
      title: <HeaderSearch title="DV kết luận" />,
      align: "center",
      dataIndex: "ketLuanKham",
      width: "100px",
      onCell: sharedOnCell,
      render: (text, row, index) => {
        return <Checkbox checked={text} onChange={onChangeKetLuanKham(row)} />;
      },
    },
  ];

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("#");
      },
    };
  };

  return (
    <Main>
      <div className="title">
        <label>Danh sách dịch vụ</label>
      </div>

      <div className="table-content">
        {listDVMemo.length > 0 && (
          <TableWrapper
            bordered
            expandable={{ defaultExpandAllRows: true }}
            // defaultExpandAllRows={true}
            columns={columns}
            dataSource={listDVMemo || []}
            onRow={onRow}
            rowKey={(record) => `${record.key}`}
            styleWrap={{ height: "100%" }}
          />
        )}
      </div>
    </Main>
  );
};

export default DanhSachDichVu;
