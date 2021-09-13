import { motion } from "framer-motion";
import { FC } from "react";
import { categories } from "../../../helpers/categories";
import { colorCategory } from "../../../helpers/colorCategory";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
    return (
        <div className="min-h-screen p-4">
            <div className="bg-yellow-400 h-1 w-1/4 mx-auto my-6"></div>
            <div className="flex flex-col  items-center">
                <div className="space-y-3">
                    <h1 className="text-5xl font-black">
                        Select the category you like the most
                    </h1>
                    <p className="text-xl text-gray-600">
                        Write a post in any of these categories
                    </p>
                </div>
                <div className="flex flex-wrap  gap-5 my-5 justify-center">
                    {categories.map((category) => (
                        <motion.div
                            key={category}
                            className={`w-36 h-40 flex flex-col px-5 cursor-pointer justify-center bg-${colorCategory(
                                category
                            )} rounded-xl shadow-lg `}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{
                                type: "spring",
                                duration: 0.5,
                                stiffness: 150,
                            }}
                        >
                            <span className="inline-flex font-black text-xl text-white">
                                {category}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
