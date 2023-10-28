export interface UserWithProjects {
  id: string;
  email: string;
  name?: string;
  lastname?: string;
  created_at?: string;
  history?: string;
  objetives?: string;
  projects?: Project[];
}

export interface Project {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  created_at: string;
}
