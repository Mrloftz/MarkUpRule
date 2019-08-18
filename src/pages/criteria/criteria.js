import React from 'react'
import { CriteriaComponent } from '../../components/criteria/criteriaPage';
import { HomeLayout } from '../../components/layout/home-layout';

class CriteriaPage extends React.Component {
    render() {
        const params = this.props.match.params
        console.log(params)
        return(
            <HomeLayout>
                <CriteriaComponent params={params} />
            </HomeLayout>
            
        )
    }
}

export default CriteriaPage