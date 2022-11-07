import React, { memo, useState, useEffect, useRef } from "react";
import DropdownList from "./DropdownList";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";

const AddressFull = (props) => {
  const {
    onChangeAdrressText,
    onSelectAddress,
    value,
    disabled,
    inputRef,
    placeholder,
    onBlur,
    className,
    styleInput = {},
    children,
    readOnly,
    onError,
    size = 8,
    delayTyping = 300,
  } = props;
  const {
    listXaPhuong = [],
    listTinhTp = [],
    listQuanHuyen = [],
  } = useSelector((state) => state.address);
  const {
    address: { getAllData },
  } = useDispatch();
  const [state, _setState] = useState({
    address: [],
    focus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refTimeout = useRef(null);
  const getProvinces = (text) => {
    return listTinhTp.filter((province) => province["vietTat"] === text);
  };
  const convertAddress = (e) => {
    let output = e;
    onChangeAdrressText(output);
    output = (output || "").toLowerCase();
    let xaPhuongText = "";
    let quanHuyenText = "";
    let tinhThanhPhoText = "";
    let xaPhuong = "";
    let quanHuyen = "";
    let tinhThanhPho = "";
    let addressList = [];
    let provinces = [];
    let districts = [];
    let zones = [];
    const shortText = output.split(",") || [];
    if (output?.length > 6 || output?.indexOf(" ") >= 0) {
      switch (shortText.length) {
        case 1:
          xaPhuongText = shortText[0]
            ? shortText[0].trim().toLowerCase().unsignText()
            : "";
          if (xaPhuongText && xaPhuongText.length) {
            addressList = listXaPhuong
              .filter((item) => {
                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                quanHuyen = (item.quanHuyen.ten || "")
                  .toLowerCase()
                  .unsignText();
                tinhThanhPho = (item.tinhThanhPho.ten || "")
                  .toLowerCase()
                  .unsignText();
                return (
                  xaPhuong.indexOf(xaPhuongText) >= 0 ||
                  quanHuyen.indexOf(xaPhuongText) >= 0 ||
                  tinhThanhPho.indexOf(xaPhuongText) >= 0
                );
              })
              .map((zone) => ({
                ...zone,
                displayText: `${zone.ten}, ${
                  zone.quanHuyen && (zone.quanHuyen.ten || "")
                }, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`,
              }));
            setState({ address: addressList });
          }
          break;
        case 2:
          xaPhuongText = shortText[0]
            ? shortText[0].trim().toLowerCase().unsignText()
            : "";
          quanHuyenText = shortText[1]
            ? shortText[1].trim().toLowerCase().unsignText()
            : "";
          if (quanHuyenText && quanHuyenText.length) {
            addressList = listXaPhuong
              .filter((item) => {
                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                quanHuyen = (item.quanHuyen.ten || "")
                  .toLowerCase()
                  .unsignText();
                tinhThanhPho = (item.tinhThanhPho.ten || "")
                  .toLowerCase()
                  .unsignText();
                return (
                  (xaPhuong.indexOf(xaPhuongText) >= 0 ||
                    quanHuyen.indexOf(xaPhuongText) >= 0 ||
                    tinhThanhPho.indexOf(xaPhuongText) >= 0) &&
                  (xaPhuong.indexOf(quanHuyenText) >= 0 ||
                    quanHuyen.indexOf(quanHuyenText) >= 0 ||
                    tinhThanhPho.indexOf(quanHuyenText) >= 0)
                );
              })
              .map((zone) => ({
                ...zone,
                displayText: `${zone.ten}, ${
                  zone.quanHuyen && (zone.quanHuyen.ten || "")
                }, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`,
              }));
            setState({ address: addressList });
          }
          break;
        case 3:
          xaPhuongText = shortText[0]
            ? shortText[0].trim().toLowerCase().unsignText()
            : "";
          quanHuyenText = shortText[1]
            ? shortText[1].trim().toLowerCase().unsignText()
            : "";
          tinhThanhPhoText = shortText[2]
            ? shortText[2].trim().toLowerCase().unsignText()
            : "";
          if (quanHuyenText && quanHuyenText.length) {
            addressList = listXaPhuong
              .filter((item) => {
                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                quanHuyen = (item.quanHuyen.ten || "")
                  .toLowerCase()
                  .unsignText();
                tinhThanhPho = (item.tinhThanhPho.ten || "")
                  .toLowerCase()
                  .unsignText();
                return (
                  (xaPhuong.indexOf(xaPhuongText) >= 0 ||
                    quanHuyen.indexOf(xaPhuongText) >= 0 ||
                    tinhThanhPho.indexOf(xaPhuongText) >= 0) &&
                  (xaPhuong.indexOf(quanHuyenText) >= 0 ||
                    quanHuyen.indexOf(quanHuyenText) >= 0 ||
                    tinhThanhPho.indexOf(quanHuyenText) >= 0) &&
                  (xaPhuong.indexOf(tinhThanhPhoText) >= 0 ||
                    quanHuyen.indexOf(tinhThanhPhoText) >= 0 ||
                    tinhThanhPho.indexOf(tinhThanhPhoText) >= 0)
                );
              })
              .map((zone) => ({
                ...zone,
                displayText: `${zone.ten}, ${
                  zone.quanHuyen && (zone.quanHuyen.ten || "")
                }, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`,
              }));
            setState({ address: addressList });
          }
          break;
        default:
          break;
      }
    } else {
      const short = output.match(/.{1,2}/g) || [];
      switch (short.length) {
        case 1:
          provinces = listTinhTp
            ?.filter((province) => province["vietTat"] === short[0])
            .map((item) => ({ ...item, displayText: item?.ten }));
          addressList = provinces;
          setState({ address: addressList });
          break;
        case 2:
          provinces = getProvinces(short[1]);
          provinces.forEach((province) => {
            listQuanHuyen
              .filter((district) => district.tinhThanhPhoId === province.id)
              .filter((district) => district["vietTat"] === short[0])
              .forEach((district) => {
                districts.push({ ...district, province });
              });
          });
          addressList = districts.map((item) => ({
            ...item,
            displayText: `${item?.ten || ""}, ${item?.tinhThanhPho?.ten || ""}`,
          }));
          setState({ address: addressList });
          break;
        case 3:
          provinces = getProvinces(short[2]);
          zones = [];
          provinces.forEach((province) => {
            listQuanHuyen
              .filter(
                (district) =>
                  district.tinhThanhPhoId === province.id &&
                  district["vietTat"] === short[1]
              )
              .forEach((district) => {
                zones = [
                  ...zones,
                  ...listXaPhuong
                    .filter((zone) => {
                      if (zone?.vietTat === short[0]) {
                        if (district?.id === zone?.quanHuyen?.id) {
                          return true;
                        }
                      }
                    })
                    .map((option) => ({
                      ...option,
                      displayText: `${option?.ten}, ${
                        option?.quanHuyen?.ten || ""
                      }, ${option?.tinhThanhPho?.ten || ""}`,
                    })),
                ];
              });
          });
          setState({ address: zones });
          break;
        default:
          break;
      }
    }
    if (output && !addressList?.length && !zones.length) {
      onError && onError(output, addressList);
    }
  };

  const getSelectedAddress = (item) => {
    if (item) {
      onChangeAdrressText(`${item.displayText}`);
      onSelectAddress(item);
      setState({ address: [], focus: false });
    }
  };

  const closeAddressDropdown = () => {
    setState({ address: [], focus: false });
  };
  const onChange = (e) => {
    let value = e.target.value;
    onChangeAdrressText(value);
    if (refTimeout.current) {
      try {
        clearTimeout(refTimeout.current);
      } catch (error) {}
    }
    let data = setTimeout(
      (value) => {
        convertAddress(value);
      },
      delayTyping,// khi search delay chậm sẽ lấy giá trị cũ , nên cần biến này để resolved vấn đề
      value
    );
    refTimeout.current = data;
  };
  useEffect(() => {
    getAllData();
  }, []);

  const onFocus = () => {};
  return (
    <Main className="input-content">
      <input
        className={`form-control ${disabled ? "disabled" : ""} ${className}`}
        onChange={onChange}
        value={value}
        disabled={disabled}
        ref={inputRef}
        placeholder={placeholder ? placeholder : "Nhập địa chỉ"}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styleInput}
        readOnly={readOnly}
      />
      {state.address.length > 0 && (
        <DropdownList
          size={size}
          onClick={getSelectedAddress}
          closeDropList={closeAddressDropdown}
          listData={state.address}
        />
      )}
      {children}
    </Main>
  );
};

export default memo(AddressFull);
