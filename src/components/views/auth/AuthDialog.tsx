import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/Dialog";
import { SigninForm } from "@/components/views/auth/SigninForm";
import { SignupForm } from "@/components/views/auth/SignupForm";

interface Props {
  triggerClassName: string;
}

export function AuthDialog({ triggerClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} className={triggerClassName}>Sign in</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3>{isSigningUp ? "Sign up" : "Sign in"}</h3>
        </DialogHeader>
        {isSigningUp ? (
          <>
            <SignupForm onComplete={() => setOpen(false)} />
            <p className="text-center">
              Already have an account? <button onClick={() => setIsSigningUp(false)} className="underline">Sign in</button>
            </p>
          </>
        ):(
          <>
            <SigninForm onComplete={() => setOpen(false)} />
            <p className="text-center">
              Don't have an account? <button onClick={() => setIsSigningUp(true)} className="underline">Sign up</button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
