import React, { useState, useEffect } from "react";
import "./DiceRoll.css";
import Dice from "./dice/Dice.jsx";
import { getRandomNumber } from "../utils/getRandomNumber.js";

/**
 * Composant principal représentant le jeu de dés.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.selectedLimit - La limite de points pour gagner la partie.
 * @returns {JSX.Element} - Élément JSX représentant le jeu de dés.
 */
const DiceRoll = ({ selectedLimit }) => {
  const players = ["Joueur1", "Joueur2"];
  const numbers = ["one", "two", "three", "four", "five", "six"];

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [dice, setDice] = useState([{ randomNumber: "one", convertedNumber: 1 }, { randomNumber: "two", convertedNumber: 2 }]);
  const [scores, setScores] = useState({ Joueur1: 0, Joueur2: 0 });
  const [winner, setWinner] = useState(null);
  const [rolls, setRolls] = useState({ Joueur1: 0, Joueur2: 0 });

  const result = dice.reduce((sum, { convertedNumber }) => sum + convertedNumber, 0);

  /**
   * Fonction qui met à jour les scores et passe au joueur suivant.
   * @function
   * @private
   */
  const updateScoresAndSwitchPlayer = () => {
    setScores((prevScores) => ({ ...prevScores, [players[currentPlayerIndex]]: prevScores[players[currentPlayerIndex]] + result }));
    setRolls((prevRolls) => ({ ...prevRolls, [players[currentPlayerIndex]]: prevRolls[players[currentPlayerIndex]] + 1 }));
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  /**
   * Fonction qui vérifie s'il y a un gagnant.
   * @function
   * @private
   */
  const checkWinner = () => {
    if (rolls.Joueur1 === rolls.Joueur2) {
      if (scores.Joueur1 === scores.Joueur2 && scores.Joueur1 >= selectedLimit) {
        setWinner("draw");
      } else if (scores.Joueur1 > scores.Joueur2 && scores.Joueur1 >= selectedLimit) {
        setWinner("Joueur 1 est le gagnant !");
      } else if (scores.Joueur2 > scores.Joueur1 && scores.Joueur2 >= selectedLimit) {
        setWinner("Joueur 2 est le gagnant!");
      }
    }
  };
  /**
   * Fonction qui réinitialise le jeu.
   * @function
   * @private
   */
  const resetGame = () => {
    setIsRolling(false);
    setDice([{ randomNumber: "one", convertedNumber: 1 }, { randomNumber: "two", convertedNumber: 2 }]);
    setScores({ Joueur1: 0, Joueur2: 0 });
    setCurrentPlayerIndex(0);
    setRolls({ Joueur1: 0, Joueur2: 0 });
    setWinner(null);
  };
  /**
    * Effet de côté pour gérer le déroulement du jeu.
    * @effect
    * @private
    */
  useEffect(() => {
    if (isRolling) {
      const timerId = setTimeout(() => {
        setIsRolling(false);
        updateScoresAndSwitchPlayer();
      }, 1000);

      return () => clearTimeout(timerId);
    }
    checkWinner();
  }, [isRolling, scores, checkWinner, updateScoresAndSwitchPlayer]);
  /**
    * Détermine si un joueur a déjà joué.
    * @type {boolean}
    * @private
    */
  const hasPlayed = (scores.Joueur2 > 0 || scores.Joueur1 > 0) && rolls.Joueur1 === rolls.Joueur2;

  return (
    <div className="DiceRoll">
      <div>
        {dice.map(({ randomNumber }, index) => (
          <Dice key={index} roll={isRolling} num={randomNumber} />
        ))}
      </div>
      <div>{(scores.Joueur2 > 0 || scores.Joueur1 > 0) && result}</div>
      <button
        disabled={isRolling || winner}
        className={`btnGame ${isRolling || winner ? "disabled" : ""}`}
        onClick={() => {
          setIsRolling(true);
          setDice([getRandomNumber(numbers), getRandomNumber(numbers)]);
        }}
      >
        {isRolling ? "En cours..." : "Lancer les dés !"}
      </button>
      <button
        className={`btnGame ${!winner ? "disabled" : ""}`}
        disabled={!winner}
        onClick={resetGame}
      >
        Réinitialiser
      </button>
      {Object.entries(scores).map(([player, score]) => (
        <p key={player}>{`Le ${player} a joué ${rolls[player]} fois et a obtenu un score de ${score}`}</p>
      ))}
      <div>
        {hasPlayed && winner ? (
          <p>{`${winner === "draw" ? 'Il s"agit d"une égalité!' : winner}`}</p>
        ) : (
          <p>Il n'y a pas encore de vainqueur.</p>
        )}
      </div>
    </div>
  );
};

export default DiceRoll;
