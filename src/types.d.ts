export interface UserWithProjects {
  id: string;
  email: string;
  name?: string;
  lastname?: string;
  created_at?: string;
  history?: string;
  objetives?: string;
  projects?: Project[];
  experienceAreas?: ExpirienceArea[];
}

export interface Project {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  created_at: string;
}

export interface ExpirienceArea {
  id: string;
  user_id: string;
  area?: string;
  created_at: string;
}
