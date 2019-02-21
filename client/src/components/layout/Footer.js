import React from "react";
function Footer() {
  return (
    <footer className="bg-dark text-white pt-3">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            Developed by:{" "}
            <a
              href="https://www.linkedin.com/in/mina-ramsis-81b94616a/"
              target="_blank"
              className="devLink"
            >
              Mina Ramsis
            </a>
          </div>
          <div className="col">
            <p className="text-center">Copyright &copy; 2019 Dev Connector</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
