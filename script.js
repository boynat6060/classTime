let p1 = new Date();
let p2 = new Date();
let p3 = new Date();
let ilt = new Date();
let p4 = new Date();
let p5 = new Date();
let p6 = new Date();

const date = new Date();
const day = date.getDay();

if (day === 3) {
  p1.setHours(9,55,0,0);
  p2.setHours(10,40,0,0);
  p3.setHours(11,45,0,0);
  ilt.setHours(12,30,0,0);
  p4.setHours(13,15,0,0);
  p5.setHours(14,0,0,0);
  p6.setHours(15,30,0,0);
}
else {
  p1.setHours(9,56,0,0);
  p2.setHours(10,46,0,0);
  p3.setHours(11,35,0,0);
  ilt.setHours(12,20,0,0);
  p4.setHours(13,10,0,0);
  p5.setHours(13,59,0,0);
  p6.setHours(15,30,0,0);
}

const mainTimeTxt = document.getElementById("mainTimeTxt");

const tmfmt = {hour: 'numeric', minute: '2-digit', second: '2-digit'};

function displayCurrentTime() {
  const currentTime = new Date();
  mainTimeTxt.textContent = currentTime.toLocaleTimeString([], tmfmt);
}

displayCurrentTime();
setInterval(displayCurrentTime, 900);

// 1. Group periods in an array with label strings for easy tracking
const schedule = [
  { name: "Period 1", time: p1 },
  { name: "Period 2", time: p2 },
  { name: "Period 3", time: p3 },
  { name: "ILT",      time: ilt },
  { name: "Period 4", time: p4 },
  { name: "Period 5", time: p5 },
  { name: "Period 6", time: p6 }
];

function getUpcomingTarget() {
  const now = new Date();
  
  // Look through the schedule array one-by-one
  for (let i = 0; i < schedule.length; i++) {
    // Return the very first period whose time is in the future
    if (schedule[i].time > now) {
      return schedule[i]; 
    }
  }
  
  // Fallback if the entire school day is over
  return null; 
}

let upcoming = getUpcomingTarget();

function countDown() {
  const now = new Date();
  const CD = upcoming.time - now;

  const hours = Math.floor(CD / (1000 * 60 * 60));
  const minutes = Math.floor((CD % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((CD % (1000 * 60)) / 1000);
  
  const fHours = String(hours).padStart(2,'0');
  const fMinutes = String(minutes).padStart(2,'0');
  const fSeconds = String(seconds).padStart(2,'0');
  
  document.getElementById("secondaryTimeInfo").textContent = `Only ${fHours} : ${fMinutes} until ${upcoming.name} is over.`
}

countDown();
setInterval(countDown, 900);
