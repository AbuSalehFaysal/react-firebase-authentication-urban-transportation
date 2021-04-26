import React from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Transportation = ({ transportation }) => {
    const history = useHistory()
    const handleBook = (transportationType) => {
        history.push(`/book/${transportationType}`);
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={4}>

                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src={transportation.imgUrl} />
                            <Card.Body>
                                <Card.Text>
                                    Name: {transportation.title}, Capacity: {transportation.capacity}, Price: {transportation.price}
                                    <br />
                                    <br />
                                    <Form.Group>
                                        <Form.Control type="date" placeholder="Normal text" />
                                        <br />
                                    </Form.Group>
                                    <Button onClick={() => handleBook(transportation.transportationType)} variant="primary" block>Book a Ride</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Transportation;