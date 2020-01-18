import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import VResponse from "./DNResponse/VResponse";

const DegreeNavSheet = props => {
  //console.log(props.props.name);
  //console.log(props.props.id);

  const [degreeNav, setDegreeNav] = useState({ results: [] });
  const [url] = useState(
    "http://www.scarletscheduledesigner.com/get_degree_json?q=" + props.props.id
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const showingClassesFor = {
    color: "black",
    marginLeft: 12,
    marginBottom: 20
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setDegreeNav(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  //console.log(RequirementsArray);

  return (
    <div>
      {isLoading || degreeNav.results.requirements === null ? (
        <div style={{ marginLeft: 20 }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div style={showingClassesFor}>
          {degreeNav.results.requirements ? (
            degreeNav.results.requirements.map(item => (
              <VResponse key={item.name} item={item} />
            ))
          ) : (
            <Spinner />
          )}
          {isError ? <div>An error occured. Please Refresh.</div> : <div></div>}
        </div>
      )}
    </div>
  );
};
export default DegreeNavSheet;
