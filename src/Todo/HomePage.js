
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

//import db from './firebase.config';

export default function HomePage() {



    const [todo, setTodo] = useState({ title: "", task: "" });
    const [todoDate, onChange] = useState(new Date());
    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [fetchResult, setfetchResult] = useState();
    const [loading, isLoading] = useState(true);


    useEffect(() => {
        getTodo().then(function (data) {
            setfetchResult(data);
            console.log(data);
            isLoading(false)
        });
        console.log("Call one time")
    }, [isSaving]);

    const getTodo = async () => {
        const firestore = firebase.firestore();
        const snapshot = await firestore.collection('todo-list').get();
        return snapshot.docs.map(doc => doc.data());

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
                    style={{ width: '40vw', height: '75vh', overflow: 'auto' }}>

                    {loading?<div>Loading</div>:
                        <List>
                        {fetchResult.map((item) =>
                            <ListItem >

                                <ListItemText primary={item.title} secondary={item.task} />
                                <ListItemSecondaryAction>

                                </ListItemSecondaryAction>
                            </ListItem>

                        )}
                    </List>}

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



