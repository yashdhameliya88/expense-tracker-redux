import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "http://localhost:3335/myExpense";

//Fetch API Data
export const fetchExp = createAsyncThunk("expence/fetchExp", async () => {
  return await axios.get(apiKey).then((res) => res.data);
});

//Post Data in API
export const addExp = createAsyncThunk("expence/addExp", async (myData) => {
  return await axios.post(apiKey, myData).then((res) => res.data);
});

//Delete Data from API
export const deleteExp = createAsyncThunk("expence/deleteExp", async (id) => {
  return await axios.delete(`${apiKey}/${id}`).then((res) => res.data);
});

//Fetch Single Data for Update
export const fetchSingleUser = createAsyncThunk(
  "user/fetchSingleUser",
  async (id) => {
    return axios.get(`${apiKey}/${id}`).then((res) => res.data);
  }
);

//Store Updated User Data in API
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (myData) => {
    return axios
      .put(`${apiKey}/${myData.id}`, myData)
      .then((res) => res.data);
  }
);

export const expSlice = createSlice({
  name: "expence",
  initialState: {
    loading: false,
    expence: [],
    error: "",
    isSuccess: "",
  },

  /// Reducer call Here...
  extraReducers: (builder) => {
    //Fetch Expense Data from API
    builder.addCase(fetchExp.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchExp.fulfilled, (state, action) => {
      state.loading = false;
      state.expence = action.payload;
    });

    builder.addCase(fetchExp.rejected, (state, action) => {
      state.loading = false;
      state.expence = [];
      state.error = action.error.message;
    });

    //Post Data in API
    builder.addCase(addExp.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addExp.fulfilled, (state, action) => {
      state.loading = false;
      state.expence = [];
      state.isSuccess = action.payload;
    });

    builder.addCase(addExp.rejected, (state, action) => {
      state.loading = false;
      state.expence = [];
      state.error = action.error.message;
    });

    //Delete Data from API
    builder.addCase(deleteExp.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(deleteExp.fulfilled, (state, action) => {
      state.loading = false;
      state.expence = state.expence.filter(
        (expence) => expence.id !== action.payload
      );
      state.isSuccess = "Data Deleted Successfully";
    });

    builder.addCase(deleteExp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //Fetch Single User Data
    builder.addCase(fetchSingleUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.expence = action.payload;
      state.error = "";
    });

    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      state.loading = false;
      state.expence = [];
      state.error = action.error.message;
    });

    //Store Updated Data in API
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.expence = action.payload; // Update user data with the updated data
      state.isSuccess = "User Updated Successfully";
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default expSlice.reducer;
