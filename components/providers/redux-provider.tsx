"use client"

import type React from "react"

import { store } from "@/lib/redux/store"
import { Provider } from "react-redux"
import { useRef } from "react"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Use a ref to ensure the store is only created once
  const storeRef = useRef(store)

  return <Provider store={storeRef.current}>{children}</Provider>
}
