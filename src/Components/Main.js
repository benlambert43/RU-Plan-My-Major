import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import DegreeNavSheet from "./DegreeNavSheet";

function Main() {
  const [SearchMajor, setSearchMajor] = useState("computer");
  const [url, setURL] = useState("");
  const [data, setData] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState("");

  const setURLfunc = () => {
    setURL(
      "https://cors-anywhere.herokuapp.com/http://www.scarletscheduledesigner.com/search_degrees?q=" +
        SearchMajor
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

  //console.log(props.responseObject.tokenId);
  const containerStyle = {
    marginLeft: 10
  };

  const showingClassesFor = {
    color: "#5d5d5d",
    marginLeft: 22,
    marginBottom: 20
  };

  return (
    <Container fluid="true">
      <br />
      <Row style={containerStyle}>
        <h1>Plan My Major</h1>
      </Row>
      <br />
      {selectedMajor ? (
        <div></div>
      ) : (
        <div>
          <Row fluid="true" style={showingClassesFor}>
            <br />
            <h4>Select your major:</h4>
            {isError ? (
              <div>
                <br />
              </div>
            ) : (
              <div></div>
            )}
            <br />
          </Row>
          <Row style={containerStyle}>
            <Col>
              <Form.Control
                placeholder="Search Major"
                disabled={selectedMajor ? true : false}
                as="input"
                onChange={event => setSearchMajor(event.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={setURLfunc}>Search</Button>
            </Col>
          </Row>
          <br />
        </div>
      )}

      {isLoading ? (
        <div>
          {" "}
          <div style={{ marginLeft: 20 }}>
            <Spinner animation="border" />
          </div>
        </div>
      ) : (
        <div>
          {data.results && !selectedMajor ? (
            <Row style={showingClassesFor}>
              <div style={containerStyle}>
                {data.results.map(item => (
                  <div style={showingClassesFor} key={item.id}>
                    <Row>
                      <Col> {item.name}</Col>
                      <Button
                        size="sm"
                        style={{ marginLeft: 50 }}
                        onClick={() => setSelectedMajor(item)}
                      >
                        Select
                      </Button>
                    </Row>
                    <hr />
                  </div>
                ))}
              </div>
            </Row>
          ) : (
            <div></div>
          )}
          {selectedMajor ? (
            <div>
              <Row style={showingClassesFor}>
                <h4>
                  {selectedMajor.name} ({selectedMajor.id})
                </h4>
              </Row>
              <Row style={showingClassesFor}>Requirements:</Row>
              <Row style={containerStyle}>
                <DegreeNavSheet
                  props={selectedMajor}
                  style={showingClassesFor}
                />
              </Row>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </Container>
  );
}

export default Main;
