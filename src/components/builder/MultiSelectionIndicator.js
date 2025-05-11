import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
  background-color: #2196F3;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
  font-weight: normal;
`;

const ApplyButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #45a049;
  }
`;

const InfoText = styled.div`
  margin-bottom: 15px;
  color: #666;
  font-size: 13px;
`;

const MultiSelectionIndicator = ({ count, showApplyButton, onApplyToAll, propertyName }) => {
  return (
    <>
      {count > 1 && (
        <>
          <Badge>{count} selected</Badge>
          {showApplyButton && (
            <div style={{ marginTop: '5px' }}>
              <InfoText>
                Changes will apply to the primary selected element.
                Use the button below to apply to all selected elements.
              </InfoText>
              <ApplyButton onClick={onApplyToAll}>
                Apply {propertyName || 'this'} to All Selected
              </ApplyButton>
            </div>
          )}
        </>
      )}
    </>
  );
};

export { MultiSelectionIndicator, Badge, ApplyButton };
