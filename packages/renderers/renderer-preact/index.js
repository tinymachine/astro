function getRenderer() {
	return {
		name: '@astrojs/preact',
		clientEntrypoint: '@astrojs/preact/client',
		serverEntrypoint: '@astrojs/preact/server',
		jsxImportSource: 'preact',
		jsxTransformOptions: async () => {
			const {
				default: { default: jsx },
				// @ts-expect-error types not found
			} = await import('@babel/plugin-transform-react-jsx');
			return {
				plugins: [jsx({}, { runtime: 'automatic', importSource: 'preact' })],
			};
		},
	};
}

function getConfiguration() {
	return {
		optimizeDeps: {
			include: ['@astrojs/preact/client', 'preact', 'preact/jsx-runtime', 'preact-render-to-string'],
			exclude: ['@astrojs/preact/server'],
		},
		ssr: {
			external: ['preact-render-to-string'],
		},
	};
}

/** @type { config: Readonly<AstroConfig>; assertDependency: (pkg: string, semver: string) => void; addRenderer: (mod: any | Promise<any>) => void } */
export default async function (astro) {
	// EXAMPLE: Preact Integration
	// In a future system, you would add preact by simply running `astro add preact`
	// or `astro setup preact` and then astro would take care of the rest.

	// addRenderer: Add a renderer to the project. This would most likely be stored
	// in the same package as the integration itself, so more likely: import('./renderer/index.js');
	console.log('START');
	astro.addRenderer(getRenderer());
	astro.applyConfiguration(getConfiguration());
	// assertDependency: Assert that this is a dependency of the project.
	// astro.assertDependency('preact', '~10.5.0');

	// Example: React
	// astro.addRenderer(await import(`@astrojs` + `/renderer-react`));
	// astro.assertDependency('react', '^17.0.0');
	// astro.assertDependency('react-dom', '^17.0.0');
	// return astro.config.buildOptions.site;
}
