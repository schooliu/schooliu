export default function AnswerDisplay({
                                        successText,
                                        invalidText,
                                        isValid
                                      }: {
  successText?: string;
  invalidText?: string;
  isValid: boolean;
}) {
  if (isValid) {
    return (
      <div className="alert alert-success shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Bonne réponse !</h3>
            <div className="text-xs">{successText}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Mauvaise réponse!</h3>
            <div className="text-xs">{invalidText}</div>
          </div>
        </div>
      </div>
    );
  }
}
