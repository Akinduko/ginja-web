import React from 'react';
import logo from '+assets/img/canada.jpeg';

const Document = () => {
  return (
    <main className="container">
      <header>
        <img src={logo} alt="canada.jpeg" height="50px" width="50px" />
        <span>
          Employment and <br /> Social Development Canada
        </span>
        <span>
          Emploi et <br /> Development social Canada
        </span>
        <span>
          Please Print <br /> PROTECTED WHEN COMPLETED
        </span>
      </header>
    </main>
  );
};

export default Document;
