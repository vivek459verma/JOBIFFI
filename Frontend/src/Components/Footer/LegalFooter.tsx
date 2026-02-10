const LegalFooter = () => {
  return (
    <div className="w-full py-6 text-center border-t border-gray-300 mt-16">
      <button
        onClick={() => window.close()}
        className="text-blue-600 underline text-sm hover:text-blue-800"
      >
        Close Window
      </button>
    </div>
  );
};

export default LegalFooter;
