import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleUser, updateUser } from "../State/Reducers/expSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = { title: "", amount: "", date: "", type: "" };
  const [myData, setMyData] = useState(data);

  const handleClose = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  // Fetch user data based on ID
  useEffect(() => {
    dispatch(fetchSingleUser(id)).then((response) => {
      // Update userData state with fetched user data
      setMyData(response.payload);
      console.log(response.payload);
    });
  }, [dispatch, id]);

  // Update user data handler
  const handleUpdate = async (e) => {
    if (!myData.title || !myData.amount || !myData.date || !myData.type) {
      alert("Please fill all details.");
    } else {
     await dispatch(updateUser(myData)).then(() => {
        // After updating, navigate to the user list page
        // navigate("/");
        window.location.href = "/";
      });
    }
  };
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

  return (
    <div className="App">
      <div className="container">
        <div className="main">
          <div className="btn-right">
            <button onClick={handleClose}>X</button>
          </div>
          <div>
            <h2 className="bold-font lg">Update Transaction</h2>
            <hr />
            <form>
              <div className="add-tran-main fw">
                <label htmlFor="id">ID</label>
                <br />
                <input
                  className="add-tran-form"
                  type="text"
                  name="id"
                  value={myData.id}
                  disabled
                />
                <br />
                <label htmlFor="title">Title</label>
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
                <label htmlFor="amount">Amount</label>
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
                <label htmlFor="date">Date</label>
                <br />
                <input
                  className="add-tran-form"
                  type="date"
                  name="date"
                  value={myData.date}
                  onChange={handleInput}
                />
                <br />
                <label htmlFor="type">Type: </label>

                <label>
                  <input
                    type="checkbox"
                    name="type"
                    value="income"
                    checked={myData.type === "income"}
                    onChange={handleInput}
                  />{" "}
                  Income
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="type"
                    value="expense"
                    checked={myData.type === "expense"}
                    onChange={handleInput}
                  />{" "}
                  Expense
                </label>
                <br />
                <button type="submit" className="add-tran-form btn-add" onClick={handleUpdate}>
                  Update Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
