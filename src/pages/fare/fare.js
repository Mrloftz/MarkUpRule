import React from 'react'
import EditableTable from '../../components/fare/farePage';
import { HomeLayout } from '../../components/layout/home-layout';


class FarePage extends React.Component {
    render() {
        return(
            <HomeLayout>
            <EditableTable />
            </HomeLayout>
     
        )
    }
}

export default FarePage