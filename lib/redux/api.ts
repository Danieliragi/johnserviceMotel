import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

// Create a custom base query function that uses Supabase
const supabaseBaseQuery = () => {
  return async ({ url, method, body }: any) => {
    try {
      const supabase = createClientComponentClient<Database>()

      // Handle different methods
      let result

      if (method === "GET") {
        const { data, error } = await supabase.from(url).select()
        if (error) throw error
        result = data
      } else if (method === "POST") {
        const { data, error } = await supabase.from(url).insert(body).select()
        if (error) throw error
        result = data
      } else if (method === "PUT") {
        const { data, error } = await supabase.from(url).update(body).eq("id", body.id).select()
        if (error) throw error
        result = data
      } else if (method === "DELETE") {
        const { error } = await supabase.from(url).delete().eq("id", body.id)
        if (error) throw error
        result = { success: true }
      }

      return { data: result }
    } catch (error: any) {
      return { error: { status: 500, data: error.message } }
    }
  }
}

// Create the API
export const api = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Rooms", "Reservations", "Users"],
  endpoints: (builder) => ({
    // Define endpoints here
    getRooms: builder.query({
      queryFn: async () => {
        try {
          const supabase = createClientComponentClient<Database>()
          const { data, error } = await supabase.from("chambres").select("*")
          if (error) throw error
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: ["Rooms"],
    }),

    getReservations: builder.query({
      queryFn: async () => {
        try {
          const supabase = createClientComponentClient<Database>()
          const { data, error } = await supabase.from("reservations").select("*")
          if (error) throw error
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: ["Reservations"],
    }),

    createReservation: builder.mutation({
      queryFn: async (reservation) => {
        try {
          const supabase = createClientComponentClient<Database>()
          const { data, error } = await supabase.from("reservations").insert(reservation).select()
          if (error) throw error
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ["Reservations"],
    }),

    createRoom: builder.mutation({
      queryFn: async (room) => {
        try {
          const supabase = createClientComponentClient<Database>()
          const { data, error } = await supabase.from("chambres").insert(room).select()
          if (error) throw error
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ["Rooms"],
    }),

    updateRoom: builder.mutation({
      queryFn: async (room) => {
        try {
          const supabase = createClientComponentClient<Database>()
          const { data, error } = await supabase.from("chambres").update(room).eq("id", room.id).select()
          if (error) throw error
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ["Rooms"],
    }),

    deleteRoom: builder.mutation({
      queryFn: async ({ id }) => {
        try {
          const supabase = createClientComponentClient<Database>()
          const { error } = await supabase.from("chambres").delete().eq("id", id)
          if (error) throw error
          return { data: { success: true } }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ["Rooms"],
    }),
  }),
})

// Export hooks for usage in components
export const {
  useGetRoomsQuery,
  useGetReservationsQuery,
  useCreateReservationMutation,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = api
