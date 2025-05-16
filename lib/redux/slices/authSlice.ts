import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

interface AuthState {
  user: any | null
  session: any | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: AuthState = {
  user: null,
  session: null,
  status: "idle",
  error: null,
}

// Create supabase client inside each thunk instead of at module level
// This ensures environment variables are properly loaded

// Async thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Create client inside the thunk
      const supabase = createClientComponentClient<Database>()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, userData }: { email: string; password: string; userData: any }, { rejectWithValue }) => {
    try {
      // Create client inside the thunk
      const supabase = createClientComponentClient<Database>()

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) throw error
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const signOut = createAsyncThunk("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    // Create client inside the thunk
    const supabase = createClientComponentClient<Database>()

    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return null
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const getSession = createAsyncThunk("auth/getSession", async (_, { rejectWithValue }) => {
  try {
    // Create client inside the thunk
    const supabase = createClientComponentClient<Database>()

    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const resetPassword = createAsyncThunk("auth/resetPassword", async (email: string, { rejectWithValue }) => {
  try {
    // Create client inside the thunk
    const supabase = createClientComponentClient<Database>()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) throw error
    return null
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const updatePassword = createAsyncThunk("auth/updatePassword", async (password: string, { rejectWithValue }) => {
  try {
    // Create client inside the thunk
    const supabase = createClientComponentClient<Database>()

    const { error } = await supabase.auth.updateUser({
      password,
    })
    if (error) throw error
    return null
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.status = "loading"
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = "succeeded"
        state.user = null
        state.session = null
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      // Get Session
      .addCase(getSession.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.session = action.payload.session
        state.user = action.payload.session?.user || null
      })
      .addCase(getSession.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading"
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { setUser, setSession, clearUser, clearError } = authSlice.actions
export default authSlice.reducer
