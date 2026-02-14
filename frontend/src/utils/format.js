export const formatDate = (value) => {
  if (!value) return "-";

  const d = new Date(value); //data and tiem
  if (Number.isNaN(d.getTime())) {
    return "-";
  }
  return d.toLocaleDateString(); //date
  //local india - dd/mm/yyyy
  //local us - mm/dd/yyyy
};

export const formatDateTime = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return "-";
  }
  return d.toLocaleString();//date and time
};