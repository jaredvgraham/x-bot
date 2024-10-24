import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Dashboard from "./dashboard/page";
import Landing from "./landing/page";

export default function Home() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <Landing />
      </SignedOut>
    </>
  );
}
