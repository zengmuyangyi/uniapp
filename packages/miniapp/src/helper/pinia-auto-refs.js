import { useApp } from '@/store/app'
import { useScenic } from '@/store/scenic'
import { useUserStore } from '@/store/user'
import { useSzgbxyStore } from '@/store/szgbxy'

const storeExports = {
  user: useUserStore,
  app: useApp,
  scenic: useScenic,
  szgbxy: useSzgbxyStore,
}

export function useStore(storeName) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs }
}
