import { Link } from "wouter";
import logo from "@/assets/logo.svg";
import { ActionMenu } from "@/components/layout/ActionMenu";
import { AuthMenu } from "@/components/layout/AuthMenu";
import { useApi } from "@/components/ApiContext";

function Header() {
  const { currentUser } = useApi();
  const headerButtonClasses = "bg-primary rounded-md text-primary-foreground hover:brightness-125 px-2 py-1";

  return (
    <div className="w-full fixed h-14 bg-primary top-0 drop-shadow-md flex justify-between items-center px-8">
      <Link to="/">
        <img src={logo} alt="logo" className="h-10 w-10 bg-muted rounded-full" />
      </Link>
      <div className="flex">
        {currentUser && <ActionMenu triggerClassName={headerButtonClasses} />}
        <AuthMenu triggerClassName={headerButtonClasses} />
      </div>
    </div>
  );
}

export default Header;
