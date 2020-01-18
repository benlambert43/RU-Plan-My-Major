import React from "react";

const VResponseCourseSet = props => {
  //const str = props.item.code;
  //const strArr = str.split(":");
  //const coreCode = strArr[1];

  //console.log(coreCode);
  return (
    <div>
      {props.item.code} {props.item.title}
    </div>
  );
};

export default VResponseCourseSet;
