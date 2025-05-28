import React, { useState } from "react";
import validator from "validator";
import "./CreditCard.css";
import { getCardLogo, getCardType } from "./CardLogo";

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [cardType, setCardType] = useState("default");
  const [cardHolder, setCardHolder] = useState("Manaswini");
  const [isCvvValid, setIsCvvValid] = useState(null);

  const handleCardInput = (e) => {
    const formatted = e.target.value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(formatted);
    setIsValid(validator.isCreditCard(formatted));
    const type = getCardType(formatted);
    setCardType(type);
  };

  const getExpectedCVVLength = (type) => {
    return type === "amex" ? 4 : 3;
  };

  const logoSrc = getCardLogo(cardType);

  return (
    <div className="card-container">
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="front">
          <h3>CREDIT CARD</h3>
          <img src={logoSrc} alt={cardType} className="card-logo" />
          <p>{cardHolder}</p>
          <p>{cardNumber || "#### #### #### ####"}</p>
          <p>{expiry || "MM/YY"}</p>
        </div>
        <div className="back">
          <div className="strip" />
          <p>{cvv || "CVV"}</p>
        </div>
      </div>
      <div className="form">
        <label htmlFor="cardholder">Cardholder Name</label>
        <input
          id="cardholder"
          type="text"
          placeholder="Manaswini"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          aria-label="Credit card number"
          aria-invalid={isValid === false}
          type="text"
          value={cardNumber}
          onChange={handleCardInput}
          maxLength="19"
          placeholder="#### #### #### ####"
        />
        <label htmlFor="expiry"> Expiry Date</label>
        <input
          id="expiry"
          type="text"
          placeholder="MM/YY"
          maxLength="5"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        ></input>
        <label htmlFor="cvv">CVV</label>
        <input
          id="cvv"
          type="text"
          placeholder="CVV"
          maxLength="4"
          value={cvv}
          onChange={(e) => {
            const input = e.target.value.replace(/\D/g, "");
            setCvv(input);

            const expectedLength = getExpectedCVVLength(cardType);
            setIsCvvValid(input.length === expectedLength);
          }}
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
          aria-invalid={isCvvValid === false}
        />

        <div
          role="status"
          aria-live="polite"
          style={{ marginTop: "10px", marginBottom: "60px" }}
        >
          {isValid === true && (
            <span style={{ color: "green" }}>✅ Valid Card</span>
          )}
          {isValid === false && (
            <span style={{ color: "red" }}>❌ Invalid Card</span>
          )}
          {isCvvValid === false && (
            <span style={{ color: "red" }}>❌ Invalid CVV</span>
          )}
          {isCvvValid === true && (
            <span style={{ color: "green" }}>✅ CVV OK</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
