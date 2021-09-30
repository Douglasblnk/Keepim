import { ref } from 'vue';

const defaultType = 'warning';

const isShowing = ref(false);
const alertType = ref(defaultType);
const alertText = ref('');

const alertState = ref();

export default function useAlert() {
  function handleAlertState(timeout = 4000) {
    clearTimeout(alertState.value);

    alertState.value = setTimeout(() => {
      closeAlert();
    }, timeout);
  };

  function setAlert({ type, text, timeout }) {
    isShowing.value = true;
    alertText.value = text;
    alertType.value = type;

    handleAlertState(timeout);
  }

  function closeAlert() {
    isShowing.value = false;
    alertText.value = '';
    alertType.value = defaultType;
  }

  return {
    setAlert,
    closeAlert,
    isShowing,
    alertText,
    alertType,
  };
}
