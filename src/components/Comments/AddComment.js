import { useForm } from "../../hooks/useForm";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const Addcomment = ({
    onClose,
    onAddComment,
    show,
}) => {

    const { values, changeHandler, onSubmit } = useForm({
        comment: '',
    }, onAddComment);
    
    
    return (
        <>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter comment !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="comment">
                {/* <Form.Label>Enter comment !</Form.Label> */}
                <Form.Control
                    type="text"
                    placeholder="Enter comment"
                    name="comment"
                    value={values.comment}
                    onChange={changeHandler}
                />

            </Form.Group>

            <Button
                variant="primary"
                type="submit">
                Send Comment
            </Button>
        </Form>
            
        </Modal.Body>
      </Modal>
    </>
    );
};