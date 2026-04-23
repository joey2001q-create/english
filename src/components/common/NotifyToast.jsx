export default function NotifyToast() {
  return (
    <div className="notify-toast" id="notifyToast">
      <div className="notify-icon">
        <i className="fas fa-info-circle"></i>
      </div>
      <div className="notify-content">
        <h4 id="notifyTitle">提示</h4>
        <p id="notifyMsg">消息内容</p>
      </div>
    </div>
  );
}
