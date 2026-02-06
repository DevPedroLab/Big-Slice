import { Header, Footer, TypingEffect, product_generator } from "./components.tsx";
import { data } from "./data.tsx";
import { useState, useEffect } from "react";

const App = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
      const checkScreen = () => {
        setIsDesktop(window.innerWidth >= 1200);
      };

      checkScreen();
      window.removeEventListener("resize", checkScreen);

      return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <Header />
      
      <main id="home" className="main">
        <h1 className="header-title">
          <TypingEffect text={data.text_data.titles[1]} />
        </h1>
        <p className="description">{data.text_data.paragraphs[1]}</p>
        <button 
        onClick={() => {
          const menuSection = document.getElementById("menu");
          if (menuSection) {
            menuSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          };
        }}
        className="menu">See Menu</button>
        <button onClick={() => {
          alert(`🍕 Big Slice - Portfolio Project\n\nThis is a fictional website created for portfolio purposes.\n\nThe register/order feature is not available in this demo.\n\nThank you for your interest!`)
        }} className="order">Order Pizza</button>
      </main>
      
      <section id="menu" className="options">
        <h1 className="header-title">Our Menu <span className="fa-solid fa-pizza-slice"></span></h1>
        <p className="description">{data.text_data.paragraphs[2]}</p>
        <div className="product-container">
           {product_generator(7, isDesktop)}
        </div>
        <p className="description prd">...And much more! See more registering into our website. <a onClick={() => {
          alert(`🍕 Big Slice - Portfolio Project\n\nThis is a fictional website created for portfolio purposes.\n\nThe register/order feature is not available in this demo.\n\nThank you for your interest!`)
        }} className="register-link" href="#">Register</a></p>
      </section>
      
      <section id="about" className="about">
        <h1 className="header-title">About</h1>
        <p className="header-subtitle">{data.text_data.paragraphs[3]}</p>
        <div className="father-info-container">
          <div className="info-container">
            <div className="icon-container">
              <span aria-hidden="true" className="fa-solid fa-clock"></span>
            </div>
            <h1 className="info-title">Opening Hours</h1>
            <p className="description">5:30PM - 11:30PM</p>
          </div>
          <div className="info-container">
            <div className="icon-container">
              <span aria-hidden="true" className="fa-solid fa-location-dot"></span>
            </div>
            <h1 className="info-title">Location Address</h1>
            <p className="description">Pizza Ave. 123, CA.</p>
          </div>
          <div className="info-container">
            <div className="icon-container">
              <span aria-hidden="true" className="fa-solid fa-phone"></span>
            </div>
            <h1 className="info-title">Contact</h1>
            <p className="description">(10) 98765-4321</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default App;