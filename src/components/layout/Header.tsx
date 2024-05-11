import { useApi } from "@/components/ApiContext";
import { AuthDialog } from "@/components/views/auth/AuthDialog";
import { FiPlus } from "react-icons/fi";
import { Link } from "wouter";
import logo from "@/assets/logo.svg";

function Header() {
  const { currentUser } = useApi();

  const headerButtonClasses = "bg-primary rounded-md text-primary-foreground hover:brightness-125";

  return (
    <div className="w-full fixed h-14 bg-primary top-0 drop-shadow-md flex justify-between items-center px-8">
      <Link to="/">
        <img src={logo} alt="logo" className="h-10 w-10 bg-muted rounded-full" />
      </Link>
      <div className="flex">
        {currentUser ? (
          <>
            <Link to="/surveys/new" className={`${headerButtonClasses} mr-4 p-1`}><FiPlus size="24" /></Link>
            {/* TODO: Account management */}
            <div className="text-primary-foreground mt-1">{currentUser.email}</div>
          </>
        ):(
          <AuthDialog triggerClassName={`${headerButtonClasses} text-xs px-2`}/>
        )}
      </div>
    </div>
  );
}

export default Header;
