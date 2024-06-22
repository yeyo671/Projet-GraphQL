import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

export default function Header() {
  const username = localStorage.getItem("username") ?? "";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container bg-base-100 mx-auto max-w-xl px-3 md:px-0">
      <div className="navbar flex justify-between px-0">
        <a className="text-primary font-semibold select-none text-xl">
          thefacebook
        </a>
        <div className="flex gap-1">
          <button
            onClick={handleLogout}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <TbLogout2 />
          </button>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
              <span className="text-sm">{username[0]?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
