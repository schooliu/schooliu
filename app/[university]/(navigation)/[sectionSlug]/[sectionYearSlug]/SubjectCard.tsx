import { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


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


export default function SubjectCard({
                                      subject,
                                      university,
                                      section,
                                      year
                                    }: { subject: Course, university: string, section: string, year: string }) {

  return <div className="card w-full bg-base-100 shadow-xl image-full overflow-hidden">
    <Image
      className="object-cover"
      fill
      // src={subject.image} TODO
      src="/subjects/math.jpg"
      alt={subject.title}
    ></Image>
    <div className="card-body">
      <h2 className="card-title">{subject.title}</h2>
      <p>{subject.description}</p>
      <div className="card-actions justify-end">
        <Link
          href={`/${university}/${section}/${year}/${subject.slug}`}
          className="btn btn-primary btn-sm"
        >
          {randomWorkButtonName(subject.slug)}
        </Link>
      </div>
    </div>
  </div>;
}
