import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'


class CreateCriteria extends React.Component {
    render() {
        return(
            <Link to="/criteria">
                <Button style={{ float: 'right' }} type="primary">
                    Add Criteria
                </Button>
            </Link>
        )
    }
}

export default CreateCriteria
