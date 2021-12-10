import React from "react";

const GoogleAds = ({
  slot,
  style,
}: {
  slot: string;
  style?: { display?: string; height?: string; width?: string };
}) => {
  React.useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-1216660260080503"
      data-ad-slot={slot}
      data-ad-format={style ? undefined : "auto"}
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAds;
