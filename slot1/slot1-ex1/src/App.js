import logo from './logo.svg';
import './App.css';

function App() {
  const myName = "Kien"; // Bạn có thể thay đổi tên ở đây

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello React</h1>
        <p>My name is {myName}</p>
      </header>
    </div>
  );
}

export default App;
