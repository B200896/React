    function About_product(props) {
  return (
    <>
      <div className="team-box">
        <div className="team-box-image">
          <img src={props.image} alt="" />
          <div className="icon-box">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-linkedin-in"></i>
          <i class="fa-brands fa-behance"></i>
          </div>
        </div>
        <div className="team-box-content">
          <h3>{props.name}</h3>
          <p className="co">{props.post}</p>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  );
}

export default About_product;
