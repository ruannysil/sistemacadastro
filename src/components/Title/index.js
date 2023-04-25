import { TitleText } from "./style";
export default function Title({ children, name }) {
  return (
    <TitleText>
      {children}
      <span>{name}</span>
    </TitleText>
  );
}
