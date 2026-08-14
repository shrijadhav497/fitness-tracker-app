import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("fitnessActivities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  const [exerciseType, setExerciseType] = useState("Running");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "fitnessActivities",
      JSON.stringify(activities)
    );
  }, [activities]);

  const handleAddActivity = (e) => {
    e.preventDefault();

    if (!duration || !calories || !steps) {
      alert("Please fill in all fields.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      exerciseType,
      duration: Number(duration),
      calories: Number(calories),
      steps: Number(steps),
      date: new Date().toISOString().split("T")[0],
    };

    setActivities((previousActivities) => [
      ...previousActivities,
      newActivity,
    ]);

    setDuration("");
    setCalories("");
    setSteps("");
  };

  const totalSteps = activities.reduce(
    (total, activity) => total + activity.steps,
    0
  );

  const totalCalories = activities.reduce(
    (total, activity) => total + activity.calories,
    0
  );

  const totalDuration = activities.reduce(
    (total, activity) => total + activity.duration,
    0
  );

  const stepsProgress = Math.min((totalSteps / 10000) * 100, 100);
  const caloriesProgress = Math.min((totalCalories / 500) * 100, 100);
  const workoutProgress = Math.min((totalDuration / 60) * 100, 100);

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">YOUR DAILY HEALTH</p>

          <h1>Fitness Tracker</h1>

          <p className="subtitle">
            Track your activities, stay consistent, and reach your goals.
          </p>
        </div>

        <div className="header-icon">💪</div>
      </header>

      <main className="container">
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👣</div>

            <div>
              <p>Steps</p>

              <h2>{totalSteps.toLocaleString()}</h2>

              <span>Goal: 10,000</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>

            <div>
              <p>Calories</p>

              <h2>{totalCalories}</h2>

              <span>Goal: 500 kcal</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>

            <div>
              <p>Workout</p>

              <h2>{totalDuration} min</h2>

              <span>Goal: 60 min</span>
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="section-heading">
            <div>
              <p className="section-label">TODAY'S PROGRESS</p>

              <h2>Keep moving forward</h2>
            </div>

            <span className="progress-badge">
              {Math.round(
                (stepsProgress +
                  caloriesProgress +
                  workoutProgress) /
                  3
              )}
              %
            </span>
          </div>

          <div className="progress-item">
            <div className="progress-info">
              <span>👣 Steps</span>

              <strong>
                {Math.round(stepsProgress)}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${stepsProgress}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-info">
              <span>🔥 Calories</span>

              <strong>
                {Math.round(caloriesProgress)}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${caloriesProgress}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-info">
              <span>🏋️ Workout</span>

              <strong>
                {Math.round(workoutProgress)}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${workoutProgress}%`,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="section-heading">
            <div>
              <p className="section-label">FITNESS LOG</p>

              <h2>Add Activity</h2>
            </div>
          </div>

          <form
            className="activity-form"
            onSubmit={handleAddActivity}
          >
            <div className="form-group">
              <label>Exercise Type</label>

              <select
                value={exerciseType}
                onChange={(e) =>
                  setExerciseType(e.target.value)
                }
              >
                <option>Running</option>
                <option>Walking</option>
                <option>Cycling</option>
                <option>Swimming</option>
                <option>Gym Workout</option>
                <option>Yoga</option>
              </select>
            </div>

            <div className="form-group">
              <label>Workout Time</label>

              <input
                type="number"
                value={duration}
                placeholder="30"
                onChange={(e) =>
                  setDuration(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Calories Burned</label>

              <input
                type="number"
                value={calories}
                placeholder="250"
                onChange={(e) =>
                  setCalories(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Steps</label>

              <input
                type="number"
                value={steps}
                placeholder="5000"
                onChange={(e) =>
                  setSteps(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="add-activity-btn"
            >
              + Add Activity
            </button>
          </form>
        </section>

        <section className="section-card">
          <div className="section-heading">
            <div>
              <p className="section-label">
                <section className="section-card">
  <div className="section-heading">
    <div>
      <p className="section-label">WEEKLY OVERVIEW</p>
      <h2>Your Weekly Progress</h2>
    </div>
  </div>

  <div className="progress-item">
    <div className="progress-info">
      <span>👣 Steps</span>
      <strong>{totalSteps}</strong>
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${Math.min((totalSteps / 10000) * 100, 100)}%`,
        }}
      ></div>
    </div>
  </div>

  <div className="progress-item">
    <div className="progress-info">
      <span>🔥 Calories</span>
      <strong>{totalCalories}</strong>
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${Math.min((totalCalories / 500) * 100, 100)}%`,
        }}
      ></div>
    </div>
  </div>

  <div className="progress-item">
    <div className="progress-info">
      <span>⏱️ Workout</span>
      <strong>{totalDuration} min</strong>
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${Math.min((totalDuration / 60) * 100, 100)}%`,
        }}
      ></div>
    </div>
  </div>
</section>
                ACTIVITY HISTORY
              </p>

              <h2>Recent Activities</h2>
            </div>
          </div>

          {activities.length === 0 ? (
            <div className="empty-state">
              <h3>No activities yet</h3>

              <p>Add your first activity.</p>
            </div>
          ) : (
            <div className="activity-list">
              {activities
                .slice()
                .reverse()
                .map((activity) => (
                  <div
                    className="activity-item"
                    key={activity.id}
                  >
                    <div className="activity-main">
                      <h3>
                        {activity.exerciseType}
                      </h3>

                      <p>{activity.date}</p>
                    </div>

                    <div className="activity-details">
                      <span>
                        ⏱️ {activity.duration} min
                      </span>

                      <span>
                        🔥 {activity.calories} kcal
                      </span>

                      <span>
                        👣 {activity.steps}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>
          Fitness Tracker • Stay active, stay healthy
          💚
        </p>
      </footer>
    </div>
  );
}

export default App;