import WelcomeBanner from './WelcomeBanner';
import DailyQuote from './DailyQuote';
import ReviewBanner from './ReviewBanner';
import StatsGrid from './StatsGrid';
import WeaknessAnalysis from './WeaknessAnalysis';
import RecordList from './RecordList';
import FeatureGrid from './FeatureGrid';

export default function Dashboard() {
  return (
    <div>
      <WelcomeBanner />
      <DailyQuote />
      <ReviewBanner />
      <StatsGrid />
      <WeaknessAnalysis />
      <RecordList />
      <FeatureGrid />
    </div>
  );
}
