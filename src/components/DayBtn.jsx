import { useNavigate, useLocation } from "react-router-dom";

function DayBtn() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDayButtonFocused = location.pathname === "/schedule/day";
  return (
    <button
      className={`rounded-md w-20 h-8 filter drop-shadow-lg text-md font-semibold ${
        isDayButtonFocused ? "bg-blue-400 text-white" : "bg-white"
      }`}
      onClick={() => navigate("/schedule/day")}
    >
      Day
    </button>
  );
}
export default DayBtn;
