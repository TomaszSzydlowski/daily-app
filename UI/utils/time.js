const parseDateToTimeField = (date) => {
  const getMonth = (time) => {
    const month = time.getMonth() + 1;
    return month.toString().length > 1 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
  };

  const getDate = (time) => {
    const date = time.getDate();
    return date.toString().length > 1 ? time.getDate() : '0' + time.getDate();
  };

  const getHours = (time) => {
    const hours = time.getHours();
    return hours.toString().length > 1 ? time.getHours() : '0' + time.getHours();
  };

  const getMinutes = (time) => {
    const hours = time.getMinutes();
    return hours.toString().length > 1 ? time.getMinutes() : '0' + time.getMinutes();
  };

  return `${date.getFullYear()}-${getMonth(date)}-${getDate(date)}T${getHours(date)}:${getMinutes(date)}`;
};

const getDateNow = (addDays = null) => {
  let date = new Date();
  if (addDays !== null) {
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * addDays);
  }
  return JSON.stringify(date).slice(1, -1);
};

module.exports={
  parseDateToTimeField,
  getDateNow
}