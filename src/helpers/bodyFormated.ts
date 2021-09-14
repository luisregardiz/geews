export const bodyFormated = (body: string) => {
    const newBody = body
        .replaceAll("<h1>", '<h1 className=" font-black">')
        .replaceAll(
            "img",
            'img className="rounded-lg object-contain w-full  my-5 mx-auto"'
        )
        .replaceAll(
            "<p>",
            '<p className="antialiased leading-relaxed whitespace-pre-line mx-auto text-lg">'
        )
        .replaceAll("<h2>", '<h2 className="font-black">')
        .replaceAll(
            "<span>",
            '<span className="antialiased leading-relaxed whitespace-pre-line mx-auto text-lg"'
        )
        .replaceAll(
            "<ul>",
            '<ul className="list-disc list-inside border-2 border-gray-900 inline-flex flex-col p-4 rounded-xl my-3 shadow-md space-y-5">'
        )
        .replaceAll(
            "<ol>",
            '<ol className="list-decimal list-inside border-2 border-gray-900 inline-flex flex-col p-4 rounded-xl my-3 shadow-md space-y-5">'
        )
        .replaceAll(
            "<pre>",
            '<pre className="bg-gray-900 text-gray-100 whitespace-pre-wrap p-5 rounded-lg shadow-lg">'
        )
        .replaceAll("<h3>", '<h3 className="font-black" >')
        .replaceAll("<h4>", '<h4 className="font-black" >')
        .replaceAll(
            "<blockquote>",
            '<blockquote className="italic text-gray-500 text-lg border-l-4 pl-2 my-2">'
        )
        .replaceAll("<strong>", '<strong className="font-extrabold">')
        .replaceAll("ql-align-center", "text-center")
        .replaceAll("ql-align-right", "text-right")
        .replaceAll(
            "ql-syntax",
            "bg-gray-900 text-gray-100 whitespace-pre-wrap p-5 rounded-lg shadow-lg"
        )
        .replaceAll("ql-indent-1", "pl-10");

    return newBody;
};
