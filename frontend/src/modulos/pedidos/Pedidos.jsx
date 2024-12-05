import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, ListGroup, Table } from "react-bootstrap";
import { post, put } from "../../servicio/axios";

const EMPLEADO = "97ea2b06-8682-4b0d-92f5-94153e7f258c";

const Pedidos = ({
  idMesa,
  listMenu,
  setListMenu,
  dataMesa,
  setPedidoEnCurso,
  setRefresh,
  handleClose,
}) => {
  const [listPedidos, setListPedidos] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const handleRemove = (index) => {
    setListMenu(listMenu.filter((list) => list !== listMenu[index]));
  };

  const handleCantidad = (value, index) => {
    const cantidad = isNaN(value) ? 0 : Number(value);
    const updList = listPedidos.map((p, i) => {
      if (i === index) {
        return { ...p, cantidad: cantidad };
      } else {
        return p;
      }
    });
    setListPedidos(updList);
  };

  const calculateTotal = () => {
    const total = listPedidos.reduce(
      (sum, pedido) => sum + pedido.cantidad * pedido.precio,
      0
    );
    setTotalPedido(total);
  };

  const handlePedido = async () => {
    const response = await post(`pedidos/`, {
      total: totalPedido,
      estado: "pendiente",
      mesa: idMesa,
      empleado: EMPLEADO,
    });
    handleDetallePedido(response.id);
    putMesaPedidoId(response.id);
  };

  const handleDetallePedido = async (idPedido) => {
    listPedidos.forEach(async (pedido) => {
      await post(`detalles_pedidos/`, {
        cantidad: pedido.cantidad,
        precio: pedido.cantidad * pedido.precio,
        pedido: idPedido,
        menu: pedido.id,
      });
    });
  };

  const putMesaPedidoId = async (idPedido) => {
    const response = await put(`mesas/${dataMesa.id}/`, {
      id: dataMesa.id,
      numero_mesa: dataMesa.numero_mesa,
      capacidad: dataMesa.capacidad,
      estado: dataMesa.estado_mesa,
      pedidoencurso: idPedido,
    });
    if (response !== undefined) {
      setPedidoEnCurso(true);
      setRefresh(true);
      handleClose();
    }
  };

  useEffect(() => {
    listPedidos && calculateTotal();
  }, [listPedidos]);

  useEffect(() => {
    const list = listMenu && listMenu.map((obj) => ({ ...obj, cantidad: 0 }));
    setListPedidos(list);
  }, [listMenu]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Precio u</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {listPedidos &&
            listPedidos.map((pedido, i) => (
              <tr key={i}>
                <td>{pedido.nombre_plato}</td>
                <td>{pedido.precio}</td>
                <td>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Cantidad"
                      value={pedido.cantidad}
                      onChange={(e) => handleCantidad(e.target.value, i)}
                    />
                  </InputGroup>
                </td>
                <td>{pedido.precio * pedido.cantidad}</td>
                <td>
                  <Button onClick={() => handleRemove(i)}>Quitar</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button
        variant="primary"
        disabled={totalPedido === 0}
        onClick={() => handlePedido()}
      >
        Realizar Pedido
      </Button>
    </>
  );
};

export default Pedidos;
