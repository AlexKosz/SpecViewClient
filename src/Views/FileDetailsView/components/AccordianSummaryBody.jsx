import React from 'react';
import PropTypes from 'prop-types';

const AccordianSummaryBody = ({ data }) => {
  return (
    <div className="accordianSummaryBox">
      <h5>{data.name}</h5>
      <div className="flex accordianCountsWrapper">
        {typeof data.passed === 'number' && (
          <div className="successBg successText summaryCountBox">{data.passed}</div>
        )}
        {typeof data.failed === 'number' && (
          <div className="errorBg ErrorText summaryCountBox">{data.failed}</div>
        )}
      </div>
    </div>
  );
};

export default AccordianSummaryBody;

AccordianSummaryBody.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertionResults: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        failureMessages: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    failed: PropTypes.number,
    passed: PropTypes.number,
  }).isRequired,
};
