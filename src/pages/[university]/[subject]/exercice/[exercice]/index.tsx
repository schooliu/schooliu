import Image from "next/image";
export default () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <header className="p-4 max-w-5xl m-auto">
        <div className="flex justify-end ">
          <button className="btn">Abandonner</button>
        </div>
        <div className="flex justify-center flex-col space-y-4">
          <h1 className="font-bold text-xl text-center">
            Compare les nombre irrationnel avec d'autres nombres
          </h1>
          <h2 className="font-bold text-3xl text-center">Question 1/4</h2>
          <progress
            className="progress progress-primary w-full"
            value="25"
            max="100"
          ></progress>
        </div>
      </header>
      <main className="bg-white rounded-xl max-w-5xl m-auto p-10 space-y-6">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            fill
            className="object-contain"
            src="/subjects/math.jpg"
            alt="maths"
          ></Image>
        </div>

        <h1 className="font-bold text-4xl">Combien font 4 x 4 ?</h1>

        <div className="space-y-4">
          <button className="btn btn-lg w-full">58</button>
          <button className="btn btn-lg w-full">58</button>
          <button className="btn btn-lg w-full">58</button>
          <button className="btn btn-lg w-full">58</button>
        </div>
      </main>
    </div>
  )
}
