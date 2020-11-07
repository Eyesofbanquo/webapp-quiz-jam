import { InitialFormStateType } from "./form-state";

export const reducer = (
  state: InitialFormStateType,
  action: { type: keyof InitialFormStateType; payload: any }
) => {
  return { ...state, [action.type]: action.payload };
};
