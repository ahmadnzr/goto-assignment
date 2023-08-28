export interface PopupProps {
  open: boolean;
  title: string;
  desc?: string;
}
export type InputField = {
  lastname: string;
  firstname: string;
  [key: string]: string;
};
