import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteEducation } from '../../actions/profileActions';

const Education = () => {
  const dispatch = useDispatch();

  const {
    profile: { education },
  } = useSelector(state => state.profile);

  const handleDelete = id => {
    dispatch(deleteEducation(id));
  };

  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
