
import './App.css';
import Form from './Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <h2>Registraton form</h2>
      <ToastContainer />
      <Form />

    </div>
  );
}

export default App;
