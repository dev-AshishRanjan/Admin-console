import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/loader";
import EditEvents from "../services/Events/EditEvents";

const EnigmaUpdate = ({
  id,
  updateEvent,
  setupdateEvent,
  datasent,
  reloadReq,
  setReloadReq,
}) => {
  const [cfContestLink, setCfContestLink] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [durationInHrs, setDurationInHrs] = useState();
  const [questionSetters, setquestionSetters] = useState([]);
  const [questionTesters, setquestionTesters] = useState([]);
  const [dataTransfer, setDataTransfer] = useState(false);

  const handleAdd = () => {
    const abc = [...questionSetters, []];
    setquestionSetters(abc);
  };
  const handleChange = (onChangequestionSettersue, i) => {
    const inputdata = [...questionSetters];
    inputdata[i] = onChangequestionSettersue.target.questionSettersue;
    setquestionSetters(inputdata);
  };
  const handleDelete = (i) => {
    const deletquestionSetters = [...questionSetters];
    deletquestionSetters.splice(i, 1);
    setquestionSetters(deletquestionSetters);
  };
  //console.log(questionSetters,"data-")

  const handleAdd1 = () => {
    const abc = [...questionTesters, []];
    setquestionTesters(abc);
  };
  const handleChange1 = (onChangequestionSettersue, i) => {
    const inputdata = [...questionTesters];
    inputdata[i] = onChangequestionSettersue.target.questionSettersue;
    setquestionTesters(inputdata);
  };
  const handleDelete1 = (i) => {
    const deletquestionSetters = [...questionTesters];
    deletquestionSetters.splice(i, 1);
    setquestionTesters(deletquestionSetters);
  };

  useEffect(() => {
    setCfContestLink(datasent.cfContestLink);
    setStartDate(datasent.startDate.split("T")[0]);
    startTime(datasent.startTime);
    setDurationInHrs(datasent.durationInHrs);
    setquestionSetters(datasent.questionSetters);
    setquestionTesters(datasent.questionTesters);
  }, [datasent]);

  const handleSubmit = () => {
    const sendForm = new FormData();
    sendForm.set("cfContestLink", cfContestLink);
    sendForm.set("startDate", startDate);
    sendForm.set("startTime", startTime);
    sendForm.set("durationInHrs", durationInHrs);
    sendForm.set("questionSetters", questionSetters);
    sendForm.set("questionTesters", questionTesters);
    setDataTransfer(true);
    const events = EditEvents(
      sendForm,
      id,
      setDataTransfer,
      reloadReq,
      setReloadReq,
      "abacus"
    );
  };

  return (
    <div className="createPage">
      {dataTransfer && (
        <div className="dataTransfer">
          <Loader />
        </div>
      )}
      <p className="btn close" onClick={() => setupdateEvent(!updateEvent)}>
        X
      </p>
      <label htmlFor="name">CF Contes tLink</label>
      <input
        type="text"
        name="name"
        id="name"
        value={cfContestLink}
        accept="image"
        onChange={(e) => setCfContestLink(e.target.value)}
      />

      <fieldset>
        <legend>Event Date-Time</legend>
        <div>
          <label htmlFor="startTime">Contest Duration In Hours</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={durationInHrs}
            onChange={(e) => setDurationInHrs(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startTime">Contest Start Time</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            questionSettersue={startTime}
            onChange={(e) => setStartTime(e.target.questionSettersue)}
          />
        </div>
      </fieldset>

      <label htmlFor="questionSetters">Question Setters</label>
      <button onClick={() => handleAdd()}>+</button>
      {questionSetters.map((data, i) => {
        return (
          <div>
            <input
              questionSettersue={data}
              onChange={(e) => handleChange(e, i)}
            />
            <button onClick={() => handleDelete(i)}>x</button>
          </div>
        );
      })}

      <label htmlFor="questionTesters">Question Testers</label>
      <button onClick={() => handleAdd1()}>+</button>
      {questionTesters.map((data, i) => {
        return (
          <div>
            <input
              questionSettersue={data}
              onChange={(e) => handleChange1(e, i)}
            />
            <button onClick={() => handleDelete1(i)}>x</button>
          </div>
        );
      })}

      <button className="btn" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default EnigmaUpdate;
