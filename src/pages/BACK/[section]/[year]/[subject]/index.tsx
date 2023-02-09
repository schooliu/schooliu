import { Quiz } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import SchoolPageLayout from "../../../../../components/SchoolPageLayout";
import { api } from "../../../../../utils/api";


const chapters = [
    {
        name: "Les nombres complexes",
        description:
          "Les nombres complexes sont des nombres qui sont définis par une partie réelle et une partie imaginaire.",
        slug: "les-nombres-complexes",
        exercises: []
    },
    {
        name: "Les nombres rationnels",
        description:
          "Les nombres rationnels sont des nombres qui peuvent être écrit sous la forme d'une fraction.",
        slug: "les-nombres-rationnels",
        exercises: [
            {
                name: "Additionner des nombres rationnels",
                slug: "additionner-des-nombres-rationnels"
            },
            {
                name: "Soustraire des nombres rationnels",
                slug: "soustraire-des-nombres-rationnels"
            }
        ]
    },
    {
        name: "Les nombres réels",
        description:
          "Les nombres réels incluent tous les nombres qui peuvent être représentés sur une ligne numérique, y compris les nombres rationnels et les nombres irrationnels.",
        slug: "les-nombres-reels",
        exercises: []
    },
    {
        name: "Les nombres irrationnels",
        description:
          "Les nombres irrationnels sont des nombres qui ne peuvent pas être écrits sous la forme d'une fraction rationnelle.",
        slug: "les-nombres-irrationnels",
        exercises: [
            {
                name: "Trouver la racine carrée d'un nombre irrationnel",
                slug: "trouver-la-racine-carree-d-un-nombre-irrationnel"
            },
            {
                name: "Compare les nombre irrationnel avec d'autres nombres",
                slug: "comparer-les-nombres-irrationnels-avec-d-autres-nombres"
            }
        ]
    }
];

function ChapterCard(props: { chapter: { exercises: any[]; name: string; description: string; slug: string } | { exercises: ({ name: string; slug: string })[]; name: string; description: string; slug: string }, university: string, subject: string }) {
    return <div className="card w-full bg-base-100 border-2">
        <div className="card-body">
            <h2 className="card-title">{props.chapter.name}</h2>
            <p>{props.chapter.description}</p>
            <div className="card-actions">
                <button className="btn btn-primary btn-xs">Accéder au cours</button>
            </div>
        </div>
    </div>;
}

function ExerciceCard({ quiz }: { quiz: Quiz }) {
    const router = useRouter();
    return <div className="card w-full bg-base-100 border-2">
        <div className="card-body">
            <h2 className="card-title">{quiz.name}</h2>
            <div className="card-actions">
                <Link className="btn btn-primary btn-xs" href={`${router.asPath}/exercice/${quiz.slug}`}>Accéder à
                    l'exercice</Link>
            </div>
        </div>
    </div>;
}

export default (() => {
    const router = useRouter();
    const { university, subject, year, section } = router.query;

    const { data: exercices } = api.quiz.getAllQuizBySlugs.useQuery({
        univID: university as string,
        courseSlug: subject as string,
        sectionYearSlug: year as string,
        sectionSlug: section as string
    });


    return (
      <SchoolPageLayout>
          <div className="space-y-4">
              <h1 className="flex items-center space-x-4 text-xl font-bold">
                  <Link href={`/${university}/${section}/${year}`}>
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                          <path
                            d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" />
                      </svg>
                  </Link>
                  <div>Mathématiques</div>
              </h1>
              <div className="divider"></div>
              <h1 className="font-bold text-3xl">📝 Chapitres</h1>

              <div className="alert shadow-lg">
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           className="stroke-current flex-shrink-0 w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>À venir...</span>
                  </div>
              </div>
              {/*<div className="space-y-4">*/}
              {/*    {chapters.map((chapter) => (*/}
              {/*        <ChapterCard chapter={chapter} subject={subject as string} university={university as string}/>*/}
              {/*    ))}*/}
              {/*</div>*/}


              <div className="divider"></div>
              <h1 className="font-bold text-3xl">📝 Exercices</h1>
              <div className="space-y-4">
                  {exercices?.map(exercice => (
                    <ExerciceCard quiz={exercice}></ExerciceCard>
                  ))}

              </div>

          </div>
      </SchoolPageLayout>
    );
}) as React.FC;
