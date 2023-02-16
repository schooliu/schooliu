import Link from "next/link";

export default function({
                          correctAnswers,
                          totalQuestions,
                          backUrl
                        }: { correctAnswers: number, totalQuestions: number, backUrl: string }) {
  const percentage = Math.round(correctAnswers / totalQuestions * 100);

  return (
    <>
      <div className="flex items-center gap-10 justify-center mb-10">
        <div className="font-bold text-3xl text-primary">
          Tu as répondu juste à {correctAnswers} questions sur {totalQuestions}
        </div>
      </div>
      <div>
        <Link href={backUrl} className="btn-full btn w-full">Retour</Link>
      </div>
    </>
  );
}
