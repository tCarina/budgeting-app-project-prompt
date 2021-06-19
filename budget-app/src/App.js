import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "./components/navBar";
import Home from "./components/home";
import Transactions from "./components/allTrans";
import TransDetails from "./components/transDetails";
import NewTransForm from "./components/newTransForm";

import { apiURL } from "./util/apiURL";
const API = apiURL();

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTrans = async (newTrans) => {
    try {
      let res = await axios.post(`${API}/transactions`, newTrans)
      setTransactions(prevTrans => [...prevTrans, res.data])
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTrans = async () => {
    try {
      const res = await axios.get(`${API}/transactions`);
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrans();
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />

        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/transactions/new">
              <NewTransForm addTrans={addTrans} />
            </Route>

            <Route exact path="/transactions">
              <Transactions transactions={transactions} />
            </Route>

            <Route path="/transactions/:ID">
              <TransDetails />
            </Route>

          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
