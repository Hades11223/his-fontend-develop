import appInfo from "assets/app.info";
export default {
  getBuildInfo: (buildFile) => {
    return new Promise((resolve, reject) => {
      fetch(buildFile || appInfo, {
        cache: "no-cache",
      })
        .then((response) => response.text())
        .then((textContent) => {
          var properties = textContent.split("\n");
          const keys = ["commitDate", "message", "branch", "buildTime"];
          const obj = {};
          properties.forEach((item, index) => {
            if (keys[index]) obj[keys[index]] = item;
          });
          resolve(obj);
        })
        .catch(() => {
          resolve({});
        });
    });
  },
};
