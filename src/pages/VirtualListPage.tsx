import { VirtualList } from "../components/virtual/VirtualList";

export const VirtualListPage = () => {
  const data = Array.from({ length: 1000 }, (v, i) => `This is item ${i + 1}`);
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"90vh", }}>
      <VirtualList data={data} />
    </div>
  );
};
