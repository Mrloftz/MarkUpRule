import React, { Component } from 'react'

export default class CreateCriteria extends Component {
    render() {
        return (
            <div>
                <h3>Criteria</h3>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div  className="form-group">
                    <label>Destinatios</label>
                    <input type="text" className="form-control"/>   
                    </div>
                </form>
            </div>
        )
    }
}