import "./App.css";
import AddTransactions from "./Components/AddTransactions";
import Balance from "./Components/Balance";
import Header from "./Components/Header";
import Transactions from "./Components/Transactions";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <hr />
        
        <div className="main">
          <Balance />
          <Transactions />
          <AddTransactions />
        </div>
      </div>
    </div>
  );
}

export default App;
