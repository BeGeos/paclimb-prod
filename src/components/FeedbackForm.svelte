<form class="flex flex-col gap-6 my-16">
	<h3>Feedback Form - PAClimb</h3>
	<div class="form-row">
		<label for="question-1" class="font-bold">What feature did you like the most?</label>
		<input
			type="text"
			name="question-1"
			maxlength={250}
			class="border border-black/40 rounded-md p-2"
		/>
	</div>
	<div class="form-row">
		<label for="question-2" class="font-bold"
			>How would you score the usefulness of this website in your crag finding experience?</label
		>
		<input
			type="text"
			name="question-1"
			maxlength={250}
			class="border border-black/40 rounded-md p-2"
		/>
	</div>
	<div class="form-row">
		<label for="question-3" class="font-bold">What would you change about the website?</label>
		<input
			type="text"
			name="question-1"
			maxlength={250}
			class="border border-black/40 rounded-md p-2"
		/>
	</div>
	<div class="form-row">
		<label for="question-feedback" class="font-bold"
			>General feedback - give it a thought and write it in less than 1000 characters</label
		>
		<textarea
			name="question-feedback"
			cols="30"
			rows="10"
			class="border border-black/40 rounded-md p-2 max-h-56"
		/>
	</div>
	<button
		class="bg-sky-blue p-4 font-bold text-white font-base cursor-pointer rounded-md hover:-translate-y-1 hover:shadow-lg transition-all"
		>Send Feedback</button
	>
</form>

<style>
	.form-row {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
</style>
