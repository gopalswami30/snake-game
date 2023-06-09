import { useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers/reducers";
import React from "react";
const ScoreCard = () => {
    const score = useSelector((state: IGlobalState) => state.score);
    return (
        <h1>Current Score: {score}</h1>
    );
}

export default ScoreCard;