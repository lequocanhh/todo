import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppContext } from "../../context/AppContext";

const Task = () => {
  const { userData, hasUserData, taskId, setTaskId } = useContext(AppContext);

  //count task completed
  const countTask = (userData = []) => {
    const completedTask = userData.filter(({ completed }) => {
      return completed;
    });
    return completedTask.length;
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-end my-3">
        <p className="h6 d-inline me-3">Tasks</p>
        <hr className="d-inline-block w-100" style={{ opacity: "0.1" }} />
      </div>
      <div
        className="table"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.2)",
          height: "500px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        {hasUserData ? (
          <ul
            class="list-group list-group-flush rounded-2"
            style={{
              maxHeight: "498px",
              overflow: "auto",
            }}
          >
            {userData.map(({ id, title, completed }) => (
              <li
                key={id}
                class="list-group-item d-flex justify-content-between align-items-center px-4 py-2"
                style={{ backgroundColor: "rgba(248,248,248,1)" }}
              >
                <div className="p-0 py-1">
                  {completed ? (
                    <i class="bi bi-check-circle me-2 text-success"></i>
                  ) : (
                    <i class="bi bi-dash-square me-2 text-warning"></i>
                  )}

                  {title}
                </div>
                {!completed && (
                  <button
                    type="button"
                    onClick={() => setTaskId(id)}
                    className="btn d-flex justify-content-between align-items-center text-bg-secondary btn-sm py-0"
                  >
                    {id === taskId && (
                      <div
                        class="spinner-border spinner-border-sm text-dark bg-secondary me-2"
                        role="status"
                      >
                        <span class="sr-only"></span>
                      </div>
                    )}
                    Mark done
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="no-data"
            style={{
              marginTop: "15px",
              color: "rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            No data
          </p>
        )}
      </div>
      <p>Done {countTask(userData)}/20 tasks</p>
    </div>
  );
};

export default Task;
