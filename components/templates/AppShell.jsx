import PropTypes from 'prop-types';
import AppContainer from '../atomics/AppContainer';
import AppDecoration from '../atomics/AppDecoration';
import AppHead from '../atomics/AppHead';
import AppNav from '../molecules/AppNav';
import AppSide from '../atomics/AppSide';
import AppSignature from '../organisms/AppSignature';
import AppCtaSection from '../molecules/AppCtaSection';
import AppHero from '../molecules/AppHero';
import AppFooter from '../atomics/AppFooter';

const AppShell = ({ title, keyword, description, hero, cta, children }) => (
  <>
    <AppHead title={title} description={description} keyword={keyword} />
    <AppNav />
    <AppDecoration />
    <AppSide />
    {hero && <AppHero />}
    <AppContainer>
      {children}
      {/* <AppSignature /> */}
      {cta && <AppCtaSection />}
      <AppFooter />
    </AppContainer>
  </>
);

AppShell.propTypes = {
  title: PropTypes.string,
  keyword: PropTypes.string,
  description: PropTypes.string,
  hero: PropTypes.bool,
  cta: PropTypes.bool,
};

AppShell.defaultProps = {
  title: 'Vijay Chandar',
  description:
    'I am an AI Fullstack Engineer from India, focusing on custom neural network creation and fine-tuning',
  keyword: '',
  hero: false,
  cta: true,
};

export default AppShell;
