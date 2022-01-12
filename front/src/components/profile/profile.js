import React from 'react';
import './style.css';

export function Profile({
  fullName, birthDate, placeOfBirth, educationPlace, phoneNumber,
}) {
  return (
    <div className="profileContainer">
      <p>
        Name:
        {fullName}
      </p>
      <p>
        Birthday:
        {birthDate}
      </p>
      <p>
        Place of birth:
        {placeOfBirth}
      </p>
      <p>
        Place of study:
        {educationPlace}
      </p>
      <p>
        Phone:
        {phoneNumber}
      </p>
    </div>
  );
}
