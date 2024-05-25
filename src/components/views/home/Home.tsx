import logo from "@/assets/logo-color.svg";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/Button";
import { useLocation } from "wouter";

export function Home() {
  const [, setLocation] = useLocation();

  return (
    <Page center title={(
      <div className="flex items-center">
        <img src={logo} className="mr-4" />
        <h1>Ranked Pick</h1>
      </div>
    )}>
      <p>
        Create and share ranked-choice surveys.
      </p>
      <p className="mb-4">
				Created by <a href="https://github.com/carterjackson" target="_blank">Carter Jackson</a>
			</p>
      <p className="italic">This app is a work in progress.</p>
      <Button size="lg" onClick={() => setLocation('/surveys/create')} className="my-10 mr-1 font-bold p-6 text-lg" role="link">
        Create a survey
      </Button>
    </Page>
  );
}
