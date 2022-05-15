<script>
	import Hero from '../components/Hero.svelte';
	import Map from '../components/Map.svelte';
	import Section from './Section.svelte';
	import HowToSection from './sections/howToSection.svelte';
	import PreviewSection from './sections/PreviewSection.svelte';
	import Footer from './Footer.svelte';

	let visible = false;

	const handleOpenMap = () => {
		visible = !visible;
	};
</script>

<Map
	lat={44.178981}
	lon={8.34119}
	zoom={11.4}
	pitch={51.01}
	bearing={-19.18}
	{visible}
	on:returnHome={handleOpenMap}
/>

<Hero on:openMap={handleOpenMap} visible={!visible} />
<Section id="how-to" position={'relative'}>
	<HowToSection />
</Section>
<Section id="print-preview" position={'relative'}>
	<PreviewSection />
</Section>
<Footer />
