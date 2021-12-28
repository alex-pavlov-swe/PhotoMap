import React from 'react';
import Footer from '../layout/Footer';

function AboutPage() {
    return (
        <React.Fragment>
            <div className="about-wrapper">
                <h1>Project Overview</h1>
                <h3>Introduction</h3>
            </div>
            <Footer positionClass={'relative'}/>
        </React.Fragment>
    )
}

export default AboutPage
