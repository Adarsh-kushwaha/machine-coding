import { useState, useTransition } from "react";
 
// ---------- Tab contents ----------
function HomeTab() {
  return <p>🏠 Welcome home! This tab is fast.</p>;
}
 
function ContactTab() {
  return <p>📞 Contact us at hello@example.com. This tab is fast.</p>;
}
 
// Slow tab: 500 items, each takes ~1ms to render (≈ 500ms total)
function PostsTab() {
  const posts = Array.from({ length: 500 }, (_, i) => `Post #${i + 1}`);
 
  return (
    <ul>
      {posts.map((post) => {
        const start = performance.now();
        while (performance.now() - start < 1) {} // fake slowness
        return <li key={post}>{post}</li>;
      })}
    </ul>
  );
}


const TransitionHook = () => {
 const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();
 
  function selectTab(nextTab) {
    // Switching tabs is a non-urgent update.
    // If you click "Posts" and then quickly click "Contact",
    // React drops the slow Posts render and shows Contact right away.
   
      setTab(nextTab);
  
  }
 
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <button onClick={() => selectTab("home")} disabled={tab === "home"}>
        Home
      </button>{" "}
      <button onClick={() => selectTab("posts")} disabled={tab === "posts"}>
        Posts (slow)
      </button>{" "}
      <button onClick={() => selectTab("contact")} disabled={tab === "contact"}>
        Contact
      </button>
 
      {isPending && <p style={{ color: "gray" }}>Loading...</p>}
 
      <hr />
      {tab === "home" && <HomeTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </div>
  );
}

export default TransitionHook