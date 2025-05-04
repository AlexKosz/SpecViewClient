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
        {typeof data.passed === 'number' && (
          <StatusChip
            count={data.passed || '0'}
            variant={chipVariants.success}
            sx={{ padding: '0.2rem' }}
          />
        )}
        {typeof data.failed === 'number' && (
          <StatusChip
            count={data.failed || '0'}
            variant={chipVariants.error}
            sx={{ padding: '0.2rem' }}
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
