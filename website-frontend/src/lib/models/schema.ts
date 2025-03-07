import { object, type InferOutput } from 'valibot';
import { News } from './news';
import { Events } from './event';
import { Global } from './global';
import { Alumni } from './alumni';
import { Linkages } from './linkages';
import { People } from './people';
import { PeopleOverview } from './people_overview';
import { PeopleCategories } from './people_categories';
import { PeopleLaboratories } from './junctions/people_laboratories';
import { Laboratories } from './laboratories';
import { LaboratoriesDirectusFiles } from './junctions/laboratories_directus_files';
import { About } from './about';
import { AboutPages } from './about_pages';
import { StudentsOverview } from './students_overview';
import { StudentsPages } from './students_pages';
import { EventsAreas } from './events_areas';
import { StudentsOrganizations } from './students_organizations';
import { StudentsOrganizationsOverview } from './students_organizations_overview';
import { StudentsOrganizationsDirectusFiles } from './junctions/students_organizations_directus_files';
import { Publications } from './publications';
import { PublicationsTags } from './publications_tags';
import { PublicationsRelated } from './junctions/publications_related';
import { EventsTags } from './events_tags';
import { EventsRelated } from './junctions/events_related';
import { EventsTagsCategories } from './events_tags_categories';
import { Academics } from './academics';
import { AcademicsCategories } from './academics_categories';
import { AcademicsPrograms } from './academics_programs';
import { AcademicsCourses } from './academics_courses';
import { AcademicsPages } from './academics_pages';
import { AcademicsProgramsCourses } from './junctions/academics_programs_courses';
import { DirectusUsers } from './directus_users';
import { DirectusFiles } from './directus_files';

export const Schema = object({
	global: Global,
	news: News,
	events: Events,
	alumni: Alumni,
	linkages: Linkages,
	people: People,
	people_overview: PeopleOverview,
	people_categories: PeopleCategories,
	people_laboratories: PeopleLaboratories,
	laboratories: Laboratories,
	laboratories_directus_files: LaboratoriesDirectusFiles,
	about: About,
	about_pages: AboutPages,
	students_overview: StudentsOverview,
	students_pages: StudentsPages,
	events_areas: EventsAreas,
	events_tags: EventsTags,
	events_tags_categories: EventsTagsCategories,
	events_related: EventsRelated,
	students_organizations: StudentsOrganizations,
	students_organizations_overview: StudentsOrganizationsOverview,
	students_organizations_directus_files: StudentsOrganizationsDirectusFiles,
	publications: Publications,
	publications_tags: PublicationsTags,
	publications_related: PublicationsRelated,
	academics: Academics,
	academics_categories: AcademicsCategories,
	academics_programs: AcademicsPrograms,
	academics_courses: AcademicsCourses,
	academics_pages: AcademicsPages,
	academics_programs_courses: AcademicsProgramsCourses,
	directus_users: DirectusUsers,
	directus_files: DirectusFiles
});

export type Schema = InferOutput<typeof Schema>;
