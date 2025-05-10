import React from 'react';
import styled from 'styled-components';

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #666;
`;

const GuideTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
`;

const GuideText = styled.p`
  font-size: 16px;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const StepContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  max-width: 800px;
`;

const Step = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 220px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const StepNumber = styled.div`
  background-color: #4CAF50;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const EmptyCanvasGuide = () => {
  return (
    <GuideContainer>
      <GuideTitle>Welcome to Websites.co.in Drag-and-Drop Builder</GuideTitle>
      <GuideText>
        Transform your website design experience with our intuitive drag-and-drop interface.
        Get started by following these simple steps:
      </GuideText>
      
      <StepContainer>
        <Step>
          <StepNumber>1</StepNumber>
          <StepTitle>Choose Elements</StepTitle>
          <StepDescription>
            Browse through the elements in the left sidebar and select the ones you want to add to your website.
          </StepDescription>
        </Step>
        
        <Step>
          <StepNumber>2</StepNumber>
          <StepTitle>Drag & Drop</StepTitle>
          <StepDescription>
            Drag your selected elements onto the canvas and position them exactly where you want them.
          </StepDescription>
        </Step>
        
        <Step>
          <StepNumber>3</StepNumber>
          <StepTitle>Customize</StepTitle>
          <StepDescription>
            Click on any element to select it and use the properties panel on the right to customize its appearance.
          </StepDescription>
        </Step>
      </StepContainer>
    </GuideContainer>
  );
};

export default EmptyCanvasGuide;
