import { object, type InferOutput } from 'valibot';
import { Global } from './global';
import { Home } from './home';
import { About } from './about';
import { Academics } from './academics';
import { Alumni } from './alumni';
import { Events } from './event';
import { Laboratories } from './laboratories';
import { Linkages } from './linkages';
import { News } from './news';
import { NewsTags } from './news_tags';
import { NewsRelated } from './junctions/news_related';
import { People } from './people';
import { Publications } from './publications';
import { AboutPages } from './about_pages';
import { AcademicsCategories } from './academics_categories';
import { AcademicsCourses } from './academics_courses';
import { AcademicsPages } from './academics_pages';
import { AcademicsPrograms } from './academics_programs';
import { AcademicsProgramsCourses } from './junctions/academics_programs_courses';
import { AlumniOverview } from './alumni_overview';
import { DirectusFiles } from './directus_files';
import { DirectusUsers } from './directus_users';
import { EventsAreas } from './events_areas';
import { EventsLaboratories } from './junctions/events_laboratories';
import { EventsRelated } from './junctions/events_related';
import { EventsTags } from './events_tags';
import { EventsTagsCategories } from './events_tags_categories';
import { LaboratoriesDirectusFiles } from './junctions/laboratories_directus_files';
import { Levels } from './people_levels';
import { PeopleCategories } from './people_categories';
import { PeopleLaboratories } from './junctions/people_laboratories';
import { PeoplePublications } from './junctions/people_publications';
import { PeopleOverview } from './people_overview';
import { PeopleRelated } from './junctions/people_related';
import { PublicationsTags } from './publications_tags';
import { PublicationsRelated } from './junctions/publications_related';
import { StudentsOrganizations } from './students_organizations';
import { StudentsOrganizationsDirectusFiles } from './junctions/students_organizations_directus_files';
import { StudentsOrganizationsOverview } from './students_organizations_overview';
import { StudentsOverview } from './students_overview';
import { StudentsPages } from './students_pages';
import { Partnerships } from './partnerships';
import { PartnershipsOverview } from './partnerships_overview';
import { FeaturedNews } from './junctions/featured_news';
import { RecentEvents } from './junctions/recent_events';
import { RecentNews } from './junctions/recent_news';
import { MiscellaneousPages } from './miscellaneous_pages';

export const Schema = object({
	global: Global,
	home: Home,
	featured_news: FeaturedNews,
	recent_news: RecentNews,
	recent_events: RecentEvents,
	about: About,
	academics: Academics,
	alumni: Alumni,
	events: Events,
	laboratories: Laboratories,
	linkages: Linkages,
	news: News,
	news_related: NewsRelated,
	news_tags: NewsTags,
	people: People,
	publications: Publications,
	about_pages: AboutPages,
	academics_categories: AcademicsCategories,
	academics_courses: AcademicsCourses,
	academics_pages: AcademicsPages,
	academics_programs: AcademicsPrograms,
	academics_programs_courses: AcademicsProgramsCourses,
	alumni_overview: AlumniOverview,
	directus_files: DirectusFiles,
	directus_users: DirectusUsers,
	events_areas: EventsAreas,
	events_laboratories: EventsLaboratories,
	events_related: EventsRelated,
	events_tags: EventsTags,
	events_tags_categories: EventsTagsCategories,
	laboratories_directus_files: LaboratoriesDirectusFiles,
	miscellaneous_pages: MiscellaneousPages,
	people_categories: PeopleCategories,
	people_laboratories: PeopleLaboratories,
	people_levels: Levels,
	people_publications: PeoplePublications,
	people_related: PeopleRelated,
	people_overview: PeopleOverview,
	publications_tags: PublicationsTags,
	publications_related: PublicationsRelated,
	students_organizations: StudentsOrganizations,
	students_organizations_directus_files: StudentsOrganizationsDirectusFiles,
	students_organizations_overview: StudentsOrganizationsOverview,
	students_overview: StudentsOverview,
	students_pages: StudentsPages,
	partnerships: Partnerships,
	partnerships_overview: PartnershipsOverview
});

export type Schema = InferOutput<typeof Schema>;
