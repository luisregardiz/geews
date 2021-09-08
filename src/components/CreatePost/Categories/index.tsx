import { FC } from "react";
import { BlogFormEvent } from "../../../interfaces";
interface CategoriesProps {
    handleNewPost: (ev: BlogFormEvent) => void;
}
const Categories: FC<CategoriesProps> = ({ handleNewPost }) => {
    return (
        <div className="form-group md:w-1/4">
            <label htmlFor="category" className="font-bold flex items-center ">
                Category
            </label>
            <select
                onChange={(ev) => handleNewPost(ev)}
                name="category"
                id="category"
                className="block w-full mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            >
                <option value="">-Select category-</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="music">Music</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="fitness">Fitness</option>
                <option value="sports">Sports</option>
                <option value="finance">Finance</option>
                <option value="political">Political</option>
                <option value="movies">Movies</option>
                <option value="cars">Cars</option>
                <option value="news">News</option>
            </select>
        </div>
    );
};

export default Categories;
