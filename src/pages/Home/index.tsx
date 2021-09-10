import { FC } from "react";
import Hero from "../../components/HomePage/Hero";
import Categories from "../../components/HomePage/Categories";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    return (
        <>
            <Hero />
            <Categories />
        </>
    );
};

export default Home;
