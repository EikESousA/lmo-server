import { format } from 'date-fns';

function log(text: string) {
	console.log(`${format(new Date(), '[dd/MM/yyyy - HH:mm:ss]')} - ${text}`);
}

export { log };
