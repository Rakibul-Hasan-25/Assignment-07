const Footer = () => {
    return (
      <footer className="border-t border-base-300 bg-white mt-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-base-content/70 md:flex-row">
          {/* Left */}
          <p>
            <span className="font-semibold text-base-content">বাজার দর</span>
            {" — "}
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
  
          {/* Right */}
          <p className="text-center md:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;