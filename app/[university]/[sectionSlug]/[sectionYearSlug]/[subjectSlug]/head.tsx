export default async function Head({ params }: { params: { university: string, sectionSlug: string, sectionYearSlug: string, subjectSlug: string } }) {
  return (
    <>
      <title>📚 {params.subjectSlug} - Cursus</title>
    </>
  );
}
