import { useNavigate, useLocation } from "react-router-dom";

function WeekBtn() {
  const navigate = useNavigate();
  const location = useLocation();
  const isWeekButtonFocused = location.pathname === "/schedule/week";
  return (
    <button
      className={`rounded-md w-20 h-8 filter drop-shadow-lg text-md  font-semibold ${
        isWeekButtonFocused ? "bg-blue-400 text-white" : "bg-white"
      }`}
      onClick={() => navigate("/schedule/week")}
    >
      Week
    </button>
  );
}
export default WeekBtn;
