import './App.css';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
// import NavBar from './Components/Navbar'
import Home from './Components/Home';
// import Cards from './Components/Cards';
import Videogame from './Components/Videogame';
import CreateGame from './Components/CreateGame'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/videogame/create' component={CreateGame}/>
      <Route exact path='/videogames/:id' component={Videogame}/>
    </div>
  );
}

export default App;
