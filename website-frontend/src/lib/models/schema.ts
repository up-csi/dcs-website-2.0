import { object, type InferOutput } from 'valibot';
import { Events } from './event';
import { Global } from './global';
import { Alumni } from './alumni';
import { Linkages } from './linkages';
import { People } from './people';
import { PeopleOverview } from './people_overview';
import { PeopleCategories } from './people_categories';
import { PeopleLaboratories } from './people_laboratories';
import { Laboratories } from './laboratories';
import { About } from './about';
import { AboutPages } from './about_pages';
import { StudentsOverview } from './students_overview';
import { StudentsPages } from './students_pages';
import { EventsAreas } from './events_areas';
import { StudentsOrganizations } from './students_organizations';
import { StudentsOrganizationsOverview } from './students_organizations_overview';

export const Schema = object({
	global: Global,
	events: Events,
	alumni: Alumni,
	linkages: Linkages,
	people: People,
	people_overview: PeopleOverview,
	people_categories: PeopleCategories,
	people_laboratories: PeopleLaboratories,
	laboratories: Laboratories,
	about: About,
	about_pages: AboutPages,
	students_overview: StudentsOverview,
	students_pages: StudentsPages,
	events_areas: EventsAreas,
	students_organizations: StudentsOrganizations,
	students_organizations_overview: StudentsOrganizationsOverview
});

export type Schema = InferOutput<typeof Schema>;
