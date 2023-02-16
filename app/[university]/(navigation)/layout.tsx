import { Logo } from "../../../src/components/logo";
import Image from "next/image";
import React from "react";
import prismaClient from "../../../src/utils/prismaClient";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { authOptions } from "../../../src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getUniversity } from "../head";

export default async function Layout({
                                       children,
                                       params
                                     }: { children: React.ReactNode, params: { university: string } }) {


  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }


  const universityData = await getUniversity(params.university);


  const studentCount = await prismaClient.user.count({
    where: {
      university: {
        id: params.university
      }
    }
  });

  const courseCount = await prismaClient.course.count({
    where: {
      section: {
        section: {
          university: {
            id: params.university
          }
        }
      }
    }
  });

  const chapterCount = await prismaClient.chapter.count({
    where: {
      course: {
        section: {
          section: {
            university: {
              id: params.university
            }
          }
        }
      }
    }
  });


  return (
    <div className="min-h-screen bg-slate-200">
      <div className="h-56 relative">
        <div className="p-4 m-auto flex items-center justify-between">
          <Logo className="fill-white h-9 z-10" />
          <div className="dropdown dropdown-end">
            <label tabIndex={0}>
              <div className="avatar placeholder z-10">
                <div className="bg-base-100 text-primary rounded-full w-12">
                  <span>MX</span>
                </div>
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>

                <LogoutButton></LogoutButton>
              </li>
            </ul>
          </div>
        </div>
        <Image
          className="object-cover"
          fill
          src="/rennes1.webp"
          alt="Université de Rennes 1"
        ></Image>
      </div>

      <div className="backdrop-blur-lg bg-white/50 p-6 rounded-xl -mt-24 space-y-6 max-w-5xl mx-auto shadow center">
        <h1 className="font-bold text-3xl flex items-center space-x-2">{universityData?.name}</h1>

        <div className="md:grid grid-cols-3 hidden">
          <div className="space-y-2">
            <h2 className="text-neutral/80 text-lg font-bold">
              🧑‍🎓 Étudiants sur Schooliu
            </h2>
            <h3 className="text-4xl font-bold">{studentCount}</h3>
          </div>

          <div className="space-y-2">
            <h2 className="text-neutral/80 text-lg font-bold">
              📚 Nombre de matières
            </h2>
            <h3 className="text-4xl font-bold">{courseCount}</h3>
          </div>

          <div className="space-y-2">
            <h2 className="text-neutral/80 text-lg font-bold">
              📝 Nombre de fiche
            </h2>
            <h3 className="text-4xl font-bold">{chapterCount}</h3>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 rounded-xl max-w-5xl mx-auto bg-white shadow">
        {children}
      </div>
    </div>
  );
}
