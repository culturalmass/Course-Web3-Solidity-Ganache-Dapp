import { Toast } from "../components/styles";

const handleErrors = (error) => {
  if (error.code === -32603) {
    Toast.fire({ title: `${error.data.message}`, icon: "error" });
  } else if (error.code === "ACTION_REJECTED") {
    Toast.fire({ title: error.reason, icon: "error" });
  } else {
    Toast.fire({ title: error.data.message.toString(), icon: "error" });
  }
};

export default handleErrors;
