import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Permet de faire un tri en recréant un tableau avec les données grâçe à data.focus et de le trier par date décroissante
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
      )
    : [];

  // Permet de passer à la slide suivante en évitant de bloquer à la fin du tableau
  const nextCard = () => {
    if (index === byDateDesc.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  // Permet de passer à la slide suivante toutes les 5 secondes mise à jour du timer à chaque changement
  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  // Permet de ne pas afficher le slider si il n'y a pas d'événements
  if (!byDateDesc.length) {
    return null;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || idx}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        {byDateDesc.map((event, radioIdx) => (
          <div className="SlideCard__pagination" key={event.id || radioIdx}>
            <input
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
              readOnly={index !== radioIdx}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
