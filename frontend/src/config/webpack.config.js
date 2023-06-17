module.exports = {
	cache: {
		type: 'filesystem'
	},

	output: {
		filename: '[name].js',
		chunkFilename: 'chunk.[contenthash].js',
		library: {
			name: 'main',
			type: 'umd'
		},
		umdNamedDefine: false,
	},
};
