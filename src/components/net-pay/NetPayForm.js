import React from 'react';
import { func, shape } from 'prop-types';
import { netPayType } from './PropTypes';
import { Form, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { checkZeroOrGreater } from '../../utils/Comparisons';
import { pensionMinCalc } from './calculations/PensionLegalMin';
import { invalidNum, invalidPercent } from '../../utils/ValidationText';

function NetPayForm(props) {
	const {
		employmentType,
		taxData,
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionType,
		pensionAmount,
		studyFundType,
		studyFundAmount,
		travelAllowance,
		lunchAllowance,
		otherAllowance,
		annualBonus,
		commission,
		overtime,
		language,
		validated
	} = props.stateData;
	const handleChange = props.handleChange;
	const handleClick = props.handleClick;
	const xsLabel = 7;
	const mdLabel = 6;
	const xsInput = 12 - xsLabel;
	const mdInput = 12 - mdLabel;
	const pensionMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType).toFixed(2);
	const pensionMinPecrcent = ((pensionMin / baseIncome) * 100).toFixed(2);

	return (
		<section>
			<Button variant="danger" onClick={handleClick} className="mb-3">
				Press if you're Mark and/or use decimal commas instead of points!
			</Button>
			<h2>Net pay calculator</h2>
			<Form
				id={`netpay-form-${employmentType}`}
				noValidate
				validated={validated}
				onSubmit={props.handleSubmit}
			>
				<fieldset>
					<Form.Label as="legend">Tax</Form.Label>
					<Form.Group as={Row}>
						<Form.Label htmlFor="taxYear" column xs={xsLabel} md={mdLabel}>
							Tax year
						</Form.Label>
						<Col xs={xsInput} md={mdInput}>
							<Form.Control
								as="select"
								id="taxYear"
								name="taxYearIndex"
								defaultValue=""
								required
								onChange={handleChange}
							>
								<option disabled value="">
									Select
								</option>
								{taxData.map((years, i) => (
									<option key={i} value={i}>
										{years.taxYear}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type="invalid">Select a tax year.</Form.Control.Feedback>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Form.Label htmlFor="income" column xs={xsLabel} md={mdLabel}>
							{employmentType === 'salaried' ? 'Base salary' : 'Profit'}
						</Form.Label>
						<Col xs={xsInput} md={mdInput}>
							<Form.Control
								as="input"
								id="income"
								name="baseIncome"
								type="number"
								pattern="[0-9]"
								inputMode={language === 'za' ? '' : 'decimal'}
								step="0.01"
								min="0"
								required
								value={baseIncome}
								onChange={handleChange}
							></Form.Control>
							<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Form.Label htmlFor="creditPoints" column xs={xsLabel} md={mdLabel}>
							Tax credit points
						</Form.Label>
						<Col xs={xsInput} md={mdInput}>
							<Form.Control
								as="input"
								id="creditPoints"
								name="creditPoints"
								type="number"
								pattern="[0-9]"
								inputMode={language === 'za' ? '' : 'decimal'}
								step="0.25"
								min="0"
								required={checkZeroOrGreater(creditPoints)}
								value={creditPoints}
								onChange={handleChange}
							></Form.Control>
							<Form.Control.Feedback type="invalid">
								Must be a valid number in quater increments.
							</Form.Control.Feedback>
						</Col>
					</Form.Group>
				</fieldset>
				<fieldset>
					<Form.Label as="legend">Contributions</Form.Label>
					<fieldset>
						<Form.Group as={Row}>
							<Form.Label as="legend" column xs={xsLabel} md={mdLabel}>
								Pension
							</Form.Label>
							<Col xs={xsInput} md={mdInput}>
								<Form.Check inline>
									<Form.Check.Input
										type="radio"
										id="pensionlMin"
										name="pensionOption"
										value="legalMin"
										checked={pensionOption === 'legalMin'}
										onChange={handleChange}
									/>
									<Form.Check.Label htmlFor="pensionlMin">Legal minium</Form.Check.Label>
								</Form.Check>
								<Form.Check inline>
									<Form.Check.Input
										type="radio"
										id="pensionlExtra"
										name="pensionOption"
										value="custom"
										checked={pensionOption === 'custom'}
										disabled={baseIncome >= 1 ? false : true}
										onChange={handleChange}
									/>
									<Form.Check.Label htmlFor="pensionlExtra">Custom</Form.Check.Label>
								</Form.Check>
								{baseIncome < 1 && (
									<div className="small">
										{employmentType === 'salaried'
											? 'Enter a base salary to select custom.'
											: 'Enter profit to select custom.'}
									</div>
								)}
							</Col>
						</Form.Group>
						{pensionOption === 'custom' && (
							<>
								{employmentType === 'selfEmployed' && (
									<Form.Group as={Row}>
										<Form.Label column xs={xsLabel} md={mdLabel}>
											Type
										</Form.Label>
										<Col xs={xsInput} md={mdInput}>
											<Form.Check inline>
												<Form.Check.Input
													type="radio"
													id="pensionPercent"
													name="pensionType"
													value="percent"
													checked={pensionType === 'percent'}
													onChange={handleChange}
												/>
												<Form.Check.Label htmlFor="pensionPercent">Percent</Form.Check.Label>
											</Form.Check>
											<Form.Check inline>
												<Form.Check.Input
													type="radio"
													id="pensionlShekel"
													name="pensionType"
													value="shekel"
													checked={pensionType === 'shekel'}
													onChange={handleChange}
												/>
												<Form.Check.Label htmlFor="pensionlShekel">Shekel</Form.Check.Label>
											</Form.Check>
										</Col>
									</Form.Group>
								)}
								<Form.Group as={Row}>
									<Form.Label htmlFor="pensionAmount" column xs={xsLabel} md={mdLabel}>
										Amount
									</Form.Label>
									<Col xs={xsInput} md={mdInput}>
										<InputGroup>
											<FormControl
												as="input"
												id="pensionAmount"
												name="pensionAmount"
												type="number"
												pattern="[0-9]"
												inputMode={language === 'za' ? '' : 'decimal'}
												step="0.01"
												min={pensionType === 'percent' ? pensionMinPecrcent : pensionMin}
												max={pensionType === 'percent' ? 100 : undefined}
												value={pensionAmount}
												onChange={handleChange}
												required
											/>
											<InputGroup.Append>
												<InputGroup.Text>{pensionType === 'percent' ? '%' : '₪'}</InputGroup.Text>
											</InputGroup.Append>
											<Form.Control.Feedback type="invalid">
												{pensionType === 'percent'
													? `${invalidPercent} The legal minimum is ${pensionMinPecrcent}%.`
													: `${invalidNum} The legal minimum is ${pensionMin}₪.`}
											</Form.Control.Feedback>
										</InputGroup>
									</Col>
								</Form.Group>
							</>
						)}
					</fieldset>
					<fieldset>
						<Form.Group as={Row}>
							<Form.Label as="legend" column xs={xsLabel} md={mdLabel}>
								Study fund
							</Form.Label>
							<Col xs={xsInput} md={mdInput}>
								<Form.Check inline>
									<Form.Check.Input
										type="radio"
										id="studyFundPercent"
										name="studyFundType"
										value="percent"
										checked={studyFundType === 'percent'}
										onChange={handleChange}
									/>
									<Form.Check.Label htmlFor="studyFundPercent">Percent</Form.Check.Label>
								</Form.Check>
								<Form.Check inline>
									<Form.Check.Input
										type="radio"
										id="studyFundShekel"
										name="studyFundType"
										value="shekel"
										checked={studyFundType === 'shekel'}
										onChange={handleChange}
									/>
									<Form.Check.Label htmlFor="studyFundShekel">Shekel</Form.Check.Label>
								</Form.Check>
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<Form.Label htmlFor="studyFundAmount" column xs={xsLabel} md={mdLabel}>
								Amount
							</Form.Label>
							<Col xs={xsInput} md={mdInput}>
								<InputGroup>
									<FormControl
										as="input"
										id="studyFundAmount"
										name="studyFundAmount"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										max={studyFundType === 'percent' ? 100 : undefined}
										value={studyFundAmount}
										onChange={handleChange}
										required={checkZeroOrGreater(studyFundAmount)}
									/>
									<InputGroup.Append>
										<InputGroup.Text>{studyFundType === 'percent' ? '%' : '₪'}</InputGroup.Text>
									</InputGroup.Append>
									<Form.Control.Feedback type="invalid">
										{studyFundType === 'percent' ? `${invalidPercent}` : `${invalidNum}`}
									</Form.Control.Feedback>
								</InputGroup>
							</Col>
						</Form.Group>
					</fieldset>
				</fieldset>
				{employmentType === 'salaried' && (
					<>
						<fieldset>
							<Form.Label as="legend">Allowances</Form.Label>
							<Form.Group as={Row}>
								<Form.Label htmlFor="travelAllowance" column xs={xsLabel} md={mdLabel}>
									Transport
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="travelAllowance"
										name="travelAllowance"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										value={travelAllowance}
										onChange={handleChange}
										required={checkZeroOrGreater(travelAllowance)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="lunchAllowance" column xs={xsLabel} md={mdLabel}>
									10bis / Cibus / Other Card
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="lunchAllowance"
										name="lunchAllowance"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										value={lunchAllowance}
										onChange={handleChange}
										required={checkZeroOrGreater(lunchAllowance)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="lunchAllowance" column xs={xsLabel} md={mdLabel}>
									Other
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="otherAllowance"
										name="otherAllowance"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										value={otherAllowance}
										onChange={handleChange}
										required={checkZeroOrGreater(otherAllowance)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
						</fieldset>
						<fieldset>
							<Form.Label as="legend">Incentives</Form.Label>
							<Form.Group as={Row}>
								<Form.Label htmlFor="annualBonus" column xs={xsLabel} md={mdLabel}>
									One-time bonus or gift
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="annualBonus"
										name="annualBonus"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										value={annualBonus}
										onChange={handleChange}
										required={checkZeroOrGreater(annualBonus)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="commission" column xs={xsLabel} md={mdLabel}>
									Commission
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="commission"
										name="commission"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										value={commission}
										onChange={handleChange}
										required={checkZeroOrGreater(commission)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="overtime" column xs={xsLabel} md={mdLabel}>
									Overtime
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="overtime"
										name="overtime"
										type="number"
										pattern="[0-9]"
										inputMode={language === 'za' ? '' : 'decimal'}
										step="0.01"
										min="0"
										value={overtime}
										onChange={handleChange}
										required={checkZeroOrGreater(overtime)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
						</fieldset>
					</>
				)}
				<Button type="submit" variant="primary">
					Calculate
				</Button>
			</Form>
		</section>
	);
}

NetPayForm.propTypes = {
	handleSubmit: func,
	handleChange: func,
	handleClick: func,
	stateData: shape({
		taxData: netPayType.taxData,
		baseIncome: netPayType.baseIncome,
		creditPoints: netPayType.creditPoints,
		pensionOption: netPayType.pensionOption,
		pensionAmount: netPayType.pensionAmount,
		educationFund: netPayType.educationFund,
		travelAllowance: netPayType.travelAllowance,
		lunchAllowance: netPayType.lunchAllowance,
		annualBonus: netPayType.annualBonus,
		commission: netPayType.commission,
		overtime: netPayType.overtime,
		validated: netPayType.validated
	})
};

export default NetPayForm;
