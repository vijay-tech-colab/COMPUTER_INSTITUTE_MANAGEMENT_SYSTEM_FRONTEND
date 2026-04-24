import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData, putData, deleteData } from "@/api/api";

interface StudentState {
  students: any[];
  currentStudent: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  totalStudents: number;
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  success: false,
  totalStudents: 0,
};

// Get All Students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ branchId, query }: { branchId?: string; query?: string }, { rejectWithValue }) => {
    try {
      let url = "/students?";
      if (branchId) url += `branch=${branchId}&`;
      if (query) url += query;
      
      // Clean up trailing ? or &
      url = url.replace(/[?&]$/, "");

      const response = await getData(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch students");
    }
  }
);

// Get Single Student
export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getData(`/students/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch student details");
    }
  }
);

// Update Student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await putData(`/students/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update student");
    }
  }
);

// Delete Student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteData(`/students/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete student");
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetStudentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.totalStudents = action.payload.totalStudents;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      // Update
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload;
        state.currentStudent = action.payload;
        state.success = true;
      })
      // Delete
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s._id !== action.payload);
        state.success = true;
      });
  },
});

export const { resetStudentState, clearCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;
