import React from 'react';
import { object, shape } from 'prop-types';
import { netPayType } from './PropTypes';
import { Table } from 'react-bootstrap';
import { bituachLeumiCalc } from './calculations/BituachLeumi';
import { pensionMinCalc } from './calculations/PensionLegalMin';
import { pensionContributionCalc } from './calculations/PensionContribution';
import { pensionReliefCalc } from './calculations/PensionReliefSalaried';
import { studyFundCalc } from './calculations/StudyFund';
import { incomeTaxCalc } from './calculations/IncomeTax';
import { formatCurrency } from '../../utils/FormatCurrency';
import Popup from '../popup/Popup';

function NetPayResultsSalaried(props) {
	const {
		employmentType,
		taxData,
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionAmount,
		studyFundType,
		studyFundAmount,
		travelAllowance,
		lunchAllowance,
		otherAllowance,
		overtime,
		annualBonus,
		commission,
		showResultsTable
	} = props.stateData;
	const studyFundContribution = studyFundCalc(
		taxData,
		taxYearIndex,
		baseIncome,
		employmentType,
		studyFundAmount,
		studyFundType
	);
	let taxableIncome = 0;
	[
		baseIncome,
		travelAllowance,
		lunchAllowance,
		otherAllowance,
		annualBonus,
		overtime,
		commission
	].forEach(e => {
		taxableIncome += typeof e === 'number' && e;
	});
	const pensionableIncome = baseIncome + lunchAllowance + otherAllowance + commission;
	const grossIncome =
		baseIncome + travelAllowance + otherAllowance + annualBonus + commission + overtime;
	const prisa =
		annualBonus >
		(taxableIncome - annualBonus) * (taxData[taxYearIndex].bituachLeumi.prisaLimitPercent / 100);
	const { month: nationalInsurance, annual: annualNationalInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome,
		prisa,
		annualBonus,
		'nationalInsurance'
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome,
		prisa,
		annualBonus,
		'healthInsurance'
	);
	const creditPointsTaxCredit = creditPoints * taxData[taxYearIndex].creditPointValue;
	const pensionLegalMin = pensionMinCalc(taxData, taxYearIndex, pensionableIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		pensionableIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount
	);
	const pensionTaxCredit = pensionReliefCalc(
		taxData,
		taxYearIndex,
		pensionContribution,
		pensionableIncome
	);
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		taxableIncome,
		annualBonus,
		creditPointsTaxCredit,
		pensionTaxCredit
	);
	console.log('pensionableIncome', pensionableIncome);
	console.log('prisa', prisa);

	return (
		<>
			<section
				style={{
					display: showResultsTable === true ? 'block' : 'none'
				}}
				ref={props.refProp}
			>
				<h2>Net pay results</h2>
				<Table striped bordered className="table__3 table__header--blue">
					<thead>
						<tr>
							<th></th>
							<th>Month</th>
							<th>Year</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Basic salary</td>
							<td>{formatCurrency('il', baseIncome)}</td>
							<td>{formatCurrency('il', baseIncome * 12)}</td>
						</tr>
						<tr>
							<td>Taxable income</td>
							<td>{formatCurrency('il', taxableIncome)}</td>
							<td>{formatCurrency('il', (taxableIncome - annualBonus) * 12 + annualBonus)}</td>
						</tr>
						<tr>
							<td>Income tax</td>
							<td>{formatCurrency('il', incomeTax)}</td>
							<td>{formatCurrency('il', annualIncomeTax)}</td>
						</tr>
						<tr>
							<td>National insurance</td>
							<td>{formatCurrency('il', nationalInsurance)}</td>
							<td>{formatCurrency('il', annualNationalInsurance)}</td>
						</tr>
						<tr>
							<td>Health insurance</td>
							<td>{formatCurrency('il', healthInsurance)}</td>
							<td>{formatCurrency('il', annualHealthInsurance)}</td>
						</tr>
						<tr>
							<td>Pension</td>
							<td>{formatCurrency('il', pensionContribution)}</td>
							<td>{formatCurrency('il', pensionContribution * 12)}</td>
						</tr>
						{studyFundContribution > 0 && (
							<tr>
								<td>Educational fund</td>
								<td>{formatCurrency('il', studyFundContribution)}</td>
								<td>{formatCurrency('il', studyFundContribution * 12)}</td>
							</tr>
						)}
						{annualBonus > 0 && (
							<tr>
								<td>Bonus</td>
								<td>{formatCurrency('il', annualBonus)}</td>
								<td>{formatCurrency('il', annualBonus)}</td>
							</tr>
						)}
						<tr>
							<td>Net</td>
							<td>
								{formatCurrency(
									'il',
									grossIncome -
										incomeTax -
										nationalInsurance -
										healthInsurance -
										pensionContribution -
										studyFundContribution
								)}
							</td>
							<td>
								{formatCurrency(
									'il',
									(grossIncome - annualBonus) * 12 +
										annualBonus -
										annualIncomeTax -
										annualNationalInsurance -
										annualHealthInsurance -
										(pensionContribution + studyFundContribution) * 12
								)}
							</td>
						</tr>
					</tbody>
				</Table>
			</section>
			{lunchAllowance > 0 && showResultsTable === true && (
				<Popup
					type="info"
					title="10bis, Cibus, or credit/debit card allowance"
					text={`Your allowance of ${formatCurrency(
						'il',
						lunchAllowance
					)} has been added to your taxable income, but as it's not included in your salary payment, it doesn't form part of your net income. It should still be considered desposible income though. `}
				/>
			)}
		</>
	);
}

NetPayResultsSalaried.propTypes = {
	refProp: object.isRequired,
	stateData: shape({
		employmentType: netPayType.employmentType,
		taxData: netPayType.taxData,
		taxYearIndex: netPayType.taxYearIndex,
		baseIncome: netPayType.baseIncome,
		creditPoints: netPayType.creditPoints,
		pensionOption: netPayType.pensionOption,
		pensionAmount: netPayType.pensionAmount,
		studyFundType: netPayType.studyFundType,
		studyFundAmount: netPayType.studyFundAmount,
		travelAllowance: netPayType.travelAllowance,
		lunchAllowance: netPayType.lunchAllowance,
		otherAllowance: netPayType.otherAllowance,
		overtime: netPayType.overtime,
		annualBonus: netPayType.annualBonus,
		commission: netPayType.commission,
		showResultsTable: netPayType.showResultsTable
	})
};

export default NetPayResultsSalaried;
