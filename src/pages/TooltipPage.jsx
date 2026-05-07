import Tooltip from "../components/tooltip/tooltip";

export const TooltipPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Tooltip
          content={
            <div>
              <strong>User Info</strong>
              <p style={{ margin: 0 }}>Adarsh Kushwaha</p>
            </div>
          }
        >
          <button style={{ background: "rgba(0, 1, 1, 0.27)" }}>
            show tooltip
          </button>
        </Tooltip>
      </div>
    </>
  );
};
