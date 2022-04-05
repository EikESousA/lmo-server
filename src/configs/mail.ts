interface IMailConfig {
	driver: 'ethereal' | 'ses';
	defaults: {
		from: {
			email: string;
			name: string;
		};
	};
}

export default {
	driver: process.env.MAIL_DRIVER || 'ethereal',
	defaults: {
		from: {
			email: 'suporte@lmo.app',
			name: 'Loja de Modas Online - Suporte',
		},
	},
} as IMailConfig;
