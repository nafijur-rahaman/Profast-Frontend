import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Companies from "../../components/Companies/Companies";
import Methodology from "../../components/Methodology/Methodology";
import Merchant from "../../components/Merchant/Merchant";
import HowItWorks from "../../components/HowItWorks/HowItWork";

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
