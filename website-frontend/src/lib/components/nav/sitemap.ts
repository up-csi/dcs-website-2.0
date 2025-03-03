import type { NavPages } from '$lib/types/navpage';

const sitemap: NavPages = [
	{
		to: 'Home',
		href: '/',
		subpages: [],
		options: {}
	},
	{
		to: 'About',
		href: '/about',
		subpages: [
			{
				to: 'Overview',
				href: '',
				subpages: [],
				options: {}
			},
			{
				to: 'Department',
				href: '/department',
				subpages: [],
				options: {}
			},
			{
				to: 'Administration',
				href: '/administration',
				subpages: [],
				options: {}
			},
			{
				to: 'History',
				href: '/history',
				subpages: [],
				options: {}
			},
			{
				to: 'Facts and Figures',
				href: '/facts-and-figures',
				subpages: [],
				options: {}
			},
			{
				to: 'Contact Us',
				href: '/contact-us',
				subpages: [],
				options: {}
			},
			{
				to: "Citizen's Charter",
				href: '/citizens-charter',
				subpages: [],
				options: {}
			}
		],
		options: {}
	},
	{
		to: 'Events',
		href: '/events',
		subpages: [],
		options: {}
	},
	{
		to: 'Publications',
		href: '/publications',
		subpages: [],
		options: {}
	},
	{
		to: 'People',
		href: '/people',
		subpages: [
			{
				to: 'Regular Faculty',
				href: '/regular-faculty',
				subpages: [],
				options: {}
			},
			{
				to: 'Lecturers and Teaching Associates',
				href: '/lecturers-and-teaching-associates',
				subpages: [],
				options: {}
			},
			{
				to: 'Support Staff',
				href: '/support-staff',
				subpages: [],
				options: {}
			}
		],
		options: {}
	},
	{
		to: 'Academics',
		href: '/academics',
		subpages: [
			{
				to: 'Bachelor of Science in Computer Science',
				href: '/bs-cs',
				subpages: [],
				options: {}
			},
			{
				to: 'Master of Science in Computer Science',
				href: '/ms-cs',
				subpages: [],
				options: {}
			},
			{
				to: 'Master of Science in Bioinformatics',
				href: '/ms-bioinformatics',
				subpages: [],
				options: {}
			},
			{
				to: 'Doctor of Philosophy in Computer Science',
				href: '/phd-cs',
				subpages: [],
				options: {}
			}
		],
		options: {}
	},
	{
		to: 'Research',
		href: '/research',
		subpages: [
			{
				to: 'Overview',
				href: '',
				subpages: [],
				options: {}
			},
			{
				to: 'Laboratories',
				href: '/labs',
				subpages: [],
				options: {
					position: 'left-36 top-0'
				}
			},
			{
				to: 'Featured Outputs',
				href: '/outputs',
				subpages: [],
				options: {}
			}
		],
		options: {}
	},
	{
		to: 'Students',
		href: '/students',
		subpages: [
			{
				to: 'Overview',
				href: '',
				subpages: [],
				options: {}
			},
			{
				to: 'Batch Representatives',
				href: '/batch-representatives',
				subpages: [],
				options: {}
			},
			{
				to: 'Student Ethics, Health, and Wellbeing',
				href: '/student-ethics-health-and-wellbeing',
				subpages: [],
				options: {}
			},
			{
				to: 'Student Opportunities',
				href: '/student-opportunities',
				subpages: [],
				options: {}
			},
			{
				to: 'Student Council',
				href: '/student-council',
				subpages: [],
				options: {}
			},
			{
				to: 'Organizations',
				href: '/organizations',
				subpages: [],
				options: {}
			}
		],
		options: {}
	},
	{
		to: 'Alumni',
		href: '/alumni',
		subpages: [],
		options: {}
	},
	{
		to: 'Linkages',
		href: '/linkages',
		subpages: [
			{
				to: 'Partnerships',
				href: '/partnerships',
				subpages: [],
				options: {
					custom: 'flex justify-end p-0 block justify-start'
				}
			}
		],
		options: {}
	}
];

export default sitemap;
