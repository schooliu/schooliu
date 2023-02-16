"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const signOutUser = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: `/`
      });
    } catch (e) {
      console.log(e);
    }

  };
  return <button onClick={() => signOutUser()}>Se déconnecter</button>;
}
