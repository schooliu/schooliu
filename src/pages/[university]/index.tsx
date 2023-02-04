import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SchoolPageLayout from "../../components/SchoolPageLayout";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";


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

export default function() {
  const router = useRouter();
  const { university } = router.query;
  const { data } = api.section.getSectionsByUniversityId.useQuery({ id: university as string });
  return <SchoolPageLayout>
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">🎉 Cursus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((section) => (
          <SectionCard name={section.name} slug={section.slug} university={university as string}></SectionCard>
        ))}
      </div>
    </div>
  </SchoolPageLayout>;
}

function SectionCard(props: { name: string, slug: string, university: string }) {

  return <div className="card w-full bg-base-200 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{props.name}</h2>
      <div className="card-actions justify-end">
        <Link
          href={`/${props.university}/${props.slug}`}
          className="btn btn-primary btn-sm"
        >
          Voir les années
        </Link>
      </div>
    </div>
  </div>;
}
