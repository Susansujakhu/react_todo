
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import firebase from "firebase";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import { List } from '@material-ui/core';
//import db from './firebase.config';

export default function HomePage() {
    


    const [todo, setTodo] = useState({ title: "", task: "" });
    const [todoDate, onChange] = useState(new Date());
    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [fetchResult,setfetchResult]=useState([]);

  
    useEffect(() => {
        getTodo()
       console.log("Call one time")
    }, [true]);

    const getTodo=async()=>  {
        const firestore = firebase.firestore();
        var result = firestore.collection("todo-list").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setfetchResult(fetchResult => doc.data());
                //console.log(fetchResult);
            }); console.log(fetchResult);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        // const firestore = firebase.firestore();
        // const response =  firestore.collection('todo-list');
        // const data=await response.get();
 
        
        // data.docs.forEach(item=>{
        //     setfetchResult([...fetchResult,item.data()])
        //    })
           
        //return snapshot.docs.map(doc => doc);
    }

    function handleChange(event) {
        todo[event.target.id] = event.target.value
        setTodo({ ...todo, todo });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSave = () => {

        setIsSaving(true);

        const firestore = firebase.firestore();
        firestore.collection("todo-list").add({
            createdDate: new Date(),
            TodoDate: todoDate,
            title: todo.title,
            task: todo.task
        }).then(function (response) {
            setTodo({ title: "", task: "" })
            setOpen(true);
            setIsSaving(false);
        }).catch(function (error) {
            setIsSaving(false);
        })
    }

    return (
        <div>
            <div>
                <h2>This is ToDo App</h2>
                
            </div>
            
            <Grid container>
                <Box boxShadow={10}
                    bgcolor="background.paper"
                    m={4}
                    p={2}
                    style={{ width: '40vw', height: '75vh', overflow:'auto' }}>
                    
                    
                    
                    <Card>

                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
        </Button>
                            <Button size="small" color="primary">
                                Learn More
        </Button>
                        </CardActions>
                    </Card>

                </Box>

                <Box boxShadow={10}
                    bgcolor="background.paper"
                    m={4}
                    p={2}
                    style={{ width: '40vw', height: '75vh' }}>
                    <center>
                        <Calendar
                            onChange={onChange}
                            value={todoDate}

                        />
                    </center>
                    <TextField
                        style={{ width: '36vw', padding: 35, paddingBottom: 1 }}
                        id="title"
                        placeholder="Title"
                        multiline
                        rows={1}
                        onChange={handleChange}
                        value={todo.title}
                        variant="outlined"
                        disabled={isSaving}
                    />

                    <TextField
                        style={{ width: '36vw', padding: 35, paddingTop: 10 }}
                        id="task"
                        placeholder="Enter Your Task"
                        multiline
                        rows={3}
                        onChange={handleChange}
                        value={todo.task}
                        variant="outlined"
                        disabled={isSaving}
                    />

                    <Button onClick={handleSave} disabled={isSaving} variant="contained" color="primary" style={{ float: 'right', marginRight: 20, marginTop: -20 }}>
                        Save
                        </Button>

                </Box>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Todo Successfully Added
        </Alert>
            </Snackbar>
        </div>
    )
}



