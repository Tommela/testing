import { create } from 'zustand'

interface ILoadingState {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const useGlobalLoaderStore = create<ILoadingState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false })
}))

export default useGlobalLoaderStore
