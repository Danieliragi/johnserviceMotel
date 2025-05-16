import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

type Room = Database["public"]["Tables"]["chambres"]["Row"]

interface RoomsState {
  rooms: Room[]
  selectedRoom: Room | null
  selectedRoomType: string | null
  filteredRooms: Room[]
  availability: {
    roomId: string
    dates: string[]
    isAvailable: boolean
  }[]
  availabilityDates: {
    checkIn: string | null
    checkOut: string | null
  }
  isLoading: boolean
  error: string | null
  filters: {
    type: string | null
    minPrice: number | null
    maxPrice: number | null
    capacity: number | null
    priceRange: [number, number] | null
    amenities: string[]
  }
}

const initialState: RoomsState = {
  rooms: [],
  selectedRoom: null,
  selectedRoomType: null,
  filteredRooms: [],
  availability: [],
  availabilityDates: {
    checkIn: null,
    checkOut: null,
  },
  isLoading: false,
  error: null,
  filters: {
    type: null,
    minPrice: null,
    maxPrice: null,
    capacity: null,
    priceRange: null,
    amenities: [],
  },
}

export const fetchRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const supabase = createClientComponentClient<Database>()
      const { data, error } = await supabase.from("chambres").select("*")
      if (error) throw error
      return data || []
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload
    },
    setSelectedRoomType: (state, action: PayloadAction<string | null>) => {
      state.selectedRoomType = action.payload
    },
    setAvailabilityDates: (state, action: PayloadAction<{ checkIn: string | null; checkOut: string | null }>) => {
      state.availabilityDates = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    resetRoomSelection: (state) => {
      state.selectedRoom = null
      state.selectedRoomType = null
      state.availabilityDates = {
        checkIn: null,
        checkOut: null,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.isLoading = false
        state.rooms = action.payload
        state.filteredRooms = action.payload
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || "Failed to fetch rooms"
      })
  },
})

export const { setSelectedRoom, setSelectedRoomType, setAvailabilityDates, clearFilters, resetRoomSelection } =
  roomsSlice.actions

export default roomsSlice.reducer
