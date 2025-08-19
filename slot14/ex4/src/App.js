import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap
import './App.css';
import ValidatedInput from './components/ValidatedInput';

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ValidatedInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
