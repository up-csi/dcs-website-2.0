import { array, object, partial, string, type GenericSchema } from 'valibot';

export type AcademicsCoursesPrerequisites = {
	course_prerequisite?: string;
}[];

export const AcademicsCoursesPrerequisites: GenericSchema<AcademicsCoursesPrerequisites> = array(
	partial(
		object({
			course_prerequisite: string()
		})
	)
);
