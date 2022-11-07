import { BaseSearch, InputTimeout } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { InputSearch, Main } from "./styled";
import IcSearch from "assets/svg/ic-search.svg";

const TimKiem = ({ triggerResetChecked }) => {
  const { t } = useTranslation();

  const { dataSearch } = useSelector((state) => state.dsBenhNhan);

  const {
    dsBenhNhan: { onChangeInputSearch, updateData },
  } = useDispatch();

  const handleChangeInputSearch = (key) => (value) => {
    updateData({
      dataSearch: { ...dataSearch, [key]: value },
    });
    triggerResetChecked();
  };

  return (
    <Main>
      <BaseSearch
        dataInput={[
          {
            widthInput: "300px",
            isScanQR: true,
            type: "addition",
            component: (
              <div className="inputWrapper">
                <h1 className="timKiem__title">Mã hợp đồng</h1>
                <InputSearch>
                  <InputTimeout
                    placeholder="Nhập để tìm kiếm mã hợp đồng"
                    type="search"
                    onChange={handleChangeInputSearch("maHopDong")}
                    suffix={<IcSearch />}
                  />
                </InputSearch>
              </div>
            ),
          },
          {
            widthInput: "300px",
            type: "addition",
            component: (
              <div className="inputWrapper">
                <h1 className="timKiem__title">Tên hợp đồng</h1>
                <InputSearch>
                  <InputTimeout
                    placeholder="Nhập để tìm kiếm tên hợp đồng"
                    type="search"
                    onChange={handleChangeInputSearch("tenHopDong")}
                    suffix={<IcSearch />}
                  />
                </InputSearch>
              </div>
            ),
          },
          {
            widthInput: "300px",
            type: "addition",
            component: (
              <div className="inputWrapper">
                <h1 className="timKiem__title">Tên công ty</h1>
                <InputSearch>
                  <InputTimeout
                    placeholder="Nhập để tìm kiếm tên công ty"
                    type="search"
                    onChange={handleChangeInputSearch("tenDoiTac")}
                    suffix={<IcSearch />}
                  />
                </InputSearch>
              </div>
            ),
          },
        ]}
      />
    </Main>
  );
};
export default TimKiem;
