"use client";

import OpenSource from "../components/ui/open-source";

export default function OpenScDemo() {
  return (
    <OpenSource
      repository="TheRaj71/Crowdsourced-Civic-lssue-Reporting-and-Resolution-System"
      defaultStats={{
        contributors: [
          {
            login: "Rahul",
            avatar_url: "https://avatars.githubusercontent.com/u/143867566?v=4",
          }
        ],
      }}
    />
  );
}
