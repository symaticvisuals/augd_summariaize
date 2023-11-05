"use client";

function CustomListRenderer({ data }: any) {
  data;

  return (
    <ul>
      {data.items.map((item: any, i: any) => {
        return <li key={i}>{item}</li>;
      })}
    </ul>
  );
}

export default CustomListRenderer;
