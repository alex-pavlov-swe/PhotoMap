import React from 'react';
import { connect } from 'react-redux';

function Footer({ lang: { lang } }) {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  return (
    <footer className="text-center bg-dark" id="footer">
      <p>Photomap, {year}</p>
    </footer>
  );
}

const mapStateToProps = (state) => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(Footer);
