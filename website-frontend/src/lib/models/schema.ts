import type { RegularCollections, SingletonCollections } from '@directus/sdk';
import {
	array,
	object,
	type ArraySchema,
	type InferOutput,
	type ObjectEntries,
	type ObjectSchema
} from 'valibot';
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
import { Students } from './students';
import { StudentsOverview } from './students_overview';
import { StudentsPages } from './students_pages';

export const Models = {
	global: Global,
	about: About,
	about_pages: AboutPages,
	events: Events,
	people: People,
	people_overview: PeopleOverview,
	people_categories: PeopleCategories,
	people_laboratories: PeopleLaboratories,
	students: Students,
	alumni: Alumni,
	linkages: Linkages,
	laboratories: Laboratories,
	students_overview: StudentsOverview,
	students_pages: StudentsPages
};

export const ModelsBase = Object.fromEntries(
	Object.entries(Models).map(([key, item]) => {
		if (item instanceof array) {
			return [key, (item as ArraySchema<ObjectSchema<ObjectEntries, undefined>, undefined>).item];
		}
		return [key, item];
	})
);

export const Schema = object(Models);
export const SchemaBase = object(ModelsBase);

export type Schema = InferOutput<typeof Schema>;
export type SingletonSchema = Pick<Schema, SingletonCollections<Schema>>;
export type RegularSchema = Pick<Schema, RegularCollections<Schema>>;

export type SchemaBase = InferOutput<typeof SchemaBase>;
export type SingletonSchemaBase = Pick<SchemaBase, SingletonCollections<Schema>>;
export type RegularSchemaBase = Pick<SchemaBase, RegularCollections<Schema>>;

export type SchemaList = SchemaBase[keyof SchemaBase];
export type SingletonSchemaList = SingletonSchemaBase[keyof SingletonSchemaBase];
export type RegularSchemaList = RegularSchemaBase[keyof RegularSchemaBase];
