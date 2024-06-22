export default function Header() {
  const username = localStorage.getItem("username") ?? "";

  return (
    <div className="container bg-base-100 mx-auto max-w-xl px-3 md:px-0">
      <div className="navbar px-0">
        <div className="flex-1">
          <a className="text-primary font-semibold select-none text-xl">
            thefacebook
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                <span className="text-sm">{username[0]?.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
