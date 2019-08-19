import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'


class CreateMarkUpRule extends React.Component {
    render() {
        return(
            <Link to="/markuprule">
                <Button style={{ float: 'right' }} type="primary">
                    Add MarkUpRule
                </Button>
            </Link>
        )
    }
}

export default CreateMarkUpRule
