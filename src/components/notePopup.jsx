import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function NotePopup({ note, close, onUpdate }) {
  const [text, setText] = useState(note.text);

  function handleText(e) {
    setText(e.target.value);
  }

  console.log(note);
  console.log(text);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={close}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <button
          className="close-button"
          onClick={() => onUpdate(note.id, text)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-close"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={18}
              value={text}
              onChange={handleText}
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
export default NotePopup;
