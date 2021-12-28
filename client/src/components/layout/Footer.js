import React from 'react';
import { connect } from 'react-redux';

function Footer({ lang: { lang }, positionClass }) {
    let currentDate = new Date();
    let year = currentDate.getFullYear();

    return (
        <footer className={`${positionClass} text-center bg-dark`} id="footer">
            {/* <p>Photomap, {year}</p> */}
            <span className="social-wrapper">
                <i class="fab fa-youtube"></i>
                <i class="fab fa-linkedin-in"></i>
                <i class="fab fa-medium"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
            </span>
        </footer>
    );
}

const mapStateToProps = (state) => ({
    lang: state.lang,
});

export default connect(mapStateToProps)(Footer);
