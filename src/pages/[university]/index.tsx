import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SchoolPageLayout from "../../components/SchoolPageLayout";
import { getServerAuthSession } from "../../server/auth";


const subjects = [
  {
    name: "Mathématiques",
    description:
      "Les mathématiques sont l'ensemble des connaissances acquises par l'homme sur les nombres, les formes, les espaces, les structures, les transformations et les relations qui les lient.",
    slug: "mathematiques",
    image: "/subjects/math.jpg"
  },
  {
    name: "Physique",
    description:
      "La physique est la science qui étudie la matière et l'énergie, et leurs interactions entre elles.",
    slug: "physique",
    image: "/subjects/physics.jpg"
  },
  {
    name: "Chimie",
    description:
      "La chimie est la science qui étudie la matière et ses transformations.",
    slug: "chimie",
    image: "/subjects/chemistry.jpg"
  },
  {
    name: "Informatique",
    description:
      "L'informatique est la science qui étudie les principes et les méthodes de traitement de l'information par l'ordinateur.",
    slug: "informatique",
    image: "/subjects/computer-science.jpg"
  }
];
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

export const getServerSideProps = (async (context) => {
  const session = await getServerAuthSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  return {
    props: {
      session
    }
  };
}) satisfies GetServerSideProps;

function SubjectCard(props: { subject: { image: string; name: string; description: string; slug: string }, university: string | string[] | undefined }) {
  return <div className="card w-full bg-base-100 shadow-xl image-full overflow-hidden">
    <Image
      className="object-cover"
      fill
      src={props.subject.image}
      alt={props.subject.name}
    ></Image>
    <div className="card-body">
      <h2 className="card-title">{props.subject.name}</h2>
      <p>{props.subject.description}</p>
      <div className="card-actions justify-end">
        <Link
          href={`/${props.university}/${props.subject.slug}`}
          className="btn btn-primary btn-sm"
        >
          {randomWorkButtonName(props.subject.name)}
        </Link>
      </div>
    </div>
  </div>;
}

export default (() => {
  const router = useRouter();
  const { university } = router.query;

  return (
    <SchoolPageLayout>
      <div className="space-y-4">
        <h1 className="font-bold text-3xl">📚 Matières</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject, index) => (
            <SubjectCard key={subject.slug} subject={subject} university={university} />
          ))}
        </div>
      </div>
    </SchoolPageLayout>
  );
}) satisfies NextPage;
