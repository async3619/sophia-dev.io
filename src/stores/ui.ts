import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  isTitleIntersecting: boolean
  currentTitle: string

  setTitleIntersecting: (isTitleIntersecting: boolean) => void
  setCurrentTitle: (currentTitle: string) => void
}

export const useUIStore = create<UIState>()(
  devtools<UIState>((set) => ({
    isTitleIntersecting: false,
    currentTitle: '',

    setTitleIntersecting: (isTitleIntersecting: boolean) =>
      set({ isTitleIntersecting }),

    setCurrentTitle: (currentTitle: string) => set({ currentTitle }),
  })),
)
