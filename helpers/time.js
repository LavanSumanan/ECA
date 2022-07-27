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

function getCurrentDate() {
  const date = dateTime();
  return { currMonth: date.getMonth() + 1, currDay: date.getDate() };
}

module.exports = {
  getTime: dateTime,
  getCurrentDate,
};
