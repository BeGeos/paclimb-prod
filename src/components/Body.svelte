<script>
	import Hero from '../components/Hero.svelte';
	import Map from '../components/Map.svelte';
	import Section from './Section.svelte';
	import HowToSection from './sections/howToSection.svelte';
	import PreviewSection from './sections/PreviewSection.svelte';
	import Loading from './Loading.svelte';
	import Footer from './Footer.svelte';

	let visible = false;
	let loading = true;

	const handleLoaded = () => {
		loading = false;
	};

	const handleOpenMap = () => {
		visible = !visible;
	};

	// openFeedbackModal();
</script>

<Loading {loading} />

<Map
	lat={44.178981}
	lon={8.34119}
	zoom={11.4}
	pitch={51.01}
	bearing={-19.18}
	{visible}
	on:returnHome={handleOpenMap}
	on:loaded={handleLoaded}
/>
<Hero on:openMap={handleOpenMap} visible={!visible} />
<Section id="how-to" position={'relative'}>
	<HowToSection />
</Section>
<Section id="print-preview" position={'relative'}>
	<PreviewSection />
</Section>
<Footer />
