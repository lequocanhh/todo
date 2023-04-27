import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../context/AppContext";

const User = () => {
  const { users, selectOption, setSelectOption } = useContext(AppContext);

  return (
    <div className="container-fluid my-3">
      <div className="d-flex align-items-end my-3">
        <p className="h6 d-inline me-3">User</p>
        <hr className="d-inline-block w-100" style={{ opacity: "0.1" }} />
      </div>
      <select
        className="form-select"
        style={{ fontSize: "14px", width: "200px" }}
        value={selectOption}
        onChange={(e) => setSelectOption(e.target.value)}
      >
        <option selected disabled hidden>
          Select user
        </option>
        {users &&
          users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default User;
