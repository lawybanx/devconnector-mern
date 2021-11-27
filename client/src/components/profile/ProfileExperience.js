import formatDate from '../../utils/formatDate';

const ProfileExperience = ({
  experience: { title, company, from, to, location, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {' '}
        {formatDate(from)} - {to ? formatDate(to) : 'Current'}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {location.length > 0 && (
        <p>
          <strong>Location: </strong> {location}
        </p>
      )}
      {description.length > 0 && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

export default ProfileExperience;
