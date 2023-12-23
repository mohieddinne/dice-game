import React from "react";
import "./Dice.css";
import '@fortawesome/fontawesome-free/css/all.css';
const Dice = ({ num, roll }) => {
    console.log({ num, roll })
    return (
        <div className="Die">
            <i className={`fas fa-dice-${num} ${roll ? "shake" : ""}`}></i>
        </div>
    );
};

export default Dice;
