<script lang="ts">
    import NavItem from "$lib/components/nav/NavItem.svelte";
</script>

<div class="w-full flex justify-center">
    <nav class="w-4/5 sticky flex justify-between">
        <a href="/"><p>logo</p></a>
        <ul class="w-4/5 flex justify-center gap-8">
            <NavItem href="/about" to="About">
                <NavItem href="/about/overview" to="Overview" />
                <NavItem href="/about/history" to="History" />
            </NavItem>
            <NavItem href="/events" to="Events" />
            <NavItem href="/people" to="People" />
            <NavItem href="/academics" to="Academics">
                <NavItem href="/academics/undergraduate" to="Undergraduate Program" />
                <NavItem href="/academics/graduate" to="Graduate Program" />
            </NavItem>
            <NavItem href="/research" to="Research">
                <NavItem href="/research/overview" to="Overview" />
                <NavItem href="/research/labs" to="Laboratories">
                    <NavItem href="/research/labs/ndsl" to="Networks and Distributed Systems Laboratory" />
                    <NavItem href="/research/labs/cvmil" to="Computer Vision and Machine Intelligence Laboratory" />
                    <NavItem href="/research/labs/s3" to="Service Science and Software Engineering Laboratory" />
                    <NavItem href="/research/labs/acl" to="Algorithms and Complexity Laboratory" />
                    <NavItem href="/research/labs/lcl" to="Logic and smth here Laboratory" />
                    <NavItem href="/research/labs/wsl" to="Web Science Laboratory" />
                    <NavItem href="/research/labs/csl" to="Computer Security Laboratory" />
                    <NavItem href="/research/labs/smsl" to="System Modeling and Simulation Laboratory" />
                    <NavItem href="/research/labs/scl" to="Scientific Computing Laboratory" />
                </NavItem>
                <NavItem href="/research/outputs" to="Featured Outputs" />
            </NavItem>
            <NavItem href="/students" to="Students">
                <NavItem href="/students/life" to="Organizations" />
                <NavItem href="/students/resources" to="Resources" />
            </NavItem>
            <NavItem href="/alumni" to="Alumni" />
            <NavItem href="/linkages" to="Linkages">
                <NavItem href="/linkages/partnerships" to="Partnerships" />
            </NavItem>
        </ul>
    </nav>
</div>