export interface EmailOption {
  angle: string;
  subject: string;
  body: string;
  citation: string;
}

export interface GeneratePayload {
  prospectName: string;
  company: string;
  context: string;
}

export interface EmailCardProps {
  option: EmailOption;
  index: number;
  copiedIndex: number | null;
  onCopy: (text: string, index: number) => void;
}
