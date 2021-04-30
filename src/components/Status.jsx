import React, { useEffect, useState, memo } from "react";

const Status = ({ url }) => {
  const [state, setState] = useState();

  useEffect(async () => {
    const response = await fetch(url)
      .then((res) => res.json())
      .then((res) => res[0].state);
    setState(response);
  }, [url]);

  return <>{state ?? "..."}</>;
};

export default memo(Status);
