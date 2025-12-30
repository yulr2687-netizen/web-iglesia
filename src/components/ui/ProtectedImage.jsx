const ProtectedImage = ({ src, alt, className = "" }) => {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        className={`select-none ${className}`}
      />

      {/* Capa protectora invisible */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default ProtectedImage;
