import prismaClient from "../../../../src/utils/prismaClient";
import YearCard from "./YearCard";

export default async function Page({ params }: { params: { university: string, sectionSlug: string } }) {
  const sectionYears = await prismaClient.sectionYear.findMany({
    where: {
      section: {
        slug: params.sectionSlug,
        university: {
          id: params.university
        }
      }
    }
  });
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">🎉 Années</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionYears.map(year => (
          <YearCard key={year.id} year={year} university={params.university}
                    section={params.sectionSlug}></YearCard>
        ))}
      </div>
    </div>
  );
}
