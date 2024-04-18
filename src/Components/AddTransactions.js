import React, { useState } from "react";
import { addExp, fetchExp } from "../State/Reducers/expSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTransactions = () => {
  const dispatch = useDispatch();
  const myExp = useSelector((state) => state.exp);
  const navigate = useNavigate();

  //Set Today Date as Default
  const today = new Date().toISOString().split("T")[0];
  const data = { title: "", amount: "", date: "", type: "" };
  const [myData, setMyData] = useState(data);

  //Control Input Fields Data
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    // If checkbox is clicked, update the other checkbox to false
    if (type === "checkbox" && checked) {
      setMyData({
        ...myData,
        [name]: value,
        [name === "income" ? "expense" : "income"]: false,
      });
    } else {
      setMyData({ ...myData, [name]: fieldValue });
    }
  };

  //Control Add Transaction Button and Pass Data in API
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!myData.title || !myData.amount || !myData.date || !myData.type) {
      alert("Please fill all details.");
    } else {
      //API
      await dispatch(addExp(myData));

      // Fetch the updated data
      await dispatch(fetchExp());
      setMyData(data);
    }
  };

  return (
    <div>
      <h2 className="bold-font lg">Add Transaction</h2>
      <hr />

      <div className="add-tran-main fw">
        <label htmlFor="">Title</label>
        <br />
        <input
          className="add-tran-form"
          type="text"
          placeholder="Enter Title..."
          name="title"
          value={myData.title}
          onChange={handleInput}
        />
        <br />
        <label htmlFor="">Amount</label>
        <br />
        <input
          className="add-tran-form"
          type="text"
          placeholder="Enter Amount..."
          name="amount"
          value={myData.amount}
          onChange={handleInput}
        />
        <br />

        <label htmlFor="">Date</label>
        <br />
        <input
          className="add-tran-form"
          type="date"
          defaultValue={today}
          name="date"
          value={myData.date}
          onChange={handleInput}
        />
        <br />

        <label htmlFor="">Type: </label>
        <input
          type="checkbox"
          name="type"
          value="income"
          checked={myData.type === "income"}
          onChange={handleInput}
        />
        <label htmlFor="">Income</label>

        <input
          type="checkbox"
          name="type"
          value="expense"
          checked={myData.type === "expense"}
          onChange={handleInput}
        />
        <label htmlFor="">Expense</label>

        <br />
        <button className="add-tran-form btn-add" onClick={handleAdd}>
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default AddTransactions;
