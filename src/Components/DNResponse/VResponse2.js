import React from "react";
import VResponse3 from "./VResponse3";

const VResponse2 = props => {
  //console.log(props);
  //console.log(props.item);

  return (
    <div>
      {props.item.sets ? (
        props.item.sets.map(item => <VResponse3 key={item.id} item={item} />)
      ) : (
        <div>
          {props.item.courseSet ? (
            props.item.courseSet.map(item => (
              <VResponse3 key={item.id} item={item} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default VResponse2;
