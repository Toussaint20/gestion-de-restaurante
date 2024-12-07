import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

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
      //logica para editar conectar con el backend
      console.log("Editando:", selectedItem);
    } else {
      // Aquí va ka logica para crear 
      console.log("Creando:", selectedItem);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    // aqui logica para eliminar (backend)
    console.log("Eliminando:", id);
  };

  useEffect(() => {
    // leche para simular
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
      <Button variant="primary" onClick={() => handleShow()}>
        Agregar Producto
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
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
            <tr key={item.id}>
              <td>{item.nombre_producto}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>{item.unidad_medida}</td>
              <td>{item.precio}</td>
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

      <Modal show={show} onHide={handleClose}>
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