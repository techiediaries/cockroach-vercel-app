import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Container, Row, Card, Button, Form } from 'react-bootstrap'

const Home = ({ error, events }) => {
  const [name, setName] = useState('');

  const onRSVP = async (eventId) => {
    console.log("RSVP with name: ",eventId ,name);
    const response = await fetch("https://mysocialevents.vercel.app/api/rsvp", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "eventId": eventId
      })
    });
    console.log(response);
    if (response.status == 200) {
      alert("Received!");
    } else {
      alert("Error!");
    }
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
        <Link href="add-event">
          <Button variant="primary">
            Add event &rarr;
          </Button>
        </Link>
        <Container>
          <Row className="justify-content-md-between">
            {events.map((event, index) => (
              <Card key={index} className="sml-card">
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    {event.description}
                  </Card.Text>
                  <Card.Text>
                    Date: {event.event_date}
                  </Card.Text>
                  <Card.Text>
                    Time: {event.event_time}
                  </Card.Text>
                  <Button variant="primary" onClick={() => onRSVP(event.id)} >
                    RSVP &rarr;
                  </Button>
                  <Form.Control type="text" placeholder="Write your name to RSVP.." value={name} onInput={e => setName(e.target.value)} />

                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">
        <p>Social Events (c) 2021</p>
      </footer>
    </Container>
  )
}

Home.getInitialProps = async ctx => {
  try {
    const response = await fetch(
      "https://mysocialevents.vercel.app/api/events"
    );
    const events = await response.json();
    console.log("events:=", events);
    return events;
  } catch (error) {
    return { error };
  }
};

export default Home;

