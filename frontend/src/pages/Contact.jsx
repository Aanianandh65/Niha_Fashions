import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact-page">

      <div className="container">

        <div className="section-heading text-center">
          <p className="section-eyebrow">GET IN TOUCH</p>

          <h1>Contact Us</h1>

          <p>
            We'd love to hear from you. Send us a message
            and our team will get back to you.
          </p>
        </div>

        <div className="row g-5 mt-4">

          <div className="col-lg-5">

            <div className="contact-info">

              <div className="contact-info-item">
                <i className="bi bi-envelope"></i>

                <div>
                  <h5>Email</h5>
                  <p>support@NIHA.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="bi bi-telephone"></i>

                <div>
                  <h5>Phone</h5>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="bi bi-clock"></i>

                <div>
                  <h5>Working Hours</h5>
                  <p>Mon – Sat, 9:00 AM – 6:00 PM</p>
                </div>
              </div>

            </div>

          </div>

          <div className="col-lg-7">

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="row g-3">

                <div className="col-md-6">
                  <label>Your Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label>Subject</label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label>Message</label>

                  <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn NIHA-btn"
                  >
                    Send Message
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;