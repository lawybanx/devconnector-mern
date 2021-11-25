import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteExperience } from '../../actions/profileActions';

const Experience = () => {
  const dispatch = useDispatch();

  const {
    profile: { experience },
  } = useSelector(state => state.profile);

  const handleDelete = id => {
    dispatch(deleteExperience(id));
  };

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default Experience;
