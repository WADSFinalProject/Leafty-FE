// AccordionUsage.jsx

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions'; // Import AccordionActions
import './AccordionUsage.css'; // Import the CSS file

export default function AccordionUsage({ accordions }) {
  return (
    <div>
      {accordions.map((accordion, index) => (
        <Accordion key={index} defaultExpanded={accordion.defaultExpanded} className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            {accordion.summary}
          </AccordionSummary>
          <AccordionDetails>
            {typeof accordion.details === 'function' ? (
              <accordion.details />
            ) : (
              <p>{accordion.details}</p>
            )}
            {accordion.actions && (
              <AccordionActions>
                {accordion.actions.map((action, idx) => (
                  <Button key={idx}>{action}</Button>
                ))}
              </AccordionActions>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
