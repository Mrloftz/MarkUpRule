import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import FarePage from '../pages/fare/fare';
import CriteriaPage from '../pages/criteria/criteria';
import HomePage from '../pages/home/home';
import { CriteriaComponent } from '../components/criteria/criteriaPage';


const Routing = () => {
    return (
        <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/fare" component={FarePage} />
        <Route exact path="/fare/:id" component={FarePage} />
        <Route exact path="/criteria" component={CriteriaPage} />
        <Route exact path="/criteria/:id" component={CriteriaComponent} />
        {/* <Route exact path="/markuprule" component={} />
        <Route exact path="/markuprule/:id" component={} /> */}
        </BrowserRouter>
    )
}

export default Routing