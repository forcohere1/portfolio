import AppButton from '../atomics/AppButton';

const AppCtaSection = () => (
  <section className="py-20 border-b border-light-gray dark:border-dark-gray">
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-dark-black">
        Let&apos;s Connect
      </h2>
      <p className="text-xs md:text-sm text-gray dark:text-dark-light-gray max-w-[260px] md:max-w-xs mx-auto mt-2">
        I&apos;m always here to help. Feel free to reach out via email or social media anytime. 
        Thank you for visiting!
      </p>
      <AppButton title="Click to Connect" href="/contact" color="primary" />
    </div>
  </section>
);

export default AppCtaSection;
