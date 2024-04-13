import { FiPlus } from "react-icons/fi";
import { Link } from "wouter";

function Header() {
  const headerButtonClasses = "bg-primary rounded-md text-primary-foreground brightness-110 hover:brightness-125";

  return (
    <div className="w-full fixed h-14 bg-primary top-0 drop-shadow-md flex justify-between items-center px-8">
      <Link to="/">LOGO</Link>
      <div className="flex">
        <Link to="/surveys/new" className={`${headerButtonClasses} mr-4 p-1`}><FiPlus size="24" /></Link>
        <button className={`${headerButtonClasses} text-xs px-2`}>Sign in</button>
      </div>
    </div>
  );
}

export default Header;
