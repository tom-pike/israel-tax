import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';

function Home() {
	return (
		<>
			<Hero h1='Israel Tax Information' />
			<PageContainer>
				<Row>
					<Col xs={12} sm={6} className='plain-links'>
						<section>
							<h2>Calculators</h2>
							<ul>
								<li>
									<Link to='/employee/net-pay-calculator'>Employee Net Pay</Link>
								</li>
								<li>
									<Link to='/self-employed/net-pay-calculator'>Self-employed Net Pay</Link>
								</li>
								<li>
									<Link to='/self-employed/end-of-year-calculator'>End of Year</Link>
								</li>
							</ul>
						</section>
					</Col>
					<Col xs={12} sm={6} className='plain-links'>
						<section>
							<h2>Tax Rate Tables</h2>
							<ul>
								<li>
									<Link to='/tax-rates/income-tax'>Income Tax</Link>
								</li>
								<li>
									<Link to='/tax-rates/credit-points'>Credit Points</Link>
								</li>
							</ul>
						</section>
					</Col>
				</Row>
				<Row>
					<Col xs={12} sm={6} className='plain-links ms-auto'>
						<section>
							<h2>Contribution Tables</h2>
							<ul>
								<li>
									<Link to='/employee/study-fund'>Employee Study Fund</Link>
								</li>
								<li>
									<Link to='/self-employed/study-fund'>Self-employed Study Fund</Link>
								</li>
								<li>
									<Link to='/employee/pension'>Workplace Pension</Link>
								</li>
								<li>
									<Link to='/self-employed/pension'>Self-employed Pension</Link>
								</li>
							</ul>
						</section>
					</Col>
				</Row>
			</PageContainer>
		</>
	);
}

export default Home;
