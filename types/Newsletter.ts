export interface Newsletter {
    id: string;
    creation_date: string;
    secondary_id: number;
    subject: string;
    absolute_url: string;
    image: string;
  }
  
  export interface NewsletterResponse {
    results: Newsletter[];
    count: number;
  }
  