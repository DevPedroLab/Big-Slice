import { useState, useEffect } from "react";
import { data } from "./data.tsx";

export const TypingEffect = ({ text = "Hello, World!", speed = 90 }) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    };
  }, [index, text, speed]);

  return (
    <>
      {displayed}
      {index < text.length && <span className="cursor">_</span>}
    </>
  );
};

export const copyright_text = () => {
    const year = new Date().getFullYear();

    return (
        <p className="copyright">&#169; {year} Big Slice. All copyrights reserved.</p>
    );
};

export const icon_container_generator = (social = "instagram") => {
    return (
        <div className="icon-container">
            <span aria-label={`Big Slice ${social}`} className={`fa-brands fa-${social}`}></span>
        </div>
    );
};

export const social_media_container = () => {
    return (
        <div className="social-media-container">
            {icon_container_generator("instagram")}
            {icon_container_generator("facebook")}
            {icon_container_generator("youtube")}
        </div>
    );
};

export const product_generator = (length?: number, isDesktop?: boolean) => {
  const products = data.products;
  const productKeys = Object.keys(products).filter(key => key !== "popular_choice");
  
  const popularKey = data.products.popular_choice.toString();
  const otherKeys = productKeys.filter(key => key !== popularKey);
  
  for (let i = otherKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherKeys[i], otherKeys[j]] = [otherKeys[j], otherKeys[i]];
  };
  
  const allSelectedKeys = [popularKey, ...otherKeys];
  const totalProducts = allSelectedKeys.length;
  
  let displayCount = 3;

  if (isDesktop && length && length > 0) {
        displayCount = length % 3 === 0 ? length : 6;
  };

  displayCount = Math.min(displayCount, totalProducts);
  
  const finalKeys = allSelectedKeys.slice(0, displayCount);
  
  return (
    <>
      <div className={`product-container ${displayCount % 3 === 0 ? "desktop-grid" : "mobile-grid"}`}>
        {finalKeys.map(key => {
          const product = products[key as keyof typeof products];
          if (typeof product === "object" && "name" in product) {
            const isPopular = data.products.popular_choice === parseInt(key, 10);
            
            return (
              <div className="product-item" key={key}>
                <img src={product.image} alt={product.name} className="product-view" />
                <h1 className={`product-title ${isPopular ? "popular-product" : ""}`}>
                  {product.name}
                  {isPopular && <span className="fa-solid fa-fire fa-beat"></span>}
                </h1>
                <p className="product-description">{product.description}</p>
                <div className="price-and-button-container">
                  <p className="product-price">{product.price.toFixed(2)}$</p>
                  <button onClick={() => {
                        alert(`🍕 Big Slice - Portfolio Project\n\nThis is a fictional website created for portfolio purposes.\n\nThe register/order feature is not available in this demo.\n\nThank you for your interest!`)
                    }} className="order">Order Now</button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export const Header = () => {
    const [state, setState] = useState(false);

    const handleScrollTo = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        };

        setState(false);
    };

    return (
        <>
            <header className="header">
                <img src="/src/assets/Big-Slice-Logo-White-Yellow.png" alt="Big Slice Logo" />
                <span onClick={() => setState(!state)} className="fa-solid fa-bars open-sidebar"></span>
            </header>
            <div 
                style={{ transform: !state ? "translateY(-25vh)" : "translateY(0)" }} 
                className="sidebar"
            >
                <div className="nav-links">
                    <a onClick={() => handleScrollTo("home")}>Home <span aria-hidden="true" className="fa-solid fa-home"></span></a>
                    <a onClick={() => handleScrollTo("menu")}>Menu <span aria-hidden="true" className="fa-solid fa-pizza-slice"></span></a>
                    <a onClick={() => handleScrollTo("about")}>About <span aria-hidden="true" className="fa-solid fa-info-circle"></span></a>
                    <a onClick={() => handleScrollTo("about")}>Contact <span aria-hidden="true" className="fa-solid fa-phone"></span></a>
                </div>
            </div>
        </>
    );
};

export const Footer = () => {
    const handleScrollTo = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        };
    };

    return (
       <footer className="contact">
        <img src="/src/assets/Big-Slice-Logo-White.png" alt="Big Slice Logo" />
        <p className="description">{data.text_data.paragraphs[4]}</p>
        <h2 className="header-title">Fast Links</h2>
        <div className="nav-links">
          <a onClick={() => handleScrollTo("home")}>Home</a>
          <a onClick={() => handleScrollTo("menu")}>Menu</a>
          <a onClick={() => handleScrollTo("about")}>About</a>
          <a onClick={() => handleScrollTo("about")}>Contact</a>
        </div>
        <h2 className="header-title">Follow Us</h2>
        {social_media_container()}
        <hr />
        {copyright_text()}
      </footer>
    );
};