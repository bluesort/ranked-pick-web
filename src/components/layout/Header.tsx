import { FiMoreVertical, FiPlus } from "react-icons/fi";
import { Link } from "wouter";

function Header() {
  return (
    <div className="w-full fixed h-12 bg-primary top-0 drop-shadow-md flex justify-between items-center px-8">
      <Link to="/">LOGO</Link>
      <div className="flex">
        <HeaderIconLink to="/surveys/new" icon={<FiPlus size="24" />} className="mr-4 p-1" />
        <HeaderIconLink to="/" icon={<FiMoreVertical size="16" />} className="p-2" />
      </div>
    </div>
  );
}

function HeaderIconLink(props: { to: string, icon: JSX.Element, className: string }) {
  const { to, icon, className } = props;
  return (
    <Link to={to} className={`${className} bg-primary-darkened rounded-md text-primary-foreground hover:brightness-90`}>
      {icon}
    </Link>
  );
}

export default Header;
