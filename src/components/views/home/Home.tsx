import logo from "@/assets/logo.svg";

export function Home() {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center">
        <img src={logo} className="mr-4" />
        <h1>Ranked Pick</h1>
      </div>
      <p>Create and share ranked-choice surveys.</p>
      <p className="font-bold mt-4">This app is a work in progress.</p>
    </div>
  );
}
