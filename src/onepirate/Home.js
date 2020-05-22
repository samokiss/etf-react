import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import AppFooter from './modules/views/AppFooter';
import Menu from "./modules/views/Menu";
import Services from "./modules/views/Services";
import MoralValues from "./modules/views/MoralValues";
import Members from "./modules/views/Members";
import HowItWorks from "./modules/views/HowItWorks";
import ContactForm from "./modules/views/ContactForm";
import Hero from "./modules/views/Hero";

function Index () {
    return (<React.Fragment>
        <Menu/>
        <Hero />
        <Services/>
        <Members/>
        <MoralValues/>
        <HowItWorks/>
        <ContactForm/>
        <AppFooter/>
    </React.Fragment>);
}

export default withRoot(Index);
