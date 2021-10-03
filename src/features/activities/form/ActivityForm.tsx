import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LaodingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer( function ActivityForm() {

    const {activityStore} = useStore();
    const { loadingInitial, loadActivity, createActivity,updateActivity,loading} = activityStore;
    
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [activity, setActivity] = useState({
      id: 0,
      title:'',
      category:'',
      description:'',
      date:'',
      city:'',
      venue:''
    });
    
    useEffect(() => {
      if(id) loadActivity(+id).then(activity=> setActivity(activity!))
    },[id,loadActivity]);

    function handleSubmit() {
      // if(activity)
      //  activity.id ? updateActivity(activity) : createActivity(activity)
      if(!activity.id) {
        
        createActivity(activity).then(()=>{
          history.push(`/activities/${activity.id}`)
        })
      } else {
        updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`))
      }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity,[name]:value})
    }

    if(loadingInitial) <LaodingComponent content='Loading Activity ...'/>
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder='Title' value={activity.title} name="title" onChange={handleInputChange}></Form.Input>
        <Form.TextArea placeholder='Description' value={activity.description} name="description" onChange={handleInputChange}></Form.TextArea>
        <Form.Input placeholder='Category' value={activity.category} name="category" onChange={handleInputChange}></Form.Input>
        <Form.Input type='date' placeholder='Date' value={activity.date} name="date" onChange={handleInputChange}></Form.Input>
        <Form.Input placeholder='City' value={activity.city} name="city" onChange={handleInputChange}></Form.Input>
        <Form.Input placeholder='Venue' value={activity.venue} name="venue" onChange={handleInputChange}></Form.Input>
        <Button loading={loading}  type="submit" positive floated='right'>Submit</Button>
        <Button as={Link} to='/activities' type="button" positive floated='right'>Cancel</Button>
      </Form>
    </Segment>
  );
})
