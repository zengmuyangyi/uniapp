export function useScroll(emit) {
  function onScrollToUpper(e) {
    emit('upper', e)
  }
  function onScrollToLower(e) {
    emit('lower', e)
  }
  function onRefresherPulling(e) {
    emit('pulling', e)
  }
  function onRefresherRefresh(e) {
    emit('refresh', e)
  }
  function onRefresherRestore(e) {
    emit('restore', e)
  }
  function onRefresherAbort(e) {
    emit('abort', e)
  }
  return {
    onScrollToUpper,
    onScrollToLower,
    onRefresherPulling,
    onRefresherRefresh,
    onRefresherRestore,
    onRefresherAbort,
  }
}
