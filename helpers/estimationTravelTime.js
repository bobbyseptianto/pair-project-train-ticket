function estimation(arr_time, depart_time) {
  
  let arrHrs = Number(arr_time.split(':')[0]);
  let arrMnt = Number(arr_time.split(':')[1]);
  let totalArrMnt = arrHrs*60 + arrMnt;

  let departHrs = Number(depart_time.split(':')[0]);
  let departMnt = Number(depart_time.split(':')[1]);
  let totalDepartMnt = departHrs*60 + departMnt;
  
  let sum = totalArrMnt - totalDepartMnt;

  let hour = Math.floor(sum/60)
  let mnt = sum%60;

  return `${hour} hours ${mnt} minutes`
}

module.exports = estimation;