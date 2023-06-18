import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Alert = () => {
  const {alertType,alertText} = useSelector((store: RootState) => store.app);

  return (
    <div className={`alert alert-${alertType}`}>
      {alertText}
    </div>
  );
}

export default Alert;
