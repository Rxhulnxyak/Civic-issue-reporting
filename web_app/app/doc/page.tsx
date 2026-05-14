import React from "react";
import { FiGithub } from "react-icons/fi";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doc",
};

export default function DocPage() {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          width: "100vw",
          boxSizing: "border-box",
          padding: "0",
          margin: "0",
        }}
      >
        <style>
          {`
            @keyframes slideFadeIn {
              0% {
                opacity: 0;
                transform: translateY(60px) scale(0.9);
              }
              60% {
                opacity: 1;
                transform: translateY(-8px) scale(1.05);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .coming-soon {
              font-size: clamp(2.5rem, 8vw, 5rem);
              font-weight: 900;
              color: #000;
              letter-spacing: 0.1em;
              text-shadow: 0 4px 24px #0002;
              animation: slideFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards;
              margin-bottom: 2.5rem;
              text-align: center;
              width: 100%;
              max-width: 900px;
              margin-left: auto;
              margin-right: auto;
              line-height: 1.1;
            }
            .contribution-note {
              font-size: 1.7rem;
              font-weight: 500;
              color: #000;
              background: transparent;
              padding: 0.5rem 1.2rem 0.5rem 1.2rem;
              border-radius: 1.2rem;
              box-shadow: none;
              font-style: normal;
              font-family: "Segoe Script", "Comic Sans MS", Arial, sans-serif;
              transition: color 0.3s;
              text-align: center;
              margin-top: 0.5rem;
              margin-bottom: 0;
              max-width: 700px;
              margin-left: auto;
              margin-right: auto;
              line-height: 1.3;
            }
            .github-link {
              color: #22c55e;
              text-decoration: underline;
              font-weight: 700;
              display: inline-flex;
              align-items: center;
              gap: 0.4em;
              font-style: normal;
              font-family: inherit;
            }
            .github-link:hover {
              color: #16a34a;
            }
            .github-icon {
              width: 1.2em;
              height: 1.2em;
              vertical-align: middle;
              color: #000;
            }
          `}
        </style>
        <div className="coming-soon">Coming Soon</div>
        <div className="contribution-note">
          Kindly see the{" "}
          <a
            className="github-link"
            href="https://github.com/TheRaj71/Crowdsourced-Civic-lssue-Reporting-and-Resolution-System/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="github-icon" />
            GitHub issue
          </a>{" "}
          for contribution
        </div>
      </div>
    </>
  );
}
