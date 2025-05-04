import React from 'react';
import PropTypes from 'prop-types';

const BaseAccordianBody = ({ data }) => {
  return (
    <div>
      <ul>
        {data?.assertionResults.map((assertion) => {
          return (
            <li
              key={assertion.fullName}
              style={{
                listStyleType: 'none',
                color: assertion.status === 'passed' ? 'green' : 'red',
              }}
            >
              <strong>{assertion.fullName}</strong>
              <ul>
                <li>
                  <strong>Status:</strong>
                  {assertion.status}
                </li>
                {assertion.failureMessages?.[0] && (
                  <li>
                    <strong>Failure Message:</strong>
                    {assertion.failureMessages?.[0] || 'No failure message'}
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BaseAccordianBody;

BaseAccordianBody.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertionResults: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        failureMessages: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
  }).isRequired,
};
