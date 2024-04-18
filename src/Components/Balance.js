import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Balance = () => {
  const dispatch = useDispatch();
  const { expence, loading, error } = useSelector((state) => state.exp);

  useEffect(() => {
    // Dispatch actions to fetch data if needed
    // Example:
    // dispatch(fetchExp());
  }, [dispatch]);

  // Calculate total income
  const totalIncome = expence
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Calculate total expenses
  const totalExpenses = expence
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Calculate balance
  const balance = totalIncome - totalExpenses;

  return (
    <div className="balance">
      <div className="bold-font x-lg">Your Balance</div>
      <div className="bold-font xx-lg">
        {numberWithCommas(balance)} ₹
      </div>
      <div className="bal-div">
        <div className="bal-info">
          <div className="bold-font lg">INCOME</div>
          <div className="inc-color bold-font x-lg">{numberWithCommas(totalIncome)} ₹</div>
        </div>
        <div className="divider"></div>
        <div className="bal-info">
          <div className="bold-font lg">EXPENSES</div>
          <div className="exp-color bold-font x-lg">{numberWithCommas(totalExpenses)} ₹</div>
        </div>
      </div>
    </div>
  );
};

export default Balance;

// Function to add commas to numbers for better readability
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
