import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from "next/router";

const PeoplePage = () => {
    const { query } = useRouter();
    const [people, setPeople] = React.useState([]);

    const fetchPeople = async (eventId) => {
        const response = await fetch(`https://mysocialevents.vercel.app/api/people?eventId=${eventId}`);
        const people = await response.json();
        setPeople(people);
        console.log("People", people);
        setShowPeople(true);
    };

    React.useEffect(async () => {
        await fetchPeople(query.eventId);
    }, []);
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
          <Link href="add-event">Share</Link> and attend <Link href="/">events</Link> ..
          </p>
          <Container>
            <Row className="justify-content-md-between">
              {people.map((p, index) => (
                <Card key={index} className="sml-card">
                  <Card.Body>
                    <Card.Text>
                      {p.name}
                    </Card.Text>
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
    );
};

export default PeoplePage;
