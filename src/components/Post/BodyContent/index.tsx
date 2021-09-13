import parse from "html-react-parser";
import { FC } from "react";
import { bodyFormated } from "../../../helpers/bodyFormated";

interface BodyContentProps {
    body: string;
}

const BodyContent: FC<BodyContentProps> = ({ body }) => {
    const newBody = bodyFormated(body);

    return <div className="md:w-4/5 w-full">{parse(newBody)}</div>;
};

export default BodyContent;
