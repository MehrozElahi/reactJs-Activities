import React, { Fragment } from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default function ActivityFilters() {
    return(
        <Fragment>
        <Menu vertical size='large' style={{width: '100%'}}>
            <Header icon='filter' attached color='teal' content='Filters'/>
            <Menu.Item content='All Activities'></Menu.Item>
            <Menu.Item content="I'm going"></Menu.Item>
            <Menu.Item content="I'm Hosting"></Menu.Item>
        </Menu>
        <Header />
        </Fragment>
    )
}