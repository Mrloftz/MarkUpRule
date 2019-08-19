import React from 'react'
import FareComponent from '../../components/fare/farePage';
import { HomeLayout } from '../../components/layout/home-layout';


class FarePage extends React.Component {
    render() {
        // const params = this.props.match.params
        console.log(this.props)
        // console.log(this.props)params={params}
        return(
            <HomeLayout>
            <FareComponent />
            </HomeLayout>
     
        )
    }
}

export default FarePage