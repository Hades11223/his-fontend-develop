const localesVi = "./public/locales/vi/";
const localesEn = "./public/locales/en/";
const fs = require("fs");

const compile = (folder) => {
  const listFile = fs
    .readdirSync(folder)
    .filter((item) => item != "translation.json");
  return listFile.reduce((a, b) => {
    try {
      const data = fs.readFileSync(folder + b, "utf8");
      const json = JSON.parse(data);
      if (b == "root.json") {
        a = { ...a, ...json };
        return a;
      }
      a[b.replace(".json", "")] = json;
    } catch (error) {
      console.log("ERRORRRRRRRRR: ", error);
    }
    return a;
  }, {});
};
const modifyData = (rootA, jsonA, jsonB) => {
  for (let key in jsonB) {
    if (!jsonA[key]) jsonA[key] = jsonB[key];
    else {
      if (typeof jsonA[key] !== typeof jsonB[key]) {
        throw `Compile json error: Dữ liệu translate khác nhau tại ${rootA}${key}`;
      }
      if (typeof jsonA[key] === "object") {
        modifyData(rootA + key + ".", jsonA[key], jsonB[key]);
      }
    }
  }
};
const compileTranslation = (watch) => {
  let translateVi = compile(localesVi);
  let translateEn = compile(localesEn);
  modifyData("", translateVi, translateEn);
  modifyData("", translateEn, translateVi);

  if (watch) {
    fs.watch(localesVi, (eventname, filename) => {
      if ("translation.json" === filename) return;
      console.log("watcher", eventname, filename);
      compileTranslation(false);
    });
    fs.watch(localesEn, (eventname, filename) => {
      if ("translation.json" === filename) return;
      console.log("watcher", eventname, filename);
      compileTranslation(false);
    });
  }

  fs.writeFileSync(
    localesVi + "translation.json",
    JSON.stringify(translateVi, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    localesEn + "translation.json",
    JSON.stringify(translateEn, null, 2),
    "utf8"
  );
};
module.exports = {
  compileTranslation,
};
