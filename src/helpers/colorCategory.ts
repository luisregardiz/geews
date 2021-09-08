export const colorCategory = (category: string) => {
    switch (category) {
        case "technology":
            return "blue-600";
        case "food":
            return "green-600";
        case "travel":
            return "indigo-600";
        case "music":
            return "purple-600";
        case "lifestyle":
            return "pink-600";
        case "fitness":
            return "yellow-500";
        case "sports":
            return "indigo-500";
        case "finance":
            return "blue-500";
        case "political":
            return "gray-500";
        case "movies":
            return "yellow-400";
        case "cars":
            return "red-600";
        case "news":
            return "indigo-700";
        default:
            break;
    }
};
