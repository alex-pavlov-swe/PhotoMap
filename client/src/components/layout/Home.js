import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Home() {
  return (
    <Fragment>
      <div id="homeImage">
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <span>
              <h1>Photomap</h1>
              <h4>
                Find the exact locations where amazing photos have been taken
              </h4>
              <div className="btn btn-light mt-3">Join for free</div>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Home;
