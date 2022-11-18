export const user = ref({})

export default function () {
  const setUserState = (data) => {
    user.value = { ...data }
  }

  return {
    setUserState,
  }
}
