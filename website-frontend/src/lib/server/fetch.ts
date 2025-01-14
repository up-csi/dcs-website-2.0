import {
	type AggregationOptions,
	type AggregationOutput,
	type Query,
	type QueryItem,
	type RegularCollections,
	type RestClient,
	type RestCommand,
	type SingletonCollections,
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

async function directusFetch<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	directus: RestClient<Schema>,
	collection: C,
	query?: RestCommand<
		AggregationOutput<
			Schema,
			RegularCollections<Schema>,
			AggregationOptions<Schema, RegularCollections<Schema>>
		>,
		Schema
	>
): Promise<InferOutput<(typeof Models)[C]>>;

// Directus fetch implementation
async function directusFetch<C extends RegularCollections<Schema> | SingletonCollections<Schema>>(
	directus: RestClient<Schema>,
	collection: C,
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| RestCommand<
				AggregationOutput<
					Schema,
					RegularCollections<Schema>,
					AggregationOptions<Schema, RegularCollections<Schema>>
				>,
				Schema
		  >
): Promise<InferOutput<(typeof Models)[C]>> {
	const schema = collectionToSchema(collection);
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
	if (isRegularCollection(collection) && isAggregationQuery(query)) {
		return parse(
			schema,
			await directus.request(
				query as RestCommand<
					AggregationOutput<
						Schema,
						RegularCollections<Schema>,
						AggregationOptions<Schema, RegularCollections<Schema>>
					>,
					Schema
				>
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
		'events',
		'people',
		'people_categories',
		'people_laboratories',
		'laboratories',
		'about_pages'
	];
	return regular_collections.includes(collection as RegularCollections<Schema>);
}

function isSingletonCollection(
	collection: RegularCollections<Schema> | SingletonCollections<Schema>
): collection is SingletonCollections<Schema> {
	const singleton_collections: SingletonCollections<Schema>[] = [
		'global',
		'about',
		'student_council',
		'alumni'
	];
	return singleton_collections.includes(collection as SingletonCollections<Schema>);
}

function isRegularQuery(
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| RestCommand<
				AggregationOutput<
					Schema,
					RegularCollections<Schema>,
					AggregationOptions<Schema, RegularCollections<Schema>>
				>,
				Schema
		  >
): query is Query<Schema, RegularSchemaList> {
	if (query === undefined) return true;
	// TODO: add explicit type guard for regular queries
	return query && typeof query === 'object' && 'fields' in query;
}

function isSingletonQuery(
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| RestCommand<
				AggregationOutput<
					Schema,
					RegularCollections<Schema>,
					AggregationOptions<Schema, RegularCollections<Schema>>
				>,
				Schema
		  >
): query is QueryItem<Schema, SingletonSchemaList> {
	if (query === undefined) return true;
	// TODO: add explicit type guard for singleton queries
	return query && typeof query === 'object' && 'fields' in query;
}

function isAggregationQuery(
	query?:
		| Query<Schema, RegularSchemaList>
		| QueryItem<Schema, SingletonSchemaList>
		| RestCommand<
				AggregationOutput<
					Schema,
					RegularCollections<Schema>,
					AggregationOptions<Schema, RegularCollections<Schema>>
				>,
				Schema
		  >
): query is RestCommand<
	AggregationOutput<
		Schema,
		RegularCollections<Schema>,
		AggregationOptions<Schema, RegularCollections<Schema>>
	>,
	Schema
> {
	if (query === undefined) return true;
	// TODO: add explicit type guard for aggregate queries
	return query && typeof query === 'object' && 'aggregate' in query;
}

export default directusFetch;
