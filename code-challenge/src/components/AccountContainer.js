import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchValue, setSeacrchValue] = useState("");

  // Fetching list from db.json
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  // Posting data on db.json
  const addTransaction = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, amount: parseInt(data.amount) }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(`Error from POST: ${e}`);
      });
  };

  // Search value
  useEffect(() => {
    if (searchValue !== "") {
      const filteredResults = transactions.filter((transaction) => {
        return (
          transaction.description
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          transaction.category
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
      setFilteredTransactions(filteredResults);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, searchValue]);

  return (
    <div>
      <Search searchValue={searchValue} setSeacrchValue={setSeacrchValue} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
