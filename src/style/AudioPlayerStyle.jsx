import styled from "styled-components";

const PlayerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RangeSlider = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  appearance: none;
  width: 150px;
  background-color: transparent;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    border: 0.1rem solid ${({ theme }) => theme.color.subColor};
    border-radius: 5%;
    background-color: ${({ theme }) => theme.color.mainColor};
    cursor: pointer;
  }

  &::-moz-range-track {
    width: 100%;
    height: 0.5rem;
    border-radius: 5%;
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    margin-top: -0.3rem;
    border-right: 0.1rem solid ${({ theme }) => theme.color.buttonHoverSubColor};
    border-bottom: 0.1rem solid
      ${({ theme }) => theme.color.buttonHoverSubColor};
    border-radius: 5%;
    background-color: ${({ theme }) => theme.color.buttonHoverColor};
    cursor: pointer;

    &:active {
      border-right: 0.1rem solid
        ${({ theme }) => theme.color.modalBackgroundColor};
      border-bottom: 0.1rem solid
        ${({ theme }) => theme.color.modalBackgroundColor};
      background-color: ${({ theme }) => theme.color.buttonHoverFontColor};
    }
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border: 1px solid ${({ theme }) => theme.color.buttonHoverColor};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.buttonHoverColor};
    cursor: pointer;
  }

  &:disabled {
    &::-webkit-slider-runnable-track {
      background-color: ${({ theme }) => theme.color.buttonDisabledSubColor};
    }

    &::-webkit-slider-thumb {
      background-color: ${({ theme }) => theme.color.buttonDisabledColor};
    }
  }
`;

const TimeTable = styled.div`
  font-weight: bold;

  .duration-time {
    color: ${({ theme }) => theme.color.subColor};
  }
`;

const FileName = styled.div`
  position: absolute;
  left: 33%;
  bottom: -55%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const ResetButton = styled.button`
  padding: 0.7rem;
  border: none;
  background-color: ${({ theme }) => theme.color.buttonHoverFontColor};
  color: ${({ theme }) => theme.color.whiteColor};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.buttonMainFontColor};
    color: ${({ theme }) => theme.color.blackColor};
  }
`;

const UploadButton = styled.button`
  padding: 0.7rem;
  border: none;
  background-color: ${({ theme }) => theme.color.buttonHoverFontColor};
  color: ${({ theme }) => theme.color.whiteColor};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.buttonMainFontColor};
    color: ${({ theme }) => theme.color.blackColor};
  }
`;

const ControlButton = styled.button`
  padding: 0.7rem;
  border: none;
  background-color: ${({ theme }) => theme.color.mainColor};
  color: ${({ theme }) => theme.color.whiteColor};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.buttonHoverColor};
    color: ${({ theme }) => theme.color.blackColor};
  }
`;

export {
  PlayerContainer,
  RangeSlider,
  TimeTable,
  FileName,
  ResetButton,
  UploadButton,
  ControlButton,
};
