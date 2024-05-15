import logo from "@/assets/logo.svg";
import Page from "@/components/layout/Page";

export function Home() {
  return (
    <Page center title={(
      <div className="flex items-center">
        <img src={logo} className="mr-4" />
        <h1>Ranked Pick</h1>
      </div>
    )}>
      <p className="mb-4">
        Create and share ranked-choice surveys.
      </p>
      <p className="mb-4">
				Created by <a href="https://github.com/carterjackson" target="_blank">Carter Jackson</a>
			</p>
      <p className="font-bold">This app is a work in progress.</p>
    </Page>
  );
}
