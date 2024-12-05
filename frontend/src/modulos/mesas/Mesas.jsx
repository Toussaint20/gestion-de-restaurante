import React, { useEffect, useState } from "react";
import { get, put } from "../../servicio/axios";
import Card from "../../componentes/Card";
import Modalcomp from "../../componentes/Modal";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

const Mesas = () => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [listMenu, setListMenu] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState({
    id: null,
    numero_mesa: 0,
    capacidad: 0,
    estado: "",
    pedidoencurso: null,
  });

  const handleClose = () => (setShow(false), setListMenu([]));

  const handleShow = (mesa) => {
    setSelectedMesa(mesa);
    setShow(true);
  };

  const handleMesas = async () => {
    const response = await get("mesas/");
    setData(response);
  };

  const gestionarMesa = async (estado_mesa, pedidoencurso) => {
    const response = await put(`mesas/${selectedMesa.id}/`, {
      id: selectedMesa.id,
      numero_mesa: selectedMesa.numero_mesa,
      capacidad: selectedMesa.capacidad,
      estado: estado_mesa,
      pedidoencurso: pedidoencurso,
    });
    setListMenu([]);
    if (response.estado === estado_mesa) {
      handleMesas();
      setSelectedMesa({ ...selectedMesa, estado: estado_mesa });
    } else {
      console.log("Error: ", response);
    }
  };

  useEffect(() => {
    if (data === null) {
      handleMesas();
    }
  }, []);

  useEffect(() => {
    if (refresh) {
      handleMesas();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <>
      <Modalcomp
        show={show}
        handleClose={handleClose}
        data={selectedMesa}
        toDo={gestionarMesa}
        listMenu={listMenu}
        setListMenu={setListMenu}
        header={"Mesero: Tomás Cid"}
        setRefresh={setRefresh}
      />
      <Container>
        <Row>
          {data &&
            data.map((mesa) => (
              <Col md={4} className="mb-4" key={mesa.id}>
                <Card
                  text={`Capacidad: ${mesa.capacidad}`}
                  nombre={`Mesa: ${mesa.numero_mesa}`}
                  detalle={`Estado: ${mesa.estado}`}
                  button={
                    <Button variant="primary" onClick={() => handleShow(mesa)}>
                      Ver detalles
                    </Button>
                  }
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Mesas;
