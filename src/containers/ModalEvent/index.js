import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// Capitalsation de la première lettre du Mois affiché dynamiquement dans la modale
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const ModalEvent = ({ event }) => {
  const month = capitalizeFirstLetter(getMonth(new Date(event.date)));

  return (
    <div className="ModalEvent">
      <div className="ModalEvent__imageContainer">
        <img
          data-testid="card-image-testid"
          src={event.cover}
          alt={event.title}
        />
      </div>
      <div className="ModalEvent__title">
        <div className="ModalEvent__titleLabel">{event.title}</div>
        <div className="ModalEvent__titlePeriode">
          {`${event.periode} ${month}`}
        </div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Description</h3>
        <div>{event.description}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Participants</h3>
        <div>{event.nb_guesses} participants</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Prestations</h3>
        {event.prestations.map((presta) => (
          <div key={presta}>{presta}</div>
        ))}
      </div>
    </div>
  );
};

ModalEvent.propTypes = {
  event: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    periode: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nb_guesses: PropTypes.number.isRequired,
    prestations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ModalEvent;
