import { Link } from "wouter";
import logo from "@/assets/logo-color.svg";
import { ActionMenu } from "@/components/layout/header/ActionMenu";
import { AccountMenu } from "@/components/layout/header/AccountMenu";
import { useAuth } from "@/components/AuthContext";

function Header() {
  const { currentUser } = useAuth();
  const headerButtonClasses = "bg-primary rounded-md text-primary-foreground hover:brightness-125 px-2 py-1";

  return (
    <div className="w-full fixed h-14 bg-primary top-0 drop-shadow-md flex justify-between items-center px-4">
      <Link to="/">
        <img src={logo} alt="logo" className="h-10 w-10 bg-muted rounded-full" />
      </Link>
      <div className="flex">
        {currentUser && <ActionMenu triggerClassName={headerButtonClasses} />}
        <AccountMenu triggerClassName={headerButtonClasses} />
      </div>
    </div>
  );
}

export default Header;
