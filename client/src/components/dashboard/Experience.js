import React from 'react';
import { useSelector } from 'react-redux';

const Experience = () => {
  const {
    profile: { experience },
  } = useSelector(state => state.profile);

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
        <tbody>
          {experience.map(exp => (
            <tr>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td className="hide-sm">
                {exp.from} - {exp.to}
              </td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Experience;
