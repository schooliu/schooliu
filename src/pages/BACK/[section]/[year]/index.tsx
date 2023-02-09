import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SchoolPageLayout from "../../../../components/SchoolPageLayout";
import { NextPage } from "next";
import { api } from "../../../../utils/api";

const workButtonName = [
  "Travailler",
  "Je me lance",
  "Je m'y mets",
  "J'ai un examen demain",
  "C'est parti",
  "Allons-y",
  "Au boulot",
  "Let's do it",
  "Let's get started",
  "Let's begin",
  "Let's go",
  "On y va",
  "Je commence",
  "Je m'attelle à la tâche",
  "Je me plonge dans le travail",
  "Je me met au travail",
  "J'entame la journée",
  "J'entame la tâche"
];

function randomWorkButtonName(seed: string) {
  return workButtonName[Math.floor(seed.split("").reduce((a, b) => a + b.charCodeAt(0), 0) % workButtonName.length)];
}


function SubjectCard(props: { image: string; name: string; description: string; slug: string, university: string, section: string, year: string }) {

  return <div className="card w-full bg-base-100 shadow-xl image-full overflow-hidden">
    <Image
      className="object-cover"
      fill
      src={props.image}
      alt={props.name}
    ></Image>
    <div className="card-body">
      <h2 className="card-title">{props.name}</h2>
      <p>{props.description}</p>
      <div className="card-actions justify-end">
        <Link
          href={`/${props.university}/${props.section}/${props.year}/${props.slug}`}
          className="btn btn-primary btn-sm"
        >
          {randomWorkButtonName(props.name)}
        </Link>
      </div>
    </div>
  </div>;
}

export default (() => {
  const router = useRouter();
  const { university, section, year } = router.query;

  const { data } = api.course.getCoursesByUnivSectionSectionYear.useQuery({
    univID: university as string,
    sectionSlug: section as string,
    sectionYearSlug: year as string
  });

  return (
    <>
      <SchoolPageLayout>
        <div className="space-y-4">
          <h1 className="font-bold text-3xl">📚 Matières</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.map(course => (
              <SubjectCard key={course.slug} slug={course.slug} name={course.title} description={course.description}
                           image={"/subjects/math.jpg"} university={university as string} year={year as string}
                           section={section as string} />
            ))}
          </div>
        </div>
      </SchoolPageLayout>
    </>

  );
}) satisfies NextPage;
