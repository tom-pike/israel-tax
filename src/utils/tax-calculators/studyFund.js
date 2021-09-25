export function studyFundCalc(taxData, taxYearIndex, income, employment, amount, type) {
	//Education fund is a tax deductible expense up to a ceiling for self-employed
	//Employees contribution is taxed, but aren't taxed on the employers contribution (tax deductible expense for them)
	//Both have ceilings to be eligible for capital gains relief

	const contribution = type === 'shekel' ? amount : income * (amount / 100);
	const { percent, ceiling } = taxData[taxYearIndex].studyFund[employment];
	const monthlyAllowance = (ceiling * (percent / 100)) / 12;
	let taxDeductible;

	if (contribution <= monthlyAllowance) {
		taxDeductible = contribution;
	} else {
		taxDeductible = monthlyAllowance;
	}

	if (employment === 'selfEmployed') {
		return { studyFundContribution: contribution, studyFundTaxDeductible: taxDeductible };
	} else {
		return contribution;
	}
}
