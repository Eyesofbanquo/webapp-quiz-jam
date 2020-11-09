export type InitialFormStateType = {
  questionText: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  fourthChoice: string;
  categoryIndex: number;
  difficultyIndex: number;
  showAlert: boolean;
  showSuccessAlert: boolean;
};

export const initialFormState: InitialFormStateType = {
  questionText: "",
  firstChoice: "",
  secondChoice: "",
  thirdChoice: "",
  fourthChoice: "",
  categoryIndex: 0,
  difficultyIndex: 0,
  showAlert: false,
  showSuccessAlert: false,
};
