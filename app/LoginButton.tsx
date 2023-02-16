"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Session } from "next-auth";

export default function LoginButton({ session }: { session: Session | null }) {
  async function signInUser() {
    await signIn("auth0", { callbackUrl: "/rennes" });
  }

  if (session !== null) {
    return (
      <Link className="btn btn-primary rounded-full" href="/rennes">Rebonjour {session.user?.name}</Link>
    );
  } else {
    return (
      <button className="btn btn-primary rounded-full" onClick={signInUser}>
        Se connecter
      </button>
    );
  }
}
