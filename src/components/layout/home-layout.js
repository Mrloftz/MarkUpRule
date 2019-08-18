import React from 'react'
import SideNav from '../sideNav/sideNav'
import Header from '../header/header'

export const HomeLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <SideNav {...props}/>
  
        </React.Fragment>
    )
}