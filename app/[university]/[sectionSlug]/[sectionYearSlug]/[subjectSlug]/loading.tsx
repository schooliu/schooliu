export default async function Loading({ params }: { params: { university: string, sectionSlug: string, sectionYearSlug: string, subjectSlug: string } }) {
  return (
    <div className="space-y-4">
      Chargement...
    </div>
  );
}
