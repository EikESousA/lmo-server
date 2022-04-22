interface IRespositoryConfig {
	repository: 'fake' | 'implementation';
}

export default {
	repository: process.env.REPOSITORY || 'fake',
} as IRespositoryConfig;
