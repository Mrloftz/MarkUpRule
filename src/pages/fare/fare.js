import React from 'react'
import FareComponent  from '../../components/fare/farePage';
import { HomeLayout } from '../../components/layout/home-layout';


class FarePage extends React.Component {
    render() {
      const params = this.props.match.params.id
      console.log(this.props)
      const {history} = this.props
        return(
            <HomeLayout>
            <FareComponent params={params} history={history} />
            </HomeLayout>
     
        )
    }
}

export default FarePage