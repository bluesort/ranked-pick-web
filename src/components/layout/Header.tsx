import { useApi } from "@/components/ApiContext";
import { AuthDialog } from "@/components/views/auth/AuthDialog";
import { FiPlus } from "react-icons/fi";
import { Link } from "wouter";

function Header() {
  const { currentUser } = useApi();

  const headerButtonClasses = "bg-primary rounded-md text-primary-foreground hover:brightness-125";

  return (
    <div className="w-full fixed h-14 bg-primary top-0 drop-shadow-md flex justify-between items-center px-8">
      <Link to="/">LOGO</Link>
      <div className="flex">
        <Link to="/surveys/new" className={`${headerButtonClasses} mr-4 p-1`}><FiPlus size="24" /></Link>
        {currentUser ? (
          <div>{currentUser.email}</div>
        ):(
          <AuthDialog triggerClassName={`${headerButtonClasses} text-xs px-2`}/>
        )}
      </div>
    </div>
  );
}

export default Header;
