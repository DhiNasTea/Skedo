import React from "react";

function Home() {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <p>Welcome to our personal scheduling app!</p>
          <p>
            With our user-friendly interface, you can easily generate and save
            custom schedules for your tasks in 3 easy steps:
          </p>
          <ol>
            <li>Add tasks along with their estimated completion time.</li>
            <li>
              Customize your preferred working days and timeslots in the Options
              tab, and we'll generate the perfect schedule that suits your
              preferences.
            </li>
            <li>
              Save your schedule for easy access in the future, and effortlessly
              view all your previously saved schedules in the View Saved
              Schedules tab.
            </li>
          </ol>
          <p>
            Say goodbye to stress and embrace a well-organized life with our
            scheduling app!
          </p>
          <p>Get started by clicking on the Tasks tab</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
