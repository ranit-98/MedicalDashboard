import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createContact } from "../../API/Functions/Contact.API";
import Layout from "../../Layout/Layout";

const Contact = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await dispatch(createContact(data));
      return response.payload;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Submission failed. Please try again.");
    },
  });

  const onSubmitContact = (data) => {
    mutate(data);
  };

  return (
    <>
      <Layout>
        <div className="breadcrumbs overlay">
          <div className="container">
            <div className="bread-inner">
              <div className="row">
                <div className="col-12">
                  <h2>Contact Us</h2>
                  <ul className="bread-list">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <i className="icofont-simple-right"></i>
                    </li>
                    <li className="active">Contact Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="contact-us section">
          <div className="container">
            <div className="contact-info"></div>
            <div className="inner">
              <div className="row">
                <div className="col-lg-6">
                  <div className="contact-us-left">
                    <div id="myMap">
                      <div
                        className="single-info"
                        style={{ marginTop: "2rem" }}
                      >
                        <i className="icofont icofont-ui-call"></i>
                        <div className="content">
                          <h3>+(000) 1234 56789</h3>
                          <p>info@company.com</p>
                        </div>
                      </div>

                      <div
                        className="single-info"
                        style={{ marginTop: "2rem" }}
                      >
                        <i className="icofont-google-map"></i>
                        <div className="content">
                          <h3>2 Fire Brigade Road</h3>
                          <p>Chittagonj, Lakshmipur</p>
                        </div>
                      </div>

                      <div
                        className="single-info"
                        style={{ marginTop: "2rem" }}
                      >
                        <i className="icofont icofont-wall-clock"></i>
                        <div className="content">
                          <h3>Mon - Sat: 8am - 5pm</h3>
                          <p>Sunday Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="contact-us-form">
                    <h2>Contact With Us</h2>
                    <p>
                      If you have any questions please feel free to contact us.
                    </p>
                    <form
                      className="form"
                      onSubmit={handleSubmit(onSubmitContact)}
                    >
                      <div className="row">
                        {["name", "email", "phone", "topic", "msg"].map(
                          (field, index) => (
                            <div
                              className={`col-lg-${
                                field === "msg" ? "12" : "6"
                              }`}
                              key={index}
                            >
                              <div className="form-group">
                                {field !== "msg" ? (
                                  <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    placeholder={
                                      field.charAt(0).toUpperCase() +
                                      field.slice(1)
                                    }
                                    {...register(field, { required: true })}
                                  />
                                ) : (
                                  <textarea
                                    name={field}
                                    placeholder="Your Message"
                                    {...register(field, { required: true })}
                                  />
                                )}
                                {errors[field] && (
                                  <p>
                                    {field.charAt(0).toUpperCase() +
                                      field.slice(1)}{" "}
                                    is required
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        )}
                        <div className="col-12">
                          <div className="form-group login-btn">
                            <button className="btn" type="submit">
                              Send
                            </button>
                          </div>
                          <div className="checkbox">
                            <label
                              className="checkbox-inline"
                              htmlFor="newsletter"
                            >
                              <input
                                name="news"
                                id="newsletter"
                                type="checkbox"
                              />
                              Do you want to subscribe to our Newsletter?
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
