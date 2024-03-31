import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  isTitleIntersecting: boolean
  currentTitle: string
  menuOpen: boolean

  setTitleIntersecting: (isTitleIntersecting: boolean) => void
  setCurrentTitle: (currentTitle: string) => void
  toggleMenu: () => void
  closeMenu: () => void
}

export const useUIStore = create<UIState>()(
  devtools<UIState>((set) => ({
    isTitleIntersecting: true,
    currentTitle: '',
    menuOpen: false,

    setTitleIntersecting: (isTitleIntersecting: boolean) =>
      set({ isTitleIntersecting }),

    setCurrentTitle: (currentTitle: string) => set({ currentTitle }),

    toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
    closeMenu: () => set({ menuOpen: false }),
  })),
)
