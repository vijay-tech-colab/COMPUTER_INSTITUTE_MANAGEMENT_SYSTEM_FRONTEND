import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData, putData } from "@/api/api";

interface AdmissionState {
  admissions: any[];
  currentAdmission: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AdmissionState = {
  admissions: [],
  currentAdmission: null,
  loading: false,
  error: null,
  success: false,
};

// Create New Enquiry
export const createEnquiry = createAsyncThunk(
  "admissions/createEnquiry",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await postData("/admissions/enquiry", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Get All Admissions
export const fetchAdmissions = createAsyncThunk(
  "admissions/fetchAdmissions",
  async (branchId: string | undefined, { rejectWithValue }) => {
    try {
      const url = branchId ? `/admissions?branch=${branchId}` : "/admissions";
      const response = await getData(url);
      return response.data.admissions;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch admissions");
    }
  }
);

// Get Single Admission
export const fetchAdmissionById = createAsyncThunk(
  "admissions/fetchAdmissionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getData(`/admissions/${id}`);
      return response.data.admission;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch admission details");
    }
  }
);

// Update Status
export const updateStatus = createAsyncThunk(
  "admissions/updateStatus",
  async ({ id, status, remarks }: { id: string; status: string; remarks?: string }, { rejectWithValue }) => {
    try {
      const response = await putData(`/admissions/status/${id}`, { status, remarks });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

// Convert to Student (Enroll)
export const enrollStudent = createAsyncThunk(
  "admissions/enrollStudent",
  async ({ id, password }: { id: string; password?: string }, { rejectWithValue }) => {
    try {
      const response = await postData(`/admissions/enroll/${id}`, { password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to enroll student");
    }
  }
);

const admissionSlice = createSlice({
  name: "admissions",
  initialState,
  reducers: {
    resetAdmissionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearCurrentAdmission: (state) => {
      state.currentAdmission = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Enquiry
      .addCase(createEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEnquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Admissions
      .addCase(fetchAdmissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.admissions = action.payload;
      })
      .addCase(fetchAdmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single Admission
      .addCase(fetchAdmissionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmission = action.payload;
      })
      .addCase(fetchAdmissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmission = action.payload.data;
        const index = state.admissions.findIndex(a => a._id === action.payload.data._id);
        if (index !== -1) state.admissions[index] = action.payload.data;
        state.success = true;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Enroll Student
      .addCase(enrollStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentAdmission) {
          state.currentAdmission.status = "Enrolled";
          state.currentAdmission.enrolledStudent = action.payload.data.student._id;
        }
        state.success = true;
      })
      .addCase(enrollStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAdmissionState, clearCurrentAdmission } = admissionSlice.actions;
export default admissionSlice.reducer;
