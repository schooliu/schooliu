import type { NextPage } from "next";
import Link from "next/link";
import { Logo } from "../components/logo";
import Image from "next/image";

export default (() => {
  return (
    <div className="h-screen flex flex-col">
      <nav className="w-full p-4">
        <div className="p-4 m-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </nav>
      <main className="grid grid-cols-2 flex-grow">
        <div className="flex flex-col justify-center p-4">
          <form className="w-full space-y-4">
            <header className="text-center">
              <h1 className="font-bold text-5xl">Coucou 👋</h1>
              <p>
                Pas encore de compte ?{" "}
                <Link className="link link-primary" href="/register">
                  S'inscrire
                </Link>
              </p>
            </header>

            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Adresse email</span>
                </label>
                <input
                  type="text"
                  placeholder="jean.doe@etudiant.univ-rennes.fr"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  type="text"
                  placeholder="·········"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full">Connexion</button>
            </div>
          </form>
        </div>
        <div className="p-4">
          <div className="relative h-full w-full">
            <Image
              className="object-cover rounded-3xl"
              fill
              src="/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg"
              alt="School"
            ></Image>
          </div>
        </div>
      </main>
    </div>
  );
}) satisfies NextPage;
