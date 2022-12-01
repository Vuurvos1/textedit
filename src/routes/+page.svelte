<script>
</script>

<main class="flex align-center justify-center min-h-screen relative">
	<div
		class="background absolute inset-0 bottom-0 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120]"
	/>

	<section class="flex flex-col justify-center max-w-2xl mx-auto px-4">
		<h1
			class="text-slate-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-12"
		>
			A quicker way to take notes
		</h1>

		<!-- <p class="mb-4 text-center" /> -->

		<a
			class="bg-purple-500 px-4 py-2 rounded font-bold text-white mx-auto drop-shadow-md"
			href="/notes">Goto notes</a
		>
	</section>
</main>

<style lang="scss">
	main {
		background-color: #101625;

		@media (prefers-color-scheme: light) {
			background: #f7f9ff;
		}
	}

	section {
		z-index: 10;
	}

	.background {
		--col: rgb(200 200 200/0.25);
		--width: 2px;

		background: #101625;
		background-image: linear-gradient(var(--col) var(--width), #0000 var(--width)),
			linear-gradient(90deg, var(--col) var(--width), #0000 var(--width));

		background-size: 2rem 2rem;
		background-position: center 0;

		--scale: 2;
		mask-image: linear-gradient(
			/* 90deg, */ rgba(255, 255, 255, 0) calc(var(--scale) * 0%),
			rgba(255, 255, 255, 0.1) calc(var(--scale) * 6%),
			rgba(255, 255, 255, 0.5) calc(var(--scale) * 22.5%),
			rgba(255, 255, 255, 0.6) calc(var(--scale) * 25.5%),
			rgba(255, 255, 255, 0.7) calc(var(--scale) * 30%),
			rgba(255, 255, 255, 0.8) calc(var(--scale) * 36%),
			rgba(255, 255, 255, 0.9) calc(var(--scale) * 48%),
			rgba(255, 255, 255, 1) calc(var(--scale) * 60%)
		);

		@media (prefers-color-scheme: light) {
			--col: rgba(50, 50, 50, 0.1);
			background-color: #f7f9ff;
		}
	}

	h1 {
		font-family: sans-serif;
	}
</style>
