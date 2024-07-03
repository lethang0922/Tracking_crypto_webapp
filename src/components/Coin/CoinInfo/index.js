import React, { useState } from 'react';
import "./styles.css";

function CoinInfo({ heading, desc }) {
  const [flag, setFlag] = useState(false);

  if (!heading || !desc) {
    return null; // or render a placeholder or loading state
  }

  // Ensure desc is a string before manipulating it
  const shortDesc = desc.slice(0, 250) + "<p style='color: var(--gray)'>Read More...</p>";
  const longDesc = desc + "<p style='color: var(--gray)'>Read Less...</p>";

  // Check if desc is long enough to truncate
  const shouldTruncate = desc.length > 250;

  return (
    <div className='grey-wrapper'>
      <h2 className='coin-info-heading'>{heading}</h2>
      {/* Render the description with or without truncation */}
      <p className='coin-info-desc'
        onClick={() => setFlag(!flag)}
        dangerouslySetInnerHTML={{ __html: flag || !shouldTruncate ? longDesc : shortDesc }}
      />
    </div>
  );
}

export default CoinInfo;
