/** Internal discovery catalogue. Entries describe scope candidates, not deployable templates. */
export type SolutionCatalogEntry = {
  id: string
  version: string
  sector: 'Healthcare' | 'Education'
  title: string
  personas: string[]
  proposedModules: string[]
  status: 'DESIGN_ONLY'
}

const entry = (id: string, sector: SolutionCatalogEntry['sector'], title: string, personas: string[], proposedModules: string[]): SolutionCatalogEntry => ({
  id, version: '1.0.0', sector, title, personas, proposedModules, status: 'DESIGN_ONLY',
})

export const SOLUTION_CATALOG: readonly SolutionCatalogEntry[] = [
  entry('hospital', 'Healthcare', 'Hospital management', ['Reception', 'Care teams', 'Administrators'], ['Patient intake', 'Appointments', 'Queues', 'Billing', 'Laboratory', 'Pharmacy', 'Inventory']),
  entry('clinic', 'Healthcare', 'Clinic management', ['Reception', 'Clinicians', 'Administrators'], ['Patient intake', 'Appointments', 'Scheduling', 'Billing', 'Follow-up']),
  entry('dental', 'Healthcare', 'Dental clinic', ['Reception', 'Dental team', 'Administrators'], ['Appointments', 'Patient intake', 'Treatment planning', 'Billing', 'Inventory']),
  entry('pharmacy', 'Healthcare', 'Pharmacy operations', ['Pharmacists', 'Inventory staff', 'Administrators'], ['Inventory', 'Purchasing', 'Sales', 'Stock alerts', 'Reporting']),
  entry('education-consultancy', 'Education', 'Education consultancy', ['Counsellors', 'Applicants', 'Administrators'], ['Enquiries', 'Applications', 'Documents', 'Communication', 'Follow-up']),
  entry('school', 'Education', 'School management', ['Teachers', 'Students', 'Guardians', 'Administrators'], ['Admissions', 'Classes', 'Attendance', 'Fees', 'Exams', 'Notifications']),
  entry('college', 'Education', 'College management', ['Faculty', 'Students', 'Administrators'], ['Admissions', 'Courses', 'Attendance', 'Fees', 'Assessments']),
  entry('madrasa', 'Education', 'Madrasa management', ['Teachers', 'Students', 'Guardians', 'Administrators'], ['Admissions', 'Classes', 'Attendance', 'Fees', 'Assessments']),
  entry('coaching', 'Education', 'Coaching centre', ['Tutors', 'Students', 'Administrators'], ['Enquiries', 'Batches', 'Attendance', 'Fees', 'Assessments']),
  entry('english-assessment', 'Education', 'English proficiency preparation', ['Instructors', 'Learners', 'Administrators'], ['Courses', 'Practice', 'Assessments', 'Progress', 'Feedback']),
  entry('university-preparation', 'Education', 'University admission preparation', ['Instructors', 'Applicants', 'Administrators'], ['Courses', 'Practice tests', 'Progress', 'Resources', 'Notifications']),
  entry('job-exam-preparation', 'Education', 'Job exam preparation', ['Instructors', 'Learners', 'Administrators'], ['Courses', 'Practice tests', 'Study plans', 'Progress', 'Resources']),
]
