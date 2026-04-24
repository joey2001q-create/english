import useAppStore from '../../store/useAppStore';

const features = [
  { key: 'word', icon: '📖', title: '单词背诵', desc: 'AI语境记单词、发音纠错、艾宾浩斯遗忘曲线复习', tag: 'AI智能' },
  { key: 'speaking', icon: '🎙️', title: '口语对话', desc: '主题对话练习、发音纠正标红、跟读评分反馈', tag: 'AI陪练' },
  { key: 'listening', icon: '🎧', title: '听力训练', desc: '辨音训练、场景练习、连读弱读专项、TTS实时朗读', tag: 'TTS朗读' },
  { key: 'grammar', icon: '🔍', title: '语法学习', desc: '句子结构分析、主谓宾定状补、从句识别、情景化讲解', tag: 'AI智能' },
  { key: 'reading', icon: '📝', title: '阅读理解', desc: '四步解题法、原文定位、同义替换、干扰项排除', tag: 'AI智能' },
  { key: 'essay', icon: '✍️', title: '作文批改', desc: '语法批改、智能润色、评分建议、拍照上传即时批', tag: '拍照批改' },
  { key: 'qa', icon: '💬', title: 'AI问答', desc: '任何英语问题随问随答、拍照搜题、逐项分析干扰项', tag: '拍照搜题' },
];

export default function FeatureGrid() {
  const goModule = useAppStore((s) => s.goModule);

  return (
    <>
      <h3 className="section-title">
        <i className="fas fa-th-large"></i>
        选择学习模块开始
      </h3>
      <div className="feature-grid">
        {features.map((item) => (
          <div
            key={item.key}
            className="feature-card"
            onClick={() => goModule(item.key)}
          >
            <span className="feature-icon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
            <span className="feature-tag">{item.tag}</span>
          </div>
        ))}
      </div>
    </>
  );
}
