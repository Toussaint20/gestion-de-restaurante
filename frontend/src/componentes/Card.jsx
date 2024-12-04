const Card = ({ id, nombre, detalle, button }) => {
  return (
    <div class="card">
      <img class="card-img-top" src="..." alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">
          {nombre} {id}
        </h5>
        <p class="card-text">{detalle}</p>
        <a href="#" class="btn btn-primary">
          Go mesa {id}
        </a>        
        {button}
        {/* <button onClick={toDo} /> */}
      </div>
    </div>
  );
};

export default Card;
