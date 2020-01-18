import React from "react";
import VResponse2 from "./VResponse2";

const VResponse = props => {
  //console.log(props);
  return (
    <div>
      <h3>{props.item.name}</h3>
      {props.item.requirementSets ? (
        props.item.requirementSets.map(item => (
          <VResponse2 key={item.id} item={item} />
        ))
      ) : (
        <div>
          {props.item.sets ? (
            props.item.sets.map(item => (
              <VResponse2 key={item.id} item={item} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
      <hr />
    </div>
  );
};

export default VResponse;
