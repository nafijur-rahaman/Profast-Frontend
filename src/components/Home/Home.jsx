import React from 'react';
import Hero from '../Hero/Hero';
import HowItWorks from '../HowItWorks/HowItWork';
import Services from '../Services/Services';
import Companies from '../Companies/Companies';
import Methodology from '../methodology/Methodology';
import Merchant from '../Merchant/Merchant';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Companies></Companies>
            <Methodology></Methodology>
            <Merchant></Merchant>
        </div>
    );
};

export default Home;