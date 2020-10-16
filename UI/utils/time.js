export const getCurrentTime=()=>{
  const now = new Date();
  const getMonth = (now) => {
    const month = now.getMonth() + 1;
    return month.toString().length > 1 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
  };

  const getDate = (now) => {
    const date = now.getDate() + 1;
    return date.toString().length > 1 ? now.getDate() : '0' + now.getDate();
  };

  const getHours = (now) => {
    const hours = now.getHours() + 1;
    return hours.toString().length > 1 ? now.getHours() : '0' + now.getHours();
  };

  const getMinutes = (now) => {
    const hours = now.getMinutes() + 1;
    return hours.toString().length > 1 ? now.getMinutes() : '0' + now.getMinutes();
  };

  return `${now.getFullYear()}-${getMonth(now)}-${getDate(now)}T${getHours(now)}:${getMinutes(now)}`;
}