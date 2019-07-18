import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/Auth';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MenuBar from './components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthRoute from './util/AuthRoute';  // redirecting to the hompe page when login 
import SinglePost from './Pages/SinglePost';



function App() {
  return (
   <AuthProvider>
          <Router>
       <Container>
         
          <MenuBar />
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path="/login" component={Login}/>
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost}/> 
       </Container>

     </Router>
   </AuthProvider>
  );
}

export default App;
