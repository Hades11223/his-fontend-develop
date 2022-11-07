import moment from "moment";

export const checkFormat = (input) => {
	const text = input ? input.split('/').join('') : '';
	const formatTypes = ['DDMMYY', 'DDMMYYYY', 'YYYY', '*', '**', '***'];

	return formatTypes.find(item => {
		return item.length === text.length;
	});
};

export const objectConverter = (value, formatStr) => {
	const age = moment().diff(value, 'year');
	let validate = age < 0 ? 1002 : age > 200 ? 1001 : 0;
	const ageStr = age <= 3 ? moment().diff(value, 'months') : age;
	ageStr < 0 ? validate = 1002 : validate = 0;
	// const ageUnit = age < 3 ? 'tháng tuổi' : 'tuổi';
	const strData = value ? value.format(formatStr) : '';
	return {
		date: value,
		str: validate === 0 ? `${strData}` : value._i,
		// str: validate === 0 ? `${strData} - ${ageStr} ${ageUnit}` : value._i,
		formatStr,
		strData,
		validate: validate,
		ageStr: ageStr
	};
};

export const dateDefault = {
	date: null,
	str: '',
	formatStr: '',
	strData: '',
};