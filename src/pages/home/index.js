import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';
import Card from 'react-bootstrap/Card';
import calculator from '../../images/cards/iphone-calulator.jpg';
import taxTable from '../../images/cards/canvasbag-suit.jpg';
import pension from '../../images/cards/hour-glass-coins.jpeg';
import studyFund from '../../images/cards/seedling-coins.jpg';

function Home() {
	return (
		<>
			<Hero h1='Israel Tax Information' heroImage='home' />
			<PageContainer>
				<section className='home-cards plain-links flush-list'>
					<h2 className='visually-hidden'>Website Categories</h2>
					<Card>
						<Card.Img variant='top' src={calculator} alt='Calculor screen on iPhone' />
						<Card.Body>
							<Card.Title>
								<h3>Calculators</h3>
							</Card.Title>
							<ul>
								<li>
									<Link to='/employee/net-pay-calculator'>Employee Net Pay</Link>
								</li>
								<li>
									<Link to='/self-employed/net-pay-calculator'>Self-employed Net Pay</Link>
								</li>
							</ul>
						</Card.Body>
					</Card>
					<Card>
						<Card.Img variant='top' src={taxTable} alt='Man in a suit holding a cash bag' />
						<Card.Body>
							<Card.Title>
								<h3>Tax Rate Tables</h3>
							</Card.Title>
							<ul>
								<li>
									<Link to='/tax-rates/income-tax'>Income Tax</Link>
								</li>
								<li>
									<Link to='/tax-rates/credit-points'>Credit Points</Link>
								</li>
							</ul>
						</Card.Body>
					</Card>
					<Card>
						<Card.Img
							variant='top'
							src={pension}
							alt='Three hour glasses and coin piles at various heights'
						/>
						<Card.Body>
							<Card.Title>
								<h3>Pensions</h3>
							</Card.Title>
							<ul>
								<li>
									<Link to='/employee/pension'>Workplace Pension</Link>
								</li>
								<li>
									<Link to='/self-employed/pension'>Self-employed Pension</Link>
								</li>
							</ul>
						</Card.Body>
					</Card>
					<Card>
						<Card.Img variant='top' src={studyFund} alt='Sapling growing from a coin pile' />
						<Card.Body>
							<Card.Title>
								<h3>Study Funds</h3>
							</Card.Title>
							<ul>
								<li>
									<Link to='/employee/study-fund'>Employee Study Fund</Link>
								</li>
								<li>
									<Link to='/self-employed/study-fund'>Self-employed Study Fund</Link>
								</li>
							</ul>
						</Card.Body>
					</Card>
				</section>
			</PageContainer>
		</>
	);
}

export default Home;
