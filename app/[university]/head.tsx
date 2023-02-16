import prismaClient from "../../src/utils/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";


export const getUniversity = cache(async (university: string) => {
  return prismaClient.university.findUnique({
    where: {
      id: university
    }
  });
});


export default async function Head({ params }: { params: { university: string } }) {
  const universityData = await getUniversity(params.university);

  if (!universityData) {
    notFound();
  }
  return (
    <>
      <title>{universityData.name + " - Schooliu"}</title>
    </>
  );
}
