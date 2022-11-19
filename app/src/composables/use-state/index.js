export const user = ref({})

export default () => {
  const setUserState = (data) => {
    user.value = { ...data }
  }

  return {
    setUserState,
  }
}
