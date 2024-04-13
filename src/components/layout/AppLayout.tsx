import Body from "@/components/layout/Body";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen relative bg-background text-foreground">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default AppLayout;
