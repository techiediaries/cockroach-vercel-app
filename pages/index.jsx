import Head from 'next/head'
import Link from 'next/link'

import { Container, Row, Card, Button } from 'react-bootstrap'

const Home = ({error, events}) => {
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
                {event.event_date}: {event.event_time} 
                </Card.Text>
                <Button variant="primary" href="https://nextjs.org/docs">
                  RSVP &rarr;
                </Button>
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

