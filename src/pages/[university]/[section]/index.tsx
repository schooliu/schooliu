import SchoolPageLayout from "../../../components/SchoolPageLayout";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import Link from "next/link";

export default function() {
  const router = useRouter();
  const { university } = router.query;
  const { section } = router.query;
  const { data } = api.section.getSectionsYearByUnivSectionSlugs.useQuery({
    univID: university as string,
    sectionSlug: section as string
  });

  return <SchoolPageLayout>
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">🎉 Années</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map(year => (
          <YearCard name={year.name} slug={year.slug} university={university as string}
                    section={section as string}></YearCard>
        ))}
      </div>
    </div>
  </SchoolPageLayout>;
}

function YearCard(props: { name: string, slug: string, university: string, section: string }) {
  return <div className="card w-full bg-base-200 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{props.name}</h2>
      <div className="card-actions justify-end">
        <Link
          href={`/${props.university}/${props.section}/${props.slug}`}
          className="btn btn-primary btn-sm"
        >
          Voir les années
        </Link>
      </div>
    </div>
  </div>;
}
