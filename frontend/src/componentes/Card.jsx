import "./Componentes.css";

const Card = ({ text, nombre, detalle, button }) => {
  return (
    <div class="card">
      {/* <img class="card-img-top" src="..." alt="Card image cap" /> */}
      <div class="card-body">
        <h5 class="card-title">
          {nombre}
        </h5>
        <p class="card-text">{text}</p>        
        <p class="card-text">{detalle}</p>        
        {button}
        {/* <button onClick={toDo} /> */}
      </div>
    </div>
  );
};

export default Card;
