import { FC } from "react";
import Hero from "../../components/HomePage/Hero";
import Categories from "../../components/HomePage/Categories";
import CreateSection from "../../components/HomePage/Create";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    return (
        <>
            <Hero />
            <Categories />
            <CreateSection />
        </>
    );
};

export default Home;
