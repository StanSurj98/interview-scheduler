import React from "react";
import "components/Appointment/styles.scss";
// Components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
// Custom Hooks
import useVisualMode from "hooks/useVisualMode";

// Constants for Modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //
  // ----- Functions -----
  //

  // Called from onSave in <Form />, submits the student and interviewer
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    // Calling bookInterview() prompts axios request in parent
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((e) => {
        console.log("An error occurred with Axios during saving", e);
        transition(ERROR_SAVE, true);
      });
  };

  const deleteInterview = () => {
    const interview = {
      student: props.interview.student,
      interviewer: props.interview.interviewer,
    };

    // Making sure to replace = true, avoid having to double-back
    transition(DELETING, true);

    // Calling cancelInterview() prompts axios request in parent
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch((e) => {
        console.log("An error occurred with Axios during deletion", e);
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status message={"Booking interview..."} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Do you want to delete your appointment?"}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}

      {mode === DELETING && <Status message={"Deleting interview..."} />}

      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message={"There was an error during saving... sorry!"}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={"There was an error during deletion"} />
      )}
    </article>
  );
}
