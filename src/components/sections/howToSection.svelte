<script>
	import Backdrop from '../Backdrop.svelte';
</script>

<Backdrop backdropColor="#CFE4E7" opacity={0.8} />
<div class="my-16 max-w-prose mx-auto">
	<h2 class="text-center">How to Use the MAP</h2>
	<p>
		This map is in 3D. With two fingers you can explore all crags of Finale Ligure from all point of
		view. Clicking on the Climbing logo a popup will show and you can:
	</p>
	<ul>
		<li>
			<strong>Google the crag</strong> to search for all routes and grades on different website
		</li>
		<li>
			find the page of the crag in the two main <strong>guide book</strong>, FINALE 51 and FINALE
			climbing (VERSANTE SUD)
		</li>
		<li>
			discover the <strong>parking</strong> to reach the crags and how to get there with your car
		</li>
	</ul>
	<p>
		Turning on the position you can discover where you are on the map and orient yourself in
		Satellite or Topographic map.
	</p>
	<h3 class="text-center">What about the colored roads?!</h3>
	<p>
		Like an underground all crags of FInale Ligure are reachable by seven line “Climbing Roads” and
		every stop is a parking that allow you to reach the crags on foot.
	</p>
</div>

<style>
	li {
		list-style: disc;
		margin-left: 3rem;
		margin-bottom: 0.75em;
	}
</style>
