import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Inventario.css";

const Inventario = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedItem(null);
  };

  const handleShow = (item = null) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleSave = () => {
    if (selectedItem.id) {
      console.log("Editando:", selectedItem);
    } else {
      console.log("Creando:", selectedItem);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    console.log("Eliminando:", id);
  };

  useEffect(() => {
    setData([
      {
        id: 2,
        nombre_producto: "Leche",
        descripcion: "Leche descremada",
        cantidad: 20,
        unidad_medida: "litro",
        precio: 1500,
      },
    ]);
  }, []);

  return (
    <>
      <div className="container-inventario">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="link-button mb-3">
          Volver
        </Link>
        </div>
        <Button variant="success" onClick={() => handleShow()} className="mb-3">
          Agregar Producto
        </Button>
        <Table striped bordered hover responsive className="table-custom">
          <thead className="table-header">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="table-row">
                <td>{item.nombre_producto}</td>
                <td>{item.descripcion}</td>
                <td>{item.cantidad}</td>
                <td>{item.unidad_medida}</td>
                <td>${item.precio}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShow(item)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem ? "Editar Producto" : "Agregar Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.nombre_producto || ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    nombre_producto: e.target.value,
                  })
                }
                className="form-control-custom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedItem?.descripcion || ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    descripcion: e.target.value,
                  })
                }
                className="form-control-custom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={selectedItem?.cantidad || ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    cantidad: e.target.value,
                  })
                }
                className="form-control-custom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unidad</Form.Label>
              <Form.Select
                value={selectedItem?.unidad_medida || ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    unidad_medida: e.target.value,
                  })
                }
                className="form-control-custom"
              >
                <option value="">Seleccionar</option>
                <option value="kg">Kilogramo</option>
                <option value="litro">Litro</option>
                <option value="unidad">Unidad</option>
                <option value="gramo">Gramo</option>
                <option value="ml">Mililitro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={selectedItem?.precio || ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    precio: e.target.value,
                  })
                }
                className="form-control-custom"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Inventario;

