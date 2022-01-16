import { log } from '@utils/log';

import { app } from './app';

app.listen(3333, () => {
	if (process.env.APP_ENV === 'development') {
		process.stdout.write('\x1Bc');
	}

	log('🌎 Server iniciado - PORTA: 3333');
});
