import type { NextPage } from "next";
import Link from "next/link";
import { Logo } from "../components/logo";
import Image from "next/image";
import { signIn } from "next-auth/react";

// export const getServerSideProps = (async (context) => {
//   const session = await unstable_getServerSession(context.req, context.res, authOptions)
//
//   if (session) {
//     return {
//       redirect: {
//         destination: '/rennes-1',
//         permanent: false,
//       },
//     }
//   }
//
//   return {
//     props: {}
//   };
// }) satisfies GetServerSideProps;
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
          <div className="w-full space-y-4">
            <header className="text-center">
              <h1 className="font-bold text-5xl">Coucou 👋</h1>
            </header>


            <button onClick={() => signIn("auth0")} className="btn btn-primary w-full">Connexion</button>

          </div>
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
