export const mapIds = (array) => {
  array.forEach((e) => {
    e._id = e._id.toString();
  });
  return array;
};

export const parseCookie = (str) => str.split(";")[0].split("=");
