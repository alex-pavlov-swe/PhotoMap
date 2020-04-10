import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const val = React.useRef();

  useEffect(() => {
    document.getElementById('footer').style.position = 'absolute';
    val.current = document.getElementById('footer').style.position;
  });

  useEffect(() => {
    return () => {
      document.getElementById('footer').style.position = 'relative';
    };
  });

  return (
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
  );
}

export default Home;
