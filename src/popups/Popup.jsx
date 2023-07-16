import { useAppContext } from "../AppProvider";

const Popup = ({ isActive, children }) => {
  const { dispatch } = useAppContext();
  if (!isActive) return;
  return (
    <div className="pop-up">
      <div className={isActive ? "pop-up__content active" : "pop-up__content"}>
        <div
          className="pop-up__btn-close"
          onClick={() => dispatch({ type: "TOGGLE_POPUP_CONFIG" })}
        >
          &times;
        </div>
        <>{children}</>
      </div>
    </div>
  );
};
export default Popup;
