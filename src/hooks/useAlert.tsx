import { useState } from "react";

export const useAlert = () => {
    const [showAlert, setShowAlert] = useState(false);
    return { showAlert, setShowAlert };
};
