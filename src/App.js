
import './App.css';
import React, { Component } from 'react'
import Routes from "./routes";
import {theme} from "./theme";
import {ThemeProvider} from '@material-ui/core/styles';
import firebase from 'firebase';
export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
        initializing:true
    }

}

initFireBase=()=>{
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBK79xJE4ftf1BDh8K6GwfcM_UFA02XGQ8",
      authDomain: "todo-app-9b43a.firebaseapp.com",
      projectId: "todo-app-9b43a",
      storageBucket: "todo-app-9b43a.appspot.com",
      messagingSenderId: "47576153402",
      appId: "1:47576153402:web:52b7c08eb99e9e242f6403",
      measurementId: "G-P934L8XB5Q"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.setState({
        initializing:false
    })
};
componentDidMount() {
    this.initFireBase();
}
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes/>
        </ThemeProvider>
      </div>
    )
  }
}

