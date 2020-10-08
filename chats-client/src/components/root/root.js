import React from "react";

const RootPage = (props) => {
  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    console.log(token);
    if (!token) {
      props.history.push("/signin");
    } else {
      props.history.push("/home");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default RootPage;