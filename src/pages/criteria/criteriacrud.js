import React from 'react'
import { CriteriaComponent } from '../../components/criteria/criteriaPage';


class CriteriaCRUD extends React.Component {
    render() {
        const params = this.props.match.params

        const { history } = this.props

        return (
            <CriteriaComponent params={params} history={history} />
        )
    }
}

export default CriteriaCRUD