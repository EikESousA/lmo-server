interface IRespositoryConfig {
	repository: 'fake' | 'implementation';
}

export default {
	repository: process.env.REPOSITORY_DRIVER || 'fake',
} as IRespositoryConfig;
