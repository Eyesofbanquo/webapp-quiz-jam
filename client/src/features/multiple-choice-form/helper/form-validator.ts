export const validateFields = (
  questionText: string,
  firstChoice: string,
  secondChoice: string,
  thirdChoice: string,
  fourthChoice: string
) => {
  return (
    questionText.length > 0 &&
    firstChoice.length > 0 &&
    secondChoice.length > 0 &&
    thirdChoice.length > 0 &&
    fourthChoice.length > 0
  );
};
