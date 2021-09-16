module.exports = {
    purge: {
        content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        safelist: [
            "bg-blue-600",
            "bg-green-600",
            "bg-indigo-600",
            "bg-purple-600",
            "bg-pink-600",
            "bg-yellow-500",
            "bg-indigo-500",
            "bg-green-500",
            "bg-gray-500",
            "bg-yellow-400",
            "bg-red-600",
            "bg-indigo-700",
            "bg-green-700",
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            gridColumn: ["first"],
            opacity: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
