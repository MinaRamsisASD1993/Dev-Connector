module.exports = function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};
