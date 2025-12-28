const InitialLoader = ({ visible }) => {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-gradient-to-b from-[#FAF9F6] to-[#C7DBEB]
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="logo-wrapper">
        <img
          src="/logo-iglesia.png"
          alt="La Voz Del Triunfo Pentecostal"
          className="logo-img"
        />
      </div>
    </div>
  );
};

export default InitialLoader;
