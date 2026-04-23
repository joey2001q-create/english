export default function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <h1>👋 欢迎使用刘彬英语提分专家</h1>
        <p>AI智能伴学 · 10大模块全覆盖 · 随时随地提分</p>
        <div className="banner-tags">
          <div className="banner-tag"><i className="fas fa-check-circle"></i>10大模块</div>
          <div className="banner-tag"><i className="fas fa-microphone-alt"></i>口语对话</div>
          <div className="banner-tag"><i className="fas fa-sitemap"></i>思维导图</div>
          <div className="banner-tag"><i className="fas fa-brain"></i>AI智能</div>
          <div className="banner-tag"><i className="fas fa-camera"></i>拍照答疑</div>
        </div>
      </div>
      <div className="banner-right">
        <div className="score-circle">
          <div className="num">AI</div>
          <div className="txt">智能专家</div>
        </div>
        <div className="score-label">专属英语私教</div>
      </div>
    </div>
  );
}
