import { SectionYear } from "@prisma/client";
import Link from "next/link";

export default function YearCard({
                                   year,
                                   university,
                                   section
                                 }: { year: SectionYear, university: string, section: string }) {
  return <div className="card w-full bg-base-200 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{year.name}</h2>
      <div className="card-actions justify-end">
        <Link
          href={`/${university}/${section}/${year.slug}`}
          className="btn btn-primary btn-sm"
        >
          Voir les années
        </Link>
      </div>
    </div>
  </div>;
}
