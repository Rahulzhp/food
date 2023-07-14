import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Service from './Components/Service';
import Menu from "./Components/Menu"
import Footer from './Components/Footer';
import Allroute from './Components/Allroute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Allroute />
      <Home />
      <Menu />
      <Service />
      <Footer />
    </div>
  );
}

export default App;
