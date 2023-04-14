const routeTransition = ref('fade')

export default function () {
  const setRouteTransition = (transition) => {
    routeTransition.value = transition || 'fade'
  }

  return {
    setRouteTransition,
    routeTransition,
  }
}
