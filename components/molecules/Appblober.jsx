import AppBlob from '../atomics/AppBlob';

const AppBlober = () => (
  <section className="border-b border-light-gray">
    <div className="relative overflow-hidden" style={{ height: '70vh' }}>
      {/* Blob component */}
      <div className="absolute inset-0 z-10">
        <AppBlob />
      </div>
      {/* Text with lower zIndex to appear below the blob */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-0">
        <h1 className="text-3xl font-bold text-black text-center md:text-4xl">Empowering AI</h1>
        <p className="text-xl text-center text-[#d22d77] mt-2 md:text-2xl">Simplify, Humanize.</p>
      </div>
    </div>
  </section>
);

export default AppBlober;
