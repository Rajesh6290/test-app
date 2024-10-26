"use client";
import { Workflow } from "@/utils/types";
import { Input } from "@mui/material";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from "react";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("Prospecting");
  const router = useRouter();
  // Function to truncate description
  const truncateDescription = (description: string) => {
    return description.length > 60
      ? `${description.substring(0, 60)}...`
      : description;
  };
  return (
    <div className="size-full overflow-y-auto flex flex-col gap-5">
      <h1 className="border-b border-gray-200 py-2 pl-2 font-bold text-lg">
        Workflow
      </h1>
      {/* WORKFLOW SECTION */}

      <div className="h-full flex flex-col gap-2 pl-2 pt-3">
        <div className="px-20">
          <Input placeholder="Search workflow..." className="w-[20%] " />
        </div>
        {/* Tab section */}
        <div className="flex gap-8 mx-20 my-2 border-b-[1px] border-[#e5e7eb]">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`cursor-pointer flex flex-col gap-1`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
              <span
                className={` ${selectedTab === tab ? "border-custompurple border-[3px] rounded-md " : ""} `}
              ></span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
const tabs = [
  "Prospecting",
  "Deal Management",
  "Expansion & Retention",
  "Enablement & Training",
  "Operations",
  "Marketing",
  "Others",
];
const workflowData: Workflow[] = [
  {
    type: "Prospecting",
    prospectiveItems: [
      {
        title: "Cold Email Sequence from LinkedIn Profile",
        category: "Prospect",
        tag: "NEW",
        description:
          "Generates a cold outbound email sequence for a prospect based on their LinkedIn profile.",
        action: "Try this",
      },
      {
        title: "Analyze Latest Earnings Call",
        category: "Prospect",
        tag: "NEW",
        description:
          "Research the latest earnings call transcript for a given public company.",
        action: "Try this",
      },
      {
        title: "Research Private Company",
        category: "Prospect +1",
        tag: "NEW",
        description:
          "Researches funding and job openings for a private company.",
        action: "Try this",
      },
      {
        title: "Research Public Company",
        category: "Prospect",
        tag: "NEW",
        description:
          "Research the priorities and goals of a public company and how they align with your offering.",
        action: "Try this",
      },
      {
        title: "Inbound Lead Follow Up",
        category: "Prospect",
        tag: "NEW",
        description:
          "Enriches a prospect from their email, generates an email body for follow-up.",
        action: "Try this",
      },
      {
        title: "Find Prospects at Company",
        category: "Prospect +1",
        tag: "NEW",
        description: "Prospects for leads at a given company.",
        action: "Try this",
      },
      {
        title: "Personalized Cold Outbound Email",
        category: "Prospect +1",
        tag: "NEW",
        description:
          "Generates a cold sales email personalized to a given recipient and sender.",
        action: "Try this",
      },
      {
        title: "Research Account from Domain",
        category: "Prospect +1",
        tag: "NEW",
        description:
          "Map out important details about a new prospect or existing account from a domain.",
        action: "Try this",
      },
    ],
  },
  {
    type: "Deal Management",
    prospectiveItems: [
      {
        title: "Find Decision Makers at a Company",
        category: "MANAGE + 1",
        tag: "NEW",
        description: "Finds the decision makers from a company.",
        action: "Try this",
      },
      {
        title: "Extract MEDDIC from Sales Transcript",
        category: "MANAGE + 1",
        tag: "NEW",
        description:
          "Extracts Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion from sales transcripts.",
        action: "Try this",
      },
    ],
  },
  {
    type: "Expansion & Retention",
    prospectiveItems: [
      {
        title: "Find Cross-Sell Leads at Company",
        category: "EXPAND + 1",
        tag: "NEW",
        description:
          "Search for cross-sell expansion leads at an existing customer.",
        action: "Try this",
      },
    ],
  },
  {
    type: "Enablement & Training",
    prospectiveItems: [
      {
        title: "Create Blog Post from Sales Call Transcript",
        category: "ENABLE",
        tag: "NEW",
        description: "Generates a blog post from a sales call transcript.",
        action: "Try this",
      },
    ],
  },
  {
    type: "Operations",
    prospectiveItems: [
      {
        title: "Find Company Tech Providers",
        category: "OPERATE + 1",
        tag: "NEW",
        description:
          "Finds technology providers used by a company from the company’s website.",
        action: "Try this",
      },
      {
        title: "Verify Email Address",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Verifies if a given email address is valid.",
        action: "Try this",
      },
      {
        title: "Find Phone Number of Contact",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Finds the phone number associated with an email address.",
        action: "Try this",
      },
      {
        title: "Enrich Person from Email Address",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Enriches a contact given an email address.",
        action: "Try this",
      },
      {
        title: "Extract Product Feedback from Sales Transcript",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Summarizes a sales transcript into a bulleted list.",
        action: "Try this",
      },
      {
        title: "Prioritize Leads / Lead Scoring",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Categorizes a lead based on provided information.",
        action: "Try this",
      },
      {
        title: "Enrich Company from Domain",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Enriches a company based on a given domain.",
        action: "Try this",
      },
      {
        title: "Extract Information from LinkedIn Profile",
        category: "OPERATE",
        tag: "NEW",
        description:
          "Summarizes a person’s LinkedIn profile and recommends useful connections.",
        action: "Try this",
      },
      {
        title: "Enrich Person from LinkedIn Profile",
        category: "OPERATE + 1",
        tag: "NEW",
        description: "Enriches a contact given a LinkedIn profile URL.",
        action: "Try this",
      },
    ],
  },
  {
    type: "Marketing",
    prospectiveItems: [
      {
        title: "Create SEO Optimized Content Brief",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Research a keyword, then creates a SEO optimized content brief.",
        action: "Try this",
      },
      {
        title: "Plagiarism Checker",
        category: "MARKETING",
        tag: "NEW",
        description: "Checks your text for plagiarism.",
        action: "Try this",
      },
      {
        title: "Write Blog Post",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Transforms a content brief into a blog post, title, and meta description.",
        action: "Try this",
      },
      {
        title: "Webinar Follow Up",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Summarizes webinar transcript and sends tailored emails to follow-up attendees.",
        action: "Try this",
      },
      {
        title: "Webinar Promotion",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Generates a series of webinar emails based on a webinar brief.",
        action: "Try this",
      },
      {
        title: "Brainstorm Facebook Ads",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Brainstorms Facebook ad copy in different copywriting styles.",
        action: "Try this",
      },
      {
        title: "Generate Google ads",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Scrapes a url, brainstorms relevance, and generates Google ad copy.",
        action: "Try this",
      },
      {
        title: "Generate Press Release",
        category: "MARKETING",
        tag: "NEW",
        description: "Generates a press release from a document.",
        action: "Try this",
      },
      {
        title: "Write LinkedIn Posts",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Generate LinkedIn posts from a brief using various formulas.",
        action: "Try this",
      },
      {
        title: "Repurpose Blog Post",
        category: "MARKETING",
        tag: "NEW",
        description:
          "Transform a blog post into content for all of your channels.",
        action: "Try this",
      },
    ],
  },
  {
    type: "Others",
    prospectiveItems: [
      {
        title: "Generate Sales Forecast",
        category: "OTHERS",
        tag: "NEW",
        description:
          "Generates a sales forecast based on past performance data.",
        action: "Try this",
      },
      {
        title: "Create Meeting Agenda",
        category: "OTHERS",
        tag: "NEW",
        description:
          "Creates a structured meeting agenda based on inputs and objectives.",
        action: "Try this",
      },
      {
        title: "Generate Competitor Analysis",
        category: "OTHERS",
        tag: "NEW",
        description:
          "Creates a competitor analysis report based on market data and key metrics.",
        action: "Try this",
      },
      {
        title: "Create Product Roadmap",
        category: "OTHERS",
        tag: "NEW",
        description:
          "Generates a high-level product roadmap with milestones and deadlines.",
        action: "Try this",
      },
    ],
  },
];
