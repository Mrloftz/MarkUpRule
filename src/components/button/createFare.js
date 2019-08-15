import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'


class CreateFare extends React.Component {
    render() {
        return(
            <Link to="/fare">
                <Button style={{ float: 'right' }} type="primary">
                    Add Fare
                </Button>
            </Link>
        )
    }
}

export default CreateFare
