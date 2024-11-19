import React from "react";

interface CardProps {
  link: string;
  image: string;
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ link, image, name, description }) => {
  return (
    <div>
      <div className="card bg-base-100 w-80 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt={name} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions">
            <a href={link} className="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
