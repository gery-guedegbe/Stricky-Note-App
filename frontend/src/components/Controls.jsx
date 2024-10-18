import { useContext } from "react";
import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const Controls = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div id="controls">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center bg-[#808080] rounded-full text-white"
      >
        <MdOutlineLogout className="w-12 h-auto object-cover  p-3" />
      </button>
    </div>
  );
};

export default Controls;
