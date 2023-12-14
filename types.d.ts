export interface AccountPatchRequest {
  id: number;
  name?: string;
  email?: string;
  website?: string;
  about?: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: "UNIVERSITY";
}

export interface StudentSignupRequest {
  university_email: string;
  password: string;
  first_name: string;
  last_name: string;
  uid: string;
}

export interface StudentLoginRequest {
  university_email: string;
  password: string;
}

export interface PlacementDriveRequest {
  company_about: string;
  company_name: string;
  company_website: string;

  drive_name: string;
  type_of_drive: string;
  date_of_drive: Date;

  bond: string;
  placement_process: string;
  closes_at: Date;

  positions: string[];
  skills_required: string[];
  stream_required: string;

  current_cgpa_cutoff: number;
  matric_result_cutoff: number;
  hsc_result_cutoff: number;

  other_eligibility_criteria: string;
  allowed_backlogs: number;
  batch_required: number;

  job_location: string;
  job_profile: string;
  pay_package: string;
}

export interface DrivePatchRequest {
  id: number;
  eligibility_criteria?: string;
  batch_requried?: number;
  type_of_drive?: string;
  positions?: string[];
  stream_required?: string;
  skills_required?: string[];
  job_profile?: string;
  job_location?: string;
  pay_package?: string;
  bond?: string;
  placement_process?: string;
  date_of_drive?: Date;
  closes_at?: Date;
}

export type PasswordUpdateRequest = { password: string } & (
  | { user: "STUDENT"; university_email: string }
  | { user: "UNIVERSITY"; email: string }
);

export interface StudentPatchRequest {
  first_name?: string;
  last_name?: string;
  uid?: string;
  batch?: number;
  course?: string;
  stream?: string;
  has_gap_year?: boolean;
  personal_email?: string;
  contact_number?: string;
  alternate_contact_number?: string;
  current_address?: string;
  permanent_address?: string;
  current_cgpa?: number;
  matric_result?: number;
  hsc_result?: number;
  number_of_backlogs?: number;
  resume_1?: any;
  resume_2?: any;
  resume_3?: any;
  matric_result?: any;
  hsc_result?: any;
  pfp?: any;
}

export type CurrentUser = {
  id: number;
  email: string;
  role: string;
};
