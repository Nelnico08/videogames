import './App.css';
import { Route, Switch } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Videogame from './Components/Videogame';
import CreateGame from './Components/CreateGame';
import Invalid from './Components/Invalid';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/videogame/create" component={CreateGame} />
        <Route path="/videogames/:id" component={Videogame} />
        <Route path="/*" component={Invalid} />
      </Switch>
    </div>
  );
}

export default App;
