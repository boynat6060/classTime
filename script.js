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
  sched = "Bell Schedule 2 - Trojan Check In"
}
else {
  p1.setHours(9,56,0,0);
  p2.setHours(10,46,0,0);
  p3.setHours(11,35,0,0);
  ilt.setHours(12,20,0,0);
  p4.setHours(13,10,0,0);
  p5.setHours(13,59,0,0);
  p6.setHours(15,30,0,0);
  sched = "Bell Schedule 1"
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

document.getElementById("bellSched").textContent = sched;

//shortcuts for marquee elementts
let mq1 = document.getElementById("mq1");
let mq2 = document.getElementById("mq2");
let mq3 = document.getElementById("mq3");
let mq4 = document.getElementById("mq4");
let mq5 = document.getElementById("mq5");
let mq6 = document.getElementById("mq6");

/*
document.getElementById("mq1").innerText = "This is some text";
document.getElementById("mq2").innerText = "This is more text";
document.getElementById("mq3").innerText = "This is even more text";
*/

//keeps track of time in school
function timeInSchool() {
  let dayStart = new Date();
  dayStart.setHours(8,30,0,0);
  let now3 = new Date();
  const timeInSchool = now3 - dayStart;

  const TIShours = Math.floor(timeInSchool / (1000 * 60 * 60));
  const TISminutes = Math.floor((timeInSchool % (1000 * 60 * 60)) / (1000 * 60));

  //if formatting to add an S if needed - next time use dynamic formatting
  if (timeInSchool <= 0) {
    mq1.textContent = `You are not in school.`;
    mq4.textContent = `You are not in school.`;
  } else if (TIShours == 1 && TISminutes == 1) {
    mq1.textContent = `You have been in school for ${TIShours} hour and ${TISminutes} minute.  `
    mq4.textContent = `You have been in school for ${TIShours} hour and ${TISminutes} minute.  `
  } else if (TIShours == 1 && TISminutes != 1) {
    mq1.textContent = `You have been in school for ${TIShours} hour and ${TISminutes} minutes.  `
    mq4.textContent = `You have been in school for ${TIShours} hour and ${TISminutes} minutes.  `
  } else if (TIShours != 1 && TISminutes == 1) {
    mq1.textContent = `You have been in school for ${TIShours} hours and ${TISminutes} minute.  `
    mq4.textContent = `You have been in school for ${TIShours} hours and ${TISminutes} minute.  `
  } else {
    mq1.textContent = `You have been in school for ${TIShours} hours and ${TISminutes} minutes.  `
    mq4.textContent = `You have been in school for ${TIShours} hours and ${TISminutes} minutes.  `
  }
}

timeInSchool();
setInterval(timeInSchool, 900);

//counts the days until saturday
function daysLeftInWeek() {
  const dayNow = new Date().getDay(); //finds todays day, sunday = 0, monday = 1, etc
  const daysTillWeekend = 6 - dayNow;

  if (daysTillWeekend == 1) {
    mq2.textContent = `  There is ${daysTillWeekend} day until the weekend.  `
    mq5.textContent = `  There is ${daysTillWeekend} day until the weekend.  `
  } else if (daysTillWeekend == 0 || daysTillWeekend == -1) {
    mq2.textContent = `  It is the weekend.  `
    mq5.textContent = `  It is the weekend.  `
  } else {
    mq2.textContent = `  There are ${daysTillWeekend} days until the weekend.  `
    mq5.textContent = `  There are ${daysTillWeekend} days until the weekend.  `
  }
}

daysLeftInWeek();
setInterval(daysLeftInWeek, 900);
