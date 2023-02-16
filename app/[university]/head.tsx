import prismaClient from "../../src/utils/prismaClient";
import { notFound } from "next/navigation";

export default async function Head({ params }: { params: { university: string } }) {
  const universityData = await prismaClient.university.findUnique({
    where: {
      id: params.university
    }
  });
  if (!universityData) {
    notFound();
  }
  return (
    <>
      <title>{universityData.name + " - Schooliu"}</title>
    </>
  );
}
