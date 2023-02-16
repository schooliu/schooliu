import Link from "next/link";

export default function Layout({
                                 children,
                                 params
                               }: { children: React.ReactNode, params: { university: string, sectionSlug: string, sectionYearSlug: string, subjectSlug: string, quizSlug: string } }) {
  return (
    <div className="bg-blue-100 bg-hero-pattern">
      <div className="m-auto max-w-5xl p-4 space-y-10 min-h-screen flex flex-col">
        <div className="flex justify-end">
          <Link href={`/${params.university}/${params.sectionSlug}/${params.sectionYearSlug}/${params.subjectSlug}`}
                className="btn">Annuler</Link>
        </div>

        <h1 className="text-center text-xl font-bold">Outil de création de quiz</h1>

        <div className="w-full rounded-3xl bg-white p-20">
          {children}
        </div>
      </div>
    </div>

  );
}
