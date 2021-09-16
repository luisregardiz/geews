import { FC } from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { categories } from "../../helpers/categories";
import { colorCategory } from "../../helpers/colorCategory";
import FooterImage from "../../images/footer.svg";
interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    const actualYear = new Date().getFullYear();
    return (
        <footer className="mt-10">
            <div className=" rounded-t-3xl border-2 border-black w-full flex md:flex-row flex-col justify-between  space-y-5 md:space-y-0 p-5">
                <div className="md:w-1/3 flex justify-center">
                    <img
                        src={FooterImage}
                        alt="Footer"
                        className="object-contain w-48"
                    />
                </div>
                <div className="flex flex-col  md:w-1/3 items-center">
                    <div className="space-y-3">
                        <h4 className="font-black text-2xl">Posts:</h4>
                        <Link className="text-lg" to="/posts">
                            All posts
                        </Link>
                    </div>
                    <div className="space-y-2 mt-5">
                        <h4 className="font-black text-2xl">Follow:</h4>
                        <ul className="flex items-center space-x-4">
                            <li>
                                <a
                                    href="https://twitter.com/lregardizz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/luisregardiz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/lregardizz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 md:w-1/3 items-center">
                    <h4 className="font-black text-2xl ">Categories:</h4>
                    <ul className="flex flex-wrap gap-2 capitalize justify-center">
                        {categories.map((category) => {
                            return (
                                <li
                                    className={` font-bold bg-${colorCategory(
                                        category
                                    )} text-white px-4 py-1 rounded-xl`}
                                >
                                    <Link
                                        key={category}
                                        to={`/posts/${category}`}
                                    >
                                        {category}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="bg-black text-white py-2 px-5">
                <span className="text-xl font-bold">
                    &copy; {actualYear} Geews - All rights reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
