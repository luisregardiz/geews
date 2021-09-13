import { motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../helpers/categories";
import { colorCategory } from "../../helpers/colorCategory";

interface FilterSectionProps {}

const FilterSection: FC<FilterSectionProps> = () => {
    return (
        <div className="my-5 ">
            <span className="text-md underline flex items-center">
                Filter by category
            </span>
            <div className="flex  gap-4 overflow-x-auto p-4 categories ">
                <Link to="/posts">
                    <motion.button
                        className="px-4 py-2 rounded-xl shadow-lg uppercase font-black text-white text-xs bg-gray-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                            stiffness: 150,
                        }}
                    >
                        All
                    </motion.button>
                </Link>
                {categories.map((category) => (
                    <Link key={category} to={`/posts/${category}`}>
                        <motion.button
                            className={`px-4 py-2 rounded-xl shadow-lg uppercase font-black text-white text-xs bg-${colorCategory(
                                category
                            )} `}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{
                                type: "spring",
                                duration: 0.5,
                                stiffness: 150,
                            }}
                        >
                            {category}
                        </motion.button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FilterSection;
