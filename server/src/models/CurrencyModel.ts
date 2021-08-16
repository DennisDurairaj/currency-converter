export interface Currency {
  iso: string;
  currency_name: string;
}

export interface ConvertFromResponse {
  terms: string;
  privacy: string;
  from: string;
  amount: number;
  timestamp: string;
  to: Rate[];
}

export interface Rate {
  quotecurrency: string;
  mid: number;
}

export interface ConvertFromRequest {
  from: string;
  to: string;
  amount: number;
}
