"use client";
import { Quiz } from "@prisma/client";
import Link from "next/link";

export default function ExerciceCard({ quiz, pathBase }: { quiz: Quiz, pathBase: string }) {
  return <div className="card w-full bg-base-100 border-2">
    <div className="card-body">
      <h2 className="card-title">{quiz.name}</h2>
      <div className="card-actions">
        <Link className="btn btn-primary btn-xs" href={`${pathBase}/quiz/${quiz.slug}`}>Accéder à
          l'exercice</Link>
      </div>
    </div>
  </div>;
}
