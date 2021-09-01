import { FC } from "react";

export interface BannerAlertProps {}

const BannerAlert: FC<BannerAlertProps> = () => {
    return (
        <>
            <div className="bg-yellow-400 w-full flex items-center justify-center">
                <p className="py-1">Prueba</p>
            </div>
        </>
    );
};

export default BannerAlert;
