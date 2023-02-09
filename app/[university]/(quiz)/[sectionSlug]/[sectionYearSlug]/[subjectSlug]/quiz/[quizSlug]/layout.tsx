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
                className="btn">Abandonner</Link>
        </div>


        {children}


      </div>
    </div>

  );
}
