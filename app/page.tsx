import Navbar from "@/components/shared/navbar/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Button>Click me</Button>
      </div>
    </>
  );
}
