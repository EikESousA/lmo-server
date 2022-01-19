import { log } from '@utils/log';

import { app } from './app';

app.listen(process.env.APP_PORT || 3333, () => {
	if (process.env.APP_ENV === 'development') {
		process.stdout.write('\x1Bc');
	}

	log(`🌎 Server iniciado - PORTA: ${process.env.APP_PORT || 3333}`);
});
