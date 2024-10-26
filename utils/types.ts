export interface PROJECTDATA {
  project_id: string;
  project_name: string;
  user_id: string;
  _id: string;
  session_ids: string[];
}
export interface CHATDATA {
  first_user_query: string;
  session_id: string;
  projects: {
    project_id: string;
    project_name: string;
  }[];
}

export interface ALLCHATDATA {
  user_query: string;
  AI_response: string;
}
export interface ProspectiveItem {
  title: string;
  category: string;
  tag: string;
  description: string;
  action: string;
}

export interface Workflow {
  type: string;
  prospectiveItems: ProspectiveItem[];
}
