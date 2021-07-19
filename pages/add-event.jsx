import Head from 'next/head'
import { Container, Row, Card, Button, Form } from 'react-bootstrap'
import React from 'react';

const Home = () => {
    const eventName = React.useRef();
    const eventDate = React.useRef();
    const eventTime = React.useRef();
    const eventDescription = React.useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(eventName.current.value, eventDate.current.value, eventTime.current.value, eventDescription.current.value);
        const rawResponse = await fetch("https://mysocialevents-5qli6f28f-devfordev.vercel.app/api/addEvent", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "eventName": eventName.current.value,
                "eventdate": eventDate.current.value,
                "eventTime": eventTime.current.value,
                "eventDescription": eventDescription.current.value 
            })
        });
    };

    return (
        <Container className="md-container">
            <Head>
                <title>Social Events</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <Container>
                <h1>
                    Social Events
                </h1>
                <p>
                    Share and attend events..
                </p>
                <Container>
                    <Row className="justify-content-md-between">

                        <Card className="sml-card">
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="form.eventName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter event name" ref={eventName} />
                                    </Form.Group>
                                    <Form.Group controlId="form.eventDate">
                                        <Form.Label>Event date</Form.Label>
                                        <Form.Control type="date" placeholder="Enter event date" ref={eventDate} />
                                    </Form.Group>
                                    <Form.Group controlId="form.eventTime">
                                        <Form.Label>Event time</Form.Label>
                                        <Form.Control type="time" placeholder="Enter event time" ref={eventTime} />
                                    </Form.Group>

                                    <Form.Group controlId="form.eventDescription">
                                        <Form.Label>Event description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Write something about your event.." ref={eventDescription} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn btn-primary" type="submit">Send</Button>
                                    </Form.Group>

                                </Form>
                            </Card.Body>
                        </Card>


                    </Row>
                </Container>
            </Container>

            <footer className="cntr-footer">
                <p>Social Events (c) 2021</p>
            </footer>
        </Container>
    )
}


export default Home;

