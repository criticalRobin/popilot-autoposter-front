export interface IPost {
  title: string;
  description: string;
  image_url?: string;
  social_networks: number[];
  created_at?: Date;
  scheduled_at?: Date;
}
