import useAppStore from '../../store/useAppStore';
import useStudyStore from '../../store/useStudyStore';

export default function ReviewBanner() {
  const { reviewCount } = useStudyStore();
  const goModule = useAppStore((s) => s.goModule);

  if (reviewCount === 0) return null;

  return (
    <div className="review-banner">
      <div className="review-icon">
        <i className="fas fa-clock"></i>
      </div>
      <div className="review-info">
        <strong>📚 有 <span className="review-count">{reviewCount}</span> 个单词等待复习</strong>
        <p>根据遗忘曲线科学安排，现在复习效率最高！</p>
      </div>
      <button
        className="review-btn"
        onClick={() => {
          goModule('word');
        }}
      >
        开始复习
      </button>
    </div>
  );
}
