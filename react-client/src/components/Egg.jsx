import React from 'react';

const Egg = props => (
  <div className="ui indicating progress" data-percent="50" id="example5">
    <div className="bar">
      <div className="progress"></div>
    </div>
    <div className="label">Waiting for you to press button</div>
  </div>
);

export default Egg;