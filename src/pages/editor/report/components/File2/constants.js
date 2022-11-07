
export const convert = (keys) => {
  let result = {};
  
  for (const key in keys) {
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
        obj[item] = value || null;
      }
    });
  }
  
  return result;
};
