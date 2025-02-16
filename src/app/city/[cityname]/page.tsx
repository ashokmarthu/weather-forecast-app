import React from "react";

type PageProps = {
  params: Promise<{cityname:string}>;
};

const Page = async ({ params }: PageProps) => {
  const { cityname } = await params;

  return (
    <div>
      <h1>Weather for {cityname}</h1>
    </div>
  );
};

export default Page;
