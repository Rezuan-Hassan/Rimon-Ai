export interface Source {
  title: string;
  uri: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  error?: boolean;
  sources?: Source[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export type PersonaType = "standard" | "coder" | "creative" | "academic";

export interface UserSettings {
  userName: string;
  persona: PersonaType;
  searchByDefault: boolean;
}
