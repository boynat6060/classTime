//var declaration
let p1 = new Date();
let p2 = new Date();
let p3 = new Date();
let ilt = new Date();
let p4 = new Date();
let p5 = new Date();
let p6 = new Date();

//finds the day
const date = new Date();
const day = date.getDay();

//schedule declaration
let sched;

//checks for Trojan Check In
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

//time formatting shortcut
const tmfmt = {hour: 'numeric', minute: '2-digit', second: '2-digit'};
//mainTimeTxt shortcut
const mainTimeTxt = document.getElementById("mainTimeTxt");

//grabs mainTimeTxt and changes its content to the formatted time
function displayCurrentTime() {
  const currentTime = new Date();
  mainTimeTxt.textContent = currentTime.toLocaleTimeString([], tmfmt);
}

//runs the function and then calls it every 900 miliseconds
displayCurrentTime();
setInterval(displayCurrentTime, 900);

// 1. Group periods in an array with label strings for easy tracking
const schedule = [
  { name: "First Period", time: p1 },
  { name: "Second Period", time: p2 },
  { name: "Third Period", time: p3 },
  { name: "ILT", time: ilt },
  { name: "Fourth Period", time: p4 },
  { name: "Fifth Period", time: p5 },
  { name: "Sixth Period", time: p6 }
];

//finds the next class period
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

//assigns upcoming to whateveer getUpcomingTarget() returns (selects the next class period)
let upcoming = getUpcomingTarget();

function countDown() {
  const now = new Date();
  const CD = upcoming.time - now;
  
  //divides miliseconds to get into hours, mins, seconds
  const hours = Math.floor(CD / (1000 * 60 * 60));
  const minutes = Math.floor((CD % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((CD % (1000 * 60)) / 1000);
  
  const fHours = String(hours).padStart(2,'0');
  const fMinutes = String(minutes).padStart(2,'0');
  const fSeconds = String(seconds).padStart(2,'0');

  let secondaryTimeInfo = document.getElementById("secondaryTimeInfo");

  //selects what sentence version to use
  if (hours === 0 && minutes !== 0) {
    secondaryTimeInfo.textContent = `Only ${fMinutes} minutes and ${fSeconds} seconds until ${upcoming.name} is over.`;
  } else if (hours === 0 && minutes === 0) {
    secondaryTimeInfo.textContent = `${upcoming.name} ends in ${fSeconds}!`;
  } else if (now === null) {
    secondaryTimeInfo.remove();
  } else {
    secondaryTimeInfo.textContent = `Only ${fHours} : ${fMinutes} until ${upcoming.name} is over.`;
  }
}

//runs the function and then calls it every 900 miliseconds.
countDown();
setInterval(countDown, 900);

//shortcut for timeInfo3
let timeInfo3 = document.getElementById("timeInfo3");

//figures out how long until 330, grabs timeInfo3 and replaces it with a formatted sentence containing the countdown
function endOfDayCountDown() {
  let endOfDay = new Date();
  endOfDay.setHours(15,30,0,0);
  const now2 = new Date();
  const endOfDayCD = endOfDay - now2;

  const EODhours = Math.floor(endOfDayCD / (1000 * 60 * 60));
  const EODminutes = Math.floor((endOfDayCD % (1000 * 60 * 60)) / (1000 * 60));
  const EODseconds = Math.floor((endOfDayCD % (1000 * 60)) / 1000);
  
  const fEODHours = String(EODhours).padStart(2,'0');
  const fEODMinutes = String(EODminutes).padStart(2,'0');
  const fEODSeconds = String(EODseconds).padStart(2,'0');

  if (endOfDayCD <= 0) {
    timeInfo3.textContent = `School is over!`;
  } else {
    timeInfo3.textContent = `School ends in ${fEODHours}:${fEODMinutes}:${fEODSeconds}.`;
  }
}

//runs the function and then calls it every 900 miliseconds.
endOfDayCountDown();
setInterval(endOfDayCountDown, 900);