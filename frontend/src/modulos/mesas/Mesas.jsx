import React, { useState } from "react";
import axios from "axios";
import { fetchAxios, fetchData } from "../../servicio/axios";

const getData = async (url) => {
  const response = await axios.get(url).catch((err) => {});
  return response
  
};

const Mesas = () => {
  const [data, setData] = useState({ details: null });
  const [id, setId] = useState(0);
  // const handleClick = async () => {
  //   const response = fetchAxios('mesas')
  //     console.log(response);
  // };

  // axios
  //   .get("http://localhost:8000/api/mesas/")
  //   .then((res) => {
  //     setData({
  //       details: res.data,
  //     });
  //   })
  //   .catch((err) => {});

  console.log(data);
  return (
    <>
      <div>Mesas: {data[0]}</div>
      <button onClick={() =>handleClick()}>Click mesas</button>
    </>
  );
};

export default Mesas;
