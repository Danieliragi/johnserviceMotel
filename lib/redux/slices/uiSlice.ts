import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  theme: "light" | "dark" | "system"
  sidebarOpen: boolean
  activeModal: string | null
  toasts: Array<{
    id: string
    title: string
    description?: string
    type: "default" | "success" | "error" | "warning" | "info"
  }>
}

const initialState: UIState = {
  theme: "system",
  sidebarOpen: false,
  activeModal: null,
  toasts: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
    addToast: (
      state,
      action: PayloadAction<{
        title: string
        description?: string
        type: "default" | "success" | "error" | "warning" | "info"
      }>,
    ) => {
      const id = Date.now().toString()
      state.toasts.push({
        id,
        ...action.payload,
      })
    },
    // Add showToast as an alias for addToast for backward compatibility
    showToast: (
      state,
      action: PayloadAction<{
        title: string
        description?: string
        type: "default" | "success" | "error" | "warning" | "info"
      }>,
    ) => {
      const id = Date.now().toString()
      state.toasts.push({
        id,
        ...action.payload,
      })
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
    clearToasts: (state) => {
      state.toasts = []
    },
  },
})

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addToast,
  showToast, // Export the new alias
  removeToast,
  clearToasts,
} = uiSlice.actions

export default uiSlice.reducer
