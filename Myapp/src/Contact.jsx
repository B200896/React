import "./Contact.css";
function Contact() {
  return (
    <div className="contact">
      <div className="contact-image">
        <img
          src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/contact-heading.jpg"
          alt=""
        />
      </div>
      <div className="contact-heading">
        <h4>Contact Us</h4>
        <h2>let's get in touch</h2>
      </div>

      <div className="location">
        <h1 className="h1">Our Location on Maps</h1>
        <div className="inner-location">
            <div className="left-location">
                <img src="https://images.unsplash.com/photo-1586449480558-33ae22ffc60d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div className="right-location">
                <h3 className="h3">About our office</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisic elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti.</p>
                <div className="location-icon">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-linkedin-in"></i>
                <i class="fa-brands fa-behance"></i>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
