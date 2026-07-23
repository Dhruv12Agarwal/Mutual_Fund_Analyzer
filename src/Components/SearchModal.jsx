import { useEffect } from "react";

function SearchModal({ setShowSearch }) {

    useEffect(() => {

    const handleKeyDown = (e) => {

        if (e.key === "Escape") {
            setShowSearch(false);
        }
    };

    window.addEventListener(
        "keydown",
        handleKeyDown
    );

    return () => {
        window.removeEventListener(
            "keydown",
            handleKeyDown
        );
    };

}, []);

    return (
        <div
            onClick={() => setShowSearch(false)}

            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",

                background:
                    "rgba(0,0,0,.65)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000
            }}
        >

            <div
    onClick={(e) => e.stopPropagation()}
    style={{
        width: "900px",
        minHeight: "600px",
        background: "#111827",
        borderRadius: "20px",
        padding: "40px"
    }}
>
    <div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>
    <h1
        style={{
            margin: 0,
            whiteSpace: "nowrap"
        }}
    >
        Search Mutual Funds
    </h1>

    <button
        onClick={() => setShowSearch(false)}
        style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "30px",
            cursor: "pointer"
        }}
    >
        ×
    </button>
</div>

<input
    placeholder="Search mutual funds..."
    style={{
        width: "100%",
        marginTop: "30px",
        padding: "18px",
        borderRadius: "12px",
        border: "1px solid #333",
        background: "#1F2937",
        color: "white",
        fontSize: "18px",
        outline: "none"
    }}
/>
</div>
 </div>
    );
}
export default SearchModal;