import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
    activity:Activity
}
export default function ActivityListItem({activity}:Props) {

    const [target, setTarget] = useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id:number){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    const {activityStore} = useStore();
    const{activitiesByDate,deleteActivity, loading} = activityStore;

    
    return(
        <Item key={activity.id}>
        <Item.Content>
            <Item.Header as='a'>{activity.title} </Item.Header>
            <Item.Meta> {activity.date}</Item.Meta>
            <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
            </Item.Description>
            <Item.Extra>
                {/* <Button onClick={()=> activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' /> */}
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                <Button 
                loading={loading && target=== (activity.id).toString()} 
                onClick={(e)=>handleActivityDelete(e,activity.id)} 
                floated='right' 
                content='Delete'
                 color='red' />
                <Label basic content={activity.category} ></Label>
            </Item.Extra>
        </Item.Content>
    </Item>
    )
}