import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import CrudComponent from './components/CrudComponent';
import CrudLocalStorage from './components/CrudLocalStorage';

function App() {
  return (
    <div>
      {/* <CrudComponent /> */}
      <CrudLocalStorage />
    </div>
  );
}

export default App;
