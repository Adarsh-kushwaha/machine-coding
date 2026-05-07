import { Popover } from "../components/popover/popover";

export const PopoverPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Popover
        content={
          <div>
            <strong>User Info</strong>
            <p style={{ margin: 0 }}>Adarsh Kushwaha</p>
            <button onClick={() => console.log("heelo")}>Click me</button>
          </div>
        }
      >
        <button style={{ background: "rgba(0, 1, 1, 0.27)" }}>
          Show Popover
        </button>
      </Popover>
    </div>
  );
};
