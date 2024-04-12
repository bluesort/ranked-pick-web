import Body from "@/components/layout/Body";
import Header from "@/components/layout/Header";

function AppLayout() {
  return (
    <div className="relative bg-background text-foreground">
      <Header />
      <Body />
    </div>
  );
}

export default AppLayout;
