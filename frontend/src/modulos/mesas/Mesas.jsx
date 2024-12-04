import React, { useEffect, useState } from "react";
import { get, post, put } from "../../servicio/axios";
import Card from "../../componentes/Card";
import Modalcomp from "../../componentes/Modal";
import Button from "react-bootstrap/esm/Button";

const mockMesas = [
  {
    id: 1,
    nombre: "Mesa 1",
    detalle: "Mesa para 4 personas",
  },
  {
    id: 2,
    nombre: "Mesa 2",
    detalle: "Mesa para 6 personas",
  },
  {
    id: 3,
    nombre: "Mesa 3",
    detalle: "Mesa para 2 personas",
  },
];

const Mesas = () => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  // const [selectedMesa, setSelectedMesa] = useState(null);
  const [selectedMesa, setSelectedMesa] = useState({
    id: null,
    numero_mesa: 0,
    capacidad: 0,
    estado: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (mesa) => {
    setSelectedMesa(mesa);
    setShow(true);
  };

  const handleMesas = async () => {
    const response = await get("mesas/");
    setData(response);
  };

  const desocuparMesa = async () => {
    const response = await put(`mesas/${selectedMesa.id}/`, {
      id: selectedMesa.id,
      numero_mesa: selectedMesa.numero_mesa,
      capacidad: selectedMesa.capacidad,
      estado: "disponible",
    });
    if (response.estado === "disponible") {
      handleMesas()
      setSelectedMesa(({...selectedMesa, estado: "disponible"}))
    } else {
      console.log("error: ", response)
    }
  };

  useEffect(() => {
    if (data === null) {
      handleMesas();
    }
  }, []);

  return (
    <>
      {/* <button onClick={() => handleClick()}>Click mesas</button> */}
      <Modalcomp show={show} handleClose={handleClose} data={selectedMesa} toDo={desocuparMesa} />
      {data &&
        data.map((mesa) => (
          <Card
            id={mesa.numero_mesa}
            nombre={mesa.capacidad}
            detalle={mesa.estado}
            button={
              <Button variant="primary" onClick={() => handleShow(mesa)}>
                Launch demo modal
              </Button>
            }
          />
        ))}
    </>
  );
};

export default Mesas;
