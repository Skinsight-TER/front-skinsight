import SignInButton from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import AppBar from "@/components/AppBar";

export default function Home() {
  return (
    <div className="flex gap-4 w-full bg-light-green">
      <AppBar />
      test
    </div>
  )
}