"use client";
import React from "react";
import { CometCard } from "../components/ui/comet-card";
import Image from "next/image";
import { Instagram } from "lucide-react";

const teamRows = [
  [
    {
      name: "The Raj",
      img: "/Raj.jpeg",
      socials: { instagram: "https://www.instagram.com/theraj7171", linkedin: "https://www.linkedin.com/in/the-raj71", github: "https://github.com/TheRaj71" }
    },
    {
      name: "Rishav Raj",
      img: "/Rishav.jpeg",
      socials: { instagram: "#", linkedin: "#", github: "#" }
    }
  ],
  [
    {
      name: "Parth Patidar",
      img: "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      socials: { instagram: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Kavita Panwar",
      img: "/kavita.jpeg",
      socials: { instagram: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Sudhir Singh",
      img: "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      socials: { instagram: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Anurag Anand",
      img: "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      socials: { instagram: "#", linkedin: "#", github: "#" }
    }
  ]
];

export default function CometCardDemo() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        flexDirection: "column",
      }}
    >
      <div className="comet-card-row">
        {teamRows[0].map((member, i) => (
          <CometCard key={member.name}>
            <button
              type="button"
              className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
              aria-label={`View profile ${member.name}`}
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
                animation: `fadeInUp 0.9s cubic-bezier(.6,-0.28,.74,.05) ${i * 0.5}s both`
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                  <Image
                    className="absolute inset-0 h-full w-full rounded-[16px] object-cover"
                    alt={`${member.name} avatar`}
                    src={member.img}
                    width={256}
                    height={320}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">{member.name}</div>
                <div className="text-xs text-gray-300 opacity-50">Team Member</div>
              </div>
              <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", justifyContent: "center" }}>
                <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                    alt="Instagram"
                    width={36}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                </a>
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <svg width="36" height="36" fill="#0077b5"><circle cx="18" cy="18" r="18"/><path d="M12.75 25.5h-3V15h3v10.5zm-1.5-12.3c-1.05 0-1.95-.9-1.95-1.95s.9-1.95 1.95-1.95 1.95.9 1.95 1.95-.9 1.95-1.95 1.95zm13.8 12.3h-3v-4.8c0-1.2-.45-1.95-1.5-1.95-.9 0-1.35.6-1.5 1.65v5.1h-3V15h3v1.5c.45-.75 1.5-1.8 3.15-1.8 2.25 0 3.15 1.5 3.15 3.9v7.2z" fill="#fff"/></svg>
                </a>
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="18" fill="#333"/><path d="M22.5 25.5V23.25C22.5 22.5 22.25 22 21.75 21.75C23.25 21.5 24.75 20.75 24.75 18.25C24.75 17.5 24.5 16.75 24 16.25C24.25 15.5 24.25 14.5 24 13.75C24 13.75 23.25 13.5 21.75 14.5C21 14.25 20.25 14.25 19.5 14.25C18.75 14.25 18 14.25 17.25 14.5C15.75 13.5 15 13.75 15 13.75C14.75 14.5 14.75 15.5 15 16.25C14.5 16.75 14.25 17.5 14.25 18.25C14.25 20.75 15.75 21.5 17.25 21.75C16.75 22 16.5 22.5 16.5 23.25V25.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </button>
          </CometCard>
        ))}
      </div>
      <div className="comet-card-row">
        {teamRows[1].map((member, i) => (
          <CometCard key={member.name}>
            <button
              type="button"
              className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
              aria-label={`View profile ${member.name}`}
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
                animation: `fadeInUp 0.9s cubic-bezier(.6,-0.28,.74,.05) ${(i + 2) * 0.5}s both`
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                  <Image
                    className="absolute inset-0 h-full w-full rounded-[16px] object-cover"
                    alt={`${member.name} avatar`}
                    src={member.img}
                    width={256}
                    height={320}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">{member.name}</div>
                <div className="text-xs text-gray-300 opacity-50">Team Member</div>
              </div>
              <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", justifyContent: "center" }}>
                <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={36} color="#E1306C" />
                </a>
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <svg width="36" height="36" fill="#0077b5"><circle cx="18" cy="18" r="18"/><path d="M12.75 25.5h-3V15h3v10.5zm-1.5-12.3c-1.05 0-1.95-.9-1.95-1.95s.9-1.95 1.95-1.95 1.95.9 1.95 1.95-.9 1.95-1.95 1.95zm13.8 12.3h-3v-4.8c0-1.2-.45-1.95-1.5-1.95-.9 0-1.35.6-1.5 1.65v5.1h-3V15h3v1.5c.45-.75 1.5-1.8 3.15-1.8 2.25 0 3.15 1.5 3.15 3.9v7.2z" fill="#fff"/></svg>
                </a>
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="18" fill="#333"/><path d="M22.5 25.5V23.25C22.5 22.5 22.25 22 21.75 21.75C23.25 21.5 24.75 20.75 24.75 18.25C24.75 17.5 24.5 16.75 24 16.25C24.25 15.5 24.25 14.5 24 13.75C24 13.75 23.25 13.5 21.75 14.5C21 14.25 20.25 14.25 19.5 14.25C18.75 14.25 18 14.25 17.25 14.5C15.75 13.5 15 13.75 15 13.75C14.75 14.5 14.75 15.5 15 16.25C14.5 16.75 14.25 17.5 14.25 18.25C14.25 20.75 15.75 21.5 17.25 21.75C16.75 22 16.5 22.5 16.5 23.25V25.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </button>
          </CometCard>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .comet-card-row {
            display: flex;
            gap: 2rem;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
          @media (max-width: 1024px) {
            .comet-card-row {
              flex-direction: column;
              gap: 1.5rem;
            }
            .comet-card-row button {
              width: clamp(250px, 90vw, 500px) !important;
              margin-left: auto;
              margin-right: auto;
            }
          }
        `}
      </style>
    </div>
  );
}
