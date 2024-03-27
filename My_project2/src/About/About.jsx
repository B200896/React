import Image from "../Image";
import "./About.css";
import data from "./About_data.json";
import About_product from "./About_product";

function About() {
  return (
    <>
      <Image title="our company" />

      <div className="our-team">
        <h2>Our Team Members</h2>
        <div className="our-team-box">
          {data.map((item) => (
             <About_product image = {item.image}  name = {item.name} post = {item.post} description = {item.description}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default About;
