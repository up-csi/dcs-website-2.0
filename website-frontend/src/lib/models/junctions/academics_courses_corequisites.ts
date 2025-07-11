import { array, object, partial, string, type GenericSchema } from 'valibot';

export type AcademicsCoursesCorequisites = {
	course_corequisite?: string;
}[];

export const AcademicsCoursesCorequisites: GenericSchema<AcademicsCoursesCorequisites> = array(
	partial(
		object({
			course_corequisite: string()
		})
	)
);
