import { object, type InferOutput } from 'valibot';
import { Events } from './event';
import { Global } from './global';
import { StudentCouncil } from './student_council';
import { Alumni } from './alumni';
import { People } from './people';
import { PeopleCategories } from './people_categories';
import { Laboratories } from './laboratories';
import { PeopleLaboratories } from './people_laboratories';

export const Schema = object({
	global: Global,
	events: Events,
	student_council: StudentCouncil,
	alumni: Alumni,
	people: People,
	people_categories: PeopleCategories,
	laboratories: Laboratories,
	people_laboratories: PeopleLaboratories
});

export type Schema = InferOutput<typeof Schema>;
