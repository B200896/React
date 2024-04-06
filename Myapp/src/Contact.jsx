import './Contact.css'
function Contact()
{
    return(
        <div className="contact">
    <div className="contact-image">
        <img src='https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/contact-heading.jpg'
            alt=""/>
    </div>
    <div className="contact-heading">
        <h4>Contact Us</h4>
        <h2>let's get in touch</h2>
    </div>
    <div className="location">
        <h2>Our Location On Maps</h2>
        <hr/>
    </div>
    <div className="map">
        <div className="left">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSExixGEWEWgwnTX5_5oR2yVAS_GksUT8mUZQ&s"
                alt=""/>
        </div>
        <div className="right">
            <h4>About our office</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus iure quis magni omnis repellat quaerat
                at aspernatur quod. Provident veritatis ab facilis voluptatibus doloremque cumque dolores sapiente,
                placeat ipsum debitis! Ipsam consectetur fugiat sint aliquam vero ullam similique, esse odio!</p>
        </div>
    </div>
    <div className="message">
        <h2>Send us a Message</h2>
        <hr/>
    </div>
    <div className="contact-form">
        <div className="form">
            <div className="form-1">
                <fieldset>
                    {/* <!-- <label for=""></label --> */}
                    <input type="text" name="" placeholder="Full Name"/>
                </fieldset>
            </div>
            <div className="form-1">
                <fieldset>
                    <label for=""></label>
                    <input type="text" name="" placeholder="E-mail Address"/>
                </fieldset>
            </div>
            <div className="form-1">
                <fieldset>
                    <label for=""></label>
                    <input type="text" name="" placeholder="Subject"/>
                </fieldset>
            </div>
            <div className="form-1">
                <fieldset>
                    <label for=""></label>
                    <input type="text" name="username" placeholder="Your Message"/>
                </fieldset>
            </div>
            <button>Send Message</button>
        </div>
        <div className="accordian">
            <h3>Accordian title one</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum excepturi eum aperiam? Fugit aperiam
                autem officiis nihil voluptatem de c enim odit, esse amet, rem
                ab. Eos fugit maxime minus necessitati, est ci, aliquam animi dolor facere!
                Natus dolorem modi ipsa libero iusto magnam?Lore enim at quibusdam dolor eaque maxime mollitia
                commodi blanditiis.</p>
            <div className="accordian-title">
                <h2>Second Title Here</h2>
                <h2>Accordian Title Three</h2>
                <h2>Fourth Accordian Title</h2>
            </div>
        </div>
    </div>
    <div className="accordian-head">
        <h2>Our Happy Customers</h2>
        <hr/>
    </div>
    <div className="accordian-content">
        <div className="image">
            <img src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/client-01.png"
                alt=""/>
        </div>
        <div className="image">
            <img src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/client-01.png"
                alt=""/>
        </div>
        <div className="image">
            <img src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/client-01.png"
                alt=""/>
        </div>
        <div className="image">
            <img src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/client-01.png"
                alt=""/>
        </div>
        <div className="image">
            <img src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/client-01.png"
                alt=""/>
        </div>
    </div>       
    
    <div className="accordian-footer">
        <p>Copyright © 2020 Sixteen Clothing Co., Ltd.
        </p>
    </div>
</div>

    )
}
export default Contact;