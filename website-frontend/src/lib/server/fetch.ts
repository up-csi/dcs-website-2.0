import {
	type AggregationOptions,
	type GetCollection,
	type Query,
	type QueryItem,
	type RegularCollections,
	type RestClient,
	type SingletonCollections,
	type UnpackList,
	aggregate,
	readItems,
	readSingleton
} from '@directus/sdk';
import { parse, type InferOutput } from 'valibot';
import { Models, Schema, type RegularSchemaList, type SingletonSchemaList } from '$lib/models';

function collectionToSchema<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	collection: C
): (typeof Models)[C] {
	return Models[collection];
}

// Directus fetch overloads
async function directusFetch<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	directus: RestClient<Schema>,
	collection: C,
	query?: Query<Schema, RegularSchemaList>
): Promise<InferOutput<(typeof Models)[C]>>;

async function directusFetch<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	directus: RestClient<Schema>,
	collection: C,
	query?: QueryItem<Schema, SingletonSchemaList>
): Promise<InferOutput<(typeof Models)[C]>>;

// TODO: add explicit type annotation for aggregate return
async function directusFetch<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	directus: RestClient<Schema>,
	collection: C,
	query?: AggregationOptions<
		Schema,
		RegularCollections<Schema>,
		RegularCollections<Schema> extends keyof Schema
			? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
			: string,
		RegularCollections<Schema> extends keyof Schema
			? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
			: object
	>
): Promise<object>;

// Directus fetch implementation
async function directusFetch<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	directus: RestClient<Schema>,
	collection: C,
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| AggregationOptions<
				Schema,
				RegularCollections<Schema>,
				RegularCollections<Schema> extends keyof Schema
					? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: string,
				RegularCollections<Schema> extends keyof Schema
					? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: object
		  >
): Promise<InferOutput<(typeof Models)[C]> | object> {
	const schema = collectionToSchema(collection);
	if (isRegularCollection(collection) && isAggregationQuery(query)) {
		return await directus.request(
			aggregate(
				collection,
				query as AggregationOptions<
					Schema,
					RegularCollections<Schema>,
					RegularCollections<Schema> extends keyof Schema
						? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
						: string,
					RegularCollections<Schema> extends keyof Schema
						? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
						: object
				>
			)
		);
	}
	if (isRegularCollection(collection) && isRegularQuery(query)) {
		return parse(
			schema,
			await directus.request(readItems(collection, query as Query<Schema, RegularSchemaList>))
		);
	}
	if (isSingletonCollection(collection) && isSingletonQuery(query)) {
		return parse(
			schema,
			await directus.request(
				readSingleton(collection, query as QueryItem<Schema, SingletonSchemaList>)
			)
		);
	}
	return parse(schema, {});
}

// Type guards
function isRegularCollection(
	collection: RegularCollections<Schema> | SingletonCollections<Schema>
): collection is RegularCollections<Schema> {
	const regular_collections: RegularCollections<Schema>[] = [
		'about_pages',
		'events',
		'people',
		'people_categories',
		'people_laboratories',
		'students',
		'students_pages',
		'people_laboratories',
		'laboratories'
	];
	return regular_collections.includes(collection as RegularCollections<Schema>);
}

function isSingletonCollection(
	collection: RegularCollections<Schema> | SingletonCollections<Schema>
): collection is SingletonCollections<Schema> {
	const singleton_collections: SingletonCollections<Schema>[] = [
		'global',
		'about',
		'people_overview',
		'students_overview',
		'alumni'
	];
	return singleton_collections.includes(collection as SingletonCollections<Schema>);
}

function isRegularQuery(
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| AggregationOptions<
				Schema,
				RegularCollections<Schema>,
				RegularCollections<Schema> extends keyof Schema
					? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: string,
				RegularCollections<Schema> extends keyof Schema
					? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: object
		  >
): query is Query<Schema, RegularSchemaList> {
	if (query === undefined) return true;
	// TODO: add explicit type guard for regular queries
	return query && typeof query === 'object';
}

function isSingletonQuery(
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| AggregationOptions<
				Schema,
				RegularCollections<Schema>,
				RegularCollections<Schema> extends keyof Schema
					? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: string,
				RegularCollections<Schema> extends keyof Schema
					? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: object
		  >
): query is QueryItem<Schema, SingletonSchemaList> {
	if (query === undefined) return true;
	// TODO: add explicit type guard for singleton queries
	return query && typeof query === 'object';
}

function isAggregationQuery(
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| AggregationOptions<
				Schema,
				RegularCollections<Schema>,
				RegularCollections<Schema> extends keyof Schema
					? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: string,
				RegularCollections<Schema> extends keyof Schema
					? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
					: object
		  >
): query is AggregationOptions<
	Schema,
	RegularCollections<Schema>,
	RegularCollections<Schema> extends keyof Schema
		? keyof UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
		: string,
	RegularCollections<Schema> extends keyof Schema
		? UnpackList<GetCollection<Schema, RegularCollections<Schema>>>
		: object
> {
	if (query === undefined) return false;
	// TODO: add explicit type guard for aggregate queries
	return query && typeof query === 'object' && 'aggregate' in query;
}

export default directusFetch;
