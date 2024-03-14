interface IProps {
  mine?: boolean;
  username: string;
  message: string;
  time: string;
}

export default function MessageBox({ message, mine, time, username }: IProps) {
  return (
    <div className={`message-box__container ${mine ? "align-right" : ""}`}>
      {!mine && <div className="message-box__username">{username}</div>}
      <div className="message-box__message">{message}</div>
      <div className="message-box__time">{time}</div>
    </div>
  );
}
