import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Container, Row, Card, Button, Form, Modal } from 'react-bootstrap'


const Home = ({ error, events }) => {
  const [name, setName] = React.useState('');
  const [showPeople, setShowPeople] = React.useState(false);
  const [people, setPeople] = React.useState([]);
  
  const fetchPeople = async (eventId) => {
    const response = await fetch(`https://mysocialevents.vercel.app/api/people?eventId=${eventId}`);
    const people = await response.json();
    setPeople(people);
    console.log("People", people);
    setShowPeople(true);
  };
  const onRSVP = async (eventId) => {
    console.log("RSVP with name: ", eventId, name);
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
      alert("RSVP'd!");
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
        <Link href="add-event">Share</Link> and attend events..
        </p>
        <Link href="add-event">
          <Button variant="primary">
            Add event &rarr;
          </Button>
        </Link>
        <Container>
          <Modal show={showPeople} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>People</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Row className="justify-content-md-between">

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

