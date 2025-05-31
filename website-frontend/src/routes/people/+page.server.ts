/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { People } from '$lib/models/people';
import { PeopleOverview } from '$lib/models/people_overview';
import { Levels } from '$lib/models/people_levels';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		positions: url.searchParams.getAll('position'),
		laboratories: url.searchParams.getAll('laboratory'),
		levels: url.searchParams.getAll('level')
	};

	const allPositions = parse(
		People,
		await directus.request(
			readItems('people', {
				fields: ['position']
			})
		)
	);

	const allLaboratories = parse(
		People,
		await directus.request(
			readItems('people', {
				fields: [
					{
						affiliations: [
							{
								laboratories_id: ['name']
							}
						]
					}
				]
			})
		)
	);

	const position_filters = [...new Set(allPositions.map((p) => p.position))].sort();

	const laboratory_filters = [
		...new Set(
			allLaboratories.flatMap((p) => {
				return (
					(typeof p.affiliations !== 'string'
						? p.affiliations
								?.filter((a) => typeof a !== 'string')
								.map(({ laboratories_id }) => {
									if (typeof laboratories_id !== 'string') return laboratories_id?.name;
								})
						: []) ?? []
				);
			})
		)
	]
		.filter(Boolean)
		.sort();

	const level_filters = parse(
		Levels,
		await directus.request(
			readItems('people_levels', {
				fields: ['name'],
				sort: ['name']
			})
		)
	).map(({ name }) => name);

	const people = parse(
		People,
		await directus.request(
			readItems('people', {
				fields: [
					'*',
					'position',
					{
						affiliations: [
							{
								laboratories_id: ['name']
							}
						]
					}
				],
				filter: {
					_and: [
						{
							position: { _in: filters.positions.length !== 0 ? filters.positions : undefined }
						},
						{
							affiliations: {
								laboratories_id: {
									name: {
										_in: filters.laboratories.length !== 0 ? filters.laboratories : undefined
									}
								}
							}
						},
						{
							level: {
								people_levels_id: {
									name: { _in: filters.levels.length !== 0 ? filters.levels : undefined }
								}
							}
						}
					]
				}
			})
		)
	);

	const people_overview = parse(
		PeopleOverview,
		await directus.request(readSingleton('people_overview', {}))
	);

	return {
		people,
		people_overview,
		position_filters,
		laboratory_filters,
		level_filters
	};
}
