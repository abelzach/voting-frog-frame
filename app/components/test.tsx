"use client";
import { useEffect } from "react";
import { useBiconomyAccount } from "../biconomy/useBiconomyAccount";

const BiconomyTest = () => {
    const { smartAccount } = useBiconomyAccount();

    useEffect(() => {
        if (smartAccount) {
            console.log('my Biconomy smart account', smartAccount)
            console.log(smartAccount.getSigner());
        }
    }, [smartAccount])

    return <></>;
};

export default BiconomyTest;
