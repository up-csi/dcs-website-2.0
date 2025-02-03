<script lang="ts">
	import NavItem from './NavItem.svelte';
</script>

<NavItem href="/" to="Home" />
<NavItem href="/about" to="About" dropdown={true}>
	<NavItem href="/about" to="Overview" />
	<NavItem href="/about/department" to="Department" />
	<NavItem href="/about/administration" to="Administration" />
	<NavItem href="/about/history" to="History" />
	<NavItem href="/about/facts-and-figures" to="Facts and Figures" />
	<NavItem href="/about/contact-us" to="Contact Us" />
	<NavItem href="/about/citizens-charter" to="Citizen's Charter" />
</NavItem>
<NavItem href="/events" to="Events" />
<NavItem href="/publications" to="Publications" />
<NavItem href="/people" to="People" dropdown={true}>
	<NavItem href="/people/regular-faculty" to="Regular Faculty" />
	<NavItem
		href="/people/lecturers-and-teaching-associates"
		to="Lecturers and Teaching Associates"
	/>
	<NavItem href="/people/support-staff" to="Support Staff" />
</NavItem>
<NavItem href="/academics" to="Academics" dropdown={true}>
	<NavItem href="/academics/bs-cs" to="Bachelor of Science in Computer Science" />
	<NavItem href="/academics/ms-cs" to="Master of Science in Computer Science" />
	<NavItem href="/academics/ms-bioinformatics" to="Master of Science in Bioinformatics" />
	<NavItem href="/academics/phd-cs" to="Doctor of Philosophy in Computer Science" />
</NavItem>
<NavItem href="/research" to="Research" dropdown={true}>
	<NavItem href="/research" to="Overview" />
	<NavItem href="/research/labs" to="Laboratories" dropdown={true} position="left-36 top-0">
		<NavItem href="/research/labs/ndsl" to="Networks and Distributed Systems Laboratory" />
		<NavItem href="/research/labs/cvmil" to="Computer Vision and Machine Intelligence Laboratory" />
		<NavItem href="/research/labs/s3" to="Service Science and Software Engineering Laboratory" />
		<NavItem href="/research/labs/acl" to="Algorithms and Complexity Laboratory" />
		<NavItem href="/research/labs/lcl" to="Logic and Computability Laboratory" />
		<NavItem href="/research/labs/wsl" to="Web Science Laboratory" />
		<NavItem href="/research/labs/csl" to="Computer Security Laboratory" />
		<NavItem href="/research/labs/smsl" to="System Modeling and Simulation Laboratory" />
		<NavItem href="/research/labs/scl" to="Scientific Computing Laboratory" />
	</NavItem>
	<NavItem href="/research/outputs" to="Featured Outputs" />
</NavItem>
<NavItem href="/students" to="Students" dropdown={true}>
	<NavItem href="/students" to="Overview" />
	<NavItem href="/students/batch-representatives" to="Batch Representatives" />
	<NavItem
		href="/students/student-ethics-health-and-wellbeing"
		to="Student Ethics, Health, and Wellbeing"
	/>
	<NavItem href="/students/student-opportunities" to="Student Opportunities" />
	<NavItem href="/students/student-council" to="Student Council" />
	<NavItem href="/students/organizations" to="Organizations" />
</NavItem>
<NavItem href="/alumni" to="Alumni" />
<NavItem href="/linkages" to="Linkages" dropdown={true} position="md:right-0 lg:left-0">
	<NavItem
		href="/linkages/partnerships"
		to="Partnerships"
		custom="flex justify-end p-0 block justify-start"
	/>
</NavItem>
