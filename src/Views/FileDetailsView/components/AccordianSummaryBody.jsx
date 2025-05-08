import React from 'react';
import PropTypes from 'prop-types';
import StatusChip from '../../../components/StatusChip/StatusChip';
import chipVariants from '../../../components/StatusChip/chipVariants';

const AccordianSummaryBody = ({ data }) => {
  return (
    <div className="accordianSummaryBox">
      <h5>
        {typeof data.name === 'string' && data.name.trim()
          ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
          : ''}
      </h5>

      <div className="flex accordianCountsWrapper">
        {typeof data.passed === 'number' && data.passed !== 0 && (
          <StatusChip
            count={data.passed}
            variant={chipVariants.success}
            sx={{ padding: '0.2rem' }}
            testId="passed-count"
          />
        )}
        {typeof data.failed === 'number' && data.failed !== 0 && (
          <StatusChip
            count={data.failed}
            variant={chipVariants.error}
            sx={{ padding: '0.2rem' }}
            testId="failed-count"
          />
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
    ),
    failed: PropTypes.number,
    passed: PropTypes.number,
  }).isRequired,
};
