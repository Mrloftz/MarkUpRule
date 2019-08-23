import React from 'react'

import { HomeLayout } from '../../components/layout/home-layout';
import  MarkUpRuleComponent  from '../../components/markuprule/markuprulePage';


class MarkUpRulePage extends React.Component {
    render() {
        const params = this.props.match.params
        console.log(this.props)
        const { history } = this.props
        return(
            <HomeLayout>
            <MarkUpRuleComponent params={params} history={history}/>
            </HomeLayout>
     
        )
    }
}

export default MarkUpRulePage