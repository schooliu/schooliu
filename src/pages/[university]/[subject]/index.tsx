import Link from "next/link";
import { useRouter } from "next/router";
import SchoolPageLayout from "../../../components/SchoolPageLayout";


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
        <div className="alert alert-info">
          <div>
            <span>📝 Fiche de cours</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-ghost">
              Accéder au cours
            </button>
          </div>
        </div>

        {props.chapter.exercises.map((exercise) => (
          <div className="alert">
            <div>
              <span>✅ {exercise.name}</span>
            </div>
            <div className="flex-none">
              <Link
                href={`/${props.university}/${props.subject}/exercice/${exercise.slug}`}
                className="btn btn-sm btn-ghost"
              >
                Accéder à l'exercice
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

export default (() => {
  const router = useRouter();
  const { university, subject } = router.query;
  return (
    <SchoolPageLayout>
      <div className="space-y-4">
        <h1 className="flex items-center space-x-4 text-xl font-bold">
          <Link href={`/${university}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" />
            </svg>
          </Link>
          <div>Mathématiques</div>
        </h1>
        <div className="divider"></div>
        <h1 className="font-bold text-3xl">📝 Chapitres</h1>
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <ChapterCard chapter={chapter} subject={subject as string} university={university as string} />
          ))}
        </div>
      </div>
    </SchoolPageLayout>
  );
}) as React.FC;
