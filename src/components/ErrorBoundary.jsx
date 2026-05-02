import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only log in development
    if (process.env.NODE_ENV !== "production") {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            textAlign: "center",
            background: "#f8fafc",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              marginBottom: 24,
            }}
          >
            ⚠️
          </div>

          <h2
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "#172A39",
              margin: "0 0 12px",
            }}
          >
            Something went wrong
          </h2>

          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 15,
              color: "#858585",
              maxWidth: 420,
              lineHeight: 1.6,
              margin: "0 0 28px",
            }}
          >
            {this.state.error?.message ||
              "An unexpected error occurred. Please try refreshing the page."}
          </p>

          <button
            onClick={this.handleReload}
            style={{
              padding: "12px 28px",
              background: "#1163c7",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(17,99,199,.35)",
              transition: "transform .25s ease, box-shadow .25s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.04)";
              e.target.style.boxShadow = "0 8px 24px rgba(17,99,199,.45)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "0 4px 16px rgba(17,99,199,.35)";
            }}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
