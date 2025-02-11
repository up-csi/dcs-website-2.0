<script>
    import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';

    const { bldg, location } = {
        bldg: 'Alumni Engineers Centennial Hall',
        location: 'P. Velasquez St., University of the Philippines Diliman, Quezon City'
    }

    const { contact_number, contact_email } = {
        contact_number: '(02) 8981 8500 loc. 3231',
        contact_email: 'info@dcs.upd.edu.ph',
    }

    const links = [
        {
            name: 'University of the Philippines System',
            href: 'https://up.edu.ph'
        },
        {
            name: 'University of the Philippines Diliman',
            href: 'https://upd.edu.ph'
        },
        {
            name: 'UPD College of Engineering',
            href: 'https://coe.upd.edu.ph'
        },
        {
            name: 'UPD Webmail',
            href: 'https://mail.upd.edu.ph'
        },
        {
            name: 'UPD Computerized Registration System',
            href: 'https://crs.upd.edu.ph'
        }
    ]
</script>

<div class="p-10 bg-secondary text-secondary-foreground lg:grid lg:grid-cols-3 lg:gap-4">
    <div class="lg:mx-2 lg:my-0 my-4">
        <p class="font-bold text-foreground lg:text-xl text-2xl py-2">Department of Computer Science</p>
        <p>{bldg}</p>
        <p>{location}</p>
        <p>{contact_number} | {contact_email}</p>
    </div>
    <div class="lg:mx-2 lg:my-0 my-4">
        <p class="font-bold text-foreground text-xl py-2">Quick Links</p>
        {#each links as { name, href }}
            <a {href} class="transition-colors duration-300 hover:text-primary">{name}</a>
            <br />
        {/each}
    </div>
    <div class="lg:mx-2 lg:my-0 my-4">
        <p class="font-bold text-foreground text-xl py-2">Follow Us On</p>
        <div class="flex items-center">
            <a
				href="https://web.facebook.com/upddcs?_rdc=1&_rdr"
				target="_blank"
				rel="noopener noreferrer"
				class="mr-3 h-10 pb-[2px] transition-colors duration-300 hover:text-primary"
			>
				<FacebookIcon />
			</a>
			<a
				href="https://x.com/upcs"
				target="_blank"
				rel="noopener noreferrer"
				class="h-8 transition-colors duration-300 hover:text-primary"
			>
				<XIcon />
			</a>
        </div>
    </div>
</div>
<div class="bg-primary text-primary-foreground flex justify-center">
    <p class="my-6 text-sm">&copy;2024 UP Department of Computer Science</p>
</div>