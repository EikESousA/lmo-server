interface IRespositoryConfig {
	repository: 'fake' | 'db';
}

export default {
	repository: process.env.REPOSITORY_DRIVER || 'fake',
} as IRespositoryConfig;
