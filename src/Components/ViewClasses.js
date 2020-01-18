import React from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Button,
  Card,
  CardGroup
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewClasses(props) {
  //console.log("Token: " + props.responseObject.tokenId);
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("730");
  const [semester, setSemester] = useState("12020");
  const [campus, setCampus] = useState("NB");
  const [level, setLevel] = useState("UG");

  const [url, setURL] = useState(
    "https://cors-anywhere.herokuapp.com/http://sis.rutgers.edu/oldsoc/courses.json?subject=" +
      subject +
      "&semester=" +
      semester +
      "&campus=" +
      campus +
      "&level=" +
      level
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const setURLfunc = () => {
    setURL(
      "https://cors-anywhere.herokuapp.com/http://sis.rutgers.edu/oldsoc/courses.json?subject=" +
        subject +
        "&semester=" +
        semester +
        "&campus=" +
        campus +
        "&level=" +
        level
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const containerStyle = {
    marginLeft: 10
  };

  const showingClassesFor = {
    color: "#5d5d5d",
    marginLeft: 22,
    marginBottom: 20
  };

  const closedClass = {
    color: "red"
  };

  let dataArray = [];
  dataArray = data;
  //console.log(dataArray);
  return (
    <Container fluid="true">
      <br />
      <Row style={containerStyle}>
        {isError ? (
          <div>
            <h1>
              An error occured. (Most likely too many requests. Wait and try
              again.)
            </h1>
            <br />
            <p>
              CORS handling is provided by a third party and cannot handle high
              traffic.
            </p>
          </div>
        ) : (
          <div>
            <h1>Open Classes by Department</h1>
            <br />
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="730"
                    as="input"
                    onChange={event => setSubject(event.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="12020"
                    as="input"
                    onChange={event => setSemester(event.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="NB"
                    as="input"
                    onChange={event => setCampus(event.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="UG"
                    as="input"
                    onChange={event => setLevel(event.target.value)}
                  />
                </Col>
                <Button onClick={setURLfunc}>View Classes</Button>
              </Row>
            </Form>
          </div>
        )}
      </Row>
      <br />
      {isLoading ? (
        <div style={{ marginLeft: 20 }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <Row fluid="true" style={showingClassesFor}>
            <br />
            <h4>
              Showing classes for: {subject} {semester} {campus} {level}
            </h4>
            <br />
          </Row>

          <Container fluid="true">
            {
              //console.log(dataArray)
            }
            <CardGroup>
              {dataArray.map(item => (
                <Row key={item.courseNumber} style={{ marin: 2 }}>
                  <Col style={{ margin: 2 }}>
                    <Card
                      style={{ width: "18rem", height: "18rem" }}
                      border={item.openSections ? "success" : "danger"}
                    >
                      <Card.Body>
                        <Card.Title
                          style={item.openSections ? {} : closedClass}
                        >
                          {item.title}
                        </Card.Title>
                        <Card.Text>
                          {item.subject}:{item.courseNumber}
                          <a
                            href={item.synopsisUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" Synopsis"}
                          </a>
                          <br />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))}
            </CardGroup>
          </Container>
        </div>
      )}
    </Container>
  );
}

export default ViewClasses;
