

function About(props) {
  console.log(props);
  return (
    <>
      <div className="container-about">
        <h1>About Sixteen Clothing</h1>
        <div className="inner-about">
          <div className="inner-about-box">
            <p>{props.title}</p>
            <p>{props.description}</p>
            <ul>
              {props.list.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div className="inner-about-box">
            <img
              src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/feature-image.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
