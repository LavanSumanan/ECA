function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

function dateTime() {
  return convertTZ(new Date(), "Canada/Eastern");
}

module.exports = {
  getTime: dateTime,
};
