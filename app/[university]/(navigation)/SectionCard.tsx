import { Section } from "@prisma/client";
import Link from "next/link";

export default function SectionCard({ section, university }: { section: Section, university: string }) {

  return <div className="card w-full bg-base-200 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{section.name}</h2>
      <div className="card-actions justify-end">
        <Link
          href={`/${university}/${section.slug}`}
          className="btn btn-primary btn-sm"
        >
          Voir les années
        </Link>
      </div>
    </div>
  </div>;
}
