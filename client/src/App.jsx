import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './utils/Auth';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import Auth from './utils/Auth';
// import Login from './components/login';
// import Signup from './components/signup';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/signup" component={Signup} />
//         <PrivateRoute exact path="/dashboard" component={Dashboard} />
//       </Switch>
//     </Router>
//   );
// };

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       Auth.isLoggedIn() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// export default App;