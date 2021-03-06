import Spinner from "../Spinner";

interface IProps {
  isLoading?: boolean;
  content: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

function Button({ isLoading, content, onClick, active, disabled }: IProps) {
  const className = isLoading
    ? "button button-active button-loading"
    : active
    ? "button button-active"
    : disabled
    ? "button button-disabled"
    : "button";
  return (
    <div className={className} onClick={!disabled ? onClick : () => {}}>
      {isLoading && <Spinner />}
      <section>{content}</section>
    </div>
  );
}

export default Button;
