import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExp, fetchExp } from "../State/Reducers/expSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const dispatch = useDispatch();
  const myExp = useSelector((state) => state.exp);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchExp());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const conf = window.confirm("Are you sure you want to delete this record?");
    if (conf) {
      await dispatch(deleteExp(id));
      await dispatch(fetchExp());
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  // Sort transactions by date, with the latest date first
  const sortedTransactions = myExp.expence.slice().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div>
      <h2 className="bold-font lg">Transaction</h2>
      <hr />
      {sortedTransactions.length === 0 ? (
        <div className="tran-center">No Data Here.</div>
      ) : (
        <div className="transaction-container">
          {sortedTransactions.map((getExp, index) => {
            const transactionClass =
              getExp.type === "income" ? "green-border" : "red-border";
            const amountSign = getExp.type === "income" ? "+" : "-";
            return (
              <div className={`fw tran-data ${transactionClass}`} key={index}>
                <div>{getExp.title}</div>
                <div className="tran-data-info">
                  <div>{getExp.date}</div>
                  <div>
                    {amountSign}
                    {Math.abs(getExp.amount)} ₹
                  </div>
                  <div>
                    <button
                      className="edit-color"
                      onClick={() => handleUpdate(getExp.id)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                  <div>
                    <button
                      className="exp-color"
                      onClick={() => handleDelete(getExp.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transactions;
