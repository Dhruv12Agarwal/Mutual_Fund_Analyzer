function ChartPopup({
  isOpen,
  onClose,
  title,
  children
}) {

  if (!isOpen) {
    return null;
  }

  return (
    <div
     onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 1000
      }}
    >
      <div
      onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#1e1c1eff",

          width: "90%",
          maxWidth: "1100px",
          height: "80%",
          borderRadius: "12px",
          padding: "25px",
          position: "relative",
          overflow: "auto"
        }}
      >

        <button
          onClick={onClose}
          style={{
            color:"red",
            position: "absolute",
            top: "15px",
            right: "20px",
            fontSize: "22px",
            cursor: "pointer",
            border: "none",
            background: "none"
          }}
        >
          ✕
        </button>

        <h2>{title}</h2>

        {children}

      </div>
    </div>
  );
}

export default ChartPopup;