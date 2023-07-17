/*

    An event from 8:00 to 10:00 will have
    start = 8
    end = 10

    An event from 19:00 to 20:00 will have
    start = 19
    end = 20

    We cannot have an event from 20:00 to 21:00

*/




class WeekDay {
    constructor(start, end, isAvailable) {
        this.start = start;
        this.end = end;
        this.isAvailable = isAvailable;
    }
}

class Filter {
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

class Task {
    constructor(name, durationInUnits)
    {
        this.name = name;
        this.duration = durationInUnits;
    }
}

class ScheduleEvent {
    constructor(name, start, end, day)
    {
        this.name = name;
        this.start = start;
        this.end = end;
        this.day = day;
    }
}

const favorUnits = {
    // timeslots in 24h format matched with how likely we should select those
    8:  10,
    9:  12,
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
    20: 4
}

function sortTasks(listTasks)
{
    if (listTasks.length <= 1) {
        return array;
      }
    
      var pivot = listTasks[0];
      
      var left = []; 
      var right = [];
    
      for (var i = 1; i < listTasks.length; i++) {
        listTasks[i].duration < pivot.duration ? left.push(listTasks[i]) : right.push(listTasks[i]);
      }
    
      return quicksort(left).concat(pivot, quicksort(right));
}

function isEventValid(event, schedule)
{
    for (var j = event.start; j < event.end; j++)
    {
        // if the time slot is busy (marked with 1), the event is not valid
        if (schedule[event.day][j-8] = 1)
        {
            return False;
        }
    }
    return True;
}

function getEventValuation(event, schedule)
{
    // calculate the value of placing the event at that spot
    // return 0 if the event is not valid
    value = 0;
    curr_left_pointer = event.start;
    curr_right_pointer = curr_left_pointer + 1;

    if (!isEventValid(event, schedule))
    {
        return 0;
    }

    while (curr_left_pointer < event.end)
    {
        value += (favorUnits[curr_left_pointer] + favorUnits[curr_right_pointer]) / 2;
        curr_left_pointer += 1;
        curr_right_pointer += 1;
    }

    return value;
}

function getHighestValue(task, schedule)
{
    // pointers used for schedule traversal
    bestStart = bestDay = bestVal = 0;
    currStart = currDay = currVal = 0;

    const taskLength = task.duration;

    for (currDay = 0; currDay < 7; currDay++)
    {
        for (currStart = 8; currStart < 20 - taskLength + 1; currStart++)
        {
            // creating the tentative event
            var currEvent = new ScheduleEvent(task.name, currStart, currStart + taskLength + currDay);

            // if we found a new timeslot that produces a better value, store that value
            currVal = getEventValuation(currEvent, schedule);
            if (currVal > bestVal)
            {
                bestStart = currStart;
                bestDay = currDay;
                bestVal = currVal;
            }
        }
    }

    return { bestStart, bestEnd, day};
}

function applyFilters(schedule, filters)
{
    // Valid values range like this:
    // 8 <=     start   < 20
    // 8 <     end     <= 20
    var newSchedule = schedule;
    if (filters.monday)
    {
        // making sure the day is Available, and the start/end are valid entries
        if (filters.monday.isAvailable &&
            filters.monday.start > 7 && filters.monday.end < 21 && 
            filters.monday.start < filters.monday.end)
        {
            // if we were free from 8 to 10, we would have
            // [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            // [8, 9,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
            for (var j = filters.monday.start; j < filters.monday.end; i++)
            {
                newSchedule[0][j-8] = 0;
            }
        }
    }
    if (this.tuesday)
    {
        if (filters.tuesday.isAvailable &&
            filters.tuesday.start > 7 && filters.tuesday.end < 21 && 
            filters.tuesday.start < filters.tuesday.end)
        {
            for (var j = filters.tuesday.start; j < filters.tuesday.end; i++)
            {
                newSchedule[1][j-8] = 0;
            }
        }
    }
    if (this.wednesday)
    {
        if (filters.wednesday.isAvailable &&
            filters.wednesday.start > 7 && filters.wednesday.end < 21 && 
            filters.wednesday.start < filters.wednesday.end)
        {
            for (var j = filters.wednesday.start; j < filters.wednesday.end; i++)
            {
                newSchedule[2][j-8] = 0;
            }
        }
    }
    if (this.thursday)
    {
        if (filters.thursday.isAvailable &&
            filters.thursday.start > 7 && filters.thursday.end < 21 && 
            filters.thursday.start < filters.thursday.end)
        {
            for (var j = filters.thursday.start; j < filters.thursday.end; i++)
            {
                newSchedule[3][j-8] = 0;
            }
        }
    }
    if (this.friday)
    {
        if (filters.friday.isAvailable &&
            filters.friday.start > 7 && filters.friday.end < 21 && 
            filters.friday.start < filters.friday.end)
        {
            for (var j = filters.friday.start; j < filters.friday.end; i++)
            {
                newSchedule[4][j-8] = 0;
            }
        }
    }
    if (this.saturday)
    {
        if (filters.saturday.isAvailable &&
            filters.saturday.start > 7 && filters.saturday.end < 21 && 
            filters.saturday.start < filters.saturday.end)
        {
            for (var j = filters.saturday.start; j < filters.saturday.end; i++)
            {
                newSchedule[5][j-8] = 0;
            }
        }
    }
    if (this.sunday)
    {
        if (filters.saturday.isAvailable &&
            filters.saturday.start > 7 && filters.saturday.end < 21 && 
            filters.saturday.start < filters.saturday.end)
        {
            for (var j = filters.saturday.start; j < filters.saturday.end; i++)
            {
                newSchedule[6][j-8] = 0;
            }
        }
    }

    return newSchedule;
}

function scheduleTasks(listTasks, filters)
{
    var schedule = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // block all days that are unavailble or hours that are unvailable with ones "1"
    schedule = applyFilters(schedule, filters)

    var orderedTasks = sortTasks(listTasks);

    while (orderedTasks.length != 0)
    {        
        // pop current task from the list of remaining tasks
        currentTask = orderedTasks.pop();

        // find best place to fit current task
        let timeslot = getHighestValue(currentTask);

        // book schedule with that
        for (let i = timeslot.start; i < timeslot.end; i++)
        {
            schedule[day][i] = 1;
        }

        // continue

    }

    return schedule;
}