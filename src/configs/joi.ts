export default {
	abortEarly: true,
	messages: {
		'any.default':
			'O campo {#label} lançou um erro ao executar o método padrão.',
		'any.unknown': 'O campo {#label} não é permitido.',
		'any.invalid': 'O campo {#label} contém um valor inválido.',
		'any.empty': 'O campo {#label} não pode ser vazio.',
		'any.required': 'O campo {#label} não pode ser vazio.',
		'any.allowOnly':
			'O campo {#label} deve ter o mesmo valor que o campo (senha).',

		'alternatives.base':
			'O campo {#label} não corresponde às alternativas permitidas.',

		'array.base': 'O campo {#label} deve ser um array.',
		'array.includes':
			'O valor de {#label} não corresponde à nenhum dos tipos permitidos.',

		'string.required': 'O campo {#label} não pode ser vazio.',
		'string.empty': 'O campo {#label} não pode ser vazio.',
		'string.email': 'O campo {#label} não é válido.',
		'string.min': 'O campo {#label} deve ter no mínimo {#limit} caracteres.',
		'string.max': 'O campo {#label} deve ter no máximo {#limit} caracteres.',

		'number.base': 'O campo {#label} não pode ser vazio.',
		'number.less': 'O campo {#label} deve ser menor que {#limit}',
		'number.greater': 'O campo {#label} deve ser maior que {#limit}',
		'number.positive': 'O campo {#label} deve ser um número positivo',
		'number.negative': 'O campo {#label} deve ser um número negativo',
	},
};
