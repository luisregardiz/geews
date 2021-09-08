import { FC } from "react";
import Hero from "../../components/Hero";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    return (
        <>
            <Hero />
        </>
    );
};

export default Home;
