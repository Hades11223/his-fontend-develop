import pdfUtils from "utils/pdf-utils";
import { A4 } from "constants/index";
import { getState } from "redux-store/stores";
import { isArray } from "lodash";
import { isObject, get } from "lodash";
export const MODE = {
  editing: "editing",
  config: "config",
};

//hàm cho phép thêm 1 chuỗi kỹ tự vào tất cả các trường, dùng trong trường hợp thêm mới chuỗi khung2_ vào tất cả các trường.
export const appendPrefix = (data, prefix) => {
  const obj = {};
  Object.keys(data).map((key) => {
    obj[prefix + key] = data[key];
  });
  return obj;
};

export const checkComponentDisable = (
  auth = {},
  patient = {},
  itemProps = {},
  mode = "",
  signStatus = {},
  props = {},
  option = {}
) => {
  // return false;
  let disabled = false;

  // let patientState = patient?.patientState;
  // const FINISHED = 50;
  // const APPOINTMENT_IS_PAID = 10;
  // const APPOINTMENT_NOT_PAID = 20;
  // const OUT_HOSPITAL = 90;
  // const PAID_OUT = 110;
  // const TEMP_OUT = 120;
  // const NULL = 0;
  // const arr = [
  //   FINISHED,
  //   APPOINTMENT_IS_PAID,
  //   APPOINTMENT_NOT_PAID,
  //   OUT_HOSPITAL,
  //   PAID_OUT,
  //   TEMP_OUT,
  //   // NULL,
  // ];

  // const CANCELED = 310;
  // const CANCELING = 320;
  // const HR = 150;
  let state = getState();
  // const arrStatus = [CANCELED, CANCELING, HR];
  const { authorities = [] } = auth;
  if (mode === MODE.editing) {
    // const roleAdmin = authorities.find((item) =>
    //   [
    //     "ROLE_IsofhAdmin",
    //     "ROLE_VpOrganizationAdmin",
    //     "ROLE_AdminTong",
    //     "ROLE_PstwAdmin",
    //     "ROLE_Admin",
    //   ].includes(item)
    // );
    // let { khoaThucHienId, trangThaiDichVu } = state.files?.fileDataHIS || {};
    // if (!isEmpty(state.files?.fileDataHIS) && isEmpty(state.files?.fileData)) {
    //   // debugger;
    // }
    // if (!roleAdmin) {
    //nếu không phải là admin
    // const checkRoleDocument = authorities.includes(
    //   state?.files?.file?.value + ".5"
    // );
    // if (checkRoleDocument) {
    //   disabled = false;
    // } else {
    //   if (
    //     !(
    //       (
    //         (auth.departmentIds || []).includes(patient.khoaId) || //bn ko thuộc khoa người dùng
    //         (auth.departmentIds || []).includes(khoaThucHienId)
    //       ) //hoặc dịch vụ không thuộc khoa người dùng
    //     )
    //   ) {
    // if (!(auth.departmentIds || []).includes(khoaThucHienId)) {
    //   // nếu không cùng khoa thực hiện
    //   if (!isEmpty(state.files?.fileData)) {
    //     //
    //     disabled = true;
    //   }
    // } else
    // disabled = true;
    // if (
    //   (auth.departmentIds || []).includes(patient.khoaId) || //bn thuộc khoa người dùng
    //   (auth.departmentIds || []).includes(khoaThucHienId) //hoặc dịch vụ không thuộc khoa người dùng
    // ) {
    //   if (
    //     arr.includes(patientState) || //nếu trạng thái bệnh nhân thuộc list disable
    //     (arrStatus.includes(trangThaiDichVu) &&
    //       !isEmpty(state.files?.fileData)) //nếu trạng thái dịch vụ thuộc list disable
    //   ) {
    //     disabled = true;
    //   }
    // }
    // }
    // }
    // }
  }

  if (option.isSignature) {
    return disabled;
  }

  disabled =
    disabled ||
    itemProps.disabled ||
    itemProps.readOnly ||
    props.disable ||
    mode === MODE.config ||
    (Object.keys(signStatus).find((item) => {
      return (
        signStatus[item].block || //block all
        (signStatus[item].chuKy && //hoặc có tồn tại chữ ký và block tại cấp ký trùng với cấu hình tại component
          signStatus[item].levelSign &&
          signStatus[item].levelSign == itemProps.blockSignLevel)
      );
    })
      ? true
      : false) ||
    (props.capKyDienTuHienTai &&
      itemProps.blockSignLevel &&
      props.capKyDienTuHienTai >= itemProps.blockSignLevel);

  return disabled;
};

export const combineFields = (json, result = {}, parentKey) => {
  const keys = json ? Object.keys(json) : [];

  keys.forEach((key) => {
    result[parentKey ? `${parentKey}_${key}` : key] =
      json[key] === undefined || json[key] === null ? null : json[key];

    if (isObject(json[key]) && !json[key].length) {
      combineFields(json[key], result, parentKey ? `${parentKey}_${key}` : key);
    }
    if (
      isArray(json[key]) &&
      json[key].length &&
      isObject(json[key][0]) &&
      !json[key][0].length
    ) {
      combineFields(
        json[key][0],
        result,
        parentKey ? `${parentKey}_${key}` : key
      );
    }
  });

  return result;
};

export const pageType = {
  A4: {
    v: {
      name: "A4",
      landscape: false,
      width: A4.width,
      height: A4.height,
    },
    h: {
      name: "A4",
      landscape: true,
      width: A4.height,
      height: A4.width - 1,
    },
  },
  A5: {
    v: {
      name: "A5",
      landscape: false,
      width: A4.height / 2,
      height: A4.width,
    },
    h: {
      name: "A5",
      landscape: true,
      width: A4.width,
      height: A4.height / 2,
    },
  },
};

export const pdfGenerator = (layout, resultHml) => {
  return new Promise(async (resolve, reject) => {
    try {
      const files = Array.from(document.getElementsByClassName("form-content"));
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        promises.push(getHtml(file, layout, resultHml));
      }
      Promise.all(promises)
        .then((s) => {
          resolve({ pdfUrls: s.filter((item) => item) });
        })
        .catch((e) => {
          console.log(e);
          resolve({ pdfUrls: [] });
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const getHtml = async (file, layout, resultHml) => {
  const html = document.getElementsByTagName("html")[0].cloneNode(true);
  let body = html.getElementsByTagName("body")[0];
  let head = html.getElementsByTagName("head")[0];
  var css = await pullAllCss(html),
    style = document.createElement("style");
  if (head) {
    head.appendChild(style);
    style.type = "text/css";
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  const wrapElm = document.createElement("div");
  wrapElm.setAttribute("class", "print-wrapper");
  wrapElm.setAttribute("id", "print-wrapper");
  let lines = [];
  let printArea = document.createElement("div");
  printArea.setAttribute("class", "view-file-mode");
  printArea.style.fontFamily = `font-family: "Times New Roman", sans-serif;`;
  printArea.style.color = "black";
  const pageTemplate = file.cloneNode(true);
  if (pageTemplate?.childNodes[0]?.childNodes[0]) {
    pageTemplate.childNodes[0].childNodes[0].innerHTML = null;
  }

  Array.from(file.childNodes[0].childNodes).forEach((itemLv1) => {
    lines = [...lines, ...Array.from(itemLv1.childNodes)];
  });
  generate({
    lines,
    printArea,
    height: 0,
    pageTemplate,
    layout,
    file,
  });
  wrapElm.append(printArea);
  if (wrapElm) {
    if (body) {
      body.innerHTML = wrapElm.outerHTML;
    }
    // var myWindow = window.open("", "MsgWindow");
    // myWindow.document.write(html.outerHTML);
    // //reject(false);
    // return;
    try {
      if (resultHml) {
        return html.outerHTML;
      } else {
        const blob = await pdfUtils.htmlToPdf(html.outerHTML, {
          format: layout.name || "A4",
          landscape: layout.landscape,
          margin: {
            // top: "0px",
          },
        });
        const blobUrl = window.URL.createObjectURL(blob);
        return blobUrl;
      }
    } catch (error) {
      return null;
    }
  }
};
export const generate = ({
  lines,
  printArea,
  height = 0,
  pageTemplate,
  layout = pageType.A4.v,
  file,
}) => {
  const top = file.getAttribute("data-page-top");
  const bottom = file.getAttribute("data-page-bottom");
  const PAGE_HEIGHT = layout.height - top - bottom;
  const createPage = (parrent) => {
    const page = pageTemplate.cloneNode(true);
    let className = page.getAttribute("class");
    className += " page-inside "; // + (isHorizontal ? "landscape" : "");
    page.setAttribute("class", className);
    parrent.append(page);
    return page.childNodes[0];
  };

  const appendTr = (
    trs = [],
    itemTemplate,
    line,
    height,
    page,
    printArea,
    initTableHeight = 0
  ) => {
    let newLine = null;
    let tbody = null;
    const getRowSpanNumber = (tr) => {
      const tds = Array.from(tr.getElementsByTagName("td"));
      let tdsRowSpan = tds
        .filter((td) => {
          //check xem trong dòng đó có thuộc tính rowspan không
          return td.attributes["rowspan"]?.value;
        })
        .map((td) => td.attributes["rowspan"]?.value);
      let maxRowSpan = Math.max(tdsRowSpan); //kiểm tra xem rowspan tối đa là bao nhiêu
      return maxRowSpan;
    };
    trs.forEach((tr, index) => {
      let maxRowSpan = getRowSpanNumber(tr);
      let needBreakPage = false; //thêm biến đánh dấu cần break page;
      let newHeight = height;
      for (let i = index; i <= index + maxRowSpan && i < trs.length; i++) {
        const maxRowSpan2 =
          getRowSpanNumber(trs[i]) - (maxRowSpan - (i - index)); //
        if (maxRowSpan2 > 0) {
          maxRowSpan += maxRowSpan2;
        }

        //duyệt qua danh sách các row trong phạm vi rowspan
        if (newHeight + trs[i].offsetHeight > PAGE_HEIGHT) {
          //check nếu dòng đó vượt quá trang
          needBreakPage = true; //thì đánh dấu là true
          break;
        }
        newHeight += trs[i].offsetHeight;
      }
      // if (tdsRowSpan?.length)
      if (height + tr.offsetHeight > PAGE_HEIGHT || needBreakPage) {
        page = createPage(printArea);
        newLine = null;
        height = initTableHeight;
        tbody = null;
      }
      if (!newLine) {
        newLine = line.cloneNode();
        page.append(newLine);
      }
      if (!tbody) {
        let table = itemTemplate.cloneNode(true);
        newLine.append(table);
        tbody = table.getElementsByTagName("tbody")[0];
      }
      if (newLine && tbody) {
        height += tr.offsetHeight;
        tbody.append(tr.cloneNode(true));
      }
    });

    return { nPage: page, nHeight: height };
  };

  const appendTable = (table, line, item, height, page, printArea) => {
    let tbody = item.getElementsByTagName("tbody");
    let initTableHeight = 0;
    if (tbody?.length) {
      initTableHeight = item.clientHeight - tbody[0].clientHeight;
      height += initTableHeight;
    }
    let itemTemplate = item.cloneNode(true);
    tbody = itemTemplate.getElementsByTagName("tbody");
    if (tbody?.length) {
      tbody[0].innerHTML = "";
    }
    let trs = Array.from(table.getElementsByTagName("tr"));
    return appendTr(
      trs,
      itemTemplate,
      line,
      height,
      page,
      printArea,
      initTableHeight
    );
  };
  class GridPage {
    clLine = null;
    clBlock = null;
    clComponent = null;
    clGrid = null;
    createTemplate = ({ page, component, printArea, line, item }) => {
      if (!page) page = createPage(printArea);
      if (!this.clLine) {
        this.clLine = line.cloneNode();
        page.append(this.clLine);
      }
      if (!this.clBlock) {
        this.clBlock = item.cloneNode();

        this.clLine.append(this.clBlock);
      }
      if (!this.clComponent) {
        this.clComponent = component.cloneNode();
        this.clBlock.append(this.clComponent);
      }
      if (!this.clGrid) {
        this.clGrid = component.childNodes[0].cloneNode();
        this.clComponent.append(this.clGrid);
      }
      return page;
    };

    breakPage = ({ page, component, printArea, line, item }) => {
      this.clLine = null;
      this.clBlock = null;
      this.clComponent = null;
      this.clGrid = null;
      page = this.createTemplate({ page, component, printArea, line, item });
      return [page, 0];
    };
  }
  const bangKeChiPhi = ({ item, line, height, page, printArea }) => {
    const gridPage = new GridPage();
    //lấy ra component trong block
    const component = item.childNodes[0];

    if (component) {
      const top = component.getAttribute("data-page-top");
      const bottom = component.getAttribute("data-page-bottom");
      const PAGE_AREA_HEIGHT = PAGE_HEIGHT - top - bottom - 10;
      //nếu component là page hoặc layout

      if (["page", "layout"].includes(component.getAttribute("data-type"))) {
        //thì lấy ra grid trong page/layout
        const grid = component.childNodes[0];
        //lây ra tất cả các line con trong grid
        const listChildLines = Array.from(grid.childNodes);
        const listChildLinesPrint = [];
        listChildLines.forEach((line) => {
          if (line.querySelector("[data-type='bang-ke-chi-phi']")) {
            let bang = line.querySelector(
              "[data-type='bang-ke-chi-phi']"
            ).childNodes;
            Array.from(bang).forEach((child) => {
              const newLine = line.cloneNode(true);
              newLine.classList.add("bang-ke-chi-phi");
              newLine.innerHTML = "";
              const block = line
                .querySelector("[data-type='block']")
                .cloneNode(true);
              block.innerHTML = "";
              block.append(child.cloneNode(true));
              newLine.append(block.cloneNode(true));
              listChildLinesPrint.push(newLine);
            });
          } else {
            listChildLinesPrint.push(line);
          }
        });
        listChildLinesPrint.forEach((cLine, cIndex) => {
          //duyệt qua tất cả các line con trong page/layout
          if (
            //nếu cline không chứa component gây mê
            !(
              cLine.getAttribute("data-component") ===
              "Bảng kê chi phí tổng hợp"
            )
          ) {
            if (cLine.clientHeight + height < PAGE_AREA_HEIGHT) {
              //kiểm tra xem có thể chèn vào page hiện tại không, nếu có thì thực hiện append vào
              page = gridPage.createTemplate({
                page,
                component,
                printArea,
                line,
                item,
              });
              gridPage.clGrid.append(cLine.cloneNode(true));
              height += cLine.clientHeight;
            } else {
              // ngược lại thì phải ngắt page
              [page, height] = gridPage.breakPage({
                page,
                component,
                printArea,
                line,
                item,
              });
              gridPage.clGrid.append(cLine.cloneNode(true));
              height = 0;
            }
          } else {
            if (!cLine.querySelector('[data-type="table"]')) {
              let info = cLine.querySelector(".info");
              const id = info.getAttribute("id-info");
              info = document.querySelector(`[id-info="${id}"]`);
              if (info.clientHeight + height < PAGE_AREA_HEIGHT) {
                //kiểm tra xem có thể chèn vào page hiện tại không, nếu có thì thực hiện append vào
                page = gridPage.createTemplate({
                  page,
                  component,
                  printArea,
                  line,
                  item,
                });
                gridPage.clGrid.append(cLine.cloneNode(true));
                height += info.clientHeight;
              } else {
                // ngược lại thì phải ngắt page
                [page, height] = gridPage.breakPage({
                  page,
                  component,
                  printArea,
                  line,
                  item,
                });
                gridPage.clGrid.append(cLine.cloneNode(true));
                height = 0;
              }
            } else {
              const templateChildLine = cLine.cloneNode(true);
              let tableBangKe = cLine.querySelector('[data-type="table"]');
              const id = tableBangKe.getAttribute("id-table");
              tableBangKe = document.querySelector(`[id-table="${id}"]`);
              templateChildLine.querySelector('[data-type="table"]');
              if (templateChildLine) {
                if (templateChildLine.querySelector(".table-tbody")) {
                  templateChildLine.querySelector(".table-tbody").innerHTML =
                    "";
                  const thead = tableBangKe.querySelector(".table-head");
                  const tHeadHeight = thead.clientHeight;
                  let tbody = null;
                  const trs = Array.from(
                    tableBangKe.querySelector(".table-tbody").childNodes
                  );
                  let templateChildLineX = null;
                  const addEmptyTable = () => {
                    if (!templateChildLineX) {
                      if (height + tHeadHeight < PAGE_AREA_HEIGHT) {
                        templateChildLineX = templateChildLine.cloneNode(true);
                        gridPage.clGrid.append(templateChildLineX);
                        if (!tbody) {
                          tbody =
                            templateChildLineX.querySelector(".table-tbody");
                          height += tHeadHeight;
                        }
                      } else {
                        [page, height] = gridPage.breakPage({
                          page,
                          component,
                          printArea,
                          line,
                          item,
                        });
                        templateChildLineX = null;
                        height = 0;
                        addEmptyTable();
                      }
                    }
                  };
                  trs.forEach((tr, trIndex) => {
                    page = gridPage.createTemplate({
                      page,
                      component,
                      printArea,
                      line,
                      item,
                    });
                    if (tr.clientHeight + height > PAGE_AREA_HEIGHT) {
                      [page, height] = gridPage.breakPage({
                        page,
                        component,
                        printArea,
                        line,
                        item,
                      });
                      templateChildLineX = null;
                      height = 0;
                      tbody = null;
                    }
                    addEmptyTable();
                    tbody.append(tr.cloneNode(true));
                    height = height + tr.offsetHeight;
                  });
                }
              }
            }
          }
        });
      }
    }
    return { nHeight: height, nPage: page };
  };
  const phieuKhac = ({ item, line, height, page, printArea, newLine }) => {
    const gridPage = new GridPage();
    const component = item.childNodes[0];
    if (component?.getAttribute("data-type") == "page") {
      const top = component.getAttribute("data-page-top");
      const bottom = component.getAttribute("data-page-bottom");
      const PAGE_AREA_HEIGHT = PAGE_HEIGHT - top - bottom;

      //thì lấy ra grid trong page/layout
      const grid = component.childNodes[0];
      //lây ra tất cả các line con trong grid
      const listChildLines = Array.from(grid.childNodes);

      listChildLines.forEach((cLine, cIndex) => {
        //duyệt qua tất cả các line con trong page/layout
        if (cLine.clientHeight + height < PAGE_AREA_HEIGHT) {
          //kiểm tra xem có thể chèn vào page hiện tại không, nếu có thì thực hiện append vào
          page = gridPage.createTemplate({
            page,
            component,
            printArea,
            line,
            item,
          });
          gridPage.clGrid.append(cLine.cloneNode(true));
          height += cLine.clientHeight;
        } else {
          //ngược lại thì phải ngắt page
          [page, height] = gridPage.breakPage({
            page,
            component,
            printArea,
            line,
            item,
          });
          gridPage.clGrid.append(cLine.cloneNode(true));
          height = 0;
        }
      });
      return { nHeight: height, nPage: page, needReturn: true, newLine };
    } else {
      let table = item.getElementsByTagName("tbody")[0];
      if (table) {
        let { nPage, nHeight } = appendTable(
          table,
          line,
          item,
          height,
          page,
          printArea
        );
        if (nPage) {
          page = nPage;
          height = nHeight;
          newLine = null;
          return { nPage, nHeight, needReturn: true, newLine };
        } else {
          if (height != 0) {
            //nếu page hiện tại có phần tử rồi thì bắt buộc tạo 1 page mới
            page = createPage(printArea); //tao moi 1 page moi
          }
          newLine = null; //tao moi 1 line moi
          height = 0; //reset height
        }
      } else {
        //neu item height vượt quá
        page = createPage(printArea); //tao moi 1 page moi
        newLine = null; //tao moi 1 line moi
        // height = 0; //reset height
      }
      return { nPage: page, nHeight: height, needReturn: false, newLine };
    }
  };

  const appendLine = (line, height, page, printArea) => {
    if (!page || line.getAttribute("data-component") == "Page") {
      //nếu page null hoặc line đó chưa component Page thì tạo page mới.
      page = createPage(printArea);
      height = 0;
    }
    let childNodes = Array.from(line.childNodes);

    // childNodes.forEach((item, index) => {

    // }
    if (height + line.offsetHeight <= PAGE_HEIGHT) {
      //cộng line vào page hiện taị nếu chưa vượt quá
      page.append(line.cloneNode(true));
      height += line.offsetHeight;
      return {
        nHeight: height,
        nPage: page,
      };
    } //trường hợp vượt quá
    else {
      let newLine; //clone ra 1 line rỗng
      //  childNodes = Array.from(line.childNodes); //get all các block trong line
      childNodes.forEach((item, index) => {
        if (height + item.offsetHeight > PAGE_HEIGHT) {
          if (
            //kiểm tra xem đây có phải phiếu gây mê hồi sức không
            item.querySelectorAll("[data-type='bang-ke-chi-phi']").length
          ) {
            return bangKeChiPhi({ item, line, height, page, printArea }); //{ nHeight: height, nPage: page };
          } else {
            const { nPage, nHeight, needReturn, ...rest } = phieuKhac({
              item,
              line,
              height,
              page,
              printArea,
              newLine,
            });
            page = nPage;
            height = nHeight;
            newLine = rest.newLine;
            if (needReturn) return;
          }
          // }
        }
        if (!newLine) {
          newLine = line.cloneNode();
          page.append(newLine);
        }
        newLine.append(item.cloneNode(true)); //thêm item vào line
        height += item.offsetHeight; //update current height;
        if (height > PAGE_HEIGHT) height = height - PAGE_HEIGHT;
      });
      return {
        nHeight: height,
        nPage: page,
      };
    }
  };
  let index = 0;
  let page = null;
  do {
    if (lines[index]) {
      const { nHeight, nPage } = appendLine(
        lines[index],
        height,
        page,
        printArea
      );
      page = nPage;
      height = nHeight;
      index += 1;
    }
  } while (lines[index]);
  let paragraphs = printArea.getElementsByClassName("editing-content");
  let listPage = printArea.getElementsByClassName("page-inside");
  Array.from(listPage).forEach((item) => {
    let page = item.getElementsByClassName("component-page");
    if (page?.length) {
      item.classList.add("full-page");
    }
  });
  for (var i = paragraphs.length - 1; i >= 0; --i) {
    if (
      paragraphs[i].getAttribute("contenteditable") == "true" &&
      !paragraphs[i].innerText
    )
      paragraphs[i].remove();
  }
};

export const pullFileCss = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(file)
        .then((s) => {
          if (s.status === 200) return s.text();
          resolve("");
        })
        .then((text) => {
          resolve(text);
        })
        .catch((e) => {
          resolve("");
        });
    } catch (error) {
      resolve("");
    }
  });
};

export const pullAllCss = async (html) => {
  try {
    let allStyle = Array.from(html.getElementsByTagName("link"))
      .filter((item) => item && item?.href?.indexOf(".css") !== -1)
      .map((item) => {
        return pullFileCss(item?.href);
      });

    // let allStyle =
    //   html.match(/(?<=href=")[^"]+\.png/g)?.map((item) => {
    //     debugger;
    //     return pullFileCss(item);
    //   }) || [];
    return (
      (await Promise.all(allStyle).then((values) => values.join("\n\r"))) || ""
    );
  } catch (error) {
    return "";
  }
};

export const convert = (keys) => {
  let result = {};

  for (const key in keys) {
    try {
      const value = keys[key];

      let arr = key.split("_");
      let obj = result;
      arr.forEach((item, index) => {
        if (index !== arr.length - 1) {
          if (!obj[item]) {
            obj[item] = {};
          }
          obj = obj[item];
        } else {
          obj[item] = value === undefined || value === null ? null : value;
        }
      });
    } catch (error) {
      debugger;
    }
  }

  return result;
};

export const getLayout = (layoutType = "default", papeType = "A4") => {
  let layout = { width: A4.width, height: A4.height };
  switch (papeType) {
    case "A4":
      layout = {
        width: layoutType === "default" ? 838 : 1185,
        height: layoutType === "default" ? 1184 : 837,
      };
      break;
  }
  return layout;
};

export default {
  pageType,
  generate,
  pullAllCss,
  pullFileCss,
  convert,
};
