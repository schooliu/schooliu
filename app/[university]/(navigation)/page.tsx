import prismaClient from "../../../src/utils/prismaClient";
import SectionCard from "./SectionCard";

export default async function Page({ params }: { params: { university: string } }) {
  const sections = await prismaClient.section.findMany({
    where: {
      universityID: params.university
    }
  });
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">🎉 Cursus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} university={params.university}></SectionCard>
        ))}
      </div>
    </div>
  );
}
