import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import USER from '../data/user.json';
import AppShell from '../components/templates/AppShell';
import AppSection from '../components/molecules/AppSection';
import AppHeader from '../components/organisms/AppHeader';
import AppButton from '../components/atomics/AppButton';

const Contact = () => {
  const form = useRef();
  const [buttonState, setButtonState] = useState('Send Message'); // Button text state
  const [loading, setLoading] = useState(false); // Loading state

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setButtonState('Sending...'); // Change button text to show loading

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(
      serviceID,
      templateID,
      form.current,
      publicKey
    )
      .then((result) => {
          console.log(result.text);
          setButtonState('✓ Sent!'); // Show checkmark when successful
      }, (error) => {
          console.log(error.text);
          setButtonState('Failed'); // Optional: Show "Failed" in case of error
      })
      .finally(() => {
        setTimeout(() => {
          setButtonState('Send Message'); // Reset after a delay
          setLoading(false); // Stop loading
        }, 2000); // Reset after 3 seconds
      });
  
    e.target.reset(); // Reset the form after submission
  };  

  return (
    <AppShell
      title={`Vijay Chandar | ${USER.contact.title}`}
      description={USER.contact.description}
      keyword="contact me, contact, social media"
      cta={false}
    >
      <AppHeader
        title={USER.contact.title}
        description={USER.contact.description}
      />

      {/* New Contact Form Section */}
      <AppSection title="Send Me a Message">
        <div className="flex justify-center">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col items-center md:w-1/2">
            <input 
              type="text" 
              name="user_name" 
              placeholder="Your Name" 
              className="border border-gray-300 p-3 mb-3 rounded-lg w-full max-w-lg" 
              required 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              className="border border-gray-300 p-3 mb-3 rounded-lg w-full max-w-lg" 
              rows="5" 
              required 
            />
            <AppButton 
              title={buttonState} 
              type="submit" 
              className="mt-6 flex items-center justify-center" 
              disabled={loading}
            >
              {loading && (
                <svg 
                  className="animate-spin mr-2 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              )}
              {buttonState}
            </AppButton>
          </form>
        </div>
      </AppSection>

      {/* Existing Connect With Me Section */}
      <AppSection title="Checkout my Handles">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {USER.contact.contents.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center border border-light-gray rounded-lg py-6 px-4 transition duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full border border-primary grid place-items-center">
                <i className={`${item.icon} text-xl`} />
              </div>
              <h3 className="text-black font-semibold mt-3">{item.name}</h3>
              <p className="text-gray text-xs md:text-sm">{item.username}</p>
            </a>
          ))}
        </div>
      </AppSection>
    </AppShell>
  );
};

export default Contact;
