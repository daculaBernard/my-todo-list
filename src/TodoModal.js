import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

const TodoModal = (props) => {

    const btnSubmit = React.createRef();

    const [inputs, setInputs] = useState({
        id: 0,
        title: '',
        start: '',
        end: ''
    })

    const onModalClose = () => {
        props.onCloseModal()
    }

    const handleInputChange = input => {
                
        const inputName = input.target.name;
        const inputValue = input.target.value;
        
        setInputs({ ...inputs,
            [inputName]: inputValue
        })
    }

    const handleSubmit = async (event) => {

        event.stopPropagation();
        event.preventDefault();

       props.onModalSubmit(inputs);
    }


    return (
        <div>
            <Modal show={props.isOpen}
                animation={false}
                onHide={onModalClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        To do
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate method="post" onSubmit={ handleSubmit }>
                    <Modal.Body>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Title:</Form.Label>
                                <Form.Control type="text" required placeholder="Enter event title" onChange={handleInputChange} name="title" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter event title.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col}>
                                <Form.Label>Start:</Form.Label>
                                <Form.Control type="datetime-local" required onChange={handleInputChange} name="start"  />
                                <Form.Control.Feedback type="invalid">
                                    Please enter event start.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>End:</Form.Label>
                                <Form.Control type="datetime-local" required onChange={handleInputChange} name="end"  />
                                <Form.Control.Feedback type="invalid">
                                    Please enter event end.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                            <div className="action-items">                                
                                <Button type="submit" variant="info" id="add" ref={btnSubmit} >Submit</Button>
                            </div>                          
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}


export default (TodoModal);