import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { get } from "../../servicio/axios";

const Menu = ({listMenu, setListMenu}) => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  

  const addMenuItem = (menu) => {
    setListMenu((prevState) => [...prevState, menu]);    
  };

  const getMenu = async () => {
    const response = await get("menu/");
    setData(response);
  };

  useEffect(() => {
    if (data === null) {
      getMenu();
    }
  }, []);

  return (    
    <ListGroup as="ul">
      {data &&
        data.map((menu) => (
          <ListGroup.Item key={menu.id} action onClick={() => addMenuItem(menu)}>
            {menu.nombre_plato + " $" + menu.precio}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Menu;
