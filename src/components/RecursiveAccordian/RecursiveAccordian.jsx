/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

const RecursiveAccordion = React.memo(
  ({ data, BaseAccordianBody, AccordianSummaryBody, isTop }) => {
    const children = Object.entries(data?.children || {}).map((c) => c[1]);

    const [expanded, setExpanded] = useState(!!isTop);

    const handleChange = (_, isExpanded) => {
      setExpanded(isExpanded);
    };

    return (
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordianSummaryBody data={data} />
        </AccordionSummary>

        {expanded && (
          <AccordionDetails disableRipple>
            {children?.length > 0 ? (
              <div style={{ marginLeft: 16 }}>
                {children.map((child, i) => {
                  return (
                    <RecursiveAccordion
                      key={i}
                      data={child}
                      BaseAccordianBody={BaseAccordianBody}
                      AccordianSummaryBody={AccordianSummaryBody}
                    />
                  );
                })}
              </div>
            ) : (
              <BaseAccordianBody data={data} />
            )}
          </AccordionDetails>
        )}
      </Accordion>
    );
  }
);

RecursiveAccordion.defaultProps = {
  isTop: false,
};

export default RecursiveAccordion;

RecursiveAccordion.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  BaseAccordianBody: PropTypes.elementType.isRequired,
  AccordianSummaryBody: PropTypes.elementType.isRequired,
  isTop: PropTypes.bool,
};
