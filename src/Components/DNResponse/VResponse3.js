import React from "react";
import VResponseCourseSet from "./VResponseCourseSet";

const VResponse3 = props => {
  //console.log(props.item);

  return (
    <div>
      {props.item.code ? (
        <div>
          {props.item.code} {props.item.title}
        </div>
      ) : (
        <div>
          {props.item.courseSet ? (
            props.item.courseSet.map(item => (
              <VResponseCourseSet key={item.code} item={item} />
            ))
          ) : (
            <div>
              {props.item.courses ? (
                props.item.courses.map(item => (
                  <VResponseCourseSet key={item.code} item={item} />
                ))
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VResponse3;
