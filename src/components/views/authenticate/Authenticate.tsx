import { useCallback, useEffect, useState } from "react";
import { SigninForm } from "@/components/dialogs/auth/SigninForm";
import { SignupForm } from "@/components/dialogs/auth/SignupForm";
import { Page } from "@/components/layout/Page";
import { useLocation, useSearch } from "wouter";
import { useAuth } from "@/components/AuthContext";

export function Authenticate() {
  const [,setLocation] = useLocation();
  const queryString = useSearch();
  const {currentUser} = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleComplete = useCallback(() => {
    const params = new URLSearchParams(queryString);
    setLocation(params.get('return_to') || '/', {replace: true});
  }, [queryString, setLocation]);

  useEffect(() => {
    if (currentUser) {
      handleComplete();
    }
  }, [currentUser, handleComplete]);

  return (
    <Page title={isSigningUp ? "Sign up" : "Sign in"}>
      {isSigningUp ? (
        <>
          <SignupForm onComplete={handleComplete} />
          <p className="text-center">
            Already have an account? <button onClick={() => setIsSigningUp(false)} className="underline">Sign in</button>
          </p>
        </>
      ):(
        <>
          <SigninForm onComplete={handleComplete} />
          <p className="text-center">
            Don't have an account? <button onClick={() => setIsSigningUp(true)} className="underline">Sign up</button>
          </p>
        </>
      )}
    </Page>
  );
}
