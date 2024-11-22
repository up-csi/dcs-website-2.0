<script lang="ts">
    import * as Menubar from "$lib/components/ui/menubar";
</script>
 
<nav class="sticky w-full flex justify-center my-4">
    <Menubar.Root>
        <Menubar.Menu>
            <Menubar.Trigger>
                <a href="/about">About</a>
            </Menubar.Trigger>
            <Menubar.Content>
                <Menubar.Item>
                    <a href="/about/overview">Overview</a>
                </Menubar.Item>
                <Menubar.Item>
                    <a href="/about/history">History</a>
                </Menubar.Item>
            </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
            <Menubar.Trigger><a href="/events">Events</a></Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu>
            <Menubar.Trigger><a href="/people">People</a></Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu>
            <Menubar.Trigger><a href="/alumni">Alumni</a></Menubar.Trigger>
        </Menubar.Menu>
    </Menubar.Root>
</nav>