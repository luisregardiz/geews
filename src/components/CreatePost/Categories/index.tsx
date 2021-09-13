import { FC } from "react";
import { categories } from "../../../helpers/categories";
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
                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                        className="capitalize"
                    >
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Categories;
