/*

    We currently assume the range of valid work hours are from
    8AM to 9PM, nothing can be done after 9PM

    An event from 8:00 to 10:00 will have
    start = 8
    end = 10

    An event from 19:00 to 21:00 will have
    start = 19
    end = 21

    We cannot have an event from 21:00 to 22:00

*/

export class WeekDay {
  constructor(start, end, isAvailable) {
    this.start = start;
    this.end = end;
    this.isAvailable = isAvailable;
  }
}

export class Filter {
  constructor(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
  }
}

export class Task {
  constructor(name, durationInUnits) {
    this.name = name;
    this.duration = durationInUnits;
  }
}

export class ScheduleEvent {
  constructor(name, start, end, day) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.day = day;
  }
}

const favorUnits = {
  // timeslots in 24h format matched with how likely we should select those
  8: 10,
  9: 12,
  10: 12,
  11: 12,
  12: 4,
  13: 4,
  14: 8,
  15: 12,
  16: 12,
  17: 10,
  18: 8,
  19: 6,
  20: 4,
  21: 2,
};

// tested
function sortTasks(listTasks) {
  if (listTasks.length <= 1) {
    return listTasks;
  }

  var pivot = listTasks[0];

  var left = [];
  var right = [];

  for (var i = 1; i < listTasks.length; i++) {
    listTasks[i].duration < pivot.duration
      ? left.push(listTasks[i])
      : right.push(listTasks[i]);
  }

  return sortTasks(left).concat(pivot, sortTasks(right));
}

// tested
function isEventValid(event, schedule) {
  if (
    event.start < 8 ||
    event.end > 21 ||
    event.start >= event.end ||
    event.day < 0 ||
    event.day > 6
  ) {
    return false;
  }
  for (var j = event.start; j < event.end; j++) {
    // if the time slot is busy (marked with 1), the event is not valid
    if (schedule[event.day][j - 8] != 0) {
      return false;
    }
  }
  return true;
}

// tested
function getEventValuation(event, schedule) {
  // calculate the value of placing the event at that spot
  // return 0 if the event is not valid
  let value = 0;
  let curr_pointer = event.start;

  if (!isEventValid(event, schedule)) {
    return 0;
  }

  while (curr_pointer < event.end) {
    value += (favorUnits[curr_pointer] + favorUnits[curr_pointer + 1]) / 2;
    curr_pointer++;
  }

  return value;
}

// tested
function getHighestValue(task, schedule) {
  // pointers used for schedule traversal
  var bestDay;
  var bestVal;
  var currDay;
  var currVal;
  var bestStart = (bestDay = bestVal = 0);
  var currStart = (currDay = currVal = 0);

  const taskLength = task.duration;

  for (currDay = 0; currDay < 7; currDay++) {
    for (currStart = 8; currStart < 21 - taskLength + 1; currStart++) {
      // creating the tentative event
      var currEvent = new ScheduleEvent(
        task.name,
        currStart,
        currStart + taskLength,
        currDay
      );

      // if we found a new timeslot that produces a better value, store that value
      currVal = getEventValuation(currEvent, schedule);
      if (currVal > bestVal) {
        bestStart = currStart;
        bestDay = currDay;
        bestVal = currVal;
      }
    }
  }
  if (bestVal == 0) {
    return null;
  }
  return new ScheduleEvent(
    task.name,
    bestStart,
    bestStart + taskLength,
    bestDay
  );
}

// tested
function applyFilters(schedule, filters) {
  // Valid values range like this:
  // 8 <=     start   < 20
  // 8 <     end     <= 20
  var newSchedule = schedule;
  if (filters.monday) {
    // making sure the day is Available, and the start/end are valid entries
    if (
      filters.monday.isAvailable &&
      filters.monday.start > 7 &&
      filters.monday.end <= 21 &&
      filters.monday.start < filters.monday.end
    ) {
      // if we were free from 8 to 10, we would have
      // [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      // [8, 9,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
      for (var j = filters.monday.start; j < filters.monday.end; j++) {
        newSchedule[0][j - 8] = 0;
      }
    }
  }
  if (filters.tuesday) {
    if (
      filters.tuesday.isAvailable &&
      filters.tuesday.start > 7 &&
      filters.tuesday.end <= 21 &&
      filters.tuesday.start < filters.tuesday.end
    ) {
      for (var j = filters.tuesday.start; j < filters.tuesday.end; j++) {
        newSchedule[1][j - 8] = 0;
      }
    }
  }
  if (filters.wednesday) {
    if (
      filters.wednesday.isAvailable &&
      filters.wednesday.start > 7 &&
      filters.wednesday.end <= 21 &&
      filters.wednesday.start < filters.wednesday.end
    ) {
      for (var j = filters.wednesday.start; j < filters.wednesday.end; j++) {
        newSchedule[2][j - 8] = 0;
      }
    }
  }
  if (filters.thursday) {
    if (
      filters.thursday.isAvailable &&
      filters.thursday.start > 7 &&
      filters.thursday.end <= 21 &&
      filters.thursday.start < filters.thursday.end
    ) {
      for (var j = filters.thursday.start; j < filters.thursday.end; j++) {
        newSchedule[3][j - 8] = 0;
      }
    }
  }
  if (filters.friday) {
    if (
      filters.friday.isAvailable &&
      filters.friday.start > 7 &&
      filters.friday.end <= 21 &&
      filters.friday.start < filters.friday.end
    ) {
      for (var j = filters.friday.start; j < filters.friday.end; j++) {
        newSchedule[4][j - 8] = 0;
      }
    }
  }
  if (filters.saturday) {
    if (
      filters.saturday.isAvailable &&
      filters.saturday.start > 7 &&
      filters.saturday.end <= 21 &&
      filters.saturday.start < filters.saturday.end
    ) {
      for (var j = filters.saturday.start; j < filters.saturday.end; j++) {
        newSchedule[5][j - 8] = 0;
      }
    }
  }
  if (filters.sunday) {
    if (
      filters.sunday.isAvailable &&
      filters.sunday.start > 7 &&
      filters.sunday.end <= 21 &&
      filters.sunday.start < filters.sunday.end
    ) {
      for (var j = filters.sunday.start; j < filters.sunday.end; j++) {
        newSchedule[6][j - 8] = 0;
      }
    }
  }

  return newSchedule;
}

// tested
function showSchedule(schedule) {
  for (var x = 0; x < schedule.length; x++) {
    var currRow = "[";

    for (var y = 0; y < schedule[x].length; y++) {
      y != 0 ? (currRow += ", " + schedule[x][y]) : (currRow += schedule[x][y]);
    }

    currRow += "]";
    console.log(currRow);
  }
}

function eventToString(eventInstance) {
  var buf = "";
  buf +=
    "The event " +
    eventInstance.name +
    " was planned to start at" +
    ": " +
    eventInstance.start +
    " and end: " +
    eventInstance.end +
    " on ";
  if (eventInstance.day == 0) {
    buf += "Monday";
  } else if (eventInstance.day == 1) {
    buf += "Tuesday";
  } else if (eventInstance.day == 2) {
    buf += "Wednesday";
  } else if (eventInstance.day == 3) {
    buf += "Thursday";
  } else if (eventInstance.day == 4) {
    buf += "Friday";
  } else if (eventInstance.day == 5) {
    buf += "Saturday";
  } else {
    buf += "Sunday";
  }

  console.log(buf);
}

// tested (pass for now)
export function scheduleTasks(listTasks, filters) {
  var schedule = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  var listOfEvents = [];

  // block all days that are unavailble or hours that are unvailable with ones "1"
  schedule = applyFilters(schedule, filters);
  // console.log("This is schedule in the schedule Tasks code:");
  // console.log(schedule);

  var orderedTasks = sortTasks(listTasks);

  while (orderedTasks.length != 0) {
    // pop current task from the list of remaining tasks
    let currentTask = orderedTasks.pop();

    // find best place to fit current task
    let eventTimeslot = getHighestValue(currentTask, schedule);

    console.log(currentTask.name);

    // book schedule with that
    for (let i = eventTimeslot.start; i < eventTimeslot.end; i++) {
      schedule[eventTimeslot.day][i - 8] = "B";
    }
    listOfEvents.push(eventTimeslot);

    // continue
  }

  return { schedule, listOfEvents };
}

/*

    ===========================================================
                        TESTING FUNCTIONS
    ===========================================================

*/

function testSortTasks() {
  var taskArray = [
    new Task("smallest task", 3),
    new Task("biggest task", 9),
    new Task("middle task", 6),
    new Task("2nd smallest task", 4),
    new Task("2nd biggest task", 8),
  ];
  var sortedArray = sortTasks(taskArray);

  console.log("\nSorting test:");
  console.log(
    "\tThe test was " +
      (sortedArray[0].duration == 3 && sortedArray[4].duration
        ? "succesful"
        : "unsuccesful")
  );
}

function testValidEvents() {
  // Test the function that confirms if an Event is valid or not
  var schedule1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], // preamptively booking this so that nonValidEvent5 fails
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // partially booking this so that nonValidEvent6 fails by overlap
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1], // booking right before and after, should be validEvent4
  ];
  var nonValidEvent1 = new ScheduleEvent(
    "this event starts to late",
    21,
    22,
    0
  );
  var nonValidEvent2 = new ScheduleEvent(
    "this event starts after the end",
    13,
    9,
    0
  );
  var nonValidEvent3 = new ScheduleEvent(
    "this event starts and ends at the same time",
    9,
    9,
    0
  );
  var nonValidEvent4 = new ScheduleEvent(
    "this event starts at the day not in the week",
    10,
    12,
    8
  );
  var nonValidEvent5 = new ScheduleEvent(
    "this event is in timeslot that's fully booked",
    14,
    16,
    4
  );
  var nonValidEvent6 = new ScheduleEvent(
    "this event overlaps with a booked timeslot",
    12,
    13,
    5
  );
  var validEvent1 = new ScheduleEvent("this event is valid", 9, 14, 3);
  var validEvent2 = new ScheduleEvent("this event is valid", 8, 9, 6);
  var validEvent3 = new ScheduleEvent("this event is valid", 19, 20, 1);
  var validEvent4 = new ScheduleEvent(
    "this event is valid, just barely fits",
    17,
    19,
    6
  );
  var validEvent5 = new ScheduleEvent(
    "this event is valid and tests the end limit",
    19,
    21,
    2
  );

  var eventResults = [
    [isEventValid(nonValidEvent1, schedule1) == false, nonValidEvent1],
    [isEventValid(nonValidEvent2, schedule1) == false, nonValidEvent2],
    [isEventValid(nonValidEvent3, schedule1) == false, nonValidEvent3],
    [isEventValid(nonValidEvent4, schedule1) == false, nonValidEvent4],
    [isEventValid(nonValidEvent5, schedule1) == false, nonValidEvent5],
    [isEventValid(nonValidEvent6, schedule1) == false, nonValidEvent6],
    [isEventValid(validEvent1, schedule1) == true, validEvent1],
    [isEventValid(validEvent2, schedule1) == true, validEvent2],
    [isEventValid(validEvent3, schedule1) == true, validEvent3],
    [isEventValid(validEvent4, schedule1) == true, validEvent4],
    [isEventValid(validEvent5, schedule1) == true, validEvent5],
  ];

  var validEventsTestSuccessful =
    eventResults[0][0] &&
    eventResults[1][0] &&
    eventResults[2][0] &&
    eventResults[3][0] &&
    eventResults[4][0] &&
    eventResults[5][0] &&
    eventResults[6][0] &&
    eventResults[7][0] &&
    eventResults[8][0] &&
    eventResults[9][0] &&
    eventResults[10][0];

  console.log("\nValid events test:");
  console.log(
    "\tThe test was " +
      (validEventsTestSuccessful ? "succesful" : "unsuccesful")
  );
  if (!validEventsTestSuccessful) {
    console.log("\n\tList of failing tests: ");
    eventResults.forEach((eventRes, ind, arr) => {
      if (!eventRes[0]) {
        console.log("\t" + eventRes[1].name);
      }
    });
  }
}

function testValueEvents() {
  var event1 = new ScheduleEvent("value should be equal to 32", 9, 12, 0);
  var event2 = new ScheduleEvent("value should be equal to 22", 14, 16, 3);
  var event3 = new ScheduleEvent("value should be equal to 15", 18, 21, 4);
  var event4 = new ScheduleEvent("value should be equal to 0, invalid",7,12,2);
  var event5 = new ScheduleEvent("value should be equal to 0", 14, 14, 4);
  var event6 = new ScheduleEvent("value should be equal to 52", 12, 18, 5);

  var schedule2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  var valuationResults = [
    [getEventValuation(event1, schedule2) == 32, event1],
    [getEventValuation(event2, schedule2) == 22, event2],
    [getEventValuation(event3, schedule2) == 15, event3],
    [getEventValuation(event4, schedule2) == 0, event4],
    [getEventValuation(event5, schedule2) == 0, event5],
    [getEventValuation(event6, schedule2) == 52, event6],
  ];

  var valueEventsTestSuccessful =
    valuationResults[0][0] &&
    valuationResults[1][0] &&
    valuationResults[2][0] &&
    valuationResults[3][0] &&
    valuationResults[4][0] &&
    valuationResults[5][0];

  console.log("\nValue of events test:");
  console.log(
    "\tThe test was " +
      (valueEventsTestSuccessful ? "succesful" : "unsuccesful")
  );
  if (!valueEventsTestSuccessful) {
    console.log("\n\tList of failing tests: ");
    valuationResults.forEach((eventRes, ind, arr) => {
      if (!eventRes[0]) {
        console.log(
          "\t" +
            eventRes[1].name +
            ", actual value is " +
            getEventValuation(eventRes[1], schedule2)
        );
      }
    });
  }
}

function testHighestValue() {
  var schedule3 = [
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1], // the best sport here is using 14 to 16 for 2 hours
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1], // best spot for 4 hours 15 to 18
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
  ];
  var schedule4 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1], // only this spot is free for two hours
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  ];

  var task1 = new Task("task of length 2", 2);
  var task2 = new Task("task of length 4", 4);
  var task3 = new Task("task of length 3", 3);

  var result1 = getHighestValue(task1, schedule3);
  var result2 = getHighestValue(task1, schedule4);
  var result3 = getHighestValue(task2, schedule3);
  var result4 = getHighestValue(task2, schedule4);
  var result5 = getHighestValue(task3, schedule4);

  var highestValueResults = [
    [result1.day == 4 && result1.start == 9 && result1.end == 11, result1], // Tuesday (2) as the best from 9 to 11
    [result2.day == 5 && result2.start == 14 && result2.end == 16, result2], // Saturday (5) as the best from 14 to 16
    [result3.day == 5 && result3.start == 15 && result3.end == 19, result3], // Saturday  (5) as the best from 15 to 18
    [result4 == null, result4], // no spot available
    [result5.day == 6 && result5.start == 18 && result5.end == 21, result5], // should be Sunday from 18 to 21
  ];

  var highestValueTestSuccessful =
    highestValueResults[0][0] &&
    highestValueResults[1][0] &&
    highestValueResults[2][0] &&
    highestValueResults[3][0];

  console.log("\nHighest value for events test:");
  console.log(
    "\tThe test was " +
      (highestValueTestSuccessful ? "succesful" : "unsuccesful")
  );
  if (!highestValueTestSuccessful) {
    console.log("\n\tList of failing tests: ");
    highestValueResults.forEach((eventRes, ind, arr) => {
      if (!eventRes[0]) {
        console.log(
          "\ttest nb. " +
            ind +
            ", start: " +
            eventRes[1].start +
            ", day: " +
            eventRes[1].day +
            ", actual value is " +
            "TBD"
        );
      }
    });
  }
}

function testApplyFilters() {
  var baseSchedule = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  var resSchedule = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  var fullday = new WeekDay(8, 21, true);
  var midday = new WeekDay(10, 14, true);
  var afternoon = new WeekDay(12, 17, true);
  var morning = new WeekDay(8, 12, true);
  var night = new WeekDay(18, 21, true);
  var busy = new WeekDay(8, 21, false);

  var Filter1 = new Filter(
    fullday,
    fullday,
    fullday,
    fullday,
    fullday,
    fullday,
    fullday
  );

  var Filter2 = new Filter(
    afternoon,
    fullday,
    fullday,
    fullday,
    morning,
    busy,
    busy
  );

  var resSchedule1 = applyFilters(resSchedule, Filter1);
  resSchedule = baseSchedule;
  var resSchedule2 = applyFilters(resSchedule, Filter2);

  console.log("\nPrinting a schedule fully free");
  showSchedule(resSchedule1);
  console.log(
    "\nPrinting a schedule with week-ends free, monday morning free and friday afternoon free"
  );
  showSchedule(resSchedule2);

  console.log("");
}

function testScheduleTasks() {
  var baseTasksArray = [
    new Task("smallest task", 3),
    new Task("another small task", 4),
    new Task("biggest task", 9),
    new Task("middle task", 6),
    new Task("2nd smallest task", 4),
  ];
  var taskArray = [
    new Task("smallest task", 3),
    new Task("another small task", 4),
    new Task("biggest task", 9),
    new Task("middle task", 6),
    new Task("2nd smallest task", 4),
  ];

  var fullday = new WeekDay(8, 21, true);
  var nineToFive = new WeekDay(9, 18, true);
  var afternoon = new WeekDay(12, 17, true);
  var morning = new WeekDay(8, 12, true);
  var night = new WeekDay(18, 21, true);
  var busy = new WeekDay(8, 21, false);

  var Filter1 = new Filter(
    fullday,
    fullday,
    fullday,
    fullday,
    fullday,
    fullday,
    fullday
  );

  var Filter2 = new Filter(
    morning,
    morning,
    morning,
    nineToFive,
    nineToFive,
    busy,
    busy
  );

  var Filter3 = new Filter(
    nineToFive,
    nineToFive,
    nineToFive,
    fullday,
    fullday,
    busy,
    busy
  );

  var result1 = scheduleTasks(taskArray, Filter1);
  taskArray = baseTasksArray;
  var result2 = scheduleTasks(taskArray, Filter2);
  taskArray = baseTasksArray;
  var result3 = scheduleTasks(taskArray, Filter3);

  console.log("\nPrinting the schedule with fully free time slots:");
  showSchedule(result1.schedule);
  console.log(result1.listOfEvents);
  const jsonSchedule = JSON.stringify(result1.listOfEvents);
  console.log(jsonSchedule);
  result1.listOfEvents.forEach((eventRes, ind, arr) => {
    eventToString(eventRes);
  });

  console.log(
    "\nPrinting the schedule with mornings monday " +
      "to wednesday and day 9 to 5 thursday and friday:"
  );
  showSchedule(result2.schedule);
  result2.listOfEvents.forEach((eventRes, ind, arr) => {
    eventToString(eventRes);
  });

  console.log(
    "\nPrinting the schedule with working day 9 to 5 " +
      " monday to wednesday and fulldays thursday and friday"
  );
  showSchedule(result3.schedule);
  result3.listOfEvents.forEach((eventRes, ind, arr) => {
    eventToString(eventRes);
  });
}

function testStuff() {
  testSortTasks();
  testValidEvents();
  testValueEvents();
  testHighestValue();
  testApplyFilters();
  testScheduleTasks();
}

// testStuff();
