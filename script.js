let p1 = new Date();
let p2 = new Date();
let p3 = new Date();
let ilt = new Date();
let p4 = new Date();
let p5 = new Date();
let p6 = new Date();
let currentTime = new Date();

const date = new Date();
const day = date.getDay();

if (day === 3) {
  p1.setHours(9,55,0,0);
  p2.setHours(10,40,0,0);
  p3.setHours(11,45,0,0);
  ilt.setHours(12,30,0,0);
  p4.setHours(1,15,0,0);
  p5.setHours(2,0,0,0);
  p6.setHours(3,30,0,0);
}
else {
  p1.setHours(9,56,0,0);
  p2.setHours(10,46,0,0);
  p3.setHours(11,35,0,0);
  ilt.setHours(12,20,0,0);
  p4.setHours(1,10,0,0);
  p5.setHours(1,59,0,0);
  p6.setHours(3,30,0,0);
}

const mainTimeTxt = document.getElementById("mainTimeTxt");

const tmfmt = {hour: 'numeric', minute: '2-digit'};

function displayCurrentTime() {
  mainTimeTxt.textContent = currentTime.toLocaleTimeString([], tmfmt);
}

displayCurrentTime();
setInterval(displayCurrentTime(), 1000);
