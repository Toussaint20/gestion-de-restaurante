import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState} from "react";

const Modalcomp = ({ show, handleClose, data, toDo }) => {  
  const [mesaDisponible, setMesaDisponible] = useState(false);

  useEffect(() => {
    setMesaDisponible(data?.estado === "disponible");
  }, [data]);

  return (
    <>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        {data && (
          <Modal.Body>
            La mesa {data.numero_mesa} se encuentra {data.estado}
          </Modal.Body>
        )}
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button> */}
          <Button
            variant="primary"
            onClick={!mesaDisponible ? () => toDo() : null}
          >
            {mesaDisponible ? "Asignar mesa" : "Desocupar mesa"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modalcomp;
