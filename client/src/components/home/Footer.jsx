import React from "react";
import styled from 'styled-components';


function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
        <div>
          <h3 className="font-bold mb-2">PRODUCTS</h3>
          <ul className="space-y-1">
            <li>Footwear</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Outlet-Sale</li>
            <li>New Arrivals</li>
            <li>Flat 50% Off!</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Sports</h3>
          <ul className="space-y-1">
            <li>Cricket</li>
            <li>Running</li>
            <li>Football</li>
            <li>Gym/Training</li>
            <li>Tennis</li>
            <li>Hiking & Outdoor</li>
            <li>Basketball</li>
            <li>Swimming</li>
            <li>Skateboarding</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">COLLECTIONS</h3>
          <ul className="space-y-1">
            <li>Ultraboost</li>
            <li>Superstar</li>
            <li>NMD</li>
            <li>Stan Smith</li>
            <li>Sustainability</li>
            <li>Predator</li>
            <li>Parley</li>
            <li>Adicolor</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">SUPPORT</h3>
          <ul className="space-y-1">
            <li>Help</li>
            <li>UNiDAYS</li>
            <li>Customer Services</li>
            <li>Returns & Exchanges</li>
            <li>Shipping</li>
            <li>Order Tracker</li>
            <li>Store Finder</li>
            <li>adiClub</li>
            <li>adiclub Terms and conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">COMPANY INFO</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>adidas stories</li>
            <li>adidas Apps</li>
            <li>Entity Details</li>
            <li>Press</li>
            <li>Careers</li>
          </ul>
          <h3 className="font-bold mt-6 mb-2">FOLLOW US</h3>
          <div className="text-2xl">
            <StyledWrapper>
              <div className="card">
                <a href="#" className="socialContainer containerOne">
                  <svg className="socialSvg instagramSvg" viewBox="0 0 16 16">
                    {" "}
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />{" "}
                  </svg>
                </a>
                <a href="#" className="socialContainer containerTwo">
                  <svg className="socialSvg twitterSvg" viewBox="0 0 16 16">
                    {" "}
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />{" "}
                  </svg>{" "}
                </a>
                <a href="#" className="socialContainer containerThree">
                  <svg className="socialSvg linkdinSvg" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
                <a href="#" className="socialContainer containerFour">
                  <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                    {" "}
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />{" "}
                  </svg>
                </a>
              </div>
            </StyledWrapper>
          </div>{" "}
          {/* Instagram Icon placeholder */}
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2">
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Terms and Conditions</span>
          <span>|</span>
          <span>Cookies</span>
        </div>
        <p className="text-gray-400">
          &copy; {year} adidas India Marketing Pvt. Ltd
        </p>
      </div>
    </footer>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: fit-content;
    height: fit-content;
    background-color: rgb(238, 238, 238);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 25px;
    gap: 20px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);
  }

  /* for all social containers*/
  .socialContainer {
    width: 52px;
    height: 52px;
    background-color: rgb(44, 44, 44);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition-duration: .3s;
  }
  /* instagram*/
  .containerOne:hover {
    background-color: #d62976;
    transition-duration: .3s;
  }
  /* twitter*/
  .containerTwo:hover {
    background-color: #00acee;
    transition-duration: .3s;
  }
  /* linkdin*/
  .containerThree:hover {
    background-color: #0072b1;
    transition-duration: .3s;
  }
  /* Whatsapp*/
  .containerFour:hover {
    background-color: #128C7E;
    transition-duration: .3s;
  }

  .socialContainer:active {
    transform: scale(0.9);
    transition-duration: .3s;
  }

  .socialSvg {
    width: 17px;
  }

  .socialSvg path {
    fill: rgb(255, 255, 255);
  }

  .socialContainer:hover .socialSvg {
    animation: slide-in-top 0.3s both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }`;

export default Footer;
