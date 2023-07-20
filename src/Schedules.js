import { element } from "prop-types";
import "./Schedules.css";
import "./index.css";
import { ScheduleEvent } from "./Scheduling";
import React, { useState } from "react";
import supabase from "./supabase";

function updateSchedules(listOfEvents) {
  console.log("coloring was called");

  for (var j = 0; j < listOfEvents.length; j++) {
    let scheduleEvent = listOfEvents[j];

    let start = scheduleEvent.start;
    let end = scheduleEvent.end;
    let day = scheduleEvent.day;
    let name = scheduleEvent.name;

    for (let i = start; i < end; i++) {
      console.log("day: " + day + ", i: " + i);
      let currTimeSlot = document.getElementById(`${day}-${i}`);
      if (currTimeSlot) currTimeSlot.style.backgroundColor = "red";
    }
  }
}

function testUpdateSchedules() {
  var event1 = new ScheduleEvent("value should be equal to 32", 9, 12, 0);
  var event2 = new ScheduleEvent("value should be equal to 22", 14, 16, 3);
  var event3 = new ScheduleEvent("value should be equal to 15", 18, 21, 4);
  var event4 = new ScheduleEvent(
    "value should be equal to 0, invalid",
    7,
    12,
    2
  );
  var event5 = new ScheduleEvent("value should be equal to 0", 14, 14, 4);

  var eventList = [event1, event2, event3, event4, event5];

  updateSchedules(eventList);
}

export function createEventGrid(listOfEvents) {
  let grid = Array(7);

  for (let i = 0; i < 7; i++) {
    grid[i] = Array(13).fill(0);
  }

  // populating the events in the grid
  let eventIDcount = 1;

  for (var j = 0; j < listOfEvents.length; j++) {
    let scheduleEvent = listOfEvents[j];

    let start = scheduleEvent.start;
    let end = scheduleEvent.end;
    let day = scheduleEvent.day;
    let name = scheduleEvent.name;
    let firstTimeSlot = true;

    for (let i = start; i < end; i++) {
      if (firstTimeSlot) {
        grid[day][i - 8] = 2 * eventIDcount;
        firstTimeSlot = false;
      } else {
        grid[day][i - 8] = 2 * eventIDcount + 1;
      }
    }

    eventIDcount++;
  }
  console.log(grid);
  return grid;
}

export function isTimeSlotEvent(day, hour, grid) {
  // will return a color
  let currID = grid[day][hour - 8];
  if (currID != 0) {
    if (currID % 2 == 0) {
      // this is the first timeslot
      return getItemColor(grid[day][hour - 8] / 2);
    } else {
      return getItemColor((grid[day][hour - 8] - 1) / 2);
    }
  } else {
    return "#FFFFFF";
  }
}

function getItemColor(itemId) {
  // Generate a unique color based on the item ID
  const hue = itemId * 137.508; // Use a prime number for a more random distribution
  const saturation = 70; // Adjust the saturation as needed
  const lightness = 50; // Adjust the lightness as needed

  // Convert HSL color to RGB
  const h = hue % 360;
  const s = saturation / 100;
  const l = lightness / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r, g, b;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // Convert RGB to hex
  const rgbToHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexColor = `#${rgbToHex(r + m)}${rgbToHex(g + m)}${rgbToHex(b + m)}`;
  return hexColor;
}

export function firstTimeSlotName(day, hour, grid, listOfEvents) {
  let currID = grid[day][hour - 8];
  if (currID != 0) {
    // console.log("in the first event thing");
    console.log(listOfEvents);
    // console.log("in the first event thing, end");
    if (currID % 2 == 0) {
      // this is the first timeslot
      console.log(currID / 2);
      return listOfEvents[currID / 2 - 1].name;
    } else {
      return " ";
    }
  }

  return "-";
}

function Schedules({ schedAndEventsList }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [scheduleName, setScheduleName] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prevVisible) => !prevVisible);
  };

  const toggleCreateUser = async () => {
    try {
      setIsCreatingUser(true);
      setIsSaving(false);

      // Check if the user already exists in the users table
      const { data: usersData, error: usersError } = await supabase
        .from("Users")
        .select("id")
        .eq("user_name", username);

      if (usersError) {
        throw new Error("Error fetching user data from the users table.");
      }

      if (usersData && usersData.length > 0) {
        // User already exists
        setUserId(usersData[0].id);
      } else {
        // Create a new user
        const { data: newUser, error: newUserError } = await supabase
          .from("Users")
          .insert([
            {
              user_name: username,
              password: password,
            },
          ])
          .select();

        if (newUserError) {
          throw new Error("Error creating a new user.");
        }

        setUserId(newUser[0].id);
      }

      setIsCreatingUser(false);
      setIsFormVisible(true);
    } catch (error) {
      console.error("Error while creating or fetching user:", error.message);
      setIsCreatingUser(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Now, insert the schedule data into the schedules table
      const { data: scheduleData, error: scheduleError } = await supabase
        .from("Schedules")
        .insert([
          {
            user_id: userId,
            schedule_obj: JSON.stringify(schedAndEventsList.listOfEvents),
            schedule_name: scheduleName,
          },
        ]);

      if (scheduleError) {
        throw new Error(
          "Error inserting the schedule data into the schedules table."
        );
      }

      setIsSaving(false);
      setIsFormVisible(false);
      resetForm(); // Reset the form input fields
      // You can handle success messages or other actions here
    } catch (error) {
      console.error("Error while saving the schedule:", error.message);
      setIsSaving(false);
      // You can handle error messages or other error handling here
    }
  };
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setScheduleName("");
    setUserId(null);
  };

  const daysNum = Array.from({ length: 7 }, (_, i) => i);
  //change the following two lines Dhiaa
  console.log("This is what is received by schedules tab");
  console.log(schedAndEventsList);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = Array.from({ length: 13 }, (_, i) => i);

  // temporarely creating the event list here
  // var event1 = new ScheduleEvent("value should be equal to 32", 9, 12, 0);
  // var event2 = new ScheduleEvent("value should be equal to 22", 14, 16, 3);
  // var event3 = new ScheduleEvent("value should be equal to 15", 18, 21, 4);
  // var event4 = new ScheduleEvent("value should be equal to 0, invalid",7,12,2);
  // var event5 = new ScheduleEvent("value should be equal to 0", 14, 14, 4);

  // var eventList = [event1, event2, event3, event4, event5];

  let colorGrid = createEventGrid(schedAndEventsList.listOfEvents);
  console.log(colorGrid);

  // testUpdateSchedules();

  return (
    <div>
      <div>
        <button
          className="btn btn-primary custom-button save-btn"
          onClick={toggleForm}
        >
          {isFormVisible ? "Close" : "Save Schedule"}
        </button>
      </div>
      <div className="bigDiv" id="scheduleDiv">
        {isFormVisible && (
          <div className="form">
            {!userId ? (
              // First part of the form: User input
              <div className="form-row">
                <div className="form-group col-md-4 col-sm-3 col-12 save-form-elem">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4 col-sm-3 col-12 save-form-elem">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="align-self-end form-group col-lg-3 col-md-4 col-sm-5 col-12">
                  <button
                    className="btn btn-primary custom-button"
                    onClick={toggleCreateUser}
                    disabled={isCreatingUser || isSaving}
                  >
                    Enter
                  </button>
                </div>
              </div>
            ) : (
              // Second part of the form: Schedule input
              <div className="form-row">
                <div className="form-group col-md-4 col-sm-3 col-12 save-form-elem">
                  <input
                    className="form-control "
                    type="text"
                    placeholder="Schedule Name"
                    value={scheduleName}
                    onChange={(e) => setScheduleName(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary custom-button"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}
        <div className="row">
          <div className="hours"></div>
          <div className="weekdays">
            {days.map((day) => (
              <div key={day} className="day">
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="hours">
            {hours.map((hour) => (
              <div key={hour} className="hour">
                {hour + 8}:00
              </div>
            ))}
          </div>
          <div className="week-schedule">
            <div className="schedule">
              {daysNum.map((day) => (
                <div key={day} className="day-schedule">
                  {hours.map((hour) => (
                    <div
                      id={`${day}-${hour + 8}`}
                      key={`${day}-${hour + 8}`}
                      className="hour-slot"
                      style={{
                        backgroundColor: isTimeSlotEvent(
                          day,
                          hour + 8,
                          colorGrid
                        ),
                      }}
                    >
                      {firstTimeSlotName(
                        day,
                        hour + 8,
                        colorGrid,
                        schedAndEventsList.listOfEvents
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedules;
